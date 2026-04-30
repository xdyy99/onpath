import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addItem } from '../store/slices/cartSlice'
import { fetchProducts } from '../store/slices/productSlice'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const NAVBAR_OFFSET = 110
const PIN_BOTTOM_MARGIN = 64

/** Split admin HTML; delimiter is literal ### (whitespace around it allowed). */
const DESCRIPTION_SECTION_SPLIT = /\s*###\s*/

const splitDescriptionHtml = (raw) => {
  if (raw == null || String(raw).trim() === '') {
    return { descriptionHtml: '', detailsHtml: '' }
  }
  const text = String(raw)
  const parts = text.split(DESCRIPTION_SECTION_SPLIT)
  const descriptionHtml = (parts[0] ?? '').trim()
  const detailsHtml =
    parts.length > 1 ? parts.slice(1).join('###').trim() : ''
  return { descriptionHtml, detailsHtml }
}

const Product = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products?.items || [])
  const status = useSelector((state) => state.products?.status)
  const product = products.find((item) => item.slug === slug)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const { descriptionHtml, detailsHtml } = useMemo(
    () => splitDescriptionHtml(product?.description),
    [product?.description]
  )
  const hasDescriptionOrDetails = Boolean(
    descriptionHtml || detailsHtml || product?.description?.trim()
  )

  const colors = product?.color?.length ? product.color : []
  const sizes = product?.size?.length ? product.size : []
  const genders = product?.gender?.length ? product.gender : []

  const wrapperRef = useRef(null)
  const headerRef = useRef(null)
  const contentRef = useRef(null)

  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedGender, setSelectedGender] = useState(null)
  const [openSections, setOpenSections] = useState({ description: true })

  useEffect(() => {
    if (colors.length && (!selectedColor || !colors.includes(selectedColor))) {
      setSelectedColor(colors[0])
    }
    if (sizes.length && (!selectedSize || !sizes.includes(selectedSize))) {
      setSelectedSize(sizes[Math.min(1, sizes.length - 1)])
    }
    if (genders.length && (!selectedGender || !genders.includes(selectedGender))) {
      setSelectedGender(genders[0])
    }
  }, [colors, sizes, genders, selectedColor, selectedSize, selectedGender])

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
    dispatch(
      addItem({
        ...product,
        color: selectedColor,
        size: selectedSize,
        gender: selectedGender,
      })
    )
  }

  if (!product) {
    if (status === 'loading' || status === 'idle') {
      return (
        <div className="notfound">
          <div className="notfound-wrapper">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="notfound-title home-title"
            >
              Loading…
            </motion.h1>
          </div>
        </div>
      )
    }
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
            <div className="product-price">
              {product.price} {product.currency || 'USD'}
            </div>
            <div className="product-buttons --desktop">
              <button
                className="btn btn-icon"
                onClick={() => handleAddToCart(product)}
              >
                <img src="/icons/bag.svg" alt="bag" />
              </button>
            </div>
          </div>
          <div className="product-buttons --mobile">
            <button
              className="btn btn-icon"
              onClick={() => handleAddToCart(product)}
            >
              <img src="/icons/bag.svg" alt="bag" />
            </button>
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
                {descriptionHtml ? (
                  <div
                    className="product-html product-html--description"
                    dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                  />
                ) : (
                  !hasDescriptionOrDetails && (
                    <p>No description available.</p>
                  )
                )}
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
                {colors.length > 0 && (
                  <div className="options">
                    <div className="option-title">Color: </div>
                    {colors.map((color) => (
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
                )}
                {sizes.length > 0 && (
                  <div className="options">
                    <div className="option-title">Size: </div>
                    {sizes.map((size) => (
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
                )}
                {genders.length > 0 && (
                  <div className="options">
                    <div className="option-title">Gender: </div>
                    {genders.map((gender) => (
                      <div
                        key={gender}
                        className={`option${
                          selectedGender === gender ? ' --active' : ''
                        }`}
                        onClick={() => setSelectedGender(gender)}
                      >
                        {gender}
                      </div>
                    ))}
                  </div>
                )}

                {detailsHtml ? (
                  <div
                    className="product-html product-html--details"
                    dangerouslySetInnerHTML={{ __html: detailsHtml }}
                  />
                ) : null}
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
