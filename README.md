# Modern E-commerce + 3D Template

A modern, responsive e-commerce template built with React, featuring 3D product visualization, animations, and a clean design aesthetic.

## Features

- **3D Product Showcase**
  - Interactive 3D model viewer using Three.js and React Three Fiber
  - Smooth animations and auto-rotation
  - Custom lighting and shadows
  - Fallback loading state

- **Modern UI/UX**
  - Responsive design
  - Smooth animations with Framer Motion
  - Glass morphism effects
  - Gradient backgrounds
  - Product cards with hover effects

- **E-commerce Features**
  - Product catalog with filtering
  - Shopping cart functionality
  - User authentication
  - Blog section
  - Featured products section

- **Tech Stack**
  - React
  - Redux for state management
  - React Router for navigation
  - Three.js + React Three Fiber for 3D
  - Framer Motion for animations
  - SCSS for styling

## Project Structure

```
src/
├── components/
│   ├── Model.jsx          # 3D model component
│   └── Navbar.jsx         # Navigation component
├── pages/
│   ├── Home.jsx          # Landing page with 3D showcase
│   ├── Shop.jsx          # Product catalog
│   ├── Blog.jsx          # Blog posts
│   ├── Cart.jsx          # Shopping cart
│   └── Login.jsx         # Authentication
├── store/
│   └── slices/
│       ├── authSlice.js   # Authentication state
│       └── cartSlice.js   # Shopping cart state
└── styles/
    └── main.scss         # Global styles
```

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Dependencies

- react
- react-router-dom
- @reduxjs/toolkit
- @react-three/fiber
- @react-three/drei
- three
- framer-motion
- sass

## Customization

### 3D Model
- Replace the model in `/public/models/` with your own GLB file
- Update the `Model` component in `src/components/Model.jsx`

### Styling
- Main color scheme in `src/styles/main.scss`
- Component-specific styles in their respective files

### Products
- Update the product data in `src/pages/Shop.jsx`
- Modify the featured products in `src/pages/Home.jsx`

### Blog
- Update the blog posts data in `src/pages/Blog.jsx`

## License

MIT License

## Credits

- 3D model visualization powered by React Three Fiber
- Product images from Unsplash
- Icons from [icon-source]

## Support

For support, please open an issue in the repository or contact [contact-info].
