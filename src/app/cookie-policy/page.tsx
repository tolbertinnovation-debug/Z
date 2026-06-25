import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
              <Cookie className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Cookie Policy</h1>
              <p className="text-slate-500 text-sm">Last updated: June 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. What Are Cookies?</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Cookies are small text files placed on your device when you visit OpportunityLiberia.org. They help us remember your preferences, keep you logged in, and understand how you use our platform so we can improve it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm font-semibold text-slate-800 mb-1">Essential Cookies</p>
                <p className="text-slate-600 text-xs leading-relaxed">Required for the platform to function. These keep you logged in and maintain your session. Cannot be disabled.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm font-semibold text-slate-800 mb-1">Preference Cookies</p>
                <p className="text-slate-600 text-xs leading-relaxed">Remember your settings such as language preferences, saved universities, and portal preferences.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <p className="text-sm font-semibold text-slate-800 mb-1">Analytics Cookies</p>
                <p className="text-slate-600 text-xs leading-relaxed">Help us understand which pages are most visited, how users navigate the platform, and where we can improve the experience.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Managing Cookies</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              You can control cookies through your browser settings. Note that disabling certain cookies may affect platform functionality, including keeping you logged in. You can also clear your cookie consent at any time through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Contact</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              For questions about our cookie use, contact us at{" "}
              <a href="mailto:info@tolbertinnovationhub.com" className="text-blue-600 hover:underline">
                info@tolbertinnovationhub.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
