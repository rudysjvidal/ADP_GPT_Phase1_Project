import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function AddCustomerForm() {
  const { addCustomer } = useOutletContext();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    profile_picture: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  };

  // Light validation
  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Invalid email.";
    if (!values.password.trim()) e.password = "Password is required.";
    if (values.profile_picture && !/^https?:\/\//i.test(values.profile_picture)) e.profile_picture = "Must be a URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addCustomer({ id: Date.now(), ...values }); // simple id; swap for UUID/memdb later
    navigate("/dashboard"); // go back to the list
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span>Name</span>
          <input name="name" value={values.name} onChange={onChange} className="border p-2 rounded" />
          {errors.name && <small className="text-red-600">{errors.name}</small>}
        </label>

        <label className="grid gap-1">
          <span>Email</span>
          <input name="email" type="email" value={values.email} onChange={onChange} className="border p-2 rounded" />
          {errors.email && <small className="text-red-600">{errors.email}</small>}
        </label>

        <label className="grid gap-1">
          <span>Password</span>
          <input name="password" type="password" value={values.password} onChange={onChange} className="border p-2 rounded" />
          {errors.password && <small className="text-red-600">{errors.password}</small>}
        </label>

        <label className="grid gap-1">
          <span>Phone Number</span>
          <input name="phone_number" value={values.phone_number} onChange={onChange} className="border p-2 rounded" />
        </label>

        <label className="grid gap-1">
          <span>Profile Picture URL</span>
          <input name="profile_picture" value={values.profile_picture} onChange={onChange} className="border p-2 rounded" />
          {errors.profile_picture && <small className="text-red-600">{errors.profile_picture}</small>}
        </label>

        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
