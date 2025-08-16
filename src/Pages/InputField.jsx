import React from 'react';

const InputField = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-black rounded-md outline-none focus:border-blue-400 transition-colors duration-150"
      />
    </div>
  );
};

export default InputField;


