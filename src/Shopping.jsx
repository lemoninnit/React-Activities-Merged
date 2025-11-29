import React, { useState } from 'react';
import { CategorySidebar, ProductGrid } from './Components/Cards.jsx';

export default function Shopping() {
  const [selectedCategory, setSelectedCategory] = useState('gadget');

  const containerStyle = {
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'var(--bg)',
    minHeight: '100vh'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px 40px'
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'var(--text)',
    fontSize: '2.0rem',
    textTransform: 'uppercase'
  };

  const allProducts = {
    gadget: [
      {
        id: 1,
        name: "iPhone 17 Air",
        description: "The thinnest iPhone ever made with revolutionary design, A19 Bionic chip, and advanced camera system. Experience the future of mobile technology.",
        price: 1199.99,
        src: "https://www.lydogbilde.no/wp-content/uploads/2024/10/iphone-17air-1920x1079.jpg"
      },
      {
        id: 2,
        name: "Best Gaming Laptop",
        description: "Ultimate gaming performance with RTX 5090, Intel Core i9-15900HX, 32GB RAM, and 2TB SSD. Dominate every game with maximum settings.",
        price: 3499.99,
        src: "https://store.ee.co.uk/images/product/uni2/DigitalContent/600x450/hf/HF8C_21DAF1B6-E274-46B9-86CC-04162692EAEB_large.jpg"
      }
    ],
    clothes: [
      {
        id: 3,
        name: "DIOR Luxury Sweater",
        description: "Premium cashmere sweater from Christian Dior's latest collection. Elegant design with superior comfort and timeless style.",
        price: 1299.99,
        src: "https://assets.christiandior.com/is/image/diorprod/513M634A7003C901_E01?$default_GHC$&crop=428,148,1144,1488&wid=1024&hei=1107&scale=0.4843&bfc=on&qlt=85"
      },
      {
        id: 4,
        name: "LACOSTE Polo Shirt",
        description: "Classic Lacoste polo shirt made from premium cotton piqué. Iconic crocodile logo and perfect fit for sophisticated casual wear.",
        price: 89.99,
        src: "https://media.6media.me/media/catalog/product/8/6/8684287307285-1.jpg"
      }
    ],
    merch: [
      {
        id: 5,
        name: "ILLIT - Super Real Me Album",
        description: "ILLIT's debut mini album 'Super Real Me' featuring hit tracks and exclusive photobook. Limited edition with special inclusions.",
        price: 24.99,
        src: "https://m.media-amazon.com/images/I/71GOmr4wEDL._SL1500_.jpg"
      },
      {
        id: 6,
        name: "NewJeans - 2nd EP Album",
        description: "NewJeans' second EP album with all the beloved tracks. Includes photobook, photocards, and exclusive poster.",
        price: 22.99,
        src: "https://images.squarespace-cdn.com/content/v1/5c3398ebaa49a1b1f53eabdf/1688039046344-LTHYDNEMCI680KD98KVO/product.38648.168800425138063.jpg?format=500w"
      }
    ]
  };

  const categories = [
    { id: 'gadget', name: 'Gadgets', icon: '📱' },
    { id: 'clothes', name: 'Clothes', icon: '👕' },
    { id: 'merch', name: 'Merch', icon: '🎵' }
  ];

  const buyNow = (product) => {
    alert(`Proceeding to checkout for ${product.name} - $${product.price}`);
  };

  return (
    <div style={containerStyle}>
      {/* Left Sidebar for Categories */}
      <CategorySidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content Area */}
      <div style={mainContentStyle}>
        <h1 style={titleStyle}>
          {categories.find(cat => cat.id === selectedCategory)?.name} Collection
        </h1>
        
        <ProductGrid
          products={allProducts[selectedCategory]}
          onBuyNow={buyNow}
        />
      </div>
    </div>
  );
}
