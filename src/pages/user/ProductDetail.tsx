import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./productDetail.css";
import choco1 from "../../assets/images/choco1.jpg";
import choco2 from "../../assets/images/choco2.jpg";
import choco3 from "../../assets/images/choco3.jpg";

const sampleProducts = [
  {
    id: "1",
    name: "Creamy Chocolate Cake",
    oldPrice: 1410000,
    price: 1120000,
    rating: 5,
    inStock: true,
    origin: "Việt Nam",
    shipping: "Toàn quốc",
    fee: "Theo khu vực",
    description: "Bánh socola mềm mịn, hương vị đậm đà, phù hợp làm quà tặng.",
    images: [choco1, choco2, choco3],
  },
  {
    id: "2",
    name: "Vanilla Cupcake Box",
    oldPrice: 980000,
    price: 750000,
    rating: 4,
    inStock: true,
    origin: "Mỹ",
    shipping: "Toàn quốc",
    fee: "Miễn phí nội thành",
    description: "Cupcake vani thơm ngọt, trang trí đẹp mắt, thích hợp tiệc sinh nhật.",
    images: [
      "/assets/img/vanilla1.jpg",
      "/assets/img/vanilla2.jpg",
      "/assets/img/vanilla3.jpg",
    ],
  },
  {
    id: "3",
    name: "Strawberry Cheesecake",
    oldPrice: 1250000,
    price: 990000,
    rating: 5,
    inStock: false,
    origin: "Pháp",
    shipping: "Toàn quốc",
    fee: "Miễn phí vận chuyển",
    description: "Bánh cheesecake vị dâu tây tươi, béo ngậy, hấp dẫn mọi lứa tuổi.",
    images: [
      "/assets/img/strawberry1.jpg",
      "/assets/img/strawberry2.jpg",
      "/assets/img/strawberry3.jpg",
    ],
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = sampleProducts.find((p) => p.id === id);

  const [mainImage, setMainImage] = useState(product?.images[0] || "");

  useEffect(() => {
    if (product) setMainImage(product.images[0]);
  }, [id]);

  if (!product) {
    return <p className="not-found">❌ Không tìm thấy sản phẩm!</p>;
  }

  return (
    <div className="card-wrapper">
      <div className="card">
        {/* LEFT IMAGE */}
        <div className="product-imgs">
          <div className="img-display">
            <div className="img-showcase">
              <img src={mainImage} alt={product.name} />
            </div>
          </div>

          <div className="img-select">
            {product.images.map((img, index) => (
              <div className="img-item" key={index}>
                <button
                  onClick={() => setMainImage(img)}
                  className="img-thumb-btn"
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT DETAILS */}
        <div className="product-content">
          <h2 className="product-title">{product.name}</h2>
          <Link to="/" className="product-link">Ghé thăm cửa hàng</Link>

          <div className="start">
            <p className="text-2">Đánh giá:</p>
            {Array.from({ length: product.rating }).map((_, i) => (
              <img key={i} className="start-1" src="/assets/img/star.png" alt="star" />
            ))}
          </div>

          <div className="product-price">
            <p className="last-price">
              Giá cũ: <span>{product.oldPrice.toLocaleString()}₫</span>
            </p>
            <p className="new-price">
              Giá mới: <span>{product.price.toLocaleString()}₫</span>
            </p>
          </div>

          <div className="product-detail">
            <h2>Về mặt hàng này:</h2>
            <p>{product.description}</p>
            <ul>
              <li>Còn hàng: <span>{product.inStock ? "Trong kho" : "Hết hàng"}</span></li>
              <li>Xuất xứ: <span>{product.origin}</span></li>
              <li>Vận chuyển: <span>{product.shipping}</span></li>
              <li>Phí vận chuyển: <span>{product.fee}</span></li>
            </ul>
          </div>

          <div className="purchase-info">
            <input type="number" min="1" defaultValue="1" />
            <button type="button" className="btn">
              Thêm vào giỏ hàng <i className="fa fa-shopping-cart"></i>
            </button>
          </div>

          <Link to="/" className="btn-back">← Quay lại Trang chủ</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
