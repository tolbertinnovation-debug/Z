import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Refund Policy</h1>
              <p className="text-slate-500 text-sm">Last updated: June 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {/* Key fact callout */}
          <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-xl mb-8 flex items-start gap-3">
            <span className="text-2xl mt-0.5">💚</span>
            <div>
              <p className="font-bold text-emerald-900 text-sm mb-1">Our Application Services Are Free</p>
              <p className="text-emerald-700 text-sm leading-relaxed">
                Tolbert Innovation Hub does not charge any fees for application processing, counseling, or platform use. Because our services are free, there is nothing to refund for our services.
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">1. University Fees</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tuition fees, registration fees, accommodation deposits, and other charges paid directly to universities are governed by each university's own refund policy. We recommend reviewing the specific university's refund terms before making any payment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">2. Application Cancellation</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">
                If you wish to withdraw an application you have submitted through our platform:
              </p>
              <ul className="text-slate-600 text-sm space-y-2 list-disc list-inside">
                <li>Contact us immediately at <a href="mailto:info@tolbertinnovationhub.com" className="text-blue-600 hover:underline">info@tolbertinnovationhub.com</a></li>
                <li>Applications can be withdrawn before they are submitted to the university</li>
                <li>Once submitted to a university, withdrawal is subject to that university's policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">3. Visa Application Fees</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Government visa fees are non-refundable regardless of visa outcome. We assist with documentation and preparation, but visa decisions are made solely by government authorities.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-3">4. How to Contact Us</h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                For any questions about fees or refunds, please reach us at:{" "}
                <a href="mailto:info@tolbertinnovationhub.com" className="text-blue-600 hover:underline">info@tolbertinnovationhub.com</a>{" "}
                or WhatsApp:{" "}
                <a href="https://wa.me/231778956979" className="text-blue-600 hover:underline">+231 77 895 6979</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
