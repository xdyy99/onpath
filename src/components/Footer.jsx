import React from 'react'
import { Link } from 'react-router-dom'
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
                <li>
                  <a href="#">
                    <img src="/icons/sc-tiktok.svg" alt="TikTok" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-ins.svg" alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-yt.svg" alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-x.svg" alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-pin.svg" alt="Pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-thread.svg" alt="Threads" />
                  </a>
                </li>
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
                <li>
                  <a href="#">
                    <img src="/icons/sc-tiktok.svg" alt="TikTok" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-ins.svg" alt="Instagram" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-yt.svg" alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-x.svg" alt="YouTube" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-pin.svg" alt="Pinterest" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/icons/sc-thread.svg" alt="Threads" />
                  </a>
                </li>
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
