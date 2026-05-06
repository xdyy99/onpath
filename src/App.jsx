import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Contact from './components/Contact'
import Bag from './components/Bag'
import Loader from './components/Loader'

import Home from './pages/Home'
import Shop from './pages/Shop'
import Search from './pages/Search'
import Product from './pages/Product'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import Account from './pages/Account'
import AOL from './pages/AOL'
import Essence from './pages/Essence'
// import Premire from './pages/Premiere'
// import Legal from './pages/Legal'
import GarmentCare from './pages/GarmentCare'
import SizeGuide from './pages/SizeGuide'
import ShippingReturns from './pages/ShippingReturns'
import Terms from './pages/Terms'

import NotFound from './pages/NotFound'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

import './styles/main.scss'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname])

  return null
}

function AnimateSections() {
  const { pathname } = useLocation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('--intro')
          } else if (entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('--intro')
          }
        })
      },
      {
        // Fires when the section's top is ~25% above the viewport bottom,
        // so it works for sections taller than the viewport (e.g. .art,
        // .about on mobile) where a ratio-based threshold can never be met.
        rootMargin: '0px 0px -25% 0px',
        threshold: 0,
      }
    )

    const sections = document.querySelectorAll('.animate-section')
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect()
    }
  }, [pathname])

  return null
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const lenis = new Lenis()
    window.lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      delete window.lenis
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <AnimateSections />

        <div className="app">
          <Navbar />
          <Contact />
          <Bag />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/search" element={<Search />} />
              <Route path="/essence" element={<Essence />} />
              <Route path="/shop/:slug" element={<Product />} />
              <Route path="/account" element={<Account />} />
              <Route path="/stories" element={<Blog />} />
              <Route path="/stories/:slug" element={<BlogDetail />} />
              <Route path="/artoflife" element={<AOL />} />
              {/* <Route path="/premiere" element={<Premire />} /> */}
              <Route path="/garment-care" element={<GarmentCare />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              <Route path="/legal" element={<Terms />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>

        <Loader />
      </Router>
    </Provider>
  )
}

export default App
