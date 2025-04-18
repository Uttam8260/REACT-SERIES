import { Link, Outlet, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import Header from "./Header";
import Footer from "./Footer";
import "./Dashboard.css";
import "./CartIcon.css";

const Dashboard = () => {
  const { cart } = useCart();
  const location = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <Header />

      <div className="dashboard-top">
        <nav className="dashboard-nav">
          <Link
            to=""
            className={location.pathname === "/dashboard" ? "active-tab" : ""}
          >
            Laptops
          </Link>
          <Link
            to="mobiles"
            className={location.pathname.includes("/mobiles") ? "active-tab" : ""}
          >
            Mobiles
          </Link>
          <Link
            to="watches"
            className={location.pathname.includes("/watches") ? "active-tab" : ""}
          >
            Watches
          </Link>
        </nav>

      </div>

      <button className="logout-button-sticky" onClick={handleLogout}>
        Logout
      </button>

      <div className="dashboard-content">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
