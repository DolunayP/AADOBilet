const Input = ({ label, type, name, formik, disabled, value }) => {
  return (
    <div className="flex flex-col text-gray-400 py-2">
      <label>{label}</label>
      <input
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value ? value : formik.values[name]}
        className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-green-700 focus:bg-gray-800 focus:outline-none"
        type={type}
        disabled={disabled}
      />
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-red-500">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default Input;
