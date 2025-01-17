export default function FormPageInput({
  placeholder,
  value,
  setValue,
  type = "text",
  status,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
      className="input input-bordered mb-2"
      disabled={false || status}
    />
  );
}
