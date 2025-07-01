import Link from 'next/link';
import { Metadata } from 'next';
import LinkAPP from '@/components/util/link';

export const metadata: Metadata = {
  title: 'Ketentuan Layanan | NutriCare',
  description: 'Baca Ketentuan Layanan untuk NutriCare.',
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();
  const lastUpdatedDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 outfit-font">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <header className="mb-10 text-center">
          <Link href="/">
            <img src="/assets/img/logo.png" alt="Logo NutriCare" className="w-24 h-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-4xl font-bold text-button">Ketentuan Layanan</h1>
          <p className="text-gray-600 mt-2">Terakhir diperbarui: {lastUpdatedDate}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Pendahuluan</h2>
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di NutriCare! Ketentuan Layanan ini ("Ketentuan") mengatur penggunaan Anda atas situs web, aplikasi seluler,
            dan layanan kami (secara kolektif disebut "Layanan"). Dengan mengakses atau menggunakan Layanan kami, Anda setuju untuk terikat oleh Ketentuan ini
            dan <LinkAPP href="/legal/privacy-policy" className="text-button hover:underline">Kebijakan Privasi</LinkAPP> kami.
            Jika Anda tidak menyetujui Ketentuan ini, mohon jangan gunakan Layanan kami.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Penggunaan Layanan Kami</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            NutriCare menyediakan platform untuk pelacakan nutrisi, analisis makanan melalui pemindaian makanan, informasi kesehatan yang dipersonalisasi,
            pencarian resep, dan saran nutrisi bertenaga AI. Anda setuju untuk menggunakan Layanan kami hanya untuk tujuan yang sah
            dan sesuai dengan Ketentuan ini.
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>Anda harus berusia minimal 13 tahun untuk menggunakan Layanan kami. Jika Anda berusia di bawah 18 tahun, Anda harus memiliki izin dari orang tua atau wali.</li>
            <li>Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda.</li>
            <li>Anda setuju untuk tidak menyalahgunakan Layanan kami, seperti mengganggu operasi normalnya atau mencoba mengaksesnya menggunakan metode selain melalui antarmuka dan instruksi yang kami sediakan.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Penggunaan Data dan Privasi</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami berkomitmen untuk melindungi privasi Anda. <LinkAPP href="/legal/privacy-policy" className="text-button hover:underline">Kebijakan Privasi</LinkAPP> kami menjelaskan bagaimana kami mengumpulkan, menggunakan, dan membagikan informasi pribadi Anda.
            Dengan menggunakan Layanan kami, Anda setuju bahwa NutriCare dapat menggunakan data Anda sesuai dengan Kebijakan Privasi kami.
            Secara khusus, Anda mengakui dan menyetujui bahwa:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4 mt-2">
            <li>Data Anda, termasuk namun tidak terbatas pada asupan nutrisi, informasi makanan, dan metrik kesehatan, dapat digunakan untuk tujuan penelitian dan analisis internal. Ini membantu kami meningkatkan algoritma kami, mengembangkan fitur baru, dan meningkatkan pengalaman pengguna secara keseluruhan.</li>
            <li>Semua informasi yang dapat diidentifikasi secara pribadi akan ditangani dengan sangat hati-hati, dan kami akan mengambil langkah-langkah yang wajar untuk memastikan kerahasiaan dan keamanannya.</li>
            <li>Data yang diagregasi dan dianonimkan dapat digunakan untuk penelitian, analisis statistik, dan pelaporan, tetapi tidak akan mengidentifikasi Anda secara pribadi.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Kekayaan Intelektual</h2>
          <p className="text-gray-700 leading-relaxed">
            Layanan dan konten aslinya (tidak termasuk konten yang disediakan oleh pengguna), fitur, dan fungsionalitas adalah
            dan akan tetap menjadi milik eksklusif NutriCare dan pemberi lisensinya. Merek dagang dan tampilan dagang kami tidak boleh
            digunakan sehubungan dengan produk atau layanan apa pun tanpa persetujuan tertulis sebelumnya dari NutriCare.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Penafian Jaminan</h2>
          <p className="text-gray-700 leading-relaxed">
            Layanan kami disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun
            tersirat, termasuk namun tidak terbatas pada, jaminan tersirat tentang kelayakan untuk diperdagangkan, kesesuaian untuk tujuan tertentu,
            atau non-pelanggaran. NutriCare tidak menjamin bahwa Layanan akan tidak terganggu, aman, atau bebas dari kesalahan.
            Setiap informasi nutrisi atau kesehatan yang diberikan hanya untuk tujuan informasi dan tidak boleh dianggap sebagai nasihat medis. Selalu konsultasikan dengan profesional perawatan kesehatan yang berkualifikasi untuk masalah kesehatan apa pun atau sebelum membuat keputusan apa pun terkait kesehatan atau perawatan Anda.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Batasan Tanggung Jawab</h2>
          <p className="text-gray-700 leading-relaxed">
            Dalam keadaan apa pun NutriCare, maupun direktur, karyawan, mitra, agen, pemasok, atau afiliasinya,
            tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau punitif, termasuk tanpa
            batasan, kehilangan keuntungan, data, penggunaan, goodwill, atau kerugian tidak berwujud lainnya, yang diakibatkan oleh akses Anda
            ke atau penggunaan atau ketidakmampuan untuk mengakses atau menggunakan Layanan.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Perubahan Ketentuan</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami berhak, atas kebijakan kami sendiri, untuk mengubah atau mengganti Ketentuan ini kapan saja. Jika revisi
            bersifat material, kami akan memberikan pemberitahuan setidaknya 30 hari sebelum ketentuan baru berlaku. Apa yang merupakan
            perubahan material akan ditentukan atas kebijakan kami sendiri.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Hubungi Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda memiliki pertanyaan tentang Ketentuan ini, silakan hubungi kami di NutriCareugm@gmail.com
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} NutriCare. Semua hak dilindungi.</p>
        </footer>
      </div>
    </div>
  );
}