import React, { useState, useEffect } from "react";
import "./home.css";
import { MapPin, Heart, ShoppingCart, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";


const HomePage: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  // 🧠 Tạo dữ liệu mẫu cho sản phẩm
  useEffect(() => {
  const sampleProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 59.99,
      oldPrice: 79.99,
      rating: 4.5,
      image: "src/assets/images/anh2.png",
    },
    {
      id: 2,
      name: "Smart Watch Series 8",
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.8,
      image: "src/assets/images/anh3.png",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 39.99,
      oldPrice: 59.99,
      rating: 4.3,
      image: "src/assets/images/anh4.png",
    },
    {
      id: 4,
      name: "Gaming Mouse RGB",
      price: 29.99,
      oldPrice: 49.99,
      rating: 4.7,
      image: "/src/assets/images/anh5.png",
    },
    {
      id: 5,
      name: "Mechanical Keyboard",
      price: 89.99,
      oldPrice: 119.99,
      rating: 4.6,
      image: "src/assets/images/anh6.png",
    },
    {
      id: 6,
      name: "USB-C Hub 7-in-1",
      price: 45.99,
      oldPrice: 69.99,
      rating: 4.4,
      image: "src/assets/images/anh7.png",
    },
    {
      id: 7,
      name: "4K Action Camera",
      price: 129.99,
      oldPrice: 159.99,
      rating: 4.9,
      image: "src/assets/images/anh8.png",
    },
    {
      id: 8,
      name: "Portable SSD 1TB",
      price: 139.99,
      oldPrice: 179.99,
      rating: 4.8,
      image: "src/assets/images/anh9.png",
    },
  ];

  setProducts(sampleProducts);
  setFilteredProducts(sampleProducts);
}, []);


  // 🔍 Hàm tìm kiếm theo tên
  const handleSearch = () => {
    if (keyword.trim() === "") {
      setFilteredProducts(products);
      return;
    }

    const result = products.filter((p) =>
      p.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredProducts(result);
  };

  // Cho phép tìm khi nhấn Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  // 🧭 Xem chi tiết sản phẩm
  const handleViewDetail = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="homepage">
      {/* --- HEADER --- */}
      <header>
        {/* --- TOP BAR --- */}
        <div className="top-bar">
          <div className="address">
            <MapPin size={16} />
            <span>1D Đỗ Thúc Tịnh - Khuê Trung - Cẩm Lệ - Đà Nẵng</span>
          </div>

          <div className="top-right">
            <p>
              Something you love is now on sale!{" "}
              <a href="#" className="buy-now">
                Buy Now!
              </a>
            </p>
            <div className="lang-currency">
              <span role="img" aria-label="flag">
                🇺🇸
              </span>
              <span>English ▾</span>
              <span className="divider">|</span>
              <span>USD ▾</span>
            </div>
          </div>
        </div>

        {/* --- MAIN HEADER --- */}
        <div className="main-header">
          <div className="logo">
            Fast<span>kart.</span>
          </div>

          {/* 🔍 SEARCH BAR */}
          <div className="search-bar">
            <select>
              <option>Your Location</option>
            </select>
            <input
              type="text"
              placeholder="I'm searching for..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="btn-search" onClick={handleSearch}>
              🔍
            </button>
          </div>

          <div className="icons">
            <Heart className="icon" />
            <div className="cart">
              <ShoppingCart className="icon" />
              <span className="cart-count">2</span>
            </div>
            <Link to="/login">
              <User className="icon" />
            </Link>
          </div>
        </div>

        {/* --- NAV MENU --- */}
        <nav className="nav-bar">
          <button className="all-categories">☰ All Categories ▾</button>

          <nav className="nav-items">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">Product</a>
            <a href="#">Mega Menu</a>
            <a href="#">Blog</a>
            <a href="#">Pages</a>
            <a href="#">Seller</a>
          </nav>

          <button className="deal-btn">⚡ Deal Today</button>
        </nav>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main>
        {/* 🥦 HERO SECTION */}
        <section className="hero-section">
          <div className="hero-left">
            <div className="hero-offer">
              <span className="exclusive">Exclusive offer</span>
              <span className="discount">30% Off</span>
            </div>
            <h1>
              STAY HOME & DELIVERED YOUR <span>DAILY NEEDS</span>
            </h1>
            <p>
              Vegetables contain many vitamins and minerals that are good for
              your health.
            </p>
            <button className="btn-shop">Shop Now →</button>
          </div>

          <div className="hero-center">
            <img src="src/assets/images/anh1.png" alt="Vegetables" />
          </div>

          <div className="hero-right">
            <div className="small-banner">
              <h3>
                <span>45% OFF</span> Nut Collection
              </h3>
              <p>We deliver organic vegetables & fruits</p>
              <a href="#">Shop Now →</a>
            </div>
            <div className="small-banner">
              <h3>Healthy Food</h3>
              <p className="orange">Organic Market</p>
              <p>Start your daily shopping with some Organic food</p>
              <a href="#">Shop Now →</a>
            </div>
          </div>
        </section>

        {/* 🛒 CATEGORY & PRODUCT */}
        <section className="top-save">
          <div className="category">
            <h2>Category</h2>
            <ul>
              <li>🥕 Vegetables & Fruit</li>
              <li>☕ Beverages</li>
              <li>🥩 Meats & Seafood</li>
              <li>🍳 Breakfast & Dairy</li>
              <li>❄️ Frozen Foods</li>
              <li>🍪 Biscuits & Snacks</li>
              <li>🥬 Grocery & Staples</li>
              <li>🍷 Wines & Alcohol Drinks</li>
              <li>🥛 Milk & Dairies</li>
              <li>🐶 Pet Foods</li>
            </ul>
          </div>

          {/* 🔎 Danh sách sản phẩm */}
          <div className="product-section">
            <div className="section-header">
              <h2>Top Save Today</h2>
              <p>
                Don’t miss this opportunity at a special discount just for this
                week.
              </p>
              <span className="expire">⏰ Expires in: 14 : 22 : 19 : 15</span>
            </div>

            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="product-card"
                    onClick={() => handleViewDetail(item.id)}
                    
                  >
                   
                    <div className="product-img">
                      <img src={item.image} alt={item.name} />                     
                    </div>
                    <h4>{item.name}</h4>
                    <p className="price">
                      <span className="new">${item.price}</span>{" "}
                      <span className="old">${item.oldPrice}</span>
                    </p>
                    <p className="stock">
                      ⭐ {item.rating}{" "}
                      <span className="in-stock">In Stock</span>
                    </p>
                    <button className="btn-add">Add +</button>
                  </div>
                ))
              ) : (
                <p className="no-results">No products found!</p>
              )}
            </div>           
          </div>
        </section>
      </main>
      {/* --- EXTENDED SECTION --- */}
      <section className="extended-section">
        {/* LEFT COLUMN */}
        <div className="extended-left">
          <div className="promo-box">
            <h2>VEGETABLES</h2>
            <p>Super Offer Up to 50% Off</p>
            <button className="btn-shop">Shop Now</button>
            <img src="/assets/images/box-veggies.png" alt="Vegetable Box" />
          </div>

          <div className="trending-products">
            <h3>Trending Products</h3>
            <ul>
              <li>
                <img src="/assets/images/item1.png" alt="Item" />
                <div>
                  <p>Mastige Premium Goat Curry</p>
                  <span className="old">$9.00</span>
                  <span className="new">$7.00</span>
                </div>
              </li>
              <li>
                <img src="/assets/images/item2.png" alt="Item" />
                <div>
                  <p>Dates Medjoul Premium</p>
                  <span className="old">$6.00</span>
                  <span className="new">$4.00</span>
                </div>
              </li>
              <li>
                <img src="/assets/images/item3.png" alt="Item" />
                <div>
                  <p>Good Life Walnut Kernels</p>
                  <span className="new">$5.00</span>
                </div>
              </li>
              <li>
                <img src="/assets/images/item4.png" alt="Item" />
                <div>
                  <p>Apple Red Premium Imported</p>
                  <span className="new">$2.00</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="customer-feedback">
            <h3>Customer Comment</h3>
            <p>We care about your experience.</p>
            <p className="desc">
              In publishing and graphic design, Lorem ipsum is a placeholder used to
              demonstrate layout or type.
            </p>
            <div className="user-info">
              <img src="/assets/images/user.png" alt="User" />
              <div>
                <strong>Tina Mcdonald</strong>
                <p>Sale Manager</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="extended-right">
          <div className="summer-banner">
            <h2>
              SUMMER <span>VEGETABLE</span>
            </h2>
            <p>Save Up to 50% OFF</p>
            <button className="btn-shop">Shop Now</button>
          </div>

          <div className="featured-blog">
            <h3>Featured Blog</h3>
            <p>A virtual assistant collects the products from your list</p>
            <div className="blog-list">
              <div className="blog-item">
                <img src="/assets/images/blog1.png" alt="Blog" />
                <span>20 March, 2022</span>
                <p>Fresh Vegetable Online</p>
              </div>
