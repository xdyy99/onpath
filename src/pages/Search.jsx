import { useState, useRef, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { addItem, buildQuickAddPayload } from '../store/slices/cartSlice'
import { fetchProducts } from '../store/slices/productSlice'

const SORT_GROUP = {
  key: 'sortBy',
  name: 'Sort By',
  options: ['Newest', 'Oldest', 'Price (low to high)', 'Price (high to low)'],
  mode: 'single',
}

const FILTER_GROUPS = [SORT_GROUP]

const syncFilterState = (groups, prev) => {
  const next = {}
  for (const g of groups) {
    if (prev?.[g.key]) {
      next[g.key] = prev[g.key]
    } else {
      next[g.key] = {
        selected: g.mode === 'single' ? [g.options[0]] : [],
      }
    }
  }
  return next
}

const stripHtml = (html) =>
  typeof html === 'string'
    ? html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    : ''

const productMatchesQuery = (product, q) => {
  if (!q) return true
  const name = (product.name || '').toLowerCase()
  const tags = Array.isArray(product.tags)
    ? product.tags.join(' ').toLowerCase()
    : ''
  const desc = stripHtml(product.description || '').toLowerCase()
  const collections = Array.isArray(product.collection)
    ? product.collection.join(' ').toLowerCase()
    : ''
  const blob = `${name} ${tags} ${desc} ${collections}`
  return blob.includes(q)
}

const sortProducts = (list, sortKey) => {
  if (!sortKey) return list
  const byDate = (a, b) =>
    new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
  const sorted = [...list]
  switch (sortKey) {
    case 'Newest':
      sorted.sort((a, b) => byDate(b, a))
      break
    case 'Oldest':
      sorted.sort(byDate)
      break
    case 'Price (low to high)':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'Price (high to low)':
      sorted.sort((a, b) => b.price - a.price)
      break
    default:
      break
  }
  return sorted
}

const Search = () => {
  const products = useSelector((state) => state.products?.items || [])
  const status = useSelector((state) => state.products?.status)
  const error = useSelector((state) => state.products?.error)
  const dispatch = useDispatch()

  const [queryInput, setQueryInput] = useState('')
  const normalizedQuery = queryInput.trim().toLowerCase()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const [filters, setFilters] = useState(() =>
    syncFilterState(FILTER_GROUPS, {})
  )
  const [openKey, setOpenKey] = useState(null)

  const visibleProducts = useMemo(() => {
    const matched = products.filter((p) =>
      productMatchesQuery(p, normalizedQuery)
    )
    const sortKey = filters.sortBy?.selected[0]
    return sortProducts(matched, sortKey)
  }, [products, normalizedQuery, filters])

  const desktopFiltersRef = useRef(null)
  const mobileFiltersRef = useRef(null)

  useEffect(() => {
    if (!openKey) return
    const handleClickOutside = (event) => {
      const target = event.target
      if (
        desktopFiltersRef.current?.contains(target) ||
        mobileFiltersRef.current?.contains(target)
      ) {
        return
      }
      setOpenKey(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openKey])

  const toggleOpen = (key) => {
    setOpenKey((prev) => (prev === key ? null : key))
  }

  const toggleOption = (key, option) => {
    setFilters((prev) => {
      const group = FILTER_GROUPS.find((g) => g.key === key)
      if (group?.mode === 'single') {
        return { ...prev, [key]: { ...prev[key], selected: [option] } }
      }
      const current = prev[key]?.selected || []
      let next = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option]
      if (group && next.length === group.options.length) {
        next = []
      }
      return { ...prev, [key]: { ...prev[key], selected: next } }
    })
  }

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addItem(buildQuickAddPayload(product)))
  }

  const renderSortGroup = (group, displayName) => {
    const state = filters[group.key] || { selected: [] }
    const isOpen = openKey === group.key
    return (
      <div
        className={`shop-filters-item${isOpen ? ' --open' : ''}`}
        key={group.key}
      >
        <div className="head" onClick={() => toggleOpen(group.key)}>
          <div className="name">{displayName ?? group.name} </div>
          <div className="icon">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul className="list">
          {group.options.map((option) => (
            <li
              key={option}
              className={state.selected.includes(option) ? '--active' : ''}
              onClick={() => toggleOption(group.key, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const titleText = normalizedQuery
    ? `Result for: “${queryInput.trim()}”`
    : 'Search'

  return (
    <div className="shop shop--search">
      <div className="shop-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          {titleText}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="shop-search">
            <label className="shop-search-field">
              <span className="shop-search-label">Search products</span>
              <input
                type="search"
                className="shop-search-input"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Type a name, tag, or keyword"
                autoComplete="off"
                spellCheck="false"
              />
            </label>
            <div className="shop-filters --desktop" ref={desktopFiltersRef}>
              {FILTER_GROUPS.map((group) => renderSortGroup(group))}
            </div>
          </div>
          <div className="shop-filters --mobile" ref={mobileFiltersRef}>
            {renderSortGroup(SORT_GROUP, 'Sort')}
          </div>
          <div className="shop-grid">
            {status === 'loading' && (
              <div className="shop-empty">Loading products…</div>
            )}
            {status === 'failed' && (
              <div className="shop-empty">Error loading products: {error}</div>
            )}
            {status === 'succeeded' &&
              normalizedQuery &&
              visibleProducts.length === 0 && (
                <div className="shop-empty">{`No products match “${queryInput.trim()}”.`}</div>
              )}
            {visibleProducts.map((product) => (
              <div key={product.id} className="shop-item">
                <div className="image">
                  <Link to={`/shop/${product.slug}`}>
                    <img src={product.image[0]} alt={product.name} />
                  </Link>
                  <div className="buttons">
                    <button
                      type="button"
                      className="btn btn-icon"
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <img src="/icons/bag.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div className="info">
                  <h3 className="name">{product.name}</h3>
                  <p className="price">{product.price} USD</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Search
