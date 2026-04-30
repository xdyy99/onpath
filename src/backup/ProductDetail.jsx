import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { addItem } from '../store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);
  const product = products.find(item => item.id === parseInt(id));

  const handleAddToCart = () => {
    dispatch(addItem(product));
  };

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter(item => item.id !== parseInt(id))
    .slice(0, 3);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h1>Product not found</h1>
          <Link to="/shop" className="btn">Return to Shop</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="product-hero">
        <motion.div
          className="product-image"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} />
        </motion.div>

        <motion.div
          className="product-info"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1>{product.name}</h1>
          <div className="price">${product.price.toFixed(2)}</div>
          <p className="description">{product.description}</p>

          <div className="product-specs">
            <h3>Product Specifications</h3>
            <ul>
              <li>
                <span>Display</span>
                <span>6.7-inch Super Retina XDR display</span>
              </li>
              <li>
                <span>Processor</span>
                <span>A17 Pro chip with 6-core CPU</span>
              </li>
              <li>
                <span>Storage</span>
                <span>256GB, 512GB, 1TB, or 2TB</span>
              </li>
              <li>
                <span>Camera</span>
                <span>48MP Main | 12MP Ultra Wide | 12MP Telephoto</span>
              </li>
              <li>
                <span>Battery</span>
                <span>Up to 23 hours video playback</span>
              </li>
              <li>
                <span>Security</span>
                <span>Face ID with TrueDepth camera</span>
              </li>
            </ul>
          </div>

          <div className="product-actions">
            <button className="btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/shop" className="btn btn-outline">
              Back to Shop
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="product-content">
        <motion.div
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>{product.content.section1.text}</p>
          <div className="content-image">
            <img src={product.content.section1.image} alt={`${product.name} - Performance`} />
          </div>
        </motion.div>

        <motion.div
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p>{product.content.section2.text}</p>
          <div className="content-image">
            <img src={product.content.section2.image} alt={`${product.name} - Camera System`} />
          </div>
        </motion.div>

        <motion.div
          className="content-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p>{product.content.section3.text}</p>
          <div className="content-image">
            <img src={product.content.section3.image} alt={`${product.name} - Display Technology`} />
          </div>
        </motion.div>

        <motion.div
          className="final-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>{product.content.conclusion1}</p>
          <p>{product.content.conclusion2}</p>
        </motion.div>

        <motion.div
          className="related-products"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h2>Related Products</h2>
          <div className="related-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-card">
                <img src={relatedProduct.image} alt={relatedProduct.name} />
                <div className="related-content">
                  <h3>{relatedProduct.name}</h3>
                  <div className="price">${relatedProduct.price.toFixed(2)}</div>
                  <p className="description">{relatedProduct.description}</p>
                  <Link to={`/shop/${relatedProduct.id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail; 