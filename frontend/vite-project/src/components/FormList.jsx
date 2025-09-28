import React, { useEffect, useState } from "react";
import API from "../api";
import FormViewer from "./FormViewer";

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);

  const loadForms = async () => {
    const res = await API.get("/");
    setForms(res.data);
  };

  useEffect(() => {
    loadForms();
  }, []);

  const deleteForm = async (id) => {
    await API.delete(`/${id}`);
    loadForms();
  };

  const duplicateForm = async (id) => {
    await API.post(`/${id}/duplicate`);
    loadForms();
  };

  const publishForm = async (id) => {
    await API.put(`/${id}/publish`);
    loadForms();
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2">Forms</h2>
      <ul>
        {forms.map((form) => (
          <li
            key={form._id}
            className="p-2 border rounded flex justify-between mb-2"
          >
            <span>
              {form.title} ({form.status})
            </span>
            <div>
              <button
                className="bg-red-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => deleteForm(form._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                onClick={() => duplicateForm(form._id)}
              >
                Duplicate
              </button>
              <button
                className="bg-green-600 text-white px-2 py-1 mr-2 rounded"
                onClick={() => publishForm(form._id)}
              >
                Publish
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedForm(form)}
              >
                View
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedForm && <FormViewer form={selectedForm} />}
    </div>
  );
};

export default FormList;
