import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

const SocialIcons = [
  { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "Twitter/X", path: "M4 4l16 16M4 20L20 4" },
  { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z" },
  { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
  { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98l5.75 3.02-5.75 3.02z" },
];

const trustBadges = [
  { label: "NAAC Accredited Partners", icon: "🏛️" },
  { label: "ISO Certified Process", icon: "✅" },
  { label: "Verified University Partners", icon: "🤝" },
  { label: "No Hidden Fees", icon: "🔒" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Trust badges bar */}
      <div className="border-b border-slate-800 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-sm text-slate-400">
                <span className="text-base">{badge.icon}</span>
                <span className="font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fee transparency bar */}
      <div className="bg-blue-900/30 border-b border-blue-800/40 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-xs text-blue-300 text-center">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-400" /> Free Application Processing</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-400" /> No Hidden Fees</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-400" /> University Direct Fees Only</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-blue-400" /> 100% Transparent Pricing</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">Tolbert Innovation Hub</p>
                <p className="text-blue-400 text-xs">Study Abroad Portal</p>
              </div>
            </div>
            <p className="text-xs text-blue-300/80 font-medium mb-3 border-l-2 border-blue-500 pl-3">
              OpportunityLiberia.org is the official platform of Tolbert Innovation Hub
            </p>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Helping students in Liberia discover international universities, apply with confidence, and receive expert guidance every step of the way.
            </p>
            <div className="flex gap-3">
              {SocialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href="#"
                  aria-label={icon.label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d={icon.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/universities", label: "University Directory" },
                { href: "/apply", label: "Apply Online" },
                { href: "/counseling", label: "Book Counseling" },
                { href: "/portal", label: "Student Portal" },
                { href: "/admin", label: "Admin Dashboard" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-blue-400 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Countries */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Partner Countries</h4>
            <ul className="space-y-2.5">
              {[
                "🇮🇳 India (15 Universities)",
                "🇨🇾 North Cyprus (2 Universities)",
                "🌍 More Coming Soon",
              ].map((item, i) => (
                <li key={i} className="text-sm">{item}</li>
              ))}
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Programs</h4>
              <ul className="space-y-2">
                {["Undergraduate", "Postgraduate", "MBA", "PhD", "Medical", "Engineering"].map((p) => (
                  <li key={p} className="text-sm hover:text-blue-400 cursor-default">{p}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Monrovia, Liberia, West Africa</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>+231 77 895 6979</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>info@tolbertinnovationhub.com</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-blue-600/20 rounded-xl border border-blue-500/30">
              <p className="text-xs text-blue-300 font-medium mb-1">Office Hours</p>
              <p className="text-sm">Mon – Fri: 8:00 AM – 6:00 PM</p>
              <p className="text-sm">Saturday: 9:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Tolbert Innovation Hub. All rights reserved. Helping Liberian students reach global universities.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-slate-300 transition-colors">Cookie Policy</Link>
            <Link href="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB with online indicator */}
      <a
        href="https://wa.me/231778956979"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-1 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-200 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.025.507 3.934 1.397 5.61L0 24l6.545-1.376A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.694-.498-5.241-1.369l-.374-.217-3.883.817.828-3.793-.234-.389A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
          </svg>
          {/* Online indicator */}
          <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse" />
          </span>
        </div>
        <span className="text-[10px] font-bold text-green-400 bg-slate-900/80 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Online</span>
      </a>
    </footer>
  );
}
