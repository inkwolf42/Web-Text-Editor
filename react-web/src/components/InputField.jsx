/**
 * Reusable form input.
 *
 * Usage:
 * <Input
 *   label="Email"
 *   type="email"
 *   name="email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   error={errors.email}
 *   placeholder="you@example.com"
 * />
 */
export default function InputField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
  required = true,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`
          w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-900
          placeholder:text-slate-400 outline-none transition-colors
          focus:ring-2 focus:ring-offset-0
          ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-100"
              : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
          }
        `}
      />

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
