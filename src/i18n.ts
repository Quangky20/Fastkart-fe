import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          address: "1D Do Thuc Tinh - Khue Trung - Cam Le - Da Nang",
          saleText: "Something you love is now on sale!",
          buyNow: "Buy Now!",
          shopNow: "Shop Now",
          category: "Category",
          dealToday: "Deal Today",
          footer: "All rights reserved",
        },
      },
      vi: {
        translation: {
          address: "1D Đỗ Thúc Tịnh - Khuê Trung - Cẩm Lệ - Đà Nẵng",
          saleText: "Sản phẩm bạn yêu thích đang giảm giá!",
          buyNow: "Mua ngay!",
          shopNow: "Mua sắm ngay",
          category: "Danh mục",
          dealToday: "Ưu đãi hôm nay",
          footer: "Bản quyền thuộc Fastkart",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
