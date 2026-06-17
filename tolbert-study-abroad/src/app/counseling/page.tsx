"use client";
import { useState } from "react";
import {
  Calendar, Clock, Video, Phone, MessageCircle, MapPin,
  CheckCircle, User, Mail, Users, Star, ArrowRight
} from "lucide-react";

const counselors = [
  { name: "Dr. James Tarr", title: "Senior Education Counselor", speciality: "India Universities", experience: "12 years", rating: 4.9, sessions: 850, avatar: "JT", color: "#1a56db" },
  { name: "Mrs. Comfort Duo", title: "Study Abroad Advisor", speciality: "Scholarships & Funding", experience: "8 years", rating: 4.8, sessions: 620, avatar: "CD", color: "#0e9f6e" },
  { name: "Mr. Kofi Amos", title: "Visa & Documentation Expert", speciality: "Visa Applications", experience: "10 years", rating: 4.9, sessions: 750, avatar: "KA", color: "#7e3af2" },
  { name: "Ms. Josephine Kpan", title: "University Selection Advisor", speciality: "North Cyprus Universities", experience: "6 years", rating: 4.7, sessions: 430, avatar: "JK", color: "#e74694" },
];

const modes = [
  { value: "in-person", label: "In-Person", icon: MapPin, desc: "Visit our Monrovia office" },
  { value: "phone", label: "Phone Call", icon: Phone, desc: "Call from anywhere in Liberia" },
  { value: "zoom", label: "Zoom Meeting", icon: Video, desc: "Video call from your device" },
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle, desc: "Chat or voice call" },
];

const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const faqs = [
  { q: "Is the first counseling session free?", a: "Yes! Your first consultation is completely free. We believe every student deserves guidance without financial barriers." },
  { q: "How long is each session?", a: "Standard sessions are 45–60 minutes. Extended sessions of 90 minutes can be arranged for complex situations." },
  { q: "Can I book multiple sessions?", a: "Absolutely! Many students book regular sessions throughout their application journey. Packages are available." },
  { q: "What should I bring to the session?", a: "Bring your academic certificates, WAEC results, passport (copy), and any questions you have about studying abroad." },
  { q: "Can I change my session mode?", a: "Yes, you can change the mode (in-person to zoom, etc.) up to 24 hours before your session." },
];

export default function CounselingPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "",
    time: "", mode: "zoom", counselor: "", topic: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Users className="w-4 h-4" /> Expert Counselors
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Book a Free Counseling Session</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Get personalized guidance from our experienced education counselors. We&apos;ll help you find the perfect university, scholarship, and navigate the entire application process.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/70">
            {["✓ Free First Session", "✓ Expert Counselors", "✓ Multiple Modes", "✓ Flexible Timing"].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Meet the Counselors */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Meet Our Counselors</h2>
          <p className="text-slate-500 mb-8">Our team of experienced advisors is dedicated to helping you achieve your study abroad goals.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {counselors.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 card-hover text-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black mx-auto mb-4 shadow-lg" style={{ backgroundColor: c.color }}>
                  {c.avatar}
                </div>
                <h3 className="font-bold text-slate-900 mb-0.5">{c.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mb-1">{c.title}</p>
                <p className="text-xs text-slate-500 mb-3">{c.speciality}</p>
                <div className="flex justify-center gap-4 text-xs text-slate-500 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {c.rating}
                  </span>
                  <span>{c.sessions}+ sessions</span>
                  <span>{c.experience}</span>
                </div>
                <button
                  onClick={() => update("counselor", c.name)}
                  className={`mt-3 w-full py-2 rounded-xl text-xs font-semibold transition-all ${form.counselor === c.name ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"}`}
                >
                  {form.counselor === c.name ? "✓ Selected" : "Select"}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">Session Booked!</h2>
                <p className="text-slate-500 mb-6">Your counseling session has been confirmed. You will receive a confirmation email and WhatsApp message with meeting details.</p>
                <div className="bg-slate-50 rounded-2xl p-4 mb-6 text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Name:</span>
                    <span className="font-semibold text-slate-900">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-semibold text-slate-900">{form.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Time:</span>
                    <span className="font-semibold text-slate-900">{form.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Mode:</span>
                    <span className="font-semibold text-slate-900 capitalize">{form.mode}</span>
                  </div>
                  {form.counselor && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Counselor:</span>
                      <span className="font-semibold text-slate-900">{form.counselor}</span>
                    </div>
                  )}
                </div>
                <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                  Book Another Session
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" /> Book Your Session
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="text" placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Phone / WhatsApp *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="tel" placeholder="+231 770 000 000" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Counseling Topic</label>
                      <select value={form.topic} onChange={(e) => update("topic", e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                        <option value="">Select topic...</option>
                        <option>University Selection</option>
                        <option>Scholarship Guidance</option>
                        <option>Application Process</option>
                        <option>Visa Application</option>
                        <option>Program Comparison</option>
                        <option>Career Planning</option>
                        <option>Financial Planning</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Session Mode */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Session Mode *</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {modes.map((m) => (
                        <button
                          key={m.value}
                          type="button"
                          onClick={() => update("mode", m.value)}
                          className={`p-3 rounded-xl border-2 text-center transition-all ${form.mode === m.value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-200"}`}
                        >
                          <m.icon className={`w-5 h-5 mx-auto mb-1 ${form.mode === m.value ? "text-blue-600" : "text-slate-400"}`} />
                          <p className={`text-xs font-semibold ${form.mode === m.value ? "text-blue-700" : "text-slate-700"}`}>{m.label}</p>
                          <p className="text-[10px] text-slate-400">{m.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Preferred Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input required type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className="w-full text-sm border border-slate-200 rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Preferred Time *</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => update("time", t)}
                            className={`py-2 rounded-lg text-xs font-medium transition-all ${form.time === t ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"}`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Additional Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your study goals, questions, or anything you'd like to discuss..."
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className="w-full text-sm border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] transition-all text-sm">
                    Book Free Counseling Session <ArrowRight className="inline w-4 h-4 ml-2" />
                  </button>
                  <p className="text-center text-xs text-slate-400">First session is completely free. No credit card required.</p>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 mb-4">Contact Us Directly</h3>
              {[
                { icon: MapPin, label: "Office", value: "Monrovia, Liberia" },
                { icon: Phone, label: "Phone", value: "+231 770 000 000" },
                { icon: MessageCircle, label: "WhatsApp", value: "+231 770 000 000" },
                { icon: Mail, label: "Email", value: "counsel@tolbertinnovationhub.com" },
                { icon: Clock, label: "Hours", value: "Mon–Fri: 8AM–6PM\nSat: 9AM–2PM" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium">{label}</p>
                    <p className="text-sm text-slate-800 whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <h3 className="font-bold text-slate-900 mb-4">FAQs</h3>
              <div className="space-y-2">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-slate-100 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left p-3 text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors flex items-start justify-between gap-2"
                    >
                      {faq.q}
                      <span className="text-blue-600 shrink-0">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-3 pb-3 text-sm text-slate-600 bg-slate-50">{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
