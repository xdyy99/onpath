import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      // Here you would typically make an API call to your authentication service
      // For now, we'll just simulate a successful login
      if (isRegister && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch(loginSuccess({
        id: 1,
        email: formData.email,
      }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isRegister && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <button
          className="btn btn-secondary toggle-auth"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? 'Already have an account? Login'
            : "Don't have an account? Register"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login; 