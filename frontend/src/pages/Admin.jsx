import { useEffect, useState } from "react";
import API from "../services/api";

const Admin = () => {
  const [sweets, setSweets] = useState([]);

  const [newSweet, setNewSweet] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [restockQty, setRestockQty] = useState("");

  // 📦 LOAD SWEETS (ONLY ONCE)
  const loadSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to load sweets", err);
    }
  };

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

  // ➕ ADD SWEET
  const addSweet = async (e) => {
    e.preventDefault();
    try {
      await API.post("/sweets", newSweet);
      alert("Sweet added");
      setNewSweet({ name: "", category: "", price: "", quantity: "" });
      loadSweets();
    } catch (err) {
      console.error(err);
      alert("Add sweet failed");
    }
  };

  // ✏️ UPDATE SWEET
  const updateSweet = async (id, field, value) => {
    try {
      await API.put(`/sweets/${id}`, { [field]: value });
      loadSweets();
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // ❌ DELETE SWEET
  const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(`/sweets/${id}`);
      loadSweets();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // 📦 RESTOCK SWEET
  const restockSweet = async (id) => {
    try {
      await API.post(`/sweets/${id}/restock`, {
        quantity: Number(restockQty),
      });
      setRestockQty("");
      loadSweets();
    } catch (err) {
      console.error(err);
      alert("Restock failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* ➕ ADD SWEET */}
      <form onSubmit={addSweet}>
        <h3>Add Sweet</h3>

        <input
          placeholder="Name"
          value={newSweet.name}
          onChange={(e) =>
            setNewSweet({ ...newSweet, name: e.target.value })
          }
        />

        <input
          placeholder="Category"
          value={newSweet.category}
          onChange={(e) =>
            setNewSweet({ ...newSweet, category: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={newSweet.price}
          onChange={(e) =>
            setNewSweet({ ...newSweet, price: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Quantity"
          value={newSweet.quantity}
          onChange={(e) =>
            setNewSweet({ ...newSweet, quantity: e.target.value })
          }
        />

        <button>Add</button>
      </form>

      <h3>Manage Sweets</h3>

      {sweets.map((s) => (
        <div key={s._id} className="card">
          <input
            defaultValue={s.name}
            onBlur={(e) => updateSweet(s._id, "name", e.target.value)}
          />

          <input
            defaultValue={s.category}
            onBlur={(e) => updateSweet(s._id, "category", e.target.value)}
          />

          <input
            type="number"
            defaultValue={s.price}
            onBlur={(e) => updateSweet(s._id, "price", e.target.value)}
          />

          <p><b>Quantity:</b> {s.quantity}</p>

          <div className="admin-actions">
            <input
              type="number"
              placeholder="Restock qty"
              value={restockQty}
              onChange={(e) => setRestockQty(e.target.value)}
            />

            <button onClick={() => restockSweet(s._id)}>Restock</button>

            <button
              className="delete-btn"
              onClick={() => deleteSweet(s._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Admin;
