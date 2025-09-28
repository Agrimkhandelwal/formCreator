import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import FormBuilder from "./components/FormBuilder.jsx";
import FormPreview from "./components/FormPreview.jsx";

export default function App() {
  const [forms, setForms] = useState([]);
  const [responses, setResponses] = useState({});

  const handleSaveForm = (form) => {
    setForms([...forms, form]);
  };

  const handleSubmitResponse = (formId, response) => {
    setResponses({
      ...responses,
      [formId]: [...(responses[formId] || []), response],
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<FormBuilder forms={forms} setForms={setForms} />}
        />
        <Route
          path="/form/:id"
          element={
            <FormPreview forms={forms} onSubmitResponse={handleSubmitResponse} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
