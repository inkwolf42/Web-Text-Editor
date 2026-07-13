import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import GoogleButton from "../components/GoogleButton";
import AuthCard from "../components/AuthCard";
import { post } from "../api/Api";
import InputField from "../components/InputField";
import { getToken, login } from "../api/Auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(getToken());


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      login(form)

      navigate("/dashboard");
    } catch (err) {
        if (err.response?.status === 422 && err.response.data?.errors) {
        const fieldErrors = {};
        for (const [field, messages] of Object.entries(err.response.data.errors)) {
          fieldErrors[field] = messages[0];
        }
        setErrors(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Log in"
      subtitle="Welcome back — enter your details to continue"
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            mt-2 w-full rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-medium
            text-white transition-colors hover:bg-indigo-500 disabled:opacity-60
          "
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <GoogleButton />
    </AuthCard>
  );
}
