import { Link, Navigate } from 'react-router-dom';
import { Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function OrdersPage() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container page-section">
      <div className="card-shell profile-card orders-page">
        <p className="eyebrow eyebrow-dark">Orders</p>
        <h1>My Orders</h1>
        <div className="orders-empty-state">
          <Package size={42} />
          <h3>No orders yet</h3>
          <p>Your orders will appear here after checkout.</p>
          <Link to="/products" className="btn btn-primary">Start shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
