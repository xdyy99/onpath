import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const CATEGORIES = ['All', 'Lifestyle', 'Collections', 'Films']

const formatCount = (n) => `(${String(n).padStart(2, '0')})`

const Blog = () => {
  const posts = useSelector((state) => state.blog?.posts || [])
  const [activeCategory, setActiveCategory] = useState('All')

  const counts = useMemo(() => {
    const totals = { All: posts.length }
    for (const cat of CATEGORIES) {
      if (cat === 'All') continue
      totals[cat] = posts.filter((p) => p.category === cat).length
    }
    return totals
  }, [posts])

  const visiblePosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((p) => p.category === activeCategory)
  }, [posts, activeCategory])

  const [hoveredIndex, setHoveredIndex] = useState(0)

  useEffect(() => {
    setHoveredIndex(0)
  }, [activeCategory])

  return (
    <div className="blog">
      <div className="blog-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="blog-title home-title"
        >
          Stories
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="blog-content"
        >
          <div className="blog-filters --desktop">
            {CATEGORIES.map((cat) => (
              <div
                key={cat}
                className={`blog-filters-item${
                  activeCategory === cat ? ' --active' : ''
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'All' ? 'ALL' : cat}{' '}
                <span className="number">{formatCount(counts[cat] ?? 0)}</span>
              </div>
            ))}
          </div>
          <div className="blog-filters --mobile">
            <div className="blog-filters-item --active">
              <div className="head">
                <div className="name">Filter</div>
                <div className="icon">
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-list">
            {visiblePosts.map((post, index) => (
              <Link
                to={`/stories/${post.slug}`}
                className={`blog-list-item${
                  hoveredIndex === index ? ' --hover' : ''
                }`}
                key={post.id}
                onMouseEnter={() => setHoveredIndex(index)}
              >
                <div className="title">{post.title}</div>

                <div className="image">
                  <img src={post.thumbnail} alt={post.title} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Blog
