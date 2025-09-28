import { useParams } from "react-router-dom";
import { useState } from "react";

export default function FormPreview({ forms, onSubmitResponse }) {
  const { id } = useParams();
  const form = forms.find((f) => f.id.toString() === id);

  const [responses, setResponses] = useState({});

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Form not found 🚫
      </div>
    );
  }

  const handleChange = (label, value) => {
    setResponses({ ...responses, [label]: value });
  };

  const handleSubmit = () => {
    onSubmitResponse(form.id, responses);
    alert("✅ Response submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-10">
      <h1 className="text-4xl font-extrabold text-white mb-8">
        📝 Fill Form #{form.id}
      </h1>

      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6">
        {form.fields.map((f, i) => (
          <div key={i} className="mb-4">
            <label className="block text-gray-700 font-semibold mb-1">
              {f.label}
            </label>
            {f.type === "text" && (
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => handleChange(f.label, e.target.value)}
              />
            )}
            {f.type === "number" && (
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-md"
                onChange={(e) => handleChange(f.label, e.target.value)}
              />
            )}
            {f.type === "checkbox" && (
              <input
                type="checkbox"
                onChange={(e) => handleChange(f.label, e.target.checked)}
              />
            )}
            {f.type === "radio" && (
              <div className="flex gap-2">
                <label>
                  <input
                    type="radio"
                    name={f.label}
                    value="Option 1"
                    onChange={(e) => handleChange(f.label, e.target.value)}
                  />{" "}
                  Option 1
                </label>
                <label>
                  <input
                    type="radio"
                    name={f.label}
                    value="Option 2"
                    onChange={(e) => handleChange(f.label, e.target.value)}
                  />{" "}
                  Option 2
                </label>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="mt-6 w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md"
        >
          Submit Response
        </button>
      </div>
    </div>
  );
}
