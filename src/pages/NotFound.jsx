import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="notfound">
      <div className="notfound-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="notfound-title home-title"
        >
          Page not found.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="notfound-text"
        >
          The page you are looking for does not exist.{' '}
          <Link to="/" className="btn btn-primary">
            Back to Home
            <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
