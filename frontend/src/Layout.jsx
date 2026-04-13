import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PageTransition from './components/PageTransition'

function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-[#040d06]/50 overflow-x-hidden">
      <ScrollToTop />

      {/* Fixed header sits above everything */}
      <Header />

      {/* Spacer matches fixed header height */}
      <div className="h-16 sm:h-20 shrink-0" aria-hidden="true" />

      {/* Page content with smooth animated transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default Layout