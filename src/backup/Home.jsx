import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Loader, Center, Environment, AccumulativeShadows, RandomizedLight, ContactShadows } from '@react-three/drei';
import { Suspense, useState } from 'react';
import Model from '../components/Model';
import { addItem } from '../store/slices/cartSlice';

// Mock products data for featured section
const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    description: "Experience the power of A17 Pro chip, titanium design, and revolutionary camera system."
  },
  {
    id: 2,
    name: "Vision Pro",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop&q=80",
    description: "Step into the future of spatial computing with groundbreaking visionOS and immersive experiences."
  },
  {
    id: 3,
    name: "MacBook Pro 16\"",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
    description: "Supercharged by M3 Max. Up to 96GB unified memory. Up to 22 hours battery life."
  }
];

// Fallback component while the model is loading
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#2997ff" />
    </mesh>
  );
}

const Home = () => {
  const products = useSelector(state => state.products?.items || []);
  const dispatch = useDispatch();
  const blogPosts = useSelector(state => state.blog?.posts || []);
  const [modelError, setModelError] = useState(false);

  const latestPosts = blogPosts.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Next Generation Tech
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the future of technology today
          </motion.p>
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/shop" className="btn btn-primary">Explore Shop</Link>
            <Link to="/blog" className="btn btn-secondary">Read Blog</Link>
          </motion.div>
        </div>

        <div className="hero-3d">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 35 }}
            onError={() => setModelError(true)}
          >
            <ambientLight intensity={0.5} />
            <spotLight
              position={[100, 100, 100]}
              angle={0.15}
              penumbra={1}
              intensity={2.5}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <spotLight
              position={[-100, -100, -100]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <directionalLight
              position={[0, 5, 5]}
              intensity={2}
              castShadow
              shadow-mapSize={[1024, 1024]}
            />

            <Suspense fallback={<LoadingFallback />}>
              {!modelError && (
                <Float
                  speed={1.5}
                  rotationIntensity={0.5}
                  floatIntensity={0.5}
                >
                  <Center>
                    <Model />
                    </Center>
                  <Center>
                    <ContactShadows
                      opacity={0.4}
                      scale={200}
                      blur={2}
                      far={100}
                      resolution={1024}
                      color="#000000"
                    />
                  </Center>
                </Float>
              )}
              {modelError && <LoadingFallback />}
              <Environment preset="studio" background={false} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Canvas>
          <Loader />
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="featured-grid">
            {featuredProducts.map(product => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img src={product.image} alt={product.name} />
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
          <div className="view-all">
            <Link to="/shop" className="btn btn-secondary">View All Products</Link>
          </div>
        </div>
      </section>

      <section className="blog-preview">
        <div className="container">
          <h2>Latest from Our Blog</h2>
          <div className="blog-preview-grid">
            {latestPosts.map(post => (
              <motion.div
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="blog-image">
                  <img src={post.image} alt={post.title} />
                </div>
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
              </motion.div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/blog" className="btn btn-primary">View All Posts</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 