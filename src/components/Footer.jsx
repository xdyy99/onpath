import React from 'react'
import { Link } from 'react-router-dom'
import { SOCIAL_LINKS } from '../constants/socialLinks'
import Subscription from './Subscription'

const Footer = () => {
  return (
    <footer className="footer --dark-section">
      <div className="footer-wrapper">
        <div className="footer-image">
          <img src="/images/logo-light2.png" alt="Footer Image" />
        </div>

        <div className="footer-content">
          <div className="footer-row --full">
            <Subscription />
          </div>
          <div className="footer-row">
            <div className="footer-row-item">
              <div className="footer-row-title">Studio</div>
              <ul className="footer-row-list">
                <li>
                  <Link to="/artoflife">Art of Life</Link>
                </li>
                <li>
                  <Link to="/stories">Stories</Link>
                </li>
              </ul>
            </div>
            <div className="footer-row-item --desktop">
              <div className="footer-row-title --right">Social</div>
              <ul className="footer-row-social">
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
          <div className="footer-row">
            <div className="footer-row-item">
              <div className="footer-row-title">Explore</div>
              <ul className="footer-row-list">
                <li>
                  <Link to="/shop">Discover</Link>
                </li>
                <li>
                  <Link to="/shipping-returns">Shipping & Return</Link>
                </li>
                <li>
                  <Link to="/garment-care">Garment Care</Link>
                </li>
                <li>
                  <Link to="/size-guide">Size Guide</Link>
                </li>
                <li>
                  <Link to="/legal">Legal</Link>
                </li>
              </ul>
            </div>
            <div className="footer-row-item --desktop --bottom">
              <div className="footer-text">©Onpathstudio</div>
            </div>
          </div>
          <div className="footer-row --mobile --full">
            <div className="footer-row-item">
              <div className="footer-row-title">Social</div>
              <ul className="footer-row-social">
                {SOCIAL_LINKS.map(({ href, icon, label }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <img src={icon} alt={label} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-row-item ">
              <div className="footer-text">©Onpathstudio</div>
            </div>
          </div>
        </div>
        <div className="footer-gap"></div>
      </div>
    </footer>
  )
}

export default Footer
