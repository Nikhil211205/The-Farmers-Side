import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function CartPage() {
  const { cart: cartItems, updateCartQuantity, removeFromCart } = useAuth();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || 0) * item.quantity,
    0
  );
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.originalPrice ?? item.discountPrice ?? item.price ?? 0) * item.quantity,
    0
  );
  const discount = Math.max(0, originalTotal - subtotal);
  const tax = subtotal * 0.05;
  const shipping = subtotal > 0 ? 79 : 0;
  const grandTotal = subtotal + tax + shipping;

  return (
    <div className="container page-section">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow eyebrow-dark">Your cart</p>
          <h1>Shopping bag</h1>
        </div>

        <Link to="/products" className="btn btn-ghost">
          Continue shopping
        </Link>
      </div>

      <div className="cart-layout">
        <div className="cart-items-panel">
          {cartItems.length === 0 ? (
            <div
              style={{
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px',
              }}
            >
              <ShoppingBag size={60} strokeWidth={1.5} />

              <h2 style={{ marginTop: '20px' }}>
                Your cart is empty
              </h2>

              <p style={{ marginBottom: '25px' }}>
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link to="/products" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item._id || item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-body">
                  <div>
                    <h3>{item.name}</h3>
                    <p>₹{Number(item.price || 0)} each</p>
                  </div>

                  <div className="cart-actions">
                    <div className="quantity-row compact-row">
                      <button type="button" onClick={() => updateCartQuantity(item._id || item.id, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}>
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button type="button" onClick={() => updateCartQuantity(item._id || item.id, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <button className="text-button" type="button" onClick={() => removeFromCart(item._id || item.id)}>
                      <Trash2 size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                <strong>
                  ₹{(Number(item.price || 0) * item.quantity).toFixed(0)}
                </strong>
              </div>
            ))
          )}
        </div>

        <aside className="order-summary">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{subtotal}</strong>
          </div>

          <div className="summary-row">
            <span>Discount</span>
            <strong>₹{discount.toFixed(0)}</strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>₹{shipping}</strong>
          </div>

          <div className="summary-row">
            <span>Tax</span>
            <strong>₹{tax.toFixed(0)}</strong>
          </div>

          <div className="summary-row total-row">
            <span>Grand total</span>
            <strong>₹{grandTotal.toFixed(0)}</strong>
          </div>

          <div className="coupon-box">
            <input
              type="text"
              placeholder="Coupon code"
            />
            <button>Apply</button>
          </div>

          {cartItems.length > 0 && (
            <Link
              to="/checkout"
              className="btn btn-primary full-width"
            >
              Proceed to checkout
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}

export default CartPage;