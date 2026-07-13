/**
 * Shared layout shell for auth pages (login/register).
 * Centers a card on the screen with a title, subtitle, and children.
 */
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {footer && (
          <p className="mt-6 text-center text-sm text-slate-500">{footer}</p>
        )}
      </div>
    </div>
  );
}
