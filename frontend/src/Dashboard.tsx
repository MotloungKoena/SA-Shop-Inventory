import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // For now, we'll just grab the shop name from localStorage , will configure this later
  const shopName = localStorage.getItem('shopName') || 'My Shop';

  const handleLogout = () => {
    localStorage.removeItem('shopName');
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>{shopName}</h2>
          <p>Inventory System</p>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">📊 Dashboard</a>
          <a href="#" className="nav-item">🛒 Point of Sale</a>
          <a href="#" className="nav-item">📦 Inventory</a>
          <a href="#" className="nav-item">👥 Customers</a>
          <a href="#" className="nav-item">⚙️ Settings</a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="topbar">
          <h1>Dashboard Overview</h1>
          <div className="user-profile">👤 Owner</div>
        </header>

        <div className="dashboard-widgets">
          {/* Widget 1 */}
          <div className="widget-card">
            <h3>Today's Sales</h3>
            <p className="widget-value">R 0.00</p>
            <span className="widget-trend positive">No sales yet today</span>
          </div>
          
          {/* Widget 2 */}
          <div className="widget-card">
            <h3>Total Products</h3>
            <p className="widget-value">0</p>
            <span className="widget-trend">Add your first product</span>
          </div>

          {/* Widget 3 */}
          <div className="widget-card alert-card">
            <h3>Low Stock Alerts</h3>
            <p className="widget-value">0</p>
            <span className="widget-trend negative">All items are well stocked</span>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <p>No recent activity to show.</p>
            <button className="primary-btn">Go to Point of Sale</button>
          </div>
        </div>
      </main>
    </div>
  );
}