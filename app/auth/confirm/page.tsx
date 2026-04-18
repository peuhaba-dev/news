'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser'; // ← Import fungsi createClient

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    const supabase = createClient(); // ← Buat instance client di sini
    
    if (token_hash && type) {
      supabase.auth.verifyOtp({
        token_hash: token_hash,
        type: type as any,
      }).then(({ error }) => {
        if (error) {
          console.error('Verification error:', error);
          router.push('/auth/error?message=' + encodeURIComponent(error.message));
        } else {
          // Redirect ke dashboard atau halaman sukses
          router.push('/dashboard');
        }
      });
    } else if (!token_hash) {
      router.push('/auth/error?message=No token provided');
    }
  }, [token_hash, type, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-4">Memverifikasi akun Anda...</h1>
        <p className="text-gray-600">Harap tunggu sebentar.</p>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  );
}
