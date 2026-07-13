/**
 * "Continue with Google" button.
 *
 * This redirects the browser to your Laravel Socialite endpoint
 * (GET /api/auth/google/redirect), which then redirects to Google,
 * then back to your handleGoogleCallback route.
 *
 * Usage:
 * <GoogleButton label="Continue with Google" />
 */
export default function GoogleButton({ label = "Continue with Google" }) {
  const BASE_URL = import.meta.env?.VITE_API_URL || "http://localhost:8000/api";

  const handleClick = () => {
    window.location.href = `${BASE_URL}/auth/google/redirect`;
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        flex w-full items-center justify-center gap-3 rounded-lg border
        border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-700
        transition-colors hover:bg-slate-50 active:bg-slate-100
      "
    >
      <GoogleIcon />
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C33.9 5.1 29.2 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 15.6 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C33.9 5.1 29.2 3 24 3 16.3 3 9.7 7.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 45c5.2 0 9.8-2 13.3-5.2l-6.2-5.2c-2 1.4-4.5 2.3-7.1 2.3-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 40.6 16.3 45 24 45z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.2-4.1 5.6l6.2 5.2C40.9 36.3 44 30.7 44 24c0-1.4-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}
