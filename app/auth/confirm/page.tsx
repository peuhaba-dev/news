'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase'; // sesuaikan dengan config supabase Anda

function ConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');

  useEffect(() => {
    if (token_hash && type) {
      supabase.auth.verifyOtp({
        token_hash: token_hash,
        type: type as any,
      }).then(({ error }) => {
        if (error) {
          console.error('Verification error:', error);
          router.push('/auth/error');
        } else {
          router.push('/auth/success');
        }
      });
    }
  }, [token_hash, type, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Memverifikasi akun Anda...</h1>
        <p>Harap tunggu sebentar.</p>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}
