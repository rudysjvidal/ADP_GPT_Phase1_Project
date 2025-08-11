import React, { useState } from 'react';

const CustomerSearch = ({ customers, onSelectCustomer }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === '') {
      setResults([]);
      return;
    }
    const filtered = customers.filter(c =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleSelect = (customer) => {
    setQuery(customer.name);
    setResults([]);
    if (onSelectCustomer) onSelectCustomer(customer);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a customer..."
        className="px-3 py-2 border rounded w-full"
      />
      {results.length > 0 && (
        <ul className="border rounded bg-white mt-1 max-h-48 overflow-y-auto shadow">
          {results.map(customer => (
            <li
              key={customer.id}
              onClick={() => handleSelect(customer)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {customer.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerSearch;
