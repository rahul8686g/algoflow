import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Toaster } from '@/components/ui/toaster'

export function Layout() {
  return (
    <div className="min-h-screen bg-background mesh-gradient noise-overlay">
      <Header />
      <main className="relative pb-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
