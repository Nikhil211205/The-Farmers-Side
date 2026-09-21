import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Heart, LogOut, Package, Settings, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container page-section">
      <div className="profile-layout">
        <aside className="card-shell profile-menu" aria-label="Profile menu">
          <div className="profile-menu-user">
            <div className="profile-avatar"><User size={22} /></div>
            <div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>

          <nav className="profile-menu-links">
            <button type="button" className={activeSection === 'profile' ? 'active' : ''} onClick={() => setActiveSection('profile')}>
              <User size={17} /> My Profile
            </button>
            <Link to="/orders"><Package size={17} /> My Orders</Link>
            <Link to="/wishlist"><Heart size={17} /> Wishlist</Link>
            <button type="button" className={activeSection === 'settings' ? 'active' : ''} onClick={() => setActiveSection('settings')}>
              <Settings size={17} /> Settings
            </button>
            <button type="button" onClick={logout}>
              <LogOut size={17} /> Logout
            </button>
          </nav>
        </aside>

        <section className="card-shell profile-card">
          {activeSection === 'profile' && (
            <>
              <p className="eyebrow eyebrow-dark">Profile</p>
              <h1>My Profile</h1>
              <div className="profile-row"><strong>Name:</strong> <span>{user.name}</span></div>
              <div className="profile-row"><strong>Email:</strong> <span>{user.email}</span></div>
              <div className="profile-row"><strong>Mobile:</strong> <span>{user.mobile || 'Not provided'}</span></div>
              <div className="profile-row"><strong>Role:</strong> <span>{user.role || 'user'}</span></div>
            </>
          )}

          {activeSection === 'orders' && (
            <>
              <p className="eyebrow eyebrow-dark">Orders</p>
              <h1>My Orders</h1>
              <p>Your orders will appear here after checkout.</p>
            </>
          )}

          {activeSection === 'settings' && (
            <>
              <p className="eyebrow eyebrow-dark">Account settings</p>
              <h1>Settings</h1>
              <p>Your account settings are managed securely through your profile.</p>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
