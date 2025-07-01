import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi | NutriCare',
  description: 'Baca Kebijakan Privasi untuk NutriCare.',
};

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear(); 

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 outfit-font">
      <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <header className="mb-10 text-center">
           <Link href="/">
            <img src="/assets/img/logo.png" alt="Logo NutriCare" className="w-24 h-auto mx-auto mb-4" />
          </Link>
          <h1 className="text-4xl font-bold text-button">Kebijakan Privasi</h1>
          <p className="text-gray-600 mt-2">Terakhir diperbarui: 20 Mei {currentYear}</p>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Pendahuluan</h2>
          <p className="text-gray-700 leading-relaxed">
            NutriCare ("kami") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
            mengumpulkan, menggunakan, mengungkapkan, dan menjaga informasi Anda saat Anda menggunakan Layanan kami. Harap baca kebijakan privasi ini
            dengan saksama. Jika Anda tidak setuju dengan ketentuan kebijakan privasi ini, mohon jangan mengakses aplikasi.
            Kami berhak melakukan perubahan pada Kebijakan Privasi ini kapan saja dan untuk alasan apa pun.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Informasi yang Kami Kumpulkan</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Kami dapat mengumpulkan informasi tentang Anda melalui berbagai cara. Informasi yang dapat kami kumpulkan melalui Aplikasi meliputi:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>
              <strong>Data Pribadi:</strong> Informasi yang dapat diidentifikasi secara pribadi, seperti nama, alamat email, usia, jenis kelamin,
              dan informasi terkait kesehatan lainnya (tinggi badan, berat badan, tingkat aktivitas, preferensi diet, alergi) yang Anda berikan secara sukarela
              kepada kami saat Anda mendaftar di Aplikasi atau saat Anda memilih untuk berpartisipasi dalam berbagai aktivitas terkait
              Aplikasi, seperti obrolan online dan papan pesan.
            </li>
            <li>
              <strong>Data Turunan:</strong> Informasi yang dikumpulkan server kami secara otomatis saat Anda mengakses Aplikasi, seperti alamat IP Anda,
              jenis browser Anda, sistem operasi Anda, waktu akses Anda, dan halaman yang telah Anda lihat secara langsung sebelum dan sesudah mengakses Aplikasi.
              Jika Anda menggunakan aplikasi seluler kami, informasi ini juga dapat mencakup nama dan jenis perangkat Anda, sistem operasi Anda, nomor telepon Anda,
              negara Anda, suka dan balasan Anda terhadap postingan, dan interaksi lain dengan aplikasi dan pengguna lain melalui file log server,
              serta informasi lain apa pun yang Anda pilih untuk diberikan.
            </li>
            <li>
              <strong>Data dari Pemindaian dan Pelacakan Makanan:</strong> Informasi tentang makanan yang Anda pindai, catat, dan lacak, termasuk gambar makanan,
              kandungan nutrisi (kalori, makronutrien, mikronutrien), waktu makan, dan ukuran porsi.
            </li>
            <li>
              <strong>Firebase dan Layanan Pihak Ketiga:</strong> Kami menggunakan Firebase untuk otentikasi, basis data, dan penyimpanan. Kami juga dapat menggunakan layanan pihak ketiga
              seperti OpenAI API dan Google GenAI untuk analisis makanan dan wawasan nutrisi. Layanan ini dapat mengumpulkan informasi sesuai dengan kebijakan privasi mereka masing-masing.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Bagaimana Kami Menggunakan Informasi Anda</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Memiliki informasi yang akurat tentang Anda memungkinkan kami untuk memberi Anda pengalaman yang lancar, efisien, dan disesuaikan.
            Secara khusus, kami dapat menggunakan informasi yang dikumpulkan tentang Anda melalui Aplikasi untuk:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>Membuat dan mengelola akun Anda.</li>
            <li>Menyediakan dan mempersonalisasi Layanan kami, termasuk pemindaian makanan, pelacakan nutrisi, asisten nutrisi AI, statistik kemajuan, dan rekomendasi resep.</li>
            <li>Menganalisis data Anda untuk tujuan penelitian dan analisis internal. Ini memungkinkan kami untuk:
                <ul className="list-circle list-inside text-gray-700 leading-relaxed space-y-1 pl-6 mt-1">
                    <li>Meningkatkan algoritma kami untuk pengenalan makanan dan analisis nutrisi.</li>
                    <li>Mengembangkan fitur baru dan menyempurnakan yang sudah ada.</li>
                    <li>Memahami tren dan preferensi pengguna untuk meningkatkan pengalaman pengguna secara keseluruhan.</li>
                    <li>Melakukan penelitian tentang pola nutrisi dan kesehatan (menggunakan data anonim dan agregat).</li>
                </ul>
            </li>
            <li>Berkomunikasi dengan Anda tentang akun Anda atau Layanan kami.</li>
            <li>Memantau dan menganalisis penggunaan dan tren untuk meningkatkan pengalaman Anda dengan Aplikasi.</li>
            <li>Mematuhi kewajiban hukum.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Pengungkapan Informasi Anda</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Kami berkomitmen untuk menjaga kerahasiaan data pribadi Anda. Kami dapat membagikan informasi yang telah kami kumpulkan tentang Anda dalam situasi tertentu.
            Informasi Anda dapat diungkapkan sebagai berikut:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>
              <strong>Berdasarkan Hukum atau untuk Melindungi Hak:</strong> Jika kami meyakini bahwa pelepasan informasi tentang Anda diperlukan untuk menanggapi proses hukum,
              untuk menyelidiki atau memperbaiki potensi pelanggaran kebijakan kami, atau untuk melindungi hak, properti, dan keselamatan orang lain,
              kami dapat membagikan informasi Anda sebagaimana diizinkan atau diwajibkan oleh hukum, aturan, atau peraturan yang berlaku.
            </li>
            <li>
              <strong>Penyedia Layanan Pihak Ketiga:</strong> Kami dapat membagikan informasi Anda dengan pihak ketiga yang melakukan layanan untuk kami atau atas nama kami,
              termasuk analisis data (misalnya, OpenAI, Google GenAI untuk analisis makanan), layanan hosting, layanan pelanggan, dan bantuan pemasaran.
              Penyedia ini hanya akan memiliki akses ke informasi yang diperlukan untuk menjalankan fungsinya dan berkewajiban untuk melindungi data Anda.
            </li>
            <li>
              <strong>Transfer Bisnis:</strong> Kami dapat membagikan atau mentransfer informasi Anda sehubungan dengan, atau selama negosiasi, merger,
              penjualan aset perusahaan, pembiayaan, atau akuisisi seluruh atau sebagian bisnis kami ke perusahaan lain.
            </li>
            <li>
              <strong>Data Agregat/Anonim:</strong> Kami dapat membagikan informasi agregat atau anonim yang tidak secara langsung mengidentifikasi Anda dengan pihak ketiga untuk penelitian,
              pemasaran, analitik atau tujuan lainnya. Misalnya, kami mungkin membagikan statistik tentang demografi pengguna atau tren diet.
            </li>
            <li>
              <strong>Dengan Persetujuan Anda:</strong> Kami dapat mengungkapkan informasi pribadi Anda untuk tujuan lain apa pun dengan persetujuan Anda.
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-2">
            Kami tidak menjual informasi pribadi Anda kepada pihak ketiga.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Keamanan Informasi Anda</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami menggunakan langkah-langkah keamanan administratif, teknis, dan fisik untuk membantu melindungi informasi pribadi Anda.
            Meskipun kami telah mengambil langkah-langkah yang wajar untuk mengamankan informasi pribadi yang Anda berikan kepada kami, perlu diketahui bahwa
            terlepas dari upaya kami, tidak ada langkah keamanan yang sempurna atau tidak dapat ditembus, dan tidak ada metode transmisi data yang dapat
            dijamin terhadap intersepsi atau jenis penyalahgunaan lainnya. Setiap informasi yang diungkapkan secara online rentan terhadap
            intersepsi dan penyalahgunaan oleh pihak yang tidak berwenang. Oleh karena itu, kami tidak dapat menjamin keamanan penuh jika Anda memberikan informasi pribadi.
            Kami menggunakan Firebase untuk layanan backend, yang menyediakan langkah-langkah keamanan yang kuat.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Hak dan Pilihan Data Anda</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Anda memiliki hak tertentu terkait informasi pribadi Anda, tunduk pada undang-undang perlindungan data setempat. Ini mungkin termasuk hak untuk:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-1 pl-4">
            <li>Mengakses informasi pribadi yang kami miliki tentang Anda.</li>
            <li>Meminta kami memperbaiki informasi pribadi yang tidak akurat.</li>
            <li>Meminta kami menghapus informasi pribadi Anda.</li>
            <li>Menolak atau membatasi pemrosesan kami atas informasi pribadi Anda.</li>
            <li>Mencabut persetujuan Anda (jika pemrosesan didasarkan pada persetujuan).</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-2">
            Anda biasanya dapat meninjau dan mengubah informasi akun Anda atau menghentikan akun Anda melalui pengaturan akun Anda.
            Jika Anda ingin menggunakan salah satu hak ini atau memiliki pertanyaan, silakan hubungi kami.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Kebijakan untuk Anak-Anak</h2>
          <p className="text-gray-700 leading-relaxed">
            Kami tidak dengan sengaja meminta informasi dari atau memasarkan kepada anak-anak di bawah usia 13 tahun. Jika Anda mengetahui adanya
            data yang kami kumpulkan dari anak-anak di bawah usia 13 tahun, silakan hubungi kami menggunakan informasi kontak yang disediakan di bawah ini.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Hubungi Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Jika Anda memiliki pertanyaan atau komentar tentang Kebijakan Privasi ini, silakan hubungi kami di: NutriCareugm@gmail.com
          </p>
        </section>

        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">&copy; {currentYear} NutriCare. Semua hak dilindungi.</p>
        </footer>
      </div>
    </div>
  );
}