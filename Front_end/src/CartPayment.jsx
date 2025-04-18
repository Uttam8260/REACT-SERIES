// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import Header from "./Header";
// import Footer from "./Footer";
// import "./CartPayment.css";

// const CartPayment = () => {
//   const { cart, setCart } = useCart();
//   const navigate = useNavigate();
//   const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

//   const totalPrice = cart.reduce(
//     (acc, item) => acc + item.pcost * item.quantity,
//     0
//   );

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = () => {
//     const options = {
//       key: "rzp_live_0CAWJFt3q8oaUX",
//       amount: totalPrice * 100,
//       currency: "INR",
//       name: "ExcelR",
//       description: "Order Payment",
//       handler: async (response) => {
//         const orderDetails = cart.map((item) => `${item.pname} x ${item.quantity}`).join(", ");
//         const payload = {
//           ...userDetails,
//           totalAmount: totalPrice,
//           paymentId: response.razorpay_payment_id,
//           orderDetails,
//         };

//         try {
//           await axios.post("http://localhost:9000/save-order", payload);
//           await sendWhatsApp({
//             mobile: userDetails.mobile,
//             paymentId: response.razorpay_payment_id,
//             totalAmount: totalPrice,
//           });

//           generateInvoice(response.razorpay_payment_id, userDetails);
//         } catch (err) {
//           console.error("Error during post-payment process:", err);
//         }
//       },
//       prefill: {
//         name: userDetails.name,
//         email: userDetails.email,
//         contact: userDetails.mobile,
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.on('payment.success', () => {
//       setCart([]);
//       navigate("/dashboard");
//     });
//     rzp.open();
//   };

//   const generateInvoice = (paymentId, user) => {
//     const doc = new jsPDF();
//     doc.setFont("helvetica", "bold");
//     doc.setFontSize(20);
//     doc.text("Order Invoice", 70, 20);

//     doc.setFontSize(12);
//     doc.setFont("helvetica", "normal");
//     doc.text(`Payment ID: ${paymentId}`, 20, 30);
//     doc.text("Customer Details:", 20, 40);
//     doc.text(`Name: ${user.name}`, 20, 50);
//     doc.text(`Email: ${user.email}`, 20, 60);
//     doc.text(`Phone: ${user.mobile}`, 20, 70);
//     doc.text(`Address: ${user.address}`, 20, 80);

//     doc.setFontSize(14);
//     doc.text("Items Purchased:", 20, 95);

//     const tableColumn = ["S.No", "Product", "Price", "Quantity", "Total"];
//     const tableRows = cart.map((item, index) => [
//       index + 1,
//       item.pname,
//       `₹${item.pcost}`,
//       item.quantity,
//       `₹${item.pcost * item.quantity}`,
//     ]);

//     doc.autoTable({
//       startY: 100,
//       head: [tableColumn],
//       body: tableRows,
//       theme: "grid",
//     });

//     doc.setFontSize(12);
//     doc.text(`Total Amount: ₹${totalPrice}`, 20, doc.lastAutoTable.finalY + 10);
//     doc.text("Thank you for shopping with us!", 20, doc.lastAutoTable.finalY + 20);

//     doc.save("Invoice.pdf");
//   };

//   const sendWhatsApp = async ({ mobile, paymentId, totalAmount }) => {
//     const message = `Thank you! Your payment (ID: ${paymentId}) of ₹${totalAmount} was successful.`;
//     await axios
//       .post(`http://localhost:9000/send-whatsapp`, null, {
//         params: { mobile, message },
//       })
//       .then(() => console.log("WhatsApp message sent successfully!"))
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="cart-payment-page">
//       <Header />

//       <div className="payment-container">
//         <h2>Confirm Your Payment</h2>

//         <div className="user-details">
//           <p><strong>Name:</strong> {userDetails.name}</p>
//           <p><strong>Email:</strong> {userDetails.email}</p>
//           <p><strong>Mobile:</strong> {userDetails.mobile}</p>
//           <p><strong>Address:</strong> {userDetails.address}</p>
//         </div>

//         <div className="order-summary">
//           <h3>Order Summary</h3>
//           {cart.map((item) => (
//             <div key={item.uniqueKey}>
//               {item.pname} - ₹{item.pcost} x {item.quantity}
//             </div>
//           ))}
//           <h3>Total Amount: ₹{totalPrice}</h3>
//         </div>

//         <button className="pay-btn" onClick={handlePayment}>
//           Pay ₹{totalPrice}
//         </button>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default CartPayment;



import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import Header from "./Header";
import Footer from "./Footer";
import "./CartPayment.css";

const CartPayment = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Retrieve userDetails only once
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.pcost * item.quantity,
    0
  );

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: "rzp_live_0CAWJFt3q8oaUX",
      amount: totalPrice * 100,
      currency: "INR",
      name: "ExcelR",
      description: "Order Payment",
      handler: async (response) => {
        const orderDetails = cart.map((item) => `${item.pname} x ${item.quantity}`).join(", ");
        const payload = {
          ...userDetails,
          totalAmount: totalPrice,
          paymentId: response.razorpay_payment_id,
          orderDetails,
        };

        await axios.post("http://localhost:9000/save-order", payload);

        generateInvoice(response.razorpay_payment_id, userDetails);

        await sendWhatsApp({
          mobile: userDetails.mobile,
          paymentId: response.razorpay_payment_id,
          totalAmount: totalPrice,
        });

        setCart([]);
        navigate("/dashboard");
      },
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.mobile,
      },
      theme: { color: "#3399cc" }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generateInvoice = (paymentId, user) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Order Invoice", 70, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Payment ID: ${paymentId}`, 20, 30);
    doc.text("Customer Details:", 20, 40);
    doc.text(`Name: ${user.name}`, 20, 50);
    doc.text(`Email: ${user.email}`, 20, 60);
    doc.text(`Phone: ${user.mobile}`, 20, 70);
    doc.text(`Address: ${user.address}`, 20, 80);

    doc.setFontSize(14);
    doc.text("Items Purchased:", 20, 95);

    let y = 105;
    cart.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.pname} - ₹${item.pcost} x ${item.quantity}`, 20, y);
      y += 10;
    });

    doc.text(`Total Amount: ₹${totalPrice}`, 20, y + 10);
    doc.text("Thank you for shopping with us!", 20, y + 20);
    doc.save("Invoice.pdf");
  };

  const sendWhatsApp = async ({ mobile, paymentId, totalAmount }) => {
    const message = `Thank you! Your payment (ID: ${paymentId}) of ₹${totalAmount} was successful.`;
    await axios
      .post(`http://localhost:9000/send-whatsapp`, null, {
        params: { mobile, message },
      })
      .then(() => console.log("WhatsApp message sent successfully!"))
      .catch((err) => console.error(err));
  };

  return (
    <div className="cart-payment-page">
      <Header />

      <div className="payment-container">
        <h2>Confirm Your Payment</h2>

        <div className="user-details">
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Mobile:</strong> {userDetails.mobile}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {cart.map((item) => (
            <div key={item.uniqueKey}>
              {item.pname} - ₹{item.pcost} x {item.quantity}
            </div>
          ))}
          <h3>Total Amount: ₹{totalPrice}</h3>
        </div>

        <button className="pay-btn" onClick={handlePayment}>
          Pay ₹{totalPrice}
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CartPayment;















// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

// const CartPayment = () => {
//     const { cart, setCart } = useCart(); // Ensure clearly setCart imported
//     const navigate = useNavigate();
//     const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
//     const totalPrice = cart.reduce((acc, item) => acc + item.pcost * item.quantity, 0);

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
//         document.body.appendChild(script);
//     }, []);

//     const handlePayment = () => {
//         const options = {
//             key: "rzp_live_0CAWJFt3q8oaUX",
//             amount: totalPrice * 100,
//             currency: "INR",
//             name: "ExcelR",
//             description: "Order Payment",
//             handler: async (response) => {
//                 const orderDetails = cart.map(item => `${item.pname} x ${item.quantity}`).join(", ");
//                 const payload = {
//                     ...userDetails,
//                     totalAmount: totalPrice,
//                     paymentId: response.razorpay_payment_id,
//                     orderDetails,
//                 };

//                 await axios.post("http://localhost:9000/save-order", payload);

//                 generateInvoice(response.razorpay_payment_id, userDetails);

//                 await sendWhatsApp({
//                     mobile: userDetails.mobile,
//                     paymentId: response.razorpay_payment_id,
//                     totalAmount: totalPrice,
//                 });

//                 setCart([]);  
//                 navigate("/dashboard");
//             },
//             prefill: {
//                 name: userDetails.name,
//                 email: userDetails.email,
//                 contact: userDetails.mobile,
//             },
//             theme: { color: "#3399cc" }
//         };

//         const rzp = new window.Razorpay(options); // ✅ explicitly declared
//         rzp.open();
//     };

//     const generateInvoice = (paymentId, user) => {
//         const doc = new jsPDF();
//         doc.setFont("helvetica", "bold");
//         doc.setFontSize(20);
//         doc.text("Order Invoice", 70, 20);

//         doc.setFontSize(12);
//         doc.setFont("helvetica", "normal");
//         doc.text(`Payment ID: ${paymentId}`, 20, 30);
//         doc.text("Customer Details:", 20, 40);
//         doc.text(`Name: ${user.name}`, 20, 50);
//         doc.text(`Email: ${user.email}`, 20, 60);
//         doc.text(`Phone: ${user.mobile}`, 20, 70);
//         doc.text(`Address: ${user.address}`, 20, 80);

//         doc.setFontSize(14);
//         doc.text("Items Purchased:", 20, 95);

//         let y = 105;
//         cart.forEach((item, index) => {
//             doc.text(`${index + 1}. ${item.pname} - ₹${item.pcost} x ${item.quantity}`, 20, y);
//             y += 10;
//         });

//         doc.setFontSize(14);
//         doc.text(`Total Amount: ₹${totalPrice}`, 20, y + 10);
//         doc.text("Thank you for shopping with us!", 20, y + 20);

//         doc.save("Invoice.pdf");
//     };

//     const sendWhatsApp = async ({ mobile, paymentId, totalAmount }) => {
//         const message = `Thank you for your order!\nPayment ID: ${paymentId}\nTotal Amount: ₹${totalAmount}`;

//         await axios.post(`http://localhost:9000/send-whatsapp`, null, {
//             params: { mobile, message }
//         })
//         .then(() => console.log("WhatsApp message sent successfully!"))
//         .catch(err => console.error(err));
//     };

//     return (
//         <div>
//             <h2>Confirm Payment</h2>
//             <button onClick={handlePayment}>Pay ₹{totalPrice}</button>
//         </div>
//     );
// };

// export default CartPayment;
