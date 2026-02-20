# ShopZone 🛍️

A modern, responsive e-commerce web application built with React and Vite. ShopZone provides a seamless shopping experience with product browsing, cart management, and checkout functionality.

Link to vercel app: https://shopzone-liart.vercel.app/


Features:

 **Category Browsing**: Quick access to different product categories (Electronics, Fashion, Home, Sports)
 
 **Featured Products**: Showcase of 6 featured products with images, prices, and ratings

 **Product Catalog**: Browse through a wide range of products from the DummyJSON API

**Product Details**: Detailed product pages with images, descriptions, and pricing

**Shopping Cart**: 
  - Add/remove products
  - Update quantities
  - View product images in cart items
  - Order summary with product thumbnails
  - Real-time total calculation

**Login System**: Simple guest login functionality

**Protected Routes**: Checkout page requires authentication

**User Session**: Persistent login state

**Responsive Layout**: Fully responsive design for mobile, tablet, and desktop


## Tech Stack

- **React 19.2.0** - UI library
- **React Router DOM 7.13.0** - Routing
- **Vite 7.3.1** - Build tool and dev server
- **Context API** - State management for cart and authentication

## Project Structure

```
shopzone/
├── public/  
├── src/
│   ├── components/
│   │   ├── Footer.jsx     
│   │   ├── Navbar.jsx     
│   │   └── ProductCard.jsx  
│   ├── context/
│   │   ├── Authcontext.jsx  
│   │   ├── Cartcontext.jsx 
│   │   └── ToastContext.jsx 
│   ├── Pages/
│   │   ├── Cart.jsx        
│   │   ├── Checkout.jsx   
│   │   └── Contact.jsx    
│   │   ├── Home.jsx         
│   │   ├── Login.jsx     
│   │   ├── ProductDetail.jsx 
│   │   ├── Shop.jsx        
│   ├── App.jsx              
│   ├── index.css                          
│   └── main.jsx  
├── index.html                 
├── package.json          
├── PROMPTS.md       
└── README.md      
```



### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone "https://github.com/GarimaAvasthi/shopzone.git"
cd shopzone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```


### Shopping Flow

1. **Browse Products**: Navigate to the Shop page to see all available products
2. **View Details**: Click on any product to see detailed information
3. **Add to Cart**: Click "Add to Cart" on any product page
4. **Manage Cart**: 
   - View cart items with images
   - Update quantities
   - Remove items
   - See order summary with product thumbnails
5. **Checkout**: 
   - Click "Proceed to Checkout"
   - Login if not already logged in
   - Complete checkout process

### Authentication

- Click the "Login" button in the navbar
- Use "Login as Guest" to access protected routes
- Click "Logout" when logged in to end your session

## API Integration

The application uses the [DummyJSON API](https://dummyjson.com/) for product data:
- Product listing: `https://dummyjson.com/products?limit=200`
- Product details: `https://dummyjson.com/products/{id}`


## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

---

**Note**: This is a demo e-commerce application using mock data from DummyJSON API. For production use, integrate with a real backend API and payment gateway.
