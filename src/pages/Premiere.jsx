import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const Premire = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  // const posts = useSelector((state) => state.premire?.posts || [])

  // const post = posts.find((p) => p.id === parseInt(id))
  // const nextPost = posts.find((p) => p.id === parseInt(id) + 1)
  // const previousPost = posts.find((p) => p.id === parseInt(id) - 1)

  // if (!post) {
  //   return (
  //     <div className="premire container">
  //       <h1>Page not found</h1>
  //       <Link to="/" className="btn btn-primary">
  //         Back to Home
  //       </Link>
  //     </div>
  //   )
  // }

  return (
    <div className="premire">
      <div className="premire-hero">
        <div className="premire-hero-wrapper">
          <div className="premire-hero-content">
            <h1 className="premire-hero-title">THe Arcane</h1>
            <div className="premire-hero-info">
              <div className="role">Director</div>
              <div className="name">Antoine Perez</div>
            </div>
          </div>
          <div className="premire-hero-image">
            <img src="/images/premiere/pre1.jpg" alt="premire" />
            <button className="btn btn-rounded">PLAY REEL</button>
          </div>
        </div>
      </div>

      <div className="premire-overview">
        <div className="premire-overview-wrapper">
          <div className="premire-overview-content">
            <div className="premire-subtitle">OVERVIEW</div>
            <div className="premire-overview-text">
              The short marks the commercial directorial debut of our amazing
              Antoine Perez! The script writing stage was key on this one and it
              helped us steer the film towards a moodier and darker tone. This
              project was so much fun to make , the team was incredible! And the
              music... let’s talk about this music for a sec. How frigging
              authentic is that track?! We teamed up with the formidable Box of
              Toys and singer-songwriter Shihori, to create an absolutely
              perfect track that matches the film’s explosiveness.
            </div>
          </div>
        </div>
      </div>

      <div className="premire-cloth">
        <div className="premire-cloth-wrapper">
          <div className="premire-cloth-content">
            <div className="premire-subtitle">Clothing</div>
            <div className="premire-cloth-image">
              <img src="/images/premiere/pre2.jpg" alt="premire" />

              <div className="premire-cloth-cards">
                <div className="premire-cloth-card">
                  <div className="dot">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="tooltip">
                    <img
                      className="image"
                      src="/images/premiere/pre-dt.jpg"
                      alt="premire"
                    />
                    <div className="text">Limited Edition</div>
                  </div>
                </div>
                <div className="premire-cloth-card">
                  <div className="dot">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="tooltip">
                    <img
                      className="image"
                      src="/images/premiere/pre-dt.jpg"
                      alt="premire"
                    />
                    <div className="text">Limited Edition</div>
                  </div>
                </div>
                <div className="premire-cloth-card">
                  <div className="dot">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="tooltip">
                    <img
                      className="image"
                      src="/images/premiere/pre-dt.jpg"
                      alt="premire"
                    />
                    <div className="text">Limited Edition</div>
                  </div>
                </div>
                <div className="premire-cloth-card">
                  <div className="dot">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="tooltip">
                    <img
                      className="image"
                      src="/images/premiere/pre-dt.jpg"
                      alt="premire"
                    />
                    <div className="text">Limited Edition</div>
                  </div>
                </div>
                <div className="premire-cloth-card">
                  <div className="dot">
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="tooltip">
                    <img
                      className="image"
                      src="/images/premiere/pre-dt.jpg"
                      alt="premire"
                    />
                    <div className="text">Limited Edition</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="premire-sheet">
        <div className="premire-sheet-wrapper">
          <div className="premire-sheet-content">
            <div className="premire-subtitle">Modelsheets</div>
            <div className="premire-sheet-images">
              <img src="/images/premiere/pre3.jpg" alt="premire" />
              <img src="/images/premiere/pre4.jpg" alt="premire" />
            </div>
          </div>
        </div>
      </div>

      <div className="premire-gallery">
        <div className="premire-gallery-wrapper">
          <div className="premire-sheet-content">
            <div className="premire-subtitle">Gallery</div>
            <div className="premire-gallery-images">
              <img
                className="premire-gallery-image"
                src="/images/premiere/pre5.jpg"
                alt="premire"
              />
              <img
                className="premire-gallery-image"
                src="/images/premiere/pre6.jpg"
                alt="premire"
              />
              <img
                className="premire-gallery-image"
                src="/images/premiere/pre7.jpg"
                alt="premire"
              />
              <img
                className="premire-gallery-image"
                src="/images/premiere/pre8.jpg"
                alt="premire"
              />
              <img
                className="premire-gallery-image"
                src="/images/premiere/pre9.jpg"
                alt="premire"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Premire
