import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { StarIcon } from "lucide-react";
 
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "bg-cyan-600/20 p-1 py-0.5 font-bold text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-600",
        className,
      )}
    >
      {children}
    </span>
  );
};
 
export interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  description: React.ReactNode;
  className?: string;
  [key: string]: any;
}
 
export const TestimonialCard = ({
  description,
  name,
  img,
  role,
  className,
  ...props // Capture the rest of the props
}: TestimonialCardProps) => (
  <div
    className={cn(
      "mb-4 flex w-full cursor-pointer break-inside-avoid flex-col items-center justify-between gap-6 rounded-xl p-4",
      // light styles
      " border border-neutral-200 bg-white",
      // dark styles
      "dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props} // Spread the rest of the props here
  >
    <div className="select-none text-sm font-normal text-neutral-700 dark:text-neutral-400">
      {description}
      <div className="flex flex-row py-1">
        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
        <StarIcon className="size-4 fill-yellow-500 text-yellow-500" />
      </div>
    </div>
 
    <div className="flex w-full select-none items-center justify-start gap-5">
      <img
        src={img}
        className="h-10 w-10 rounded-full  ring-1 ring-border ring-offset-4"
      />
 
      <div>
        <p className="font-medium text-neutral-500">{name}</p>
        <p className="text-xs font-normal text-neutral-400">{role}</p>
      </div>
    </div>
  </div>
);
 
const testimonials = [
  {
    name: "Dr. Andi Wijaya",
    role: "Ahli Gizi",
    img: "https://randomuser.me/api/portraits/men/91.jpg",
    description: (
      <p>
        NutriPlate sangat membantu pasien saya dalam mengontrol porsi makan.
        <Highlight>
          Hasilnya terlihat dalam 3 bulan pertama penggunaan.
        </Highlight>{" "}
        Rekomendasi untuk semua yang ingin hidup sehat.
      </p>
    ),
  },
  {
    name: "Siti Rahayu",
    role: "Pengguna NutriPlate",
    img: "https://randomuser.me/api/portraits/women/12.jpg",
    description: (
      <p>
        Setelah menggunakan NutriPlate, berat badan saya turun 8kg dalam 6 bulan.
        <Highlight>Porsi makan jadi lebih terkontrol!</Highlight> Terima kasih NutriPlate.
      </p>
    ),
  },
  {
    name: "Budi Santoso",
    role: "Penderita Diabetes",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    description: (
      <p>
        Diabetes saya lebih terkontrol berkat NutriPlate.
        <Highlight>Gula darah stabil dan porsi makan tepat.</Highlight> Sangat membantu!
      </p>
    ),
  },
  {
    name: "Maya Indira",
    role: "Ibu Rumah Tangga",
    img: "https://randomuser.me/api/portraits/women/83.jpg",
    description: (
      <p>
        Memasak untuk keluarga jadi lebih mudah dengan panduan porsi dari NutriPlate.
        <Highlight>Anak-anak juga suka dengan piringnya yang colorful.</Highlight>
      </p>
    ),
  },
  {
    name: "Denny Prakoso",
    role: "Atlet",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    description: (
      <p>
        Sebagai atlet, nutrisi sangat penting. NutriPlate membantu saya mengatur porsi protein dan karbohidrat.
        <Highlight>
          Performa olahraga meningkat signifikan.
        </Highlight>
      </p>
    ),
  },
  {
    name: "Dr. Linda Kusuma",
    role: "Dokter Spesialis Gizi",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        NutriPlate adalah inovasi yang sangat membantu dalam edukasi gizi.
        <Highlight>
          Pasien lebih mudah memahami porsi yang tepat.
        </Highlight>
      </p>
    ),
  },
  {
    name: "Rina Wulandari",
    role: "Karyawan Swasta",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    description: (
      <p>
        NutriPlate sangat praktis untuk saya yang sibuk.
        <Highlight>Membantu saya menjaga pola makan sehat di tengah kesibukan kerja.</Highlight> Rekomendasi banget untuk para profesional!
      </p>
    ),
  },
  {
    name: "Agus Salim",
    role: "Penggiat Kebugaran",
    img: "https://randomuser.me/api/portraits/women/56.jpg",
    description: (
      <p>
        Sebagai seorang yang peduli kebugaran, NutriPlate jadi andalan saya.
        <Highlight>Porsi makronutrien jadi lebih terukur dan mudah dipantau.</Highlight> Sangat mendukung pencapaian target fitnes saya.
      </p>
    ),
  },
  {
    name: "Siti Aminah",
    role: "Ibu Menyusui",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    description: (
      <p>
        Selama menyusui, asupan gizi sangat penting. NutriPlate membantu saya memastikan kebutuhan nutrisi harian terpenuhi dengan baik.
        <Highlight>Fitur chatbot nutrisi juga sangat informatif dan responsif.</Highlight> Terima kasih NutriPlate!
      </p>
    ),
  },
  {
    name: "Joko Susilo",
    role: "Mahasiswa",
    img: "https://randomuser.me/api/portraits/women/73.jpg",
    description: (
      <p>
        Dulu sering makan sembarangan, tapi sejak pakai NutriPlate jadi lebih sadar akan pentingnya porsi yang benar.
        <Highlight>Belajar gizi seimbang jadi menyenangkan dan tidak ribet.</Highlight> Cocok untuk anak kos yang ingin hidup sehat.
      </p>
    ),
  },
  {
    name: "Dewi Lestari",
    role: "Chef Rumahan & Food Blogger",
    img: "https://randomuser.me/api/portraits/men/25.jpg",
    description: (
      <p>
        Saya suka memasak, dan NutriPlate memberi inspirasi baru untuk menyajikan makanan sehat dan seimbang bagi keluarga.
        <Highlight>Desainnya menarik dan edukatif untuk seluruh anggota keluarga.</Highlight> Inovasi yang luar biasa di dapur.
      </p>
    ),
  },
  {
    name: "Eko Prasetyo",
    role: "Pensiunan Aktif",
    img: "https://randomuser.me/api/portraits/women/78.jpg",
    description: (
      <p>
        Di usia senja, menjaga kesehatan itu utama. NutriPlate memudahkan saya mengatur pola makan sesuai anjuran dokter.
        <Highlight>Sangat mudah digunakan, bahkan untuk lansia seperti saya.</Highlight> Hidup sehat jadi lebih simpel dan menyenangkan.
      </p>
    ),
  },
  {
    name: "Putri Ayu",
    role: "Pelajar SMA",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    description: (
      <p>
        Awalnya ragu, tapi setelah mencoba NutriPlate, saya jadi lebih paham tentang pentingnya makanan sehat.
        <Highlight>Tidak lagi takut makan berlebih atau kekurangan gizi saat belajar.</Highlight> Keren banget dan sangat membantu!
      </p>
    ),
  },
];
 
export function SocialProofTestimonials() {
  return (
    <section id="testimonials">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-500">
            {/* TESTIMONIALS */}
          </h3>
          <div className="relative mt-6 max-h-[650px] overflow-hidden">
            <div className="gap-4 md:columns-2 xl:columns-3 2xl:columns-4">
              {Array(Math.ceil(testimonials.length / 3))
                .fill(0)
                .map((_, i) => (
                  <Marquee
                    vertical
                    key={i}
                    className={cn({
                      "[--duration:60s]": i === 1,
                      "[--duration:30s]": i === 2,
                      "[--duration:70s]": i === 3,
                    })}
                  >
                    {testimonials.slice(i * 3, (i + 1) * 3).map((card, idx) => (
                      <TestimonialCard {...card} key={idx} />
                    ))}
                  </Marquee>
                ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 w-full bg-gradient-to-t from-white from-20% dark:from-black"></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 w-full bg-gradient-to-b from-white from-20% dark:from-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
}