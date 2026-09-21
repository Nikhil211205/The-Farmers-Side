import { Link } from 'react-router-dom';

function OrderSuccessPage() {
  return (
    <div className="container page-section success-page">
      <div className="card-shell success-box">
        <h1>Order Confirmed</h1>
        <p>Your order number is <strong>#TFS-2048</strong>.</p>
        <p>Thank you for shopping with The Farmers Side.</p>
        <Link to="/products" className="btn btn-primary">Continue shopping</Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
