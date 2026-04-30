import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addItem } from '../store/slices/cartSlice';

const Shop = () => {
  const products = useSelector(state => state.products?.items || []);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="shop">
      <h1>Our Products</h1>
      <div className="grid">
        {products.map(product => (
          <motion.div
            key={product.id}
            className="product-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`/shop/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
            <p className="description">{product.description}</p>
            <div className="product-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
              <Link to={`/shop/${product.id}`} className="btn btn-outline">
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Shop; 