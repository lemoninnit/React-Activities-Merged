import React from 'react';

// Product Card Component
export function ProductCard(props) {
  const cardStyle = {
    backgroundColor: 'var(--panel)',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
    overflow: 'hidden',
    width: '350px',
    transition: 'transform 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--border)'
  };

  const titleStyle = {
    padding: '20px 20px 10px 20px'
  };

  const nameStyle = {
    margin: '0',
    fontSize: '1.3rem',
    color: 'var(--text)',
    fontWeight: 'bold',
    textAlign: 'center'
  };

  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minHeight: '290px'
  };

  const imageStyle = {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    backgroundColor: '#0d1324',
    borderRadius: '8px',
    border: '2px solid var(--border)'
  };

  const contentStyle = {
    padding: '20px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  };

  const descriptionStyle = {
    margin: '0 0 15px 0',
    color: 'var(--muted)',
    lineHeight: '1.5',
    fontSize: '0.9rem',
    textAlign: 'center',
    flex: 1
  };

  const priceStyle = {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    color: 'var(--accent)',
    margin: '15px 0 20px 0',
    textAlign: 'center'
  };

  const buyNowButtonStyle = {
    width: '100%',
    padding: '12px 20px',
    backgroundImage: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s ease'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Product Info Top */}
      <div style={titleStyle}>
        <h2 style={nameStyle}>
          {props.product.name}
        </h2>
      </div>

      {/* Square Image in Middle */}
      <div style={imageContainerStyle}>
        <img 
          src={props.product.src}
          alt={props.product.name}
          style={imageStyle}
        />
      </div>
      
      {/* Product Info Bottom */}
      <div style={contentStyle}>
        <p style={descriptionStyle}>
          {props.product.description}
        </p>
        
        <div style={priceStyle}>
          ${props.product.price}
        </div>
        
        {/* Buy Now Button Only */}
        <button
          onClick={() => props.onBuyNow(props.product)}
          style={buyNowButtonStyle}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}

// Category Button Component
export function CategoryButton(props) {
  const buttonStyle = {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    marginBottom: '10px',
    backgroundColor: props.isSelected ? 'var(--panel2)' : 'transparent',
    color: 'var(--text)',
    border: props.isSelected ? '1px solid var(--border)' : '1px solid var(--border)',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    textAlign: 'left'
  };

  const iconStyle = {
    marginRight: '10px',
    fontSize: '1.2rem'
  };

  return (
    <button
      onClick={() => props.onClick(props.category.id)}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!props.isSelected) {
          e.target.style.backgroundColor = 'var(--panel2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!props.isSelected) {
          e.target.style.backgroundColor = 'transparent';
        }
      }}
    >
      <span style={iconStyle}>
        {props.category.icon}
      </span>
      {props.category.name}
    </button>
  );
}

// Category Sidebar Component
export function CategorySidebar(props) {
  const sidebarStyle = {
    width: '220px',
    backgroundColor: 'var(--panel)',
    padding: '20px',
    borderRight: '1px solid var(--border)'
  };

  const titleStyle = {
    color: 'var(--text)',
    marginBottom: '20px',
    fontSize: '1.2rem',
    textAlign: 'center'
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={titleStyle}>
        Categories
      </h2>
      
      {props.categories.map(category => (
        <CategoryButton
          key={category.id}
          category={category}
          isSelected={props.selectedCategory === category.id}
          onClick={props.onCategoryChange}
        />
      ))}
    </div>
  );
}

// Product Grid Component
export function ProductGrid(props) {
  const gridStyle = {
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div style={gridStyle}>
      {props.products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onBuyNow={props.onBuyNow}
        />
      ))}
    </div>
  );
}
