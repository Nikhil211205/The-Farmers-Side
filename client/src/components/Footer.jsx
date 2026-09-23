import { Globe, Mail, MapPin, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark"><ShieldCheck size={18} /></span>
            <span className="brand-name">THE FARMERS SIDE</span>
          </div>
          <p className="footer-copy">
            Premium organic foods, herbal blends, and wellness essentials sourced with care.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/diet-consultant">Diet Consultant</Link></li>
            <li><Link to="/fitness-program">Fitness Program</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>Categories</h4>
          <ul className="footer-links">
            <li><a href="/products">Nuts</a></li>
            <li><a href="/products">Fruits</a></li>
            <li><a href="/products">Tea</a></li>
            <li><a href="/products">Herbs</a></li>
            <li><a href="/products">Herbal Products</a></li>
          </ul>
        </div>

        <div>
          <h4>Customer Support</h4>
          <ul className="footer-links">
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="/">Shipping</a></li>
            <li><a href="/">Returns</a></li>
            <li><a href="/">Privacy Policy</a></li>
            <li><a href="/">Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p className="footer-copy">Subscribe for updates on new products and wellness programs.</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Email address" />
            <button>Join</button>
          </div>
          <div className="social-row">
            <a href="https://instagram.com" aria-label="Instagram"><Globe size={16} /></a>
            <a href="https://facebook.com" aria-label="Facebook"><Sparkles size={16} /></a>
            <a href="https://twitter.com" aria-label="Social"><ShieldCheck size={16} /></a>
          </div>
        </div>
      </div>

      <div className="container footer-meta">
        <div className="meta-contact">
          <span><Mail size={14} /> support@thefarmersside.com</span>
          <span><Phone size={14} /> +91 9003967445</span>
          <span><MapPin size={14} /> Grove Paddles, 2/124-A, Thottatu Salai East, Puttuvikki Road, Perur, Tamil Nadu - 641010.</span>
        </div>
        <p>© 2026 The Farmers Side. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
