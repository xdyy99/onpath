import { Fragment } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const renderHeading = (text) =>
  (text ?? '').split('\n').map((line, i, arr) => (
    <Fragment key={i}>
      {line}
      {i < arr.length - 1 ? <br /> : null}
    </Fragment>
  ))

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const posts = useSelector((state) => state.blog?.posts || [])

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="notfound">
        <div className="notfound-wrapper">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="notfound-title home-title"
          >
            Story missing.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="notfound-text"
          >
            The story you are looking for for does not exist.{' '}
            <Link to="/stories" className="btn btn-primary">
              Back to Stories
              <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  const nextPost = posts.find((p) => p.id === parseInt(post.id) + 1)
  const previousPost = posts.find((p) => p.id === parseInt(post.id) - 1)

  return (
    <div className="article">
      <div className="article-wrapper">
        <motion.h1
          key={`title-${slug}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          {post.title}
        </motion.h1>
        <motion.div
          key={`content-${slug}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="article-content"
        >
          <div className="article-banner">
            <img src={post.content.image[0]} alt={post.title} />
          </div>
          <div className="article-description --center">
            <h2>{renderHeading(post.content.heading?.[0])}</h2>
            <p>{post.content.paragraph?.[0]}</p>
          </div>

          <div>
            <div className="article-col">
              <div className="article-col-image">
                <img
                  style={{ transform: 'rotate(-2deg)' }}
                  src={post.content.image[1]}
                  alt={post.title}
                />
              </div>
              <div className="article-description">
                <h4>{renderHeading(post.content.heading?.[1])}</h4>
                <p>{post.content.paragraph?.[1]}</p>
              </div>
              <div className="article-col-gap"></div>
            </div>

            <div className="article-col --reverse">
              <div className="article-col-image">
                <img
                  style={{ transform: 'rotate(2deg)' }}
                  src={post.content.image[2]}
                  alt={post.title}
                />
              </div>
              <div className="article-description">
                <h4>{renderHeading(post.content.heading?.[2])}</h4>
                <p>{post.content.paragraph?.[2]}</p>
              </div>
              <div className="article-col-gap"></div>
            </div>
          </div>

          <div className="article-description --center">
            <p>{post.content.paragraph?.[3]}</p>
            <p>{post.content.paragraph?.[4]}</p>
          </div>

          <div className="article-image --med --center">
            <img
              style={{ transform: 'rotate(-1deg)' }}
              src={post.content.image[3]}
              alt={post.title}
            />
          </div>
          <div className="article-description --center">
            <p>{post.content.paragraph?.[5]}</p>
          </div>
        </motion.div>

        <div className="article-related">
          {previousPost && (
            <div className="article-related-item --prev">
              <div className="image">
                <img
                  style={{ transform: 'rotate(-2deg)' }}
                  src={previousPost.thumbnail}
                  alt={previousPost.title}
                />
                <Link
                  className="btn btn-rounded"
                  to={`/stories/${previousPost.slug}`}
                >
                  <img
                    style={{ transform: 'rotate(180deg)' }}
                    src="/icons/arr-right-long.svg"
                    alt="arrow-prev"
                  />
                </Link>
              </div>
              <h3 className="title">{previousPost.title}</h3>
            </div>
          )}
          {nextPost && (
            <div className="article-related-item --next">
              <div className="image">
                <img
                  style={{ transform: 'rotate(2deg)' }}
                  src={nextPost.thumbnail}
                  alt={nextPost.title}
                />
                <Link
                  className="btn btn-rounded"
                  to={`/stories/${nextPost.slug}`}
                >
                  <img src="/icons/arr-right-long.svg" alt="arrow-next" />
                </Link>
              </div>
              <h3 className="title">{nextPost.title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
