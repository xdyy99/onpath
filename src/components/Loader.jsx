import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LOGO_INTRO_DURATION = 0.45

function Loader() {
  const [progress, setProgress] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)

  useEffect(() => {
    const imgs = Array.from(document.querySelectorAll('img'))
    const total = imgs.length

    if (total === 0) {
      setProgress(100)
      setAllLoaded(true)
      return
    }

    let loaded = 0

    const bump = () => {
      loaded += 1
      setProgress(Math.round((loaded / total) * 100))
      if (loaded >= total) {
        setAllLoaded(true)
      }
    }

    imgs.forEach((img) => {
      if (img.complete && img.naturalHeight !== 0) {
        bump()
      } else {
        img.addEventListener('load', bump)
        img.addEventListener('error', bump)
      }
    })

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener('load', bump)
        img.removeEventListener('error', bump)
      })
    }
  }, [])

  return (
    <motion.div
      className={`loader ${allLoaded ? '--loaded' : ''}`}
      initial={{ opacity: 1 }}
      animate={allLoaded ? { opacity: 0 } : { opacity: 1 }}
      transition={{
        duration: 0.55,
        ease: [0.4, 0, 0.2, 1],
        delay: allLoaded ? LOGO_INTRO_DURATION : 0,
      }}
    >
      <div className="loader-logo">
        <img src="/images/logo-light2.png" alt="" />
        <img
          src="/images/logo-light2.png"
          alt=""
          style={{ height: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}

export default Loader
