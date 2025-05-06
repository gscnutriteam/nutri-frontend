import { Marquee } from "@/components/magicui/marquee";
 
const companies = [
  "Kementerian Kesehatan RI",
  "RSCM",
  "IDI",
  "PDGMI",
  "Universitas Indonesia",
  "WHO Indonesia",
  "RSPAD Gatot Soebroto",
  "RSUP Dr. Sardjito",
  "RSHS Bandung",
  "Ikatan Ahli Gizi Indonesia"
];
 
export function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            {/* TRUSTED BY LEADING TEAMS */}
          </h3>
          <div className="relative mt-6">
            <Marquee className="max-w-full [--duration:40s]">
              {companies.map((company, idx) => (
                <div
                  key={idx}
                  className="h-20 w-40 mx-8 flex items-center justify-center bg-white border-2 border-black rounded-lg shadow-neobrutalism-sm"
                >
                  <span className="text-sm font-bold text-center px-4">{company}</span>
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-white dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}