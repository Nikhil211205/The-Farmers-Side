import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, User, Menu, Package, LogOut } from 'lucide-react';
import { useState } from 'react';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { apiRequest } from '../api';
import { applyProductImages } from '../data/productImages';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Diet Consultant', to: '/diet-consultant' },
  { label: 'Fitness Program', to: '/fitness-program' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, cartCount } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleLogout = () => {
    setProfileMenuOpen(false);
    logout();
  };

  const handleSearchToggle = async () => {
    const nextOpen = !searchOpen;
    setSearchOpen(nextOpen);

    if (nextOpen && products.length === 0) {
      setSearchLoading(true);
      try {
        const data = await apiRequest('/products');
        setProducts(Array.isArray(data) ? applyProductImages(data) : []);
      } catch (error) {
        console.error('Unable to load products for search', error);
      } finally {
        setSearchLoading(false);
      }
    }
  };

  const matchingProducts = searchTerm.trim()
    ? products.filter((product) => {
      const term = searchTerm.trim().toLowerCase();
      return product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term);
    }).slice(0, 6)
    : [];

  const openProduct = (productId) => {
    setSearchTerm('');
    setSearchOpen(false);
    navigate(`/products/${productId}`);
  };

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link className="brand" to="/" aria-label="The Farmers Side home">
          <img className="brand-logo" src={logo} alt="The Farmers Side logo" />
          <span className="brand-name">THE FARMERS SIDE</span>
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="search-menu-wrapper">
            <button type="button" className="icon-button" aria-label="Search products" aria-expanded={searchOpen} onClick={handleSearchToggle}>
              <Search size={18} />
            </button>

            {searchOpen && (
              <div className="navbar-search-dropdown">
                <input
                  autoFocus
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search products"
                  aria-label="Search products"
                />

                {searchLoading && <p className="navbar-search-message">Loading products...</p>}
                {!searchLoading && searchTerm.trim() && matchingProducts.length === 0 && (
                  <p className="navbar-search-message">No products found</p>
                )}
                {!searchLoading && matchingProducts.length > 0 && (
                  <div className="navbar-search-results">
                    {matchingProducts.map((product) => (
                      <button
                        key={product._id || product.id}
                        type="button"
                        className="navbar-search-result"
                        onClick={() => openProduct(product._id || product.id)}
                      >
                        <img src={product.image} alt="" />
                        <span>
                          <strong>{product.name}</strong>
                          <small>{product.category}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link className="icon-button" to="/wishlist" aria-label="Wishlist">
            <Heart size={18} />
          </Link>

          <Link className="icon-button cart-button" to="/cart" aria-label="Cart">
            <ShoppingCart size={18} />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          <div className="profile-menu-wrapper">
            {isAuthenticated ? (
              <button
                type="button"
                className="profile-icon-button"
                aria-label="Open profile menu"
                aria-expanded={profileMenuOpen}
                onClick={() => setProfileMenuOpen((current) => !current)}
              >
                <User size={19} />
              </button>
            ) : (
              <Link className="profile-icon-button" to="/login" aria-label="Open login">
                <User size={19} />
              </Link>
            )}

            {isAuthenticated && profileMenuOpen && (
              <div className="profile-dropdown" role="menu">
                <div className="profile-dropdown-user">
                  <strong>{user?.name}</strong>
                  <span>{user?.email}</span>
                </div>
                <Link to="/profile" role="menuitem" onClick={() => setProfileMenuOpen(false)}><User size={16} /> My Profile</Link>
                <Link to="/orders" role="menuitem" onClick={() => setProfileMenuOpen(false)}><Package size={16} /> My Orders</Link>
                <Link to="/wishlist" role="menuitem" onClick={() => setProfileMenuOpen(false)}><Heart size={16} /> Wishlist</Link>
                <button type="button" role="menuitem" onClick={handleLogout}><LogOut size={16} /> Logout</button>
              </div>
            )}
          </div>

          <Link className="login-button" to="/login">Login</Link>

          <button type="button" className="mobile-menu" aria-label="Open menu">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;