import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { removeItem, updateQuantity, clearCart } from '../store/slices/cartSlice';

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="cart container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Cart is Empty
        </motion.h1>
      </div>
    );
  }

  return (
    <div className="cart container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Cart
      </motion.h1>

      <div className="cart-items">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="cart-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <div className="quantity-controls">
              <button
                className="btn"
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="btn"
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total">
          <h3>Total:</h3>
          <p>${total.toFixed(2)}</p>
        </div>
        <button className="btn btn-primary">Checkout</button>
        <button
          className="btn btn-secondary"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Cart; 