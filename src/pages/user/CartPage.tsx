import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import "./cart.css";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // ✅ Lấy giỏ hàng từ localStorage khi load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // ✅ Cập nhật lại localStorage mỗi khi giỏ hàng thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Xử lý khi nhấn "Thanh toán"
  const handleCheckout = () => {
    // Kiểm tra đăng nhập
    const user = localStorage.getItem("user"); // Hoặc "token" tùy cách bạn lưu

    if (!user) {
      alert("⚠️ Vui lòng đăng nhập trước khi thanh toán!");
      navigate("/login", { state: { from: "/cart" } });
      return;
    }

    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!");
      return;
    }
    

    const confirmed = window.confirm(
      `Xác nhận thanh toán đơn hàng tổng cộng ${totalPrice.toLocaleString()}₫?`
    );

    if (confirmed) {
      alert("🎉 Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
      setCartItems([]);
      localStorage.removeItem("cart");
      navigate("/checkout-success");
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>🛒 Giỏ hàng trống</h2>
        <Link to="/" className="back-btn">
          Quay lại mua hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>🛍 Giỏ hàng của bạn</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.price.toLocaleString()}₫</p>
            </div>
            <div className="item-quantity">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                -
              </button>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="item-total">
              {(item.price * item.quantity).toLocaleString()}₫
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Tổng cộng: {totalPrice.toLocaleString()}₫</h3>
        <button className="checkout-btn" onClick={handleCheckout}>
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default CartPage;
