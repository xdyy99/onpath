import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Blog = () => {
  const posts = useSelector(state => state.blog?.posts || []);

  return (
    <div className="blog container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Blog
      </motion.h1>

      <div className="blog-grid">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            className="blog-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to={`/blog/${post.id}`} className="blog-image">
              <img src={post.image} alt={post.title} />
            </Link>
            <div className="blog-content">
              <span className="category">{post.category}</span>
              <div className="blog-meta">
                <span className="date">{post.date}</span>
                <span className="author">By {post.author}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link to={`/blog/${post.id}`} className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};

export default Blog; 