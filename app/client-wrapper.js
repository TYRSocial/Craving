'use client';

import { AuthProvider } from '@/lib/auth';

export default function ClientWrapper({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
