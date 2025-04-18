import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";
import Spinner from "./Spinner";

const ProductList = ({ endpoint }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setLoading(true);
    fetch(`http://localhost:9000/user/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.map((p) => ({ ...p, type: endpoint.slice(0, -1) })));
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div className="product-page">
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div
              key={`${product.type}-${product.id}`}
              className="product-card"
              onClick={() => navigate(`/product/${product.type}/${product.id}`)}
            >
              <img src={product.pimage} alt={product.pname} />
              <div className="product-info">
                <h2>{product.pname}</h2>
                <h3>₹{product.pcost}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <p>No {endpoint} available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
};

export const Laptops = () => <ProductList endpoint="laptops" />;
export const Mobiles = () => <ProductList endpoint="mobiles" />;
export const Watches = () => <ProductList endpoint="watches" />;

export default Laptops;





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProductList.css";

// const ProductList = ({ endpoint }) => {
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     fetch(`http://localhost:9000/user/${endpoint}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) =>
//         setProducts(data.map((p) => ({ ...p, type: endpoint.slice(0, -1) })))
//       );
//   }, [endpoint]);

//   return (
//     <div className="product-page">
//       {products.length > 0 ? (
//         <div className="products-grid">
//           {products.map((product) => (
//             <div
//               key={`${product.type}-${product.id}`}
//               className="product-card"
//               onClick={() => navigate(`/product/${product.type}/${product.id}`)}
//             >
//               <img src={product.pimage} alt={product.pname} />
//               <div className="product-info">
//                 <h2>{product.pname}</h2>
//                 <h3>₹{product.pcost}</h3>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-products">
//           <p>No {endpoint} available at the moment. Please check back later.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export const Laptops = () => <ProductList endpoint="laptops" />;
// export const Mobiles = () => <ProductList endpoint="mobiles" />;
// export const Watches = () => <ProductList endpoint="watches" />;

// export default Laptops;
