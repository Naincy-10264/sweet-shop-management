const SweetCard = ({ sweet, onPurchase }) => {
  return (
    <div className="card">
      <h3>{sweet.name}</h3>
      <p><b>Category:</b> {sweet.category}</p>
      <p><b>Price:</b> ₹{sweet.price}</p>
      <p><b>Quantity:</b> {sweet.quantity}</p>

      <button
        disabled={sweet.quantity === 0}
        onClick={() => onPurchase(sweet._id)}
      >
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
};

export default SweetCard;
