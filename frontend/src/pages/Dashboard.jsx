import { useEffect, useState } from "react";
import API from "../services/api";
import SweetCard from "../components/SweetCard";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);

  // 🔍 search & filter states
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 📦 load all sweets (ONLY ONE DEFINITION)
  const loadSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Error loading sweets", err);
    }
  };

  // 🔎 search sweets
  const searchSweets = async () => {
    try {
      const res = await API.get("/sweets/search", {
        params: {
          name,
          category,
          minPrice,
          maxPrice,
        },
      });
      setSweets(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  // 🛒 purchase sweet
  const purchase = async (id) => {
    try {
      await API.post(`/sweets/${id}/purchase`);
      loadSweets();
    } catch (err) {
      console.error("Purchase failed:", err);
      alert("Purchase failed");
    }
  };

  // ✅ load sweets on page load
  useEffect(() => {
  const loadSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Error loading sweets", err);
    }
  };

  loadSweets();
}, []);

  return (
    /* ✅ CONTAINER GOES HERE */
    <div className="container">
      <h2>Available Sweets</h2>

      {/* ✅ SEARCH BOX GOES HERE */}
      <div className="search-box">
        <h3>Search Sweets</h3>

        <input
          placeholder="Search by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <button onClick={searchSweets}>Search</button>
        <button onClick={loadSweets} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>

      {/* 🍬 SWEET LIST */}
      {sweets.length === 0 ? (
        <p>No sweets found</p>
      ) : (
        sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onPurchase={purchase}
          />
        ))
      )}
    </div>
  );
};

export default Dashboard;
