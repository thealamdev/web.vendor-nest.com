"use client";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'

export default function page() {
  const router = useRouter();
  return (
    <div>
      <Button
        type='button'
        onClick={() => router.push('/auth/vendor/login')}
      >Login</Button>
    </div>
  )
}
