import fruitsCategoryImg from '../assets/products/fruits-category.png';
import herbsProductImg from '../assets/products/Herbs.png';
import { Link } from 'react-router-dom';

const wishlistItems = [
  {
    id: 1,
    name: 'Herbal Wellness Blend',
    price: 549,
    image: herbsProductImg,
  },
  {
    id: 2,
    name: 'Organic Fruit Box',
    price: 799,
    image: fruitsCategoryImg,
  },
];

function WishlistPage() {
  return (
    <div className="container page-section">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow eyebrow-dark">Wishlist</p>
          <h1>Saved for later</h1>
        </div>
        <Link to="/products" className="btn btn-ghost">Browse products</Link>
      </div>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item card-shell">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <div className="product-actions-row">
              <button className="btn btn-primary">Move to cart</button>
              <button className="btn btn-secondary">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
