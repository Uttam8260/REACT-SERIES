import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './UserDetails.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, mobile, address } = user;

    if (!name.trim() || !email.trim() || !mobile.trim() || !address.trim()) {
      setError('Please fill out all fields.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError('Enter a valid 10-digit mobile number.');
      return;
    }

    sessionStorage.setItem('userDetails', JSON.stringify(user));
    navigate('/cart-payment');
  };

  return (
    <>
      <Header />
      <div className="user-details-container">
        <form className="user-details-form" onSubmit={handleSubmit}>
          <h2>Enter Your Details</h2>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={user.mobile}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Complete Address"
            value={user.address}
            onChange={handleChange}
            required
          />

          <div className="button-group">
            <button className="back-btn" onClick={() => navigate(-1)}>
              ← Back
            </button>

            <button type="submit" className="submit-btn">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default UserDetails;




// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
// import './UserDetails.css';

// const UserDetails = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     address: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const { name, email, mobile, address } = user;

//     if (!name.trim() || !email.trim() || !mobile.trim() || !address.trim()) {
//       setError('All fields are required.');
//       return;
//     }

//     if (!/^\S+@\S+\.\S+$/.test(email)) {
//       setError('Please enter a valid email.');
//       return;
//     }

//     if (!/^\d{10}$/.test(mobile)) {
//       setError('Enter a valid 10-digit mobile number.');
//       return;
//     }

//     sessionStorage.setItem('userDetails', JSON.stringify(user));
//     navigate('/cart-payment');
//   };

 

//   const handleChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//     setError('');
//   };

//   return (
//     <>
//       <Header />
//       <div className="user-details-container">
//         <button className="back-button" onClick={() => navigate(-1)}>
//           &larr; Back
//         </button>

//         <form className="user-details-form" onSubmit={handleSubmit}>
//           <h2>User Information</h2>
//           {error && <p className="error-message">{error}</p>}

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={user.name}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={user.email}
//             onChange={handleChange}
//             required
//           />

//           <input
//             type="tel"
//             name="mobile"
//             placeholder="Mobile Number"
//             value={user.mobile}
//             onChange={handleChange}
//             required
//           />

//           <textarea
//             name="address"
//             placeholder="Complete Address"
//             value={user.address}
//             onChange={handleChange}
//             required
//           />

//           <div className="button-group">
//             <button type="submit" className="submit-btn" onClick={handleSubmit}>
//               Continue to Payment
//             </button>
//             <button type="button" className="back-btn" onClick={() => navigate(-1)}>
//               ← Back
//             </button>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserDetails;






// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
// import './UserDetails.css';

// const UserDetails = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ name: '', email: '', mobile: '', address: '' });
//   const [error, setError] = useState('');

//   const handleChange = e => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     const { name, email, mobile, address } = user;

//     if (!name || !email || !mobile || !address) {
//       setError("All fields are required.");
//       return;
//     }

//     sessionStorage.setItem("userDetails", JSON.stringify(user));
//     navigate("/cart-payment");
//   };

//   return (
//     <>
//       <Header />

//       <div className="user-details-container">
//         <form className="user-details-form" onSubmit={handleSubmit}>
//           <h2>Enter Your Details</h2>
//           {error && <p className="error">{error}</p>}

//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={user.email}
//             onChange={(e) => setUser({ ...user, email: e.target.value })}
//           />

//           <input
//             type="tel"
//             name="mobile"
//             placeholder="Mobile"
//             value={user.mobile}
//             onChange={(e) => setUser({ ...user, mobile: e.target.value })}
//           />

//           <textarea
//             name="address"
//             placeholder="Address"
//             value={user.address}
//             onChange={(e) => setUser({ ...user, address: e.target.value })}
//           />

//           {error && <p className="error-message">{error}</p>}

//           <button type="submit" onClick={handleSubmit}>
//             Continue to Payment
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default UserDetails;