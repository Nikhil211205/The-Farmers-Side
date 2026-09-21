import { useEffect, useMemo, useState } from 'react';
import { Filter, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../context/AuthContext';
import { applyProductImages } from '../data/productImages';

function ShopPage() {
  const { addToCart, cart, updateCartQuantity } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest('/products');
        setProducts(applyProductImages(data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        (product.shortDescription || '').toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((product) => product.category === category);
    }

    if (sortBy === 'Price low to high') {
      filtered.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'Price high to low') {
      filtered.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'Rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      filtered.sort((a, b) => Number(b.bestSeller) - Number(a.bestSeller));
    }

    return filtered;
  }, [category, products, search, sortBy]);

  return (
    <div className="container page-section">
      <div className="shop-topbar">
        <div>
          <p className="eyebrow eyebrow-dark">Our products</p>
          <h1>Premium wellness essentials</h1>
        </div>
        <div className="shop-controls">
          <div className="search-box">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products" />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option>Popularity</option>
            <option>Price low to high</option>
            <option>Price high to low</option>
            <option>Rating</option>
          </select>
        </div>
      </div>

      <div className="shop-layout">
        <aside className="filter-panel">
          <div className="filter-header">
            <Filter size={16} />
            <span>Filters</span>
          </div>

          <div className="filter-block">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="filter-block">
            <label>Price range</label>
            <input type="range" min="0" max="1000" defaultValue="700" />
          </div>

          <div className="filter-block">
            <label>Rating</label>
            <div className="check-list">
              <label><input type="checkbox" /> 4+ stars</label>
              <label><input type="checkbox" /> 4.5+ stars</label>
            </div>
          </div>
        </aside>

        <div className="product-grid product-grid-shop">
          {loading ? (
            <div className="empty-state"><h3>Loading products...</h3></div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <article key={product._id || product.id} className="product-card">
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  {product.bestSeller && <span className="pill">Best seller</span>}
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
                  <div className="product-actions-row">
                    {(() => {
                      const productId = product._id || product.id;
                      const cartItem = cart.find((item) => (item._id || item.id) === productId);

                      return cartItem ? (
                        <div className="quantity-row card-quantity-row" aria-label={`Quantity for ${product.name}`}>
                          <button type="button" onClick={() => updateCartQuantity(productId, cartItem.quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><span>-</span></button>
                          <span>{cartItem.quantity}</span>
                          <button type="button" onClick={() => updateCartQuantity(productId, cartItem.quantity + 1)} aria-label={`Increase ${product.name} quantity`}><span>+</span></button>
                        </div>
                      ) : (
                        <button className="btn btn-primary" type="button" onClick={() => addToCart(product)}>Add to cart</button>
                      );
                    })()}
                    <Link to={`/products/${product._id || product.id}`} className="btn btn-secondary">View</Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h3>No products match your search.</h3>
              <p>Try another search or switch filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
