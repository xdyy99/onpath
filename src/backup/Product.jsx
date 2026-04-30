import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addItem } from '../store/slices/cartSlice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const COLORS = ['Black', 'White', 'Blue']
const SIZES = ['Small', 'Medium', 'Large', 'XLarge']

const NAVBAR_OFFSET = 110
const PIN_BOTTOM_MARGIN = 64

const Product = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products?.items || [])
  const product = products.find((item) => item.slug === slug)

  const wrapperRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const [selectedColor, setSelectedColor] = useState(COLORS[0])
  const [selectedSize, setSelectedSize] = useState(SIZES[1])
  const [openSections, setOpenSections] = useState({ description: true })

  useGSAP(
    () => {
      if (!product) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1025px)', () => {
        const triggers = []

        const getPinTop = (el) => {
          const elHeight = el.offsetHeight
          const viewport = window.innerHeight
          const idealTop = viewport - elHeight - PIN_BOTTOM_MARGIN
          const pinTop = Math.min(NAVBAR_OFFSET, idealTop)
          return pinTop
        }

        for (const el of [headerRef.current, contentRef.current]) {
          if (!el) continue
          triggers.push(
            ScrollTrigger.create({
              trigger: el,
              start: () => {
                return `top top+=${getPinTop(contentRef.current)}`
              },
              endTrigger: wrapperRef.current,
              end: 'bottom bottom',
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            })
          )
        }
        return () => triggers.forEach((t) => t.kill())
      })
      return () => mm.revert()
    },
    { dependencies: [product?.id, slug], revertOnUpdate: true }
  )

  useEffect(() => {
    ScrollTrigger.refresh()
  }, [openSections])

  const toggleSection = (key) => {
    const isDesktop =
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1025px)').matches

    setOpenSections((prev) => {
      const willOpen = !prev[key]
      if (isDesktop && willOpen) {
        return { [key]: true }
      }
      return { ...prev, [key]: willOpen }
    })
  }

  const handleAddToCart = () => {
    if (!product) return
    dispatch(addItem({ ...product, color: selectedColor, size: selectedSize }))
  }

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter((item) => item.slug !== slug)
    .slice(0, 3)

  if (!product) {
    return (
      <div className="notfound">
        <div className="notfound-wrapper">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="notfound-title home-title"
          >
            Product missing.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="notfound-text"
          >
            The product you are looking for does not exist.{' '}
            <Link to="/shop" className="btn btn-primary">
              Return to Shop
              <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="product">
      <div className="product-wrapper" ref={wrapperRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="product-header"
        >
          <div className="product-header-inner" ref={headerRef}>
            <h1 className="product-title home-title">{product.name}</h1>
            <div className="product-price">{product.price} USD</div>
            <div className="product-buttons --desktop">
              <button
                className="btn btn-icon"
                onClick={() => handleAddToCart(product)}
              >
                <img src="/icons/bag.svg" alt="bag" />
              </button>
              {/* <button
              className="btn btn-icon"
              onClick={() => handleAddToCart(product)}
            >
              <img src="/icons/heart.svg" alt="heart" />
            </button> */}
            </div>
          </div>
          <div className="product-buttons --mobile">
            <button
              className="btn btn-icon"
              onClick={() => handleAddToCart(product)}
            >
              <img src="/icons/bag.svg" alt="bag" />
            </button>
            {/* <button
            className="btn btn-icon"
            onClick={() => handleAddToCart(product)}
          >
            <img src="/icons/heart.svg" alt="heart" />
          </button> */}
          </div>
        </motion.div>
        <div className="product-gallery">
          <div className="product-gallery-inner">
            {product.image.map((image, index) => (
              <div className="product-gallery-item" key={index}>
                <img src={image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="product-content"
        >
          <div className="product-content-inner" ref={contentRef}>
            <div
              className={`product-content-item${
                openSections.description ? ' --active' : ''
              }`}
            >
              <div
                className="title"
                onClick={() => toggleSection('description')}
              >
                Description{' '}
                <div className="icon">
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className="content">
                <p>
                  The Band Collar Short Sleeve Shirt is tailored in Italy from
                  virgin wool featuring a chevron pattern. The garment has a
                  voluminous body and 3/4 sleeves for modern style. Additional
                  features include a band collar, a covered placket, horn
                  buttons, and a Fear of God label stitched at the back of the
                  collar.
                </p>
                <p>Style: Basic</p>
                <p>Material: Virgin Wool</p>

                <div className="chart">
                  <div>Formal</div>
                  <div className="line">
                    <div className="marker"></div>
                  </div>
                  <div>Casual</div>
                </div>
                <div className="chart">
                  <div>Cold</div>
                  <div className="line">
                    <div className="marker"></div>
                  </div>
                  <div>Warm</div>
                </div>
              </div>
            </div>
            <div
              className={`product-content-item${
                openSections.details ? ' --active' : ''
              }`}
            >
              <div className="title" onClick={() => toggleSection('details')}>
                Details{' '}
                <div className="icon">
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className="content">
                <div className="options">
                  <div className="option-title">Color: </div>
                  {COLORS.map((color) => (
                    <div
                      key={color}
                      className={`option${
                        selectedColor === color ? ' --active' : ''
                      }`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </div>
                  ))}
                </div>
                <div className="options">
                  <div className="option-title">Size: </div>
                  {SIZES.map((size) => (
                    <div
                      key={size}
                      className={`option${
                        selectedSize === size ? ' --active' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
                </div>

                <ul>
                  <li>100% Cotton 480GSM</li>
                  <li>Model is 6'1'' and wears size Medium</li>
                  <li>Pigment dye</li>
                  <li>Lounge fit - wide leg and relaxed seat</li>
                  <li>"26" HD print graphic</li>
                  <li>Warm season</li>
                </ul>
              </div>
            </div>

            <div
              className={`product-content-item${
                openSections.shipping ? ' --active' : ''
              }`}
            >
              <div className="title" onClick={() => toggleSection('shipping')}>
                Shipping Policy{' '}
                <div className="icon">
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
              <div className="content">
                <ul>
                  <li>Shipping is free for all orders over $100</li>
                  <li>Orders are processed within 24 hours</li>
                  <li>Orders are shipped within 3-5 business days</li>
                  <li>Orders are shipped within 3-5 business days</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Product
