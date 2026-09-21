import { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingCart, Star, Heart } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../api';
import { useAuth } from '../context/AuthContext';
import { applyProductImage, applyProductImages } from '../data/productImages';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const [productData, productsData] = await Promise.all([
          apiRequest(`/products/${id}`),
          apiRequest('/products'),
        ]);

        const correctedProduct = applyProductImage(productData);
        setProduct(correctedProduct);
        setRelatedProducts(applyProductImages(productsData).filter((item) => item._id !== correctedProduct._id).slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return <div className="container page-section"><p>Loading product...</p></div>;
  }

  if (!product) {
    return <div className="container page-section"><p>Product not found.</p></div>;
  }

  const discountPercent = product.price && product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="container page-section">
      <div className="product-detail-layout">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="thumbnail-row">
            {(product.images?.length ? product.images : [product.image]).map((image, index) => (
              <img key={`${image}-${index}`} src={image} alt={`${product.name} view ${index + 1}`} />
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="eyebrow eyebrow-dark">{product.category}</p>
          <h1>{product.name}</h1>
          <div className="rating-line">
            <span className="rating"><Star size={16} fill="currentColor" /> {product.rating}</span>
            <span>{product.reviewCount || 0} reviews</span>
          </div>

          <div className="price-row detail-price-row">
            <strong>₹{product.discountPrice}</strong>
            <span>₹{product.price}</span>
            <span className="discount-tag">Save {discountPercent}%</span>
          </div>

          <p className="detail-description">
            {product.description || product.shortDescription || 'Purely sourced and carefully selected for wholesome nourishment and a vibrant lifestyle.'}
          </p>

          <div className="stock-line">
            <span className="stock-status">In stock</span>
            <span>{product.stock} available</span>
          </div>

          <div className="quantity-row">
            <button aria-label="Decrease quantity" type="button"><Minus size={16} /></button>
            <span>1</span>
            <button aria-label="Increase quantity" type="button"><Plus size={16} /></button>
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary" type="button" onClick={() => addToCart(product)}><ShoppingCart size={18} /> Add to cart</button>
            <button className="btn btn-secondary" type="button" onClick={() => navigate('/checkout')}>Buy now</button>
            <button className="icon-button like-button" type="button" aria-label="Save to wishlist"><Heart size={18} /></button>
          </div>

          <div className="info-points">
            <div><strong>Organic & Natural</strong></div>
            <div><strong>Farm Fresh</strong></div>
            <div><strong>Carefully Sourced</strong></div>
          </div>
        </div>
      </div>

      <div className="tabs-block">
        <div className="tabs-list">
          <button className="tab active" type="button">Description</button>
          <button className="tab" type="button">Ingredients</button>
          <button className="tab" type="button">Nutrition Facts</button>
          <button className="tab" type="button">Benefits</button>
          <button className="tab" type="button">Usage</button>
          <button className="tab" type="button">Reviews</button>
        </div>
        <div className="tab-content">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>Organic & Natural</li>
            <li>Farm Fresh</li>
            <li>Carefully Sourced</li>
            <li>No unnecessary preservatives</li>
            <li>Quality checked</li>
          </ul>
        </div>
      </div>

      <div className="related-section">
        <h3>Related Products</h3>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <article key={item._id} className="product-card">
              <div className="product-image-wrap">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="product-body">
                <span className="small-tag">{item.category}</span>
                <h3>{item.name}</h3>
                <div className="price-row">
                  <strong>₹{item.discountPrice}</strong>
                  <span>₹{item.price}</span>
                </div>
                <Link to={`/products/${item._id}`} className="btn btn-primary full-width">View product</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
