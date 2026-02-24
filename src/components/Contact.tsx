"use client";

import { useState } from "react";
import MolecularMotif from "./MolecularMotif";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Send email via mailto as a fallback — in production this would hit an API
    const subject = encodeURIComponent("Science Facility Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nInterest Level: ${formData.interest}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:tglaske@umhb.edu?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSubmitted(true);
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#3D1A78] overflow-hidden">
      {/* Blueprint watermark */}
      <div className="absolute inset-0 opacity-5">
        <MolecularMotif className="absolute top-20 left-20 w-64 h-64 text-white" />
        <MolecularMotif className="absolute bottom-20 right-20 w-48 h-48 text-white" />
        <MolecularMotif className="absolute top-1/2 left-1/3 w-56 h-56 text-white" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-[var(--font-heading)] text-3xl md:text-4xl font-bold text-white tracking-[0.15em] uppercase mb-4">
            Join Us in Building
            <br />
            <span className="text-[#FEC324]">A New Era of Science</span>
          </h2>
          <div className="w-16 h-1 bg-[#FEC324] mx-auto mb-6" />
          <p className="font-[var(--font-body)] text-white/80 text-lg max-w-2xl mx-auto">
            Ready to leave a lasting legacy? Contact UMHB Advancement to learn more about investment opportunities and how your generosity can shape the future of science education.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-sm p-8 md:p-10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[var(--font-heading)] text-white/90 text-sm tracking-wide uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FEC324] transition-colors font-[var(--font-body)]"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block font-[var(--font-heading)] text-white/90 text-sm tracking-wide uppercase mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FEC324] transition-colors font-[var(--font-body)]"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-[var(--font-heading)] text-white/90 text-sm tracking-wide uppercase mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FEC324] transition-colors font-[var(--font-body)]"
                  placeholder="(555) 555-5555"
                />
              </div>
              <div>
                <label className="block font-[var(--font-heading)] text-white/90 text-sm tracking-wide uppercase mb-2">
                  Interest Level
                </label>
                <select
                  required
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#FEC324] transition-colors font-[var(--font-body)] [&>option]:text-gray-900"
                >
                  <option value="">Select your interest</option>
                  <option value="naming">Naming Opportunity</option>
                  <option value="major-gift">Major Gift ($100,000+)</option>
                  <option value="leadership-gift">Leadership Gift ($25,000+)</option>
                  <option value="gift">Gift of Any Amount</option>
                  <option value="information">General Information</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-[var(--font-heading)] text-white/90 text-sm tracking-wide uppercase mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FEC324] transition-colors font-[var(--font-body)] resize-none"
                placeholder="Tell us about your interest in the Science Facility..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-10 py-4 bg-[#FEC324] text-white font-[var(--font-heading)] font-bold text-lg tracking-wide uppercase rounded-sm hover:bg-[#FFD75E] hover:text-[#3D1A78] transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Inquiry"}
              </button>
              <a
                href="/UMHB-Science-Facility-Proposal.pdf"
                target="_blank"
                className="text-[#FEC324] font-[var(--font-heading)] text-sm tracking-wide uppercase hover:text-white transition-colors flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Full Proposal
              </a>
            </div>
          </form>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-sm p-12 text-center">
            <div className="w-16 h-16 bg-[#FEC324] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-8 h-8">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-[var(--font-heading)] text-white text-2xl font-bold mb-4">Thank You for Your Interest</h3>
            <p className="font-[var(--font-body)] text-white/80 text-lg">
              Your inquiry has been sent to UMHB Advancement. A member of our team will be in touch soon.
            </p>
          </div>
        )}

        {/* Direct contact info */}
        <div className="mt-12 text-center">
          <p className="font-[var(--font-body)] text-white/60 text-sm mb-2">
            Or contact UMHB Advancement directly:
          </p>
          <a
            href="mailto:tglaske@umhb.edu"
            className="font-[var(--font-heading)] text-[#FEC324] text-lg hover:text-white transition-colors"
          >
            tglaske@umhb.edu
          </a>
        </div>
      </div>
    </section>
  );
}
