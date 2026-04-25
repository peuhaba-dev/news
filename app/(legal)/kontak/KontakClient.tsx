'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'

const CONTACTS = [
  { icon: '📧', label: 'Email Redaksi', value: 'redaksi@meureno.com', href: 'mailto:redaksi@meureno.com' },
  { icon: '📞', label: 'Telepon', value: '(0651) 123-4567', href: 'tel:+62651234567' },
  { icon: '📍', label: 'Alamat Kantor', value: 'Jl. T. Panglima Polem No. 44, Banda Aceh 23122', href: null },
  { icon: '🕐', label: 'Jam Operasional', value: 'Senin – Jumat, 08:00 – 17:00 WIB', href: null },
]

export default function KontakClient() {
  const [form, setForm] = useState({ nama: '', email: '', subjek: '', pesan: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    console.log('[Kontak Form]', form)
    setTimeout(() => {
      setStatus('sent')
      setForm({ nama: '', email: '', subjek: '', pesan: '' })
    }, 800)
  }

  return (
    <article>
      <nav className="text-[12px] text-ink-soft mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-aceh-green">Beranda</Link>
        <span>›</span>
        <span className="text-ink">Hubungi Kami</span>
      </nav>

      <div className="relative rounded-xl overflow-hidden mb-10 bg-aceh-green">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 2px, transparent 2px, transparent 12px)' }} />
        <div className="relative p-8 md:p-10">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-[11px] font-label tracking-[1.5px] px-3 py-1.5 rounded-full mb-4">📬 KONTAK REDAKSI</div>
          <h1 className="font-head text-[32px] md:text-[40px] font-black text-white leading-[1.2] mb-3">Hubungi Kami</h1>
          <p className="text-white/85 text-[15px] max-w-lg leading-relaxed">Kami senang mendengar dari Anda — pertanyaan, saran, kerja sama, atau pengaduan konten.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {CONTACTS.map(({ icon, label, value, href }) => (
          <div key={label} className="bg-surface border border-border rounded-xl p-4 hover:border-aceh-green/40 hover:shadow-sm transition-all">
            <div className="text-[24px] mb-2">{icon}</div>
            <div className="font-label text-[11px] tracking-[1.5px] uppercase text-ink-soft font-bold mb-1">{label}</div>
            {href ? (
              <a href={href} className="text-[14px] font-semibold text-aceh-green hover:underline break-words">{value}</a>
            ) : (
              <p className="text-[14px] font-semibold text-ink leading-snug">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-5 gap-8 mb-10">
        <div className="md:col-span-3">
          <h2 className="font-head text-[22px] font-bold text-ink mb-5 pb-2 sec-head-border">Kirim Pesan</h2>
          {status === 'sent' ? (
            <div className="bg-aceh-green-light border border-aceh-green rounded-xl p-6 text-center">
              <div className="text-[32px] mb-2">✅</div>
              <p className="font-semibold text-aceh-green-dark text-[16px]">Pesan Terkirim!</p>
              <p className="text-[13px] text-ink-soft mt-1">Tim redaksi akan merespons dalam 1×24 jam hari kerja.</p>
              <button onClick={() => setStatus('idle')} className="mt-4 font-label text-[12px] tracking-[1px] text-aceh-green hover:underline">Kirim pesan lain →</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nama" className="block text-[12px] font-label tracking-[1px] text-ink-soft mb-1.5">NAMA LENGKAP *</label>
                  <input id="nama" name="nama" type="text" required value={form.nama} onChange={handleChange} placeholder="Nama Anda" className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-ink bg-white focus:outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/10 transition-colors" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12px] font-label tracking-[1px] text-ink-soft mb-1.5">EMAIL *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="email@anda.com" className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-ink bg-white focus:outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/10 transition-colors" />
                </div>
              </div>
              <div>
                <label htmlFor="subjek" className="block text-[12px] font-label tracking-[1px] text-ink-soft mb-1.5">SUBJEK</label>
                <select id="subjek" name="subjek" value={form.subjek} onChange={handleChange} className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-ink bg-white focus:outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/10 transition-colors">
                  <option value="">Pilih subjek...</option>
                  <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  <option value="Pengaduan Konten">Pengaduan Konten</option>
                  <option value="Kerja Sama & Iklan">Kerja Sama &amp; Iklan</option>
                  <option value="Kirim Berita">Kirim Berita / Tips</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div>
                <label htmlFor="pesan" className="block text-[12px] font-label tracking-[1px] text-ink-soft mb-1.5">PESAN *</label>
                <textarea id="pesan" name="pesan" required rows={5} value={form.pesan} onChange={handleChange} placeholder="Tulis pesan Anda di sini..." className="w-full border border-border rounded-lg px-3.5 py-2.5 text-[14px] text-ink bg-white focus:outline-none focus:border-aceh-green focus:ring-2 focus:ring-aceh-green/10 transition-colors resize-none" />
              </div>
              <button type="submit" disabled={status === 'sending'} className="w-full bg-aceh-green text-white font-label text-[13px] tracking-[1px] py-3 rounded-lg hover:bg-aceh-green-dark transition-colors disabled:opacity-60">
                {status === 'sending' ? 'MENGIRIM...' : 'KIRIM PESAN →'}
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="font-head text-[20px] font-bold text-ink mb-3 pb-2 sec-head-border">Kerja Sama &amp; Iklan</h2>
            <p className="text-[14px] text-ink-mid leading-relaxed">Untuk kerja sama media atau partnership, email kami di <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a> dengan subjek &ldquo;Kerja Sama&rdquo;.</p>
          </div>
          <div>
            <h2 className="font-head text-[20px] font-bold text-ink mb-3 pb-2 sec-head-border">Kirim Berita</h2>
            <p className="text-[14px] text-ink-mid leading-relaxed">Punya informasi dari daerah Anda? Kirim ke <a href="mailto:redaksi@meureno.com" className="text-aceh-green hover:underline font-semibold">redaksi@meureno.com</a> beserta nama lengkap dan dokumentasi pendukung.</p>
          </div>
          <div>
            <h2 className="font-head text-[20px] font-bold text-ink mb-3 pb-2 sec-head-border">Media Sosial</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Facebook', href: 'https://facebook.com', bg: 'bg-[#1877F2]' },
                { label: 'Instagram', href: 'https://instagram.com', bg: 'bg-[#E4405F]' },
                { label: 'Twitter/X', href: 'https://x.com', bg: 'bg-[#000]' },
                { label: 'YouTube', href: 'https://youtube.com', bg: 'bg-[#FF0000]' },
              ].map(({ label, href, bg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${bg} text-white text-[11px] font-label tracking-[0.5px] px-4 py-2 rounded-lg hover:opacity-85 transition-opacity`}>{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-head text-[22px] font-bold text-ink mb-4 pb-2 sec-head-border">Lokasi Kantor</h2>
        <div className="rounded-xl overflow-hidden border border-border shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.781044849826!2d95.32018031475272!3d5.548774995932025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30402a2a23c92437%3A0x7d3b3c68ac1b4d09!2sBanda%20Aceh%2C%20Aceh%2C%20Indonesia!5e0!3m2!1sen!2sid!4v1714000000000!5m2!1sen!2sid"
            width="100%"
            height="340"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor Meureno News – Banda Aceh"
          />
        </div>
        <p className="text-[12px] text-ink-soft mt-2">📍 Jl. T. Panglima Polem No. 44, Banda Aceh 23122, Provinsi Aceh, Indonesia</p>
      </div>
    </article>
  )
}
