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

const uniqueProductValues = (products, key) => {
  const set = new Set()
  for (const p of products) {
    const values = p[key]
    if (Array.isArray(values)) {
      for (const v of values) if (v) set.add(v)
    }
  }
  return Array.from(set).sort()
}

const buildFilterGroups = (products) => {
  const groups = []
  const collections = uniqueProductValues(products, 'collection')
  if (collections.length) {
    groups.push({ key: 'collection', name: 'Collection', options: collections })
  }
  const genders = uniqueProductValues(products, 'gender')
  if (genders.length) {
    groups.push({ key: 'gender', name: 'Gender', options: genders })
  }
  const sizes = uniqueProductValues(products, 'size')
  if (sizes.length) {
    groups.push({ key: 'size', name: 'Size', options: sizes })
  }
  const colors = uniqueProductValues(products, 'color')
  if (colors.length) {
    groups.push({ key: 'color', name: 'Color', options: colors })
  }
  groups.push(SORT_GROUP)
  return groups
}

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

const formatCount = (n) => `(${String(n).padStart(2, '0')})`

const Shop = () => {
  const products = useSelector((state) => state.products?.items || [])
  const status = useSelector((state) => state.products?.status)
  const error = useSelector((state) => state.products?.error)
  const dispatch = useDispatch()

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const filterGroups = useMemo(() => buildFilterGroups(products), [products])

  const [filters, setFilters] = useState(() =>
    syncFilterState(filterGroups, {})
  )
  const [openKey, setOpenKey] = useState(null)

  useEffect(() => {
    setFilters((prev) => syncFilterState(filterGroups, prev))
  }, [filterGroups])

  const visibleProducts = useMemo(() => {
    const matchesGroup = (productValues, selected) => {
      if (!selected.length) return true
      if (!Array.isArray(productValues)) return false
      return selected.some((s) => productValues.includes(s))
    }

    const filtered = products.filter(
      (product) =>
        matchesGroup(product.collection, filters.collection?.selected || []) &&
        matchesGroup(product.gender, filters.gender?.selected || []) &&
        matchesGroup(product.size, filters.size?.selected || []) &&
        matchesGroup(product.color, filters.color?.selected || [])
    )

    const sortKey = filters.sortBy?.selected[0]
    if (!sortKey) return filtered

    const byDate = (a, b) =>
      new Date(a.createdAt || 0).getTime() -
      new Date(b.createdAt || 0).getTime()

    const sorted = [...filtered]
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
  }, [products, filters])

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

  const selectAll = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: { ...prev[key], selected: [] },
    }))
  }

  const toggleOption = (key, option) => {
    setFilters((prev) => {
      const group = filterGroups.find((g) => g.key === key)
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

  const renderFilterGroup = (group, displayName) => {
    const state = filters[group.key] || { selected: [] }
    const count = state.selected.length
    const allActive = count === 0
    const isOpen = openKey === group.key
    const isSingle = group.mode === 'single'
    return (
      <div
        className={`shop-filters-item${isOpen ? ' --open' : ''}`}
        key={group.key}
      >
        <div className="head" onClick={() => toggleOpen(group.key)}>
          <div className="name">
            {displayName ?? group.name}{' '}
            {!isSingle && count > 0 && (
              <span className="number">{formatCount(count)}</span>
            )}{' '}
          </div>
          <div className="icon">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <ul className="list">
          {!isSingle && (
            <li
              className={allActive ? '--active' : ''}
              onClick={() => selectAll(group.key)}
            >
              All
            </li>
          )}
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

  return (
    <div className="shop">
      <div className="shop-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="shop-title home-title"
        >
          shop
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="shop-filters --desktop" ref={desktopFiltersRef}>
            {filterGroups.map((group) => renderFilterGroup(group))}
          </div>
          <div className="shop-filters --mobile" ref={mobileFiltersRef}>
            {filterGroups[0] && renderFilterGroup(filterGroups[0], 'Filter')}
          </div>
          <div className="shop-grid">
            {status === 'loading' && (
              <div className="shop-empty">Loading products…</div>
            )}
            {status === 'failed' && (
              <div className="shop-empty">Error loading products: {error}</div>
            )}
            {status === 'succeeded' && visibleProducts.length === 0 && (
              <div className="shop-empty">No products match your filters.</div>
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
                    {/* <button
                    type="button"
                    className="btn btn-icon"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <img src="/icons/heart.svg" alt="" />
                  </button> */}
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

export default Shop
