import express from 'express';
import { createForm,getallForm,getFormById,deleteForm,duplicateForm,submitResponse,getResponse,updateForm,publishForm } from '../controller/UserController.js';

 const router=express.Router();

router.post("/", createForm);
router.get("/", getallForm);
router.get("/:id", getFormById);
router.put("/:id", updateForm);      
router.delete("/:id", deleteForm);
router.post("/:id/duplicate", duplicateForm); 

router.post("/:id/submit", submitResponse);
router.get("/:id/responses", getResponse);
router.put("/:id/publish", publishForm); 

export default router;
