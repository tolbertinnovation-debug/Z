import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Terms of Service</h1>
              <p className="text-slate-500 text-sm">Last updated: June 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              By accessing or using OpportunityLiberia.org, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform. These terms apply to all visitors, students, agents, and administrators.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">2. Services Provided</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-3">Tolbert Innovation Hub provides:</p>
            <ul className="text-slate-600 text-sm space-y-1 list-disc list-inside">
              <li>University discovery and comparison tools</li>
              <li>Application submission assistance</li>
              <li>Educational counseling services</li>
              <li>Scholarship matching and guidance</li>
              <li>Visa application support</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">3. User Responsibilities</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              You agree to provide accurate and truthful information in all applications and communications. Submission of false documents or misrepresentation of qualifications may result in immediate termination of services and notification to relevant institutions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">4. Our Fees</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Application processing through our platform is free. University tuition fees, accommodation costs, and other direct university charges are paid directly to the institution. We maintain complete transparency about all costs — there are no hidden fees from Tolbert Innovation Hub.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              While we strive to provide accurate university information and successful outcomes, admission decisions are made solely by universities. Tolbert Innovation Hub cannot guarantee admission or visa approval. We are not liable for decisions made by universities, visa authorities, or other third parties.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-3">6. Contact</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Questions about these terms? Contact us at{" "}
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
