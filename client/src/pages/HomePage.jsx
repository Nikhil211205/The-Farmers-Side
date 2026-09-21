import { useEffect, useState } from 'react';
import { ArrowRight, Award, CirclePlay, Leaf, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, products as staticProducts } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api';
import { applyProductImages } from '../data/productImages';

function HomePage() {
  const { addToCart, cart, updateCartQuantity } = useAuth();
  const [products, setProducts] = useState(staticProducts.slice(0, 4));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest('/products');
        if (Array.isArray(data) && data.length > 0) {
          setProducts(applyProductImages(data).slice(0, 4));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const featureCards = [
    { label: '100% Natural & Organic', icon: Leaf },
    { label: 'Farm to Cup & Farm to Home', icon: Sparkles },
    { label: 'Expert Diet Consultation', icon: ShieldCheck },
    { label: 'Personalized Fitness Programs', icon: Award },
  ];

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Healthy Food | Better Lifestyle | A Greener Future</p>
            <h1>Pure Goodness From Nature</h1>
            <p>
              Wholesome foods, trusted herbs, and mindful wellness essentials for a balanced life.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/products">Explore Products</Link>
              <Link className="hero-video-link" to="/products"><CirclePlay size={28} /> Watch Video</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        <div className="container feature-grid">
          {featureCards.map(({ label, icon: Icon }) => (
            <div className="feature-card" key={label}>
              <Icon size={21} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div className="section-heading">
            <p className="eyebrow eyebrow-dark">Shop by Category</p>
            <h2>Discover nature's best, handcrafted for your health.</h2>
          </div>

          <div className="category-grid">
            {categories.slice(0, 5).map((category) => (
              <article key={category.name} className="category-card">
                <img src={category.image} alt={category.name} />
                <div className="category-body">
                  <h3>{category.name}</h3>
                  <Link to="/products" className="category-link">Shop Now <ArrowRight size={13} /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-dark">Featured picks</p>
              <h2>Wellness favorites our customers love</h2>
            </div>
            <Link to="/products" className="btn btn-ghost">View all</Link>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article key={product._id || product.id} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  {product.bestSeller && <span className="pill">Best Seller</span>}
                </div>
                <div className="product-body">
                  <div className="product-meta-row">
                    <span>{product.category}</span>
                    <span className="rating"><Star size={14} fill="currentColor" /> {product.rating}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                  <div className="price-row">
                    <strong>₹{product.discountPrice}</strong>
                    <span>₹{product.price}</span>
                  </div>
                  {(() => {
                    const productId = product._id || product.id;
                    const cartItem = cart.find((item) => (item._id || item.id) === productId);

                    return cartItem ? (
                      <div className="quantity-row card-quantity-row full-width" aria-label={`Quantity for ${product.name}`}>
                        <button type="button" onClick={() => updateCartQuantity(productId, cartItem.quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><span>-</span></button>
                        <span>{cartItem.quantity}</span>
                        <button type="button" onClick={() => updateCartQuantity(productId, cartItem.quantity + 1)} aria-label={`Increase ${product.name} quantity`}><span>+</span></button>
                      </div>
                    ) : (
                      <button className="btn btn-primary full-width" type="button" onClick={() => addToCart(product)}>Add to cart</button>
                    );
                  })()}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-plain">
        <div className="container trust-grid">
          <div className="trust-copy">
            <p className="eyebrow eyebrow-dark">Why choose us</p>
            <h2>Natural living, sourced with intention</h2>
            <ul className="trust-list">
              <li><ShieldCheck size={18} /> Organic & Natural</li>
              <li><Award size={18} /> Farm Fresh</li>
              <li><Leaf size={18} /> Carefully Sourced</li>
              <li><Sparkles size={18} /> No unnecessary preservatives</li>
            </ul>
          </div>
          <div className="trust-visual">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
              alt="Wellness products"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
