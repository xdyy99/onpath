import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const posts = useSelector(state => state.blog?.posts || []);
  
  const post = posts.find(p => p.id === parseInt(id));
  const nextPost = posts.find(p => p.id === parseInt(id) + 1);
  
  if (!post) {
    return (
      <div className="blog-detail container">
        <h1>Post not found</h1>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={post.image} alt={post.title} />
      </motion.div>

      <div className="container">
        <motion.div 
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="category">{post.category}</span>
          <h1>{post.title}</h1>
          <div className="blog-meta">
            <span className="date">{post.date}</span>
            <span className="author">By {post.author}</span>
          </div>
        </motion.div>

        <motion.div 
          className="blog-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>{post.content?.paragraph1}</p>
          <p>{post.content?.paragraph2}</p>

          <div className="image-grid">
            <img src={post.content?.image1} alt="Detail 1" />
            <img src={post.content?.image2} alt="Detail 2" />
          </div>

          <p>{post.content?.paragraph3}</p>
          <p>{post.content?.paragraph4}</p>
          <p>{post.content?.paragraph5}</p>
        </motion.div>

        <motion.div 
          className="blog-navigation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/blog" className="btn btn-secondary">Back to Blog</Link>
          {nextPost && (
            <Link to={`/blog/${nextPost.id}`} className="btn btn-primary">
              Next Post: {nextPost.title}
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail; 