// src/components/CustomerForm.jsx
import { useEffect, useState } from "react";

export default function CustomerForm({
  mode = "add",                 // this switches between add and update
  initialValues = null,         // the needed values from a customers account are taken in here, or if there is no values it is null
  onSave,                       // (customer) => void | Promise<void>
  onCancel,                     // () => void
  onDelete,                     // (id) => void | Promise<void>  (only used in update mode)
}) {
    const [values, setValues] = useState({name: "", email: "", password: ""})

  return (
    <>
    </>
  );
}