<div className="blog-item">
                <img src="/assets/images/blog2.png" alt="Blog" />
                <span>10 April, 2022</span>
                <p>Fresh Combo Fruit</p>
              </div>
              <div className="blog-item">
                <img src="/assets/images/blog3.png" alt="Blog" />
                <span>10 April, 2022</span>
                <p>Nuts to Eat for Better Health</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER SECTION --- */}
      <section className="newsletter">
        <div className="newsletter-content">
          <h2>Join Our Newsletter And Get…</h2>
          <p>$20 discount for your first order</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter Your Email" />
            <button className="btn-subscribe">Subscribe →</button>
          </div>
        </div>
      </section>

      {/* --- FOOTER SECTION --- */}
      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-feature">
            <img src="/assets/icons/fresh.svg" alt="" />
            <p>Every Fresh Products</p>
          </div>
          <div className="footer-feature">
            <img src="/assets/icons/delivery.svg" alt="" />
            <p>Free Delivery For Order Over $50</p>
          </div>
          <div className="footer-feature">
            <img src="/assets/icons/discount.svg" alt="" />
            <p>Daily Mega Discounts</p>
          </div>
          <div className="footer-feature">
            <img src="/assets/icons/price.svg" alt="" />
            <p>Best Price On The Market</p>
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-col about">
            <h3>
              <span>Fast</span>kart.
            </h3>
            <p>
              We are a friendly bar serving a variety of cocktails, wines and beers. Our bar is a
              perfect place for a couple.
            </p>
            <p>
              <strong>📍</strong> 1418 Riverwood Drive, CA 96052, US
            </p>
            <p>
              <strong>📧</strong> support@fastkart.com
            </p>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li>Vegetables & Fruit</li>
              <li>Beverages</li>
              <li>Meats & Seafood</li>
              <li>Frozen Foods</li>
              <li>Biscuits & Snacks</li>
              <li>Grocery & Staples</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Useful Links</h4>
            <ul>
              <li>Home</li>
              <li>Shop</li>
              <li>About Us</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Help Center</h4>
            <ul>
<li>Your Order</li>
              <li>Your Account</li>
              <li>Track Order</li>
              <li>Your Wishlist</li>
              <li>Search</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>
              <strong>Hotline 24/7:</strong>
              <br /> +84 971 105 182
            </p>
            <p>
              <strong>Email Address:</strong>
              <br /> fastkart@hotmail.com
            </p>
            <div className="app-buttons">
              <img src="/assets/images/playstore.png" alt="Google Play" />
              <img src="/assets/images/appstore.png" alt="App Store" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>©2022 Fastkart All rights reserved</p>
          <div className="footer-payments">
            <img src="/assets/images/paypal.png" alt="PayPal" />
            <img src="/assets/images/visa.png" alt="Visa" />
            <img src="/assets/images/mastercard.png" alt="MasterCard" />
            <img src="/assets/images/stripe.png" alt="Stripe" />
            <img src="/assets/images/amex.png" alt="Amex" />
          </div>
          <div className="footer-socials">
            <p>Stay connected :</p>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default HomePage;
