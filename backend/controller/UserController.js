import express from 'express';
import FormModel from '../models/Form.js';
import ResponseModel from '../models/Response.js';

export async function createForm(req, res) {
    try {
        const form = new FormModel({
            ...req.body,
            status: req.body.status || "draft",
        });
        const savedForm = await form.save();
        // Sending the saved object directly is cleaner
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export async function publishForm(req, res) {
    try {
        // FIX: Changed Form to FormModel
        const publishedForm = await FormModel.findByIdAndUpdate(
            req.params.id, {
                status: "published"
            }, {
                new: true
            }
        );
        res.json(publishedForm);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export async function getallForm(req, res) {
    try {
        // FIX: Added 'await' before FormModel.find()
        const forms = await FormModel.find();
        res.json(forms);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export async function getFormById(req, res) {
    try {
        const form = await FormModel.findById(req.params.id);
        res.json(form);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

export async function deleteForm(req, res) {
    try {
        await FormModel.findByIdAndDelete(req.params.id);
        res.json({
            message: "Form deleted successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export async function updateForm(req, res) {
    try {
        const form = await FormModel.findByIdAndUpdate(req.params.id,
            req.body, {
                new: true
            },
        )
        res.json(form);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

export async function duplicateForm(req, res) {
    try {
        const previousform = await FormModel.findById(req.params.id);
        if (!previousform) {
            return res.status(404).json({ message: "Form not found" });
        }
        
        const copyForm = new FormModel({
            title: previousform.title + " copy",
            description: previousform.description,
            field: previousform.field,
        });

        const savedForm = await copyForm.save();
        res.json(savedForm);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function submitResponse(req, res) {
    try {
        const response = new ResponseModel({
            formId: req.params.id,
            answer: req.body,
        })
        const savedResponse = await response.save();
        res.status(201).json(savedResponse);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

export async function getResponse(req, res) {
    try {
        const responses = await ResponseModel.find({
            formId: req.params.id
        });
        res.json(responses);
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}