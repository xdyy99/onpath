import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SOCIAL_LINKS } from '../constants/socialLinks'

const NAVBAR_HEIGHT = 100

const Navbar = () => {
  const { items, totalQuantity } = useSelector((state) => state.cart)
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { pathname } = useLocation()
  const navRef = useRef(null)
  const [isDark, setIsDark] = useState(false)

  const navLinkClass = ({ isActive }) => (isActive ? '--active' : '')

  useEffect(() => {
    document.getElementById('navbar-menu')?.classList.remove('--active')
    document.getElementById('contact')?.classList.remove('--active')
  }, [pathname])

  useEffect(() => {
    const update = () => {
      const sections = document.querySelectorAll('[class~="--dark-section"]')
      const navHeight = navRef.current?.offsetHeight ?? NAVBAR_HEIGHT
      let overlapping = false
      for (const section of sections) {
        const { top, bottom } = section.getBoundingClientRect()
        if (top < navHeight && bottom > 0) {
          overlapping = true
          break
        }
      }
      setIsDark(overlapping)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [pathname])

  const handleOpenContact = () => {
    const contact = document.getElementById('contact')
    contact.classList.add('--active')
  }

  const handleOpenBag = () => {
    const bag = document.getElementById('bag')
    bag.classList.add('--active')
  }

  const handleOpenMenu = () => {
    const navbarMenu = document.getElementById('navbar-menu')
    navbarMenu.classList.add('--active')
  }

  const handleCloseMenu = () => {
    const navbarMenu = document.getElementById('navbar-menu')
    navbarMenu.classList.remove('--active')
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`navbar${isDark ? ' --dark' : ''}`}
      >
        <div className="navbar-brand ">
          <Link to="/">
            <img src="/images/logo-dark.png" alt="Onpath Studio" />
            <img src="/images/logo-light.png" alt="Onpath Studio" />
          </Link>
        </div>
        <div className="navbar-links">
          <NavLink to="/artoflife" className={navLinkClass}>
            The Art of Life
          </NavLink>
          <NavLink to="/essence" className={navLinkClass}>
            Essence
          </NavLink>
          <NavLink to="/stories" className={navLinkClass}>
            Stories
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            Discover
          </NavLink>
        </div>
        <div className="navbar-buttons">
          {/* <Link className="navbar-button" to="/">
            <img src="/icons/search.svg" alt="Search" />
          </Link> */}

          {/* {!isAuthenticated ? (
            <Link className="navbar-button" to="/login">
              <img src="/icons/account.svg" alt="Account Logged Out" />
            </Link>
          ) : (
            <Link className="navbar-button" to="/profile">
              <img src="/icons/account.svg" alt="Account Logged In" />
            </Link>
          )} */}

          <button className="navbar-button" onClick={() => handleOpenBag()}>
            <img src="/icons/bag.svg" alt="Bag" />
            {!totalQuantity ? (
              ''
            ) : (
              <span className="noti"> {totalQuantity} </span>
            )}
          </button>

          <button className="navbar-button" onClick={() => handleOpenContact()}>
            <img src="/icons/menu.svg" alt="Menu" />
          </button>
        </div>
        <div className="navbar-mobile navbar-buttons">
          {/* <Link className="navbar-button" to="/">
            <img src="/icons/search.svg" alt="Search" />
          </Link> */}

          <button className="navbar-button" onClick={() => handleOpenBag()}>
            <img src="/icons/bag.svg" alt="Bag" />
            {!totalQuantity ? (
              ''
            ) : (
              <span className="noti"> {totalQuantity} </span>
            )}
          </button>

          <button className="navbar-button" onClick={() => handleOpenMenu()}>
            <img src="/icons/menu.svg" alt="Menu " />
          </button>
        </div>
      </motion.nav>

      <div
        className="navbar-menu navbar-mobile"
        data-lenis-prevent
        id="navbar-menu"
      >
        <div className="contact-wrapper">
          <div className="contact-header">
            <div className="contact-title">Menu</div>
            <div className="contact-close" onClick={handleCloseMenu}>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
          <div className="contact-content">
            <div className="navbar-menu-list">
              <NavLink to="/artoflife" className={navLinkClass}>
                The Art of Life
              </NavLink>
              <NavLink to="/essence" className={navLinkClass}>
                Essence
              </NavLink>
              <NavLink to="/stories" className={navLinkClass}>
                Stories
              </NavLink>
              <NavLink to="/shop" className={navLinkClass}>
                Discover
              </NavLink>
              {/* <Link to="/search">Search</Link> */}

              <button to="/bag" onClick={() => handleOpenBag()}>
                Bag
                {!totalQuantity ? '' : `(${totalQuantity})`}
              </button>

              {/* {!isAuthenticated ? (
                <Link to="/login">Login / Register</Link>
              ) : (
                <Link to="/profile">Profile</Link>
              )} */}

              <button to="/contact" onClick={() => handleOpenContact()}>
                Contact
              </button>
            </div>
          </div>
          <div className="contact-footer">
            <div className="contact-footer-title">Follow us</div>
            <ul className="contact-social">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt={label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="contact-background"></div>
      </div>
    </>
  )
}

export default Navbar
