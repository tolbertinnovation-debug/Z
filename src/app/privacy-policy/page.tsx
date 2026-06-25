import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500 text-sm">Last updated: June 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">
              Tolbert Innovation Hub ("we," "our," or "us") collects information you provide when using OpportunityLiberia.org, including:
            </p>
            <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
              <li>Name, email address, and phone number</li>
              <li>Academic records and transcripts</li>
              <li>Passport and identification documents for application processing</li>
              <li>Communication preferences and enquiry history</li>
              <li>Usage data and cookies (see Cookie Policy)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">We use your information to:</p>
            <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
              <li>Process university applications on your behalf</li>
              <li>Provide personalized counseling and university recommendations</li>
              <li>Communicate updates about your application status</li>
              <li>Send relevant scholarship and program opportunities</li>
              <li>Improve our platform and services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. Information Sharing</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We share your information only with partner universities as required to process your application, and with service providers who assist our operations under strict confidentiality agreements. We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Data Security</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All data is transmitted over encrypted connections (HTTPS). However, no internet transmission is 100% secure, and we encourage you to keep your login credentials confidential.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Your Rights</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">You have the right to:</p>
            <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Contact Us</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              For privacy-related enquiries, please contact us at{" "}
              <a href="mailto:info@tolbertinnovationhub.com" className="text-blue-600 hover:underline">
                info@tolbertinnovationhub.com
              </a>{" "}
              or call <a href="tel:+231778956979" className="text-blue-600 hover:underline">+231 77 895 6979</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
