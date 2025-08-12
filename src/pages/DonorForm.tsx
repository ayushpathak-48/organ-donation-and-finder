import React, { useState } from "react";
import { addDonor } from "../services/api";
import type { Donor } from "../types/donor";

const DonorForm: React.FC = () => {
  const [form, setForm] = useState<Donor>({
    name: "",
    organ: "",
    bloodGroup: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonor(form);
    alert("Donor registered successfully!");
    setForm({ name: "", organ: "", bloodGroup: "", location: "" });
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Donor Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            type="text"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key as keyof Donor]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="border p-2 w-full rounded"
          />
        ))}
        <button
          className="bg-green-700 text-white px-4 py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DonorForm;
