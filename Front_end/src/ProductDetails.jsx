import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useEffect, useState } from 'react';
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";
import "./CartIcon.css";
import "./ProductDetails.css";

const ProductDetails = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { addToCart, cart } = useCart();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        axios.get(`http://localhost:9000/user/${type}s`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            const item = res.data.find(prod => prod.id === parseInt(id));
            if (item) {
                setProduct({ ...item, type });
            } else {
                console.error("Product not found");
            }
        })
        .catch(err => console.error(err));
    }, [type, id]);

    const handleAddToCart = () => {
        setLoading(true);
        const uniqueKey = `${product.type}-${product.id}`;
        const exists = cart.find(item => item.uniqueKey === uniqueKey);
        addToCart(product, quantity);
        setMessage(exists ? "Cart updated!" : "Added to cart!");
        setTimeout(() => {
            setMessage("");
            setLoading(false);
        }, 2000);
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-details-page">
            <Header />

            <div className="product-details-container">
                <button className="back-button" onClick={() => navigate(-1)}>Back</button>

                <div className="product-details">
                    <img src={product.pimage} alt={product.pname} />
                    <h2>{product.pname}</h2>
                    <div className="quantity-controls">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(Math.min(product.pqty, quantity + 1))}>+</button>
                    </div>
                    <button onClick={handleAddToCart} disabled={loading}>
                        {loading ? "Adding..." : "Add to Cart"}
                    </button>
                    {message && <p className="success-message">{message}</p>}
                    {loading && <Spinner />}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ProductDetails;
