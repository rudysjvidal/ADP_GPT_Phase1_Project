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
    job_title: "",
    salary: "",
    benefits_selection: [],
    registered_events: [],
    managerId: "",
    level: "",
  });
  const [errors, setErrors] = useState({});

  const [benefitsInput, setBenefitsInput] = useState("");
  const [eventsInput, setEventsInput] = useState("");


  const onChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "benefits_selection") {
      setBenefitsInput(value);
    } else if (name === "registered_events"){
      setEventsInput(value);
    } else if (name === "salary") {
      setValues((v) => ({ ...v, [name]: Number(value) }));
    } else {
      setValues((v) => ({ ...v, [name]: value }));
    }
  };

  // Light validation
  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) e.email = "Invalid email.";
    if (!values.password.trim()) e.password = "Password is required.";
    if (values.profile_picture && !/^https?:\/\//i.test(values.profile_picture)) e.profile_picture = "Must be a URL.";
    if (values.salary !== "" && (isNaN(values.salary) || values.salary < 0)) e.salary = "Salary must be a positive number.";
    if (values.managerId !== "" && (isNaN(values.managerId) || values.managerId < 0)) e.managerId = "ManagerID must be a positive number.";
    if (values.level !== "" && (isNaN(values.level) || values.level < 0)) e.level = "Level must be a positive number.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      id: Math.floor(Date.now() / 1000),
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      phone_number: values.phone_number,
      profile_picture: (values.profile_picture || '').trim(),
      job_title: values.job_title.trim(),
      salary: values.salary,
      benefits_selection: benefitsInput.split(",").map(s => s.trim()).filter(Boolean),
      registered_events: eventsInput.split(",").map(s => s.trim()).filter(Boolean),
      managerId: values.managerId,
      level: values.level,
    };

    // await addCustomer(payload);
    // navigate("/dashboard");

    const created = await addCustomer(payload);
    if (created && (created._id || created.id)) {
      navigate("/dashboard");
    } else {
      navigate("/dashboard", { replace: true });
      setTimeout(() => window.location.reload(), 0);
    }
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

        <label className="grid gap-1">
          <span>Job Title</span>
          <input name="job_title" value={values.job_title} onChange={onChange} className="border p-2 rounded" />
        </label>

        <label className="grid gap-1">
          <span>Salary</span>
          <input name="salary" type="number" value={values.salary} onChange={onChange} className="border p-2 rounded" />
          {errors.salary && <small className="text-red-600">{errors.salary}</small>}
        </label>
        
        <label className="grid gap-1">
          <span>Benefits Selection (comma separated)</span>
          <input
            name="benefits_selection"
            value={benefitsInput}
            onChange={onChange}
            className="border p-2 rounded"
          />
        </label>

        <label className="grid gap-1">
          <span>Registered Events (comma separated)</span>
          <input
            name="registered_events"
            value={eventsInput}
            onChange={onChange}
            className="border p-2 rounded"
          />
        </label>

        <label className="grid gap-1">
          <span>Manager ID</span>
          <input name="managerId" type="number" value={values.managerId} onChange={onChange} className="border p-2 rounded" />
          {errors.managerId && <small className="text-red-600">{errors.managerId}</small>}
        </label>

        <label className="grid gap-1">
          <span>Level</span>
          <input name="level" type="number" value={values.level} onChange={onChange} className="border p-2 rounded" />
          {errors.level && <small className="text-red-600">{errors.level}</small>}
        </label>


        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-3 py-2 bg-green-600 text-white rounded">Add</button>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
}
