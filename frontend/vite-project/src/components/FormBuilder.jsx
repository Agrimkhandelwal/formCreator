import { useEffect, useState } from "react";
// Make sure this path is correct for your project structure
import { saveForm, getForms, updateForm, deleteForm, duplicateForm } from "../api.js"; 

const FormBuilder = () => {
  // 1. ADDED state for title and the ID of the form being edited
  const [title, setTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [editId, setEditId] = useState(null); 
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetchForms();
  }, []);

  // --- API Functions ---
  const fetchForms = async () => {
    try {
      const res = await getForms();
      setForms(res.data);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  };

  const handleSaveOrUpdateForm = async () => {
    if (!title.trim()) return alert("Form title is required!");
    if (fields.length === 0) return alert("Please add at least one field!");

    const formData = { title, fields };

    try {
      if (editId) {
        await updateForm(editId, formData);
      } else {
        
        await saveForm(formData);
        
      }
      resetFormState();
      fetchForms();
    } catch (error) {
      console.error("Failed to save or update form:", error);
    }
  };

  const handleDeleteForm = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await deleteForm(id);
        fetchForms();
      } catch (error) {
        console.error("Failed to delete form:", error);
      }
    }
  };

  const handleDuplicateForm = async (id) => {
    try {
      await duplicateForm(id);
      fetchForms();
    } catch (error) {
      console.error("Failed to duplicate form:", error);
    }
  };

  // --- UI Helper Functions ---
  const addField = () => {
    setFields([...fields, { label: "", type: "text" }]);
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };
  
  const loadFormForEdit = (form) => {
    setTitle(form.title);
    setFields(form.fields);
    setEditId(form._id);
    window.scrollTo(0, 0); 
  };
  
  const resetFormState = () => {
    setTitle("");
    setFields([]);
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Form Builder</h1>

      {/* --- FORM EDITOR --- */}
      <div className="bg-white text-black p-6 rounded-2xl shadow-lg w-full max-w-2xl mb-8">
        {/* 2. ADDED input for the title */}
        <input
          type="text"
          placeholder="Form Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full mb-4 font-semibold text-lg"
        />

        {fields.map((field, index) => (
          <div key={index} className="mb-4 flex gap-4">
            <input
              type="text"
              placeholder="Field Label"
              value={field.label}
              onChange={(e) => handleFieldChange(index, "label", e.target.value)}
              className="border p-2 rounded w-1/2"
            />
            <select
              value={field.type}
              onChange={(e) => handleFieldChange(index, "type", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="email">Email</option>
              <option value="date">Date</option>
            </select>
          </div>
        ))}
        
        <div className="flex gap-4">
          <button
            onClick={addField}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Field
          </button>
          <button
            onClick={handleSaveOrUpdateForm}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-bold"
          >
            {editId ? "Update Form" : "Save Form"}
          </button>
          {editId && (
            <button
              onClick={resetFormState}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* --- SAVED FORMS LIST --- */}
      <h2 className="text-2xl font-semibold mb-4">Saved Forms</h2>
      {/* 3. CORRECTED the entire loop structure */}
      <div className="grid gap-6">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md"
          >
            <h3 className="font-bold text-xl mb-2">{form.title}</h3>
            
            <div className="border border-gray-700 p-3 rounded-md mb-4">
              {form.fields && form.fields.map((f, idx) => (
                <div key={idx} className="mb-2">
                  <label className="block text-sm text-gray-300">{f.label}:</label>
                  <input
                    type={f.type}
                    disabled
                    placeholder={f.label}
                    className="border p-1 rounded w-full bg-gray-700"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-3">
              <button
                onClick={() => loadFormForEdit(form._id)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm text-black"
              >
                Edit
              </button>
              <button
                onClick={() => handleDuplicateForm(form._id)}
                className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm"
              >
                Duplicate
              </button>
              <button
                onClick={() => handleDeleteForm(form._id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormBuilder;