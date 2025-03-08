import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // For icons

const Navbar = () => {
  return (
    <div className="layout">
      {/* Sidebar */}
      <nav className="sidebar">
        <div className="logo"> 
          <img src="/logo.png" alt="Synergy Logo" />
        </div>
        <ul>
          <li>
            <a href="/">
              <i className="bi bi-shop"></i> Store
            </a>
          </li>
          <li>
            <a href="/skus">
              <i className="bi bi-box"></i> SKU
            </a>
          </li>
          <li>
            <a href="/planning">
              <i className="bi bi-calendar"></i> Planning
            </a>
          </li>
          <li>
            <a href="/chart">
              <i className="bi bi-bar-chart"></i> Charts
            </a>
          </li>
        </ul>
      </nav>

      {/* Header */}
      <header className="header">
        <h2>Data Viewer App</h2>
        <i className="bi bi-person-circle user-icon"></i>
      </header>
    </div>
  );
};

export default Navbar;
