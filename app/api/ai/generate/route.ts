// app/api/ai/generate/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // Di sini Anda bisa integrasi dengan OpenAI, Claude, atau LLM lokal
  // Untuk sementara kita kembalikan data simulasi
  const { content } = await request.json()
  
  // Simulasi delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Contoh output (bisa diganti dengan panggilan AI nyata)
  return NextResponse.json({
    title: 'Judul Otomatis: ' + (content?.slice(0, 30) || 'Artikel Baru') + '...',
    excerpt: 'Ringkasan otomatis dari konten yang telah ditulis. Klik untuk mengisi otomatis.'
  })
}