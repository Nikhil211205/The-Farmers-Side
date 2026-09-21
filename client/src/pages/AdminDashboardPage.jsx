function AdminDashboardPage() {
  return (
    <div className="container page-section">
      <div className="section-heading">
        <p className="eyebrow eyebrow-dark">Admin dashboard</p>
        <h1>Store overview</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card"><span>Total sales</span><strong>₹1,84,500</strong></div>
        <div className="stat-card"><span>Total orders</span><strong>482</strong></div>
        <div className="stat-card"><span>Total customers</span><strong>1,240</strong></div>
        <div className="stat-card"><span>Total products</span><strong>126</strong></div>
      </div>

      <div className="admin-panels">
        <div className="card-shell">
          <h3>Recent orders</h3>
          <ul className="admin-list">
            <li>ORD-1045 — Paid</li>
            <li>ORD-1046 — Processing</li>
            <li>ORD-1047 — Shipped</li>
          </ul>
        </div>
        <div className="card-shell">
          <h3>Diet consultations</h3>
          <ul className="admin-list">
            <li>DFC-2041 — Pending</li>
            <li>DFC-2042 — Confirmed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
