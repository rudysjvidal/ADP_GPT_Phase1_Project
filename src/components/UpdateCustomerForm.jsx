import { useEffect, useMemo, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import{ getMe, updateMe } from "../api/customers"

export default function UpdateCustomerForm() {
  const { customers, me, updateCustomer, deleteCustomer } = useOutletContext();
  
  const { id } = useParams();
  const navigate = useNavigate();

  if (me._id != id){
    navigate("/dashboard");
  }


  // finding the record by its id
  const current = useMemo(
    () => customers.find(c => String(c._id) === String(id)),
    [customers, id]
  );

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    profile_picture: "",
    job_title: "",
    salary: 0,
    managerId: 0,
    level: 0,
  });
  const [benefitsInput, setBenefitsInput] = useState("");  
  const [eventsInput, setEventsInput] = useState("");  
  const [errors, setErrors] = useState({});

  // prefill form when we find the record
  useEffect(() => {
    if (current) {
      const {
        name, email, password, phone_number,
        profile_picture, job_title, salary,
        benefits_selection, registered_events, managerId, level
      } = current;
      setValues({
        name: name ?? "",
        email: email ?? "",
        password: password ?? "",
        phone_number: phone_number ?? "",
        profile_picture: profile_picture ?? "",
        job_title: job_title ?? "",
        salary: salary ?? 0,
        managerId: managerId ?? 0,
        level: level ?? 0,

      });
      setBenefitsInput((benefits_selection || []).join(", "));
      setEventsInput((registered_events || []).join(", "));

    }
  }, [current]);
  

  const onChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "benefits_selection") {
      setBenefitsInput(value);
    } else if (name === "registered_events"){
      setEventsInput(value);
    } else if (name === "salary") {
      setValues(v => ({ ...v, salary: Number(value) }));
    } else {
      setValues(v => ({ ...v, [name]: value }));
    }
  };
  

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required.";
    if (!values.email.trim()) e.email = "Email is required.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = "Invalid email.";
    if (!values.password.trim()) e.password = "Password is required.";
    if (values.profile_picture && !/^https?:\/\//i.test(values.profile_picture.trim())) e.profile_picture = "Must be a URL.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || !current) return;

    const payload = {
      ...current,
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password,
      phone_number: values.phone_number,
      profile_picture: (values.profile_picture || '').trim(),
      job_title: values.job_title,
      salary: values.salary,
      benefits_selection: benefitsInput.split(",").map(s => s.trim()).filter(Boolean),
      registered_events: eventsInput.split(",").map(s => s.trim()).filter(Boolean),
      managerId: values.managerId,
      level: values.level,
    };
    

    await updateCustomer(payload);
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (!current) return;
    if (confirm(`Delete ${current.name}?`)) {
      await deleteCustomer(current._id);
      navigate("/dashboard", { replace: true });
      setTimeout(() => window.location.reload(), 0);

    }
  };

  if (!current) {
    return (
      <div className="max-w-xl mx-auto p-6">
        <p className="text-red-600">Customer not found.</p>
        <button onClick={() => navigate("/dashboard")} className="mt-2 px-3 py-2 border rounded">Back</button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Update Customer</h2>
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
          <span>Events Selection (comma separated)</span>
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
        </label>

        <label className="grid gap-1">
          <span>Level</span>
          <input name="level" type="number" value={values.level} onChange={onChange} className="border p-2 rounded" />
        </label>

        <div className="flex gap-2 mt-2">
          <button type="submit" className="px-3 py-2 bg-amber-600 text-white rounded">Save Changes</button>
          <button type="button" onClick={() => navigate(-1)} className="px-3 py-2 border rounded">Cancel</button>
          <button type="button" onClick={handleDelete} className="px-3 py-2 border border-red-600 text-red-600 rounded">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
