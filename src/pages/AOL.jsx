import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const AOL = () => {
  const galleryRef = useRef(null)
  const flowRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      const flow = flowRef.current
      if (flow) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: flow,
            start: 'top top',
            end: '+=200%',
            pin: true,
            scrub: 1,
          },
        })

        tl.fromTo(
          '.aol-flow-images',
          { yPercent: 100 },
          { yPercent: 0, ease: 'none', duration: 2.5 },
          0
        )

        gsap.utils.toArray('.aol-flow-image').forEach((img) => {
          const range = Number(img.dataset.parallax) || 30
          tl.fromTo(
            img,
            { '--py': `${range}px` },
            { '--py': `${-range}px`, ease: 'none', duration: 2.5 },
            0
          )
        })

        tl.fromTo(
          '.aol-flow-text:nth-child(1)',
          { opacity: 0 },
          { opacity: 1, ease: 'none', duration: 0.5 },
          0
        )
          .to(
            '.aol-flow-text:nth-child(1)',
            { opacity: 0, ease: 'none', duration: 0.5 },
            1
          )
          .fromTo(
            '.aol-flow-text:nth-child(2)',
            { opacity: 0 },
            { opacity: 1, ease: 'none', duration: 0.5 },
            1
          )
          .to(
            '.aol-flow-text:nth-child(2)',
            { opacity: 0, ease: 'none', duration: 0.5 },
            2
          )
          .fromTo(
            '.aol-flow-text:nth-child(3)',
            { opacity: 0 },
            { opacity: 1, ease: 'none', duration: 0.5 },
            2
          )
      }

      const wrapper = galleryRef.current
      if (!wrapper) return

      let targetX = 0
      let currentX = 0
      let targetY = 0
      let currentY = 0
      let rafId

      const handleMouseMove = (e) => {
        const rect = wrapper.getBoundingClientRect()
        targetX = e.clientX - rect.left
        targetY = Math.max(0, e.clientY - rect.top)
      }

      const animate = () => {
        currentX += (targetX - currentX) * 0.08
        currentY += (targetY - currentY) * 0.08
        wrapper.style.setProperty('--mouse-x', `${currentX.toFixed(2)}px`)
        wrapper.style.setProperty(
          '--mouse-y',
          `${(currentY * 0.5).toFixed(2)}px`
        )
        rafId = requestAnimationFrame(animate)
      }

      window.addEventListener('mousemove', handleMouseMove)
      rafId = requestAnimationFrame(animate)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        cancelAnimationFrame(rafId)
        wrapper.style.removeProperty('--mouse-x')
        wrapper.style.removeProperty('--mouse-y')
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div className="aol">
      <div className="aol-hero">
        <div className="aol-hero-wrapper">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="aol-hero-title"
          >
            The Art of life
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="aol-hero-image"
          >
            <img src="/images/art/aol1.jpg" alt="AOL" />
          </motion.div>
        </div>
      </div>

      <div className="aol-flow animate-section">
        <div className="aol-flow-wrapper">
          <div className="aol-flow-content" ref={flowRef}>
            <div className="aol-flow-texts">
              <div className="aol-flow-text">
                She moved through life as if everything had faded. What she
                wore, what she saw, what she felt. All quietly empty.
              </div>
              <div className="aol-flow-text">
                Through a garment that felt different, something in her shifted.
              </div>
              <div className="aol-flow-text">
                Then, slowly, color returned. Life felt alive again. What we
                wear becomes a way to express, to feel, to return to ourselves.
                Because the art of life should never be lifeless.
              </div>
            </div>
            <div className="aol-flow-images">
              <div className="left">
                <img
                  data-parallax="40"
                  style={{
                    '--py': '0px',
                    transform:
                      'translateY(var(--py)) translateX(50%) scale(0.8) rotate(3deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-left1.jpg"
                  alt="AOL"
                />
                <img
                  data-parallax="20"
                  style={{
                    '--py': '0px',
                    transform: 'translateY(var(--py)) scale(1) rotate(-2deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-left2.jpg"
                  alt="AOL"
                />
                <img
                  data-parallax="60"
                  style={{
                    '--py': '0px',
                    transform:
                      'translateY(var(--py)) translateX(100%) scale(0.6) rotate(-6deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-left3.jpg"
                  alt="AOL"
                />
              </div>
              <div className="gap"></div>
              <div className="right">
                <img
                  data-parallax="30"
                  style={{
                    '--py': '0px',
                    transform:
                      'translateY(var(--py)) translateX(-50%) scale(0.8) rotate(-3deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-right1.jpg"
                  alt="AOL"
                />
                <img
                  data-parallax="50"
                  style={{
                    '--py': '0px',
                    transform: 'translateY(var(--py)) scale(1) rotate(2deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-right2.jpg"
                  alt="AOL"
                />
                <img
                  data-parallax="25"
                  style={{
                    '--py': '0px',
                    transform:
                      'translateY(var(--py)) translate(-100%, 20%) scale(0.6) rotate(6deg)',
                  }}
                  className="aol-flow-image"
                  src="/images/art/aol-right3.jpg"
                  alt="AOL"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aol-quote animate-section">
        <div className="aol-quote-wrapper">
          <h2 className="aol-quote-title">Life isn't meant to be colorless</h2>
          <div className="aol-quote-grid">
            <div className="aol-quote-card">
              <div className="image">
                <img
                  style={{ transform: 'rotate(-5deg)' }}
                  src="/images/art/aol001.jpg"
                  alt="AOL"
                />
              </div>
              <div className="text">
                Natural fibers chosen for how they feel, not just how they look.
              </div>
            </div>
            <div className="aol-quote-card">
              <div className="image">
                <img
                  style={{ transform: 'rotate(-3deg)' }}
                  src="/images/art/aol002.jpg"
                  alt="AOL"
                />
              </div>
              <div className="text">Craft over excess. Quality over noise.</div>
            </div>
            <div className="aol-quote-card">
              <div className="image">
                <img
                  style={{ transform: 'rotate(3deg)' }}
                  src="/images/art/aol003.jpg"
                  alt="AOL"
                />
              </div>
              <div className="text">
                Designed with intention, down to every thread.
              </div>
            </div>
            <div className="aol-quote-card">
              <div className="image">
                <img
                  style={{ transform: 'rotate(5deg)' }}
                  src="/images/art/aol004.jpg"
                  alt="AOL"
                />
              </div>
              <div className="text">
                Made with care, so it earns a place in your life.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="aol-gallery animate-section">
        <div className="aol-gallery-wrapper">
          <div className="aol-gallery-content">
            <div className="aol-gallery-sub">
              Made for people, not margins.{' '}
            </div>
            <h2 className="aol-gallery-title">
              Fashion lives where life happens. <br />
              In movement, routine, and choice. <br />
              An art form worn every day.
            </h2>
          </div>
          <div className="aol-gallery-images" ref={galleryRef}>
            <div
              className="aol-gallery-image"
              style={{
                left: '0',
                top: '20px',
                '--rotate': '-3deg',
                '--depth': 0.28,
                zIndex: 20,
              }}
            >
              <img src="/images/art/aol7.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
            <div
              className="aol-gallery-image"
              style={{
                left: '22%',
                top: '150px',
                '--rotate': '2deg',
                '--depth': 0.3,
                zIndex: 19,
              }}
            >
              <img src="/images/art/aol6.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
            <div
              className="aol-gallery-image"
              style={{
                left: '44%',
                top: '300px',
                '--rotate': '7deg',
                '--depth': 0.32,
                zIndex: 18,
              }}
            >
              <img src="/images/art/aol5.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
            <div
              className="aol-gallery-image"
              style={{
                left: '66%',
                top: '450px',
                '--rotate': '10deg',
                '--depth': 0.34,
                zIndex: 17,
              }}
            >
              <img src="/images/art/aol4.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
            <div
              className="aol-gallery-image"
              style={{
                left: '88%',
                top: '600px',
                '--rotate': '10deg',
                '--depth': 0.37,
                zIndex: 16,
              }}
            >
              <img src="/images/art/aol3.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
            <div
              className="aol-gallery-image"
              style={{
                left: '110%',
                top: '750px',
                '--rotate': '10deg',
                '--depth': 0.4,
                zIndex: 15,
              }}
            >
              <img src="/images/art/aol2.jpg" alt="AOL" />
              <Link className="btn btn-rounded" to="/shop">
                DISCOVER
              </Link>
            </div>
          </div>
          <Link className="btn btn-primary aol-gallery-btn" to="/shop">
            SHOP ALL
            <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AOL
