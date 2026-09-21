import { Link } from 'react-router-dom';

function CheckoutPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <p className="eyebrow eyebrow-dark">Secure checkout</p>
        <h1>Complete your order</h1>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form">
          <h3>Customer details</h3>
          <div className="form-grid two-col">
            <input placeholder="Full Name" />
            <input placeholder="Email" type="email" />
            <input placeholder="Mobile Number" />
            <input placeholder="Address" />
            <input placeholder="City" />
            <input placeholder="State" />
            <input placeholder="Pincode" />
            <input placeholder="Country" />
          </div>

          <div className="delivery-options">
            <label><input type="radio" name="delivery" defaultChecked /> Standard delivery</label>
            <label><input type="radio" name="delivery" /> Express delivery</label>
          </div>

          <h3>Payment options</h3>
          <div className="payment-methods">
            <label><input type="radio" name="payment" defaultChecked /> Razorpay</label>
            <label><input type="radio" name="payment" /> UPI</label>
            <label><input type="radio" name="payment" /> Credit / Debit Card</label>
            <label><input type="radio" name="payment" /> Net Banking</label>
            <label><input type="radio" name="payment" /> Wallets</label>
          </div>

          <Link to="/order-success" className="btn btn-primary">Pay now</Link>
        </form>

        <aside className="order-summary">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Organic Almonds</span><strong>₹598</strong></div>
          <div className="summary-row"><span>Green Tea Detox</span><strong>₹399</strong></div>
          <div className="summary-row"><span>Subtotal</span><strong>₹997</strong></div>
          <div className="summary-row"><span>Shipping</span><strong>₹79</strong></div>
          <div className="summary-row total-row"><span>Grand total</span><strong>₹1,076</strong></div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
