import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addItem } from '../store/slices/cartSlice'

const Home = () => {
  const products = useSelector((state) => state.products?.items || [])
  const dispatch = useDispatch()
  const blogPosts = useSelector((state) => state.blog?.posts || [])

  const latestPosts = blogPosts.slice(0, 3)
  const featuredProducts = products.slice(0, 3)

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }

  const aboutWrapperRef = useRef(null)
  const aboutContentRef = useRef(null)
  const artGridRef = useRef(null)

  useEffect(() => {
    const wrapper = aboutWrapperRef.current
    const content = aboutContentRef.current
    const grid = artGridRef.current

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1025px)', () => {
      const cleanups = []

      if (wrapper && content) {
        const distance = Math.max(0, content.scrollWidth - window.innerWidth)
        const pauseStart = window.innerHeight * 0.25
        const pauseEnd = window.innerHeight * 0.25

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: `+=${distance + pauseStart + pauseEnd}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })

        tl.to({}, { duration: pauseStart })
          .to(content, {
            x: -distance,
            ease: 'none',
            duration: distance,
          })
          .to({}, { duration: pauseEnd })

        cleanups.push(() => {
          tl.scrollTrigger?.kill()
          tl.kill()
        })
      }

      if (grid) {
        const cards = Array.from(grid.querySelectorAll('.art-card'))
        // Per-card depth in px — front cards (z-index 4 → 1) feel closer.
        const depths = [22, 14, 16, 10]

        const setters = cards.map((card, i) => ({
          setX: gsap.quickTo(card, '--mx', {
            duration: 0.8,
            ease: 'power3.out',
          }),
          setY: gsap.quickTo(card, '--my', {
            duration: 0.8,
            ease: 'power3.out',
          }),
          depth: depths[i] ?? 12,
        }))

        const onMove = (e) => {
          const nx = (e.clientX / window.innerWidth) * 2 - 1
          const ny = (e.clientY / window.innerHeight) * 2 - 1
          setters.forEach(({ setX, setY, depth }) => {
            setX(nx * depth * 1.5)
            setY(ny * depth)
          })
        }

        window.addEventListener('mousemove', onMove)
        cleanups.push(() => {
          window.removeEventListener('mousemove', onMove)
          cards.forEach((c) => {
            c.style.removeProperty('--mx')
            c.style.removeProperty('--my')
          })
        })
      }

      return () => cleanups.forEach((fn) => fn())
    })

    return () => mm.revert()
  }, [])

  return (
    <div className="home">
      <section className="hero --dark-section">
        <div className="hero-wrapper">
          <motion.h1
            className="hero-title home-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            Art in motion.
          </motion.h1>
          <div className="hero-banner">
            <video
              src="/videos/video3.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="hero-video"
            />
          </div>
        </div>
      </section>

      <section className="art animate-section">
        <div className="art-wrapper">
          <div className="art-content">
            <h2 className="art-title home-title">The Art of Life</h2>

            <div className="art-grid" ref={artGridRef}>
              <div className="art-card">
                <div className="art-card-image">
                  <img src="/images/home/art1.jpg" alt="art" />
                </div>
                <div className="art-card-text">
                  It lives in what we choose to wear. A feeling. A reflection. A
                  way of living with intention.
                </div>
                <Link className="btn btn-rounded" to="/artoflife">
                  DISCOVER
                </Link>
              </div>
              <div className="art-card">
                <div className="art-card-image">
                  <img src="/images/home/art2.jpg" alt="art" />
                </div>
                <div className="art-card-text">
                  Built through ideas and stories. Each piece begins with
                  meaning and ends with emotion.
                </div>
                <Link className="btn btn-rounded" to="/artoflife">
                  DISCOVER
                </Link>
              </div>
              <div className="art-card">
                <div className="art-card-image">
                  <img src="/images/home/art3.jpg" alt="art" />
                </div>
                <div className="art-card-text">
                  This collection is built around statement pieces. Art made
                  wearable. Designed to be seen, felt, and remembered.
                </div>
                <Link className="btn btn-rounded" to="/artoflife">
                  DISCOVER
                </Link>
              </div>
              <div className="art-card">
                <div className="art-card-image">
                  <img src="/images/home/art4.jpg" alt="art" />
                </div>
                <div className="art-card-text">
                  Life without color feels muted. The Art of Life restores color
                  to what you wear and how you live.
                </div>
                <Link className="btn btn-rounded" to="/artoflife">
                  DISCOVER
                </Link>
              </div>
            </div>

            <div className="art-texts">
              <div className="art-text --active">
                Living is an art. It lives in first coffees and long walks home.
                In the quiet moments of work, rest, and everything in between.
              </div>
              <div className="art-text">
                It lives in what we choose to wear. A feeling. A reflection. A
                way of living with intention.
              </div>
              <div className="art-text">
                Built through ideas and stories. Each piece begins with meaning
                and ends with emotion.
              </div>
              <div className="art-text">
                This collection is built around statement pieces. Art made
                wearable. Designed to be seen, felt, and remembered.
              </div>
              <div className="art-text">
                Life without color feels muted. The Art of Life restores color
                to what you wear and how you live.
              </div>
            </div>
            <Link className="btn btn-primary" to="/artoflife">
              VIEW COLLECTION
              <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="ess animate-section">
        <div className="ess-wrapper">
          <div className="ess-content">
            <div className="ess-grid">
              <div className="ess-col">
                <h2 className="ess-title home-title">Essence</h2>
                <div className="ess-text --big">
                  <p>
                    Fashion brought back to what matters. Natural fibers.
                    Thoughtful construction. The kind of quality you feel the
                    moment you put it on. We built Essence because everyone
                    deserves real clothes. Not plastic masquerading as fabric.
                    Everyday essentials designed without compromise. Elegance
                    for everyone. That's the whole point.
                  </p>
                  <Link className="btn btn-primary" to="/essence">
                    VIEW COLLECTION
                    <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
                  </Link>
                </div>
              </div>

              <div className="ess-image">
                <img
                  style={{ transform: 'rotate(-3deg)' }}
                  src="/images/home/ess1.jpg"
                  alt="Essence"
                />
              </div>
            </div>

            <div className="ess-text">
              We kept Essence accessible because fashion should not belong to a
              select few. Clothing is part of the art of life; it should be
              universal. Essence exists to offer this art through well-made
              essentials.
            </div>

            <div className="ess-images">
              <div className="ess-image">
                <img src="/images/home/ess5.jpg" alt="Essence" />
              </div>
              <div className="ess-image">
                <img src="/images/home/ess2.jpg" alt="Essence" />
              </div>
              <div className="ess-image">
                <img src="/images/home/ess3.jpg" alt="Essence" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about animate-section" ref={aboutWrapperRef}>
        <div className="about-wrapper">
          <div className="about-content" ref={aboutContentRef}>
            <div className="about-col">
              <h2 className="about-title home-title">About</h2>

              <div className="about-text">
                Stories are how we make sense of being human. Every life is a
                story being told in real time. What you wear, what you choose,
                what you keep — these are the sentences. Most people never
                notice they're writing.
              </div>
            </div>
            <div className="about-image --big" style={{ margin: 'auto 0' }}>
              <img
                style={{ transform: 'rotate(3deg)' }}
                src="/images/home/about1.jpg"
                alt="About"
              />
            </div>
            <div className="about-col">
              <div
                className="about-image"
                style={{ marginTop: '50px', marginBottom: 'auto' }}
              >
                <img
                  style={{ transform: 'translateX(20%) rotate(-2deg)' }}
                  src="/images/home/about2.jpg"
                  alt="About"
                />
              </div>
              <div
                className="about-text --small"
                style={{ marginBottom: '5vw' }}
              >
                Our world produces more than ever, yet cares less. Less depth.
                Less quality. Clothes made in weeks. Content made in minutes.
                Often made for profit. Rarely made to last.
              </div>
            </div>
            <div className="about-image --big" style={{ margin: 'auto 0' }}>
              <img
                style={{ transform: 'rotate(-1deg)' }}
                src="/images/home/about3.jpg"
                alt="About"
              />
            </div>

            <div className="about-col">
              <div
                className="about-text --small"
                style={{ marginTop: '5vw', marginBottom: 'auto' }}
              >
                Onpath Studio exists as a place for stories. Not ours — yours.
                Everyone is making something with their life. We just believe it
                should be painted with color.
              </div>
              <div className="about-image">
                <img
                  style={{ transform: 'translateX(50%) rotate(2deg)' }}
                  src="/images/home/about4.jpg"
                  alt="About"
                />
              </div>
            </div>
            <div className="about-image" style={{ margin: 'auto 0' }}>
              <img
                style={{ transform: 'rotate(3deg)' }}
                src="/images/home/about5.jpg"
                alt="About"
              />
            </div>
            <div className="about-col --end">
              <div
                className="about-image"
                style={{ marginTop: '50px', marginBottom: 'auto' }}
              >
                <img
                  style={{ transform: 'translateX(50%) rotate(-1deg)' }}
                  src="/images/home/about6.jpg"
                  alt="About"
                />
              </div>
              <div className="about-text" style={{ marginBottom: '5vw' }}>
                <p>
                  We are more than a studio. <br /> We are an idea. <br /> Life
                  is art. Make it worth looking at.
                </p>
                <Link className="btn btn-primary" to="/contact">
                  Collaborate With Us
                  <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
                </Link>
              </div>
            </div>
            <div className="about-image --big" style={{ margin: 'auto 0' }}>
              <img
                style={{ transform: 'rotate(-3deg)' }}
                src="/images/home/about7.jpg"
                alt="About"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="quote animate-section">
        <div className="quote-wrapper">
          <div className="quote-content">
            <h2 className="quote-title">
              Art that dresses <br /> the ordinary in color.
            </h2>
            <div className="quote-images">
              <div className="quote-image" style={{ top: '5%', right: '5%' }}>
                <img
                  style={{ transform: 'rotate(3deg)' }}
                  src="/images/home/quote1.jpg"
                  alt="Quote"
                />
              </div>

              <div className="quote-image" style={{ top: '4%', left: '42%' }}>
                <img
                  style={{ transform: 'rotate(-1deg)' }}
                  src="/images/home/quote4.jpg"
                  alt="Quote"
                />
              </div>

              <div className="quote-image" style={{ top: '10%', left: '5%' }}>
                <img
                  style={{ transform: 'rotate(-3deg)' }}
                  src="/images/home/quote2.jpg"
                  alt="Quote"
                />
              </div>
              <div
                className="quote-image"
                style={{ bottom: '5%', left: '10%' }}
              >
                <img
                  style={{ transform: 'rotate(-1deg)' }}
                  src="/images/home/quote3.jpg"
                  alt="Quote"
                />
              </div>

              <div
                className="quote-image"
                style={{ bottom: '0%', left: '47%' }}
              >
                <img
                  style={{ transform: 'rotate(1deg)' }}
                  src="/images/home/quote5.jpg"
                  alt="Quote"
                />
              </div>
              <div
                className="quote-image"
                style={{ bottom: '8%', right: '6%' }}
              >
                <img
                  style={{ transform: 'rotate(3deg)' }}
                  src="/images/home/quote6.jpg"
                  alt="Quote"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="pre">
        <div className="pre-wrapper">
          <div className="pre-content">
            <h2 className="pre-title home-title">Première</h2>
            <div className="pre-text">
              <p>
                Every Onpath animated film gives birth to a Project-Based
                Couture Collection — wearable art that transforms cinematic
                imagination into fabric and form.
              </p>
              <Link className="btn btn-primary" to="/essence">
                VIEW COLLECTION
                <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
              </Link>
            </div>
          </div>

          <div className="pre-grid">
            <div className="pre-overlay">
              <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <div className="timer">00:00:01</div>
              <div className="rec">REC</div>
              <div className="names">
                <div className="name">Circuitous</div>
                 <div className="name">The Beauty of Choice</div>
                <div className="name">In Search of Lost Time</div> 
              </div>
            </div>

            <div className="pre-items">
              <div className="pre-item">
                <div className="image">
                  <img src="/images/home/pre1.jpg" alt="Première" />
                </div>
                <Link className="btn btn-rounded">DISCOVER</Link>
              </div>
              <div className="pre-item">
                <div className="image">
                  <img src="/images/home/pre2.jpg" alt="Première" />
                </div>
                <Link className="btn btn-rounded">DISCOVER</Link>
              </div> 
              <div className="pre-item">
                <div className="image">
                  <img src="/images/home/pre3.jpg" alt="Première" />
                </div>
                <Link className="btn btn-rounded">DISCOVER</Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Home
