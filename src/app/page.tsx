import Hero from "@/components/Hero";
import Vision from "@/components/Vision";
import ByTheNumbers from "@/components/ByTheNumbers";
import Facility from "@/components/Facility";
import NamingOpportunities from "@/components/NamingOpportunities";
import InvestingInStudents from "@/components/InvestingInStudents";
import Contact from "@/components/Contact";
import StickyCTA from "@/components/StickyCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Vision />
      <ByTheNumbers />
      <Facility />
      <NamingOpportunities />
      <InvestingInStudents />
      <Contact />
      <StickyCTA />

      {/* Footer */}
      <footer className="bg-[#3B0068] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-[var(--font-heading)] text-white/90 text-sm tracking-[0.2em] uppercase font-bold">
              UMHB <span className="text-[#FFC425]">|</span> Advancement
            </p>
            <p className="font-[var(--font-body)] text-white/50 text-xs mt-1">
              A New Era of Science
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="font-[var(--font-body)] text-white/50 text-xs">
              University of Mary Hardin-Baylor &bull; 900 College St, Belton, TX 76513
            </p>
            <a
              href="https://www.umhb.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="font-[var(--font-body)] text-[#FFC425]/70 text-xs hover:text-[#FFC425] transition-colors"
            >
              umhb.edu
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
