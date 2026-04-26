import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi redaksi Berita Meureno untuk informasi, kerjasama, dan pengiriman informasi.',
}

export default function KontakPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="mb-10">
        <span className="inline-block bg-aceh-green text-white font-label text-[11px] tracking-[1.5px] px-3 py-1 rounded-[3px] uppercase mb-4">
          Hubungi Kami
        </span>
        <h1 className="font-head text-[32px] sm:text-[40px] font-black text-ink leading-[1.2] mb-4">
          Kontak Redaksi
        </h1>
        <p className="text-[16px] text-ink-soft">
          Ada berita, saran, atau ingin bekerjasama? Hubungi kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Info Kontak */}
        <div className="space-y-6">
          <h2 className="font-head text-[20px] font-bold text-ink">Informasi Kontak</h2>

          {[
            { icon: '📍', label: 'Alamat', value: 'Jl. \nBanda Aceh 23111\nAceh, Indonesia' },
            { icon: '📧', label: 'Email Redaksi', value: 'redaksi@meureno.com' },
            { icon: '📧', label: 'Email Iklan', value: 'iklan@meureno.com' },
            { icon: '📞', label: 'Telepon', value: '+62 651 000 0000' },
            { icon: '🕐', label: 'Jam Operasional', value: 'Senin – Jumat: 08.00 – 17.00 WIB' },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <span className="text-[20px] shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-[13px] text-ink-mid mb-0.5">{label}</p>
                <p className="text-[14px] text-ink-soft whitespace-pre-line">{value}</p>
              </div>
            </div>
          ))}

          <div>
            <p className="font-semibold text-[13px] text-ink-mid mb-2">Ikuti Kami</p>
            <div className="flex gap-2">
              {[
                { label: 'Facebook', color: 'bg-[#1877F2]' },
                { label: 'Twitter/X', color: 'bg-black' },
                { label: 'Instagram', color: 'bg-[#E1306C]' },
                { label: 'Telegram', color: 'bg-[#2CA5E0]' },
              ].map(({ label, color }) => (
                <span key={label}
                  className={`${color} text-white text-[11px] font-label font-bold px-3 py-1.5 rounded`}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Kontak */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <h2 className="font-head text-[20px] font-bold text-ink mb-5">Kirim Pesan</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Nama Lengkap</label>
              <input type="text" placeholder="Nama kamu..."
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Email</label>
              <input type="email" placeholder="email@kamu.com"
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/20" />
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Subjek</label>
              <select className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green bg-white">
                <option>Kirim Berita/Informasi</option>
                <option>Kerjasama Iklan</option>
                <option>Koreksi Berita</option>
                <option>Saran & Masukan</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-semibold text-ink-mid mb-1.5">Pesan</label>
              <textarea rows={5} placeholder="Tulis pesan kamu..."
                className="w-full border border-border rounded-md px-3.5 py-2.5 text-[14px] outline-none focus:border-aceh-green resize-none" />
            </div>
            <p className="text-[12px] text-ink-soft">
              Form ini bersifat statis. Hubungi langsung via email untuk respons lebih cepat.
            </p>
            <button className="w-full bg-aceh-green text-white font-label font-semibold py-2.5 rounded hover:bg-aceh-green-dark transition-colors">
              Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
