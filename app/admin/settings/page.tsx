export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-xs text-slate-400">
          High-level configuration for your mini app admin kit. In a real deployment, this would be wired
          to environment variables or a secure config backend.
        </p>
      </header>

      <section className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 text-xs">
        <div>
          <h2 className="font-semibold mb-1">Auth settings</h2>
          <p className="text-slate-400 mb-1">
            This starter uses a single admin user based on environment variables:
          </p>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5">
            <li>
              <code>ADMIN_USERNAME</code> – default <code>admin</code>
            </li>
            <li>
              <code>ADMIN_PASSWORD</code> – default <code>password</code>
            </li>
            <li>
              <code>ADMIN_JWT_SECRET</code> – secret used to sign admin session tokens
            </li>
          </ul>
        </div>

        <div className="border-t border-slate-800 pt-3">
          <h2 className="font-semibold mb-1">Mini app integration ideas</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-0.5">
            <li>Connect Announcements to Upstash KV or a Postgres table.</li>
            <li>Connect Rewards to a backend API that calls your Treasury smart contract.</li>
            <li>Add per-mini-app config panels (Match-3, Card Game, Daily Claim).</li>
            <li>Restrict access by IP, VPN, or SSO in front of this admin panel.</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
