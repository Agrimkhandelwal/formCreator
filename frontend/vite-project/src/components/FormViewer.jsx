import React, { useState } from "react";
import API from "../api";

const FormViewer = ({ form }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (label, value) => {
    setAnswers({ ...answers, [label]: value });
  };

  const handleSubmit = async () => {
    await API.post(`/${form._id}/submit`, answers);
    alert("Response submitted!");
    setAnswers({});
  };

  return (
    <div className="p-4 border rounded mt-4 bg-gray-50">
      <h3 className="text-lg font-bold mb-2">{form.title}</h3>
      <p>{form.description}</p>
      {form.fields.map((field, i) => (
        <div key={i} className="mt-2">
          <label className="block font-medium">{field.label}</label>
          <input
            type={field.type || "text"}
            className="border p-2 w-full"
            required={field.required}
            value={answers[field.label] || ""}
            onChange={(e) => handleChange(field.label, e.target.value)}
          />
        </div>
      ))}
      <button
        className="bg-green-600 text-white px-3 py-1 mt-3 rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default FormViewer;
