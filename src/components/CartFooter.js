import { useNavigate } from "react-router-dom";

const CartFooter = ({ cart }) => {
  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-footer">
      <h3>Total: ${getTotal().toFixed(2)}</h3>
      <button
        className="add-to-cart-button"
        onClick={() =>
          navigate("/checkout", { state: { total: getTotal().toFixed(2) } })
        }
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartFooter;
