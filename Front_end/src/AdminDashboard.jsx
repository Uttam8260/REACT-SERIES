import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import Header from "./Header";
import Footer from "./Footer";
import Spinner from "./Spinner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("laptops");
  const [pname, setPname] = useState("");
  const [pqty, setPqty] = useState("");
  const [pcost, setPcost] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const clearForm = () => {
    setPname("");
    setPqty("");
    setPcost("");
    setFile(null);
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = (e) => {
    e.preventDefault();

    setSuccess("");

    if (!pname || !pqty || !pcost || !file) {
      setError("All fields are required.");
      setSuccess("");
      return;
    }

    if (isNaN(pqty) || pqty <= 0 || isNaN(pcost) || pcost <= 0) {
      setError("Quantity and cost must be positive numbers.");
      setSuccess("");
      return;
    }

    const formData = new FormData();
    formData.append("pname", pname);
    formData.append("pqty", pqty);
    formData.append("pcost", pcost);
    formData.append("file", file);

    const token = sessionStorage.getItem("token");

    setLoading(true);

    axios
      .post(`http://localhost:9000/admin/upload/${activeTab}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSuccess(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)} uploaded successfully.`);
        setError("");
        clearForm();
      })
      .catch((err) => {
        setError("Upload failed. Please try again.");
        setSuccess("");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSuccess("");
    clearForm();
  };

  return (
    <div className="admin-page">
      <Header />

      <div className="admin-container">
        <div className="admin-header">
          <h2>Upload {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}</h2>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="tabs">
          <button className={activeTab === "laptops" ? "active-tab" : ""}
                  onClick={() => handleTabSwitch("laptops")}>Laptops</button>
          <button className={activeTab === "mobiles" ? "active-tab" : ""}
                  onClick={() => handleTabSwitch("mobiles")}>Mobiles</button>
          <button className={activeTab === "watches" ? "active-tab" : ""}
                  onClick={() => handleTabSwitch("watches")}>Watches</button>
        </div>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        {loading && <Spinner />}

        <form className="upload-form" onSubmit={handleUpload}>
          <input type="text" placeholder="Product Name" value={pname} onChange={(e) => setPname(e.target.value)} />
          <input type="number" placeholder="Product Quantity" value={pqty} onChange={(e) => setPqty(e.target.value)} />
          <input type="number" placeholder="Product Cost" value={pcost} onChange={(e) => setPcost(e.target.value)} />
          <input type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;


















// import { useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";
// import Header from "./Header";
// import Footer from "./Footer";

// const AdminDashboard = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("laptops");
//   const [pname, setPname] = useState("");
//   const [pqty, setPqty] = useState("");
//   const [pcost, setPcost] = useState("");
//   const [file, setFile] = useState(null);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const fileInputRef = useRef(null);

//   const clearForm = () => {
//     setPname("");
//     setPqty("");
//     setPcost("");
//     setFile(null);
//     setError("");
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleUpload = (e) => {
//     e.preventDefault();

//     setSuccess(""); // Clear previous success message

//     if (!pname || !pqty || !pcost || !file) {
//       setError("All fields are required.");
//       setSuccess("");
//       return;
//     }

//     if (isNaN(pqty) || pqty <= 0 || isNaN(pcost) || pcost <= 0) {
//       setError("Quantity and cost must be positive numbers.");
//       setSuccess("");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("pname", pname);
//     formData.append("pqty", pqty);
//     formData.append("pcost", pcost);
//     formData.append("file", file);

//     const token = sessionStorage.getItem("token");

//     setLoading(true);

//     axios
//       .post(`http://localhost:9000/admin/upload/${activeTab}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         setSuccess(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)} uploaded successfully.`);
//         setError("");
//         clearForm();
//       })
//       .catch((err) => {
//         setError("Upload failed. Please try again.");
//         setSuccess("");
//         console.error(err);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     navigate("/");
//   };

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setSuccess("");
//     clearForm();
//   };

//   return (
//     <div className="admin-page">
//       <Header />

//       <div className="admin-container">
//         <div className="admin-header">
//           <h2>Upload {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}</h2>
//           <button className="logout-button" onClick={handleLogout}>
//             Logout
//           </button>
//         </div>

//         <div className="tabs">
//           <button
//             className={activeTab === "laptops" ? "active-tab" : ""}
//             onClick={() => handleTabSwitch("laptops")}
//           >
//             Laptops
//           </button>
//           <button
//             className={activeTab === "mobiles" ? "active-tab" : ""}
//             onClick={() => handleTabSwitch("mobiles")}
//           >
//             Mobiles
//           </button>
//           <button
//             className={activeTab === "watches" ? "active-tab" : ""}
//             onClick={() => handleTabSwitch("watches")}
//           >
//             Watches
//           </button>
//         </div>

//         {error && <p className="error-message">{error}</p>}
//         {success && <p className="success-message">{success}</p>}
//         {loading && <p className="loading-message">Uploading...</p>}

//         <form className="upload-form" onSubmit={handleUpload}>
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={pname}
//             onChange={(e) => setPname(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Product Quantity"
//             value={pqty}
//             onChange={(e) => setPqty(e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Product Cost"
//             value={pcost}
//             onChange={(e) => setPcost(e.target.value)}
//           />
//           <input
//             type="file"
//             ref={fileInputRef}
//             onChange={(e) => setFile(e.target.files[0])}
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </form>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default AdminDashboard;
