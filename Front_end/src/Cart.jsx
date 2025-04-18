import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.pcost * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <div className="cart-container">
          <h2>Your Shopping Cart</h2>

          <div className="cart-actions">
            <button className="cart-back-button" onClick={() => navigate(-1)}>
              ← Back
            </button>
            <button className="add-more-button" onClick={() => navigate("/dashboard")}>
              Add More Items
            </button>
          </div>

          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty!</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.uniqueKey} className="cart-item">
                  <img src={item.pimage} alt={item.pname} />
                  <div className="cart-item-details">
                    <h3>{item.pname}</h3>
                    <p>Type: {item.type}</p>
                    <p>Price: ₹{item.pcost}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.uniqueKey)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="cart-total-section">
                <h3>Total: ₹{totalPrice}</h3>
                <button
                  className="pay-button"
                  onClick={() => navigate("/user-details")}
                >
                  Proceed to Pay
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
