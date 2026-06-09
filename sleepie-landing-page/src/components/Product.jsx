import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="product" className="section-padding bg-white flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </section>
    );
  }

  return (
    <section id="product" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-3">Sản phẩm của chúng tôi</h2>
          <h3 className="text-3xl md:text-4xl font-serif text-text-dark mb-6">Liệu Pháp Trị Liệu Tại Nhà</h3>
        </div>

        {products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            Hiện chưa có sản phẩm nào.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((prod) => (
              <div
                key={prod.id}
                id={`product-card-${prod.id}`}
                className="group bg-background rounded-[2rem] overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <Link to={`/product/${prod.id}`} className="block aspect-[4/3] overflow-hidden relative">
                  <img
                    src={(prod.imageUrls && prod.imageUrls.length > 0) ? prod.imageUrls[0] : (prod.imageUrl || "/assets/product_1.png")}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => { e.target.src = "/assets/product_1.png"; }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-text-dark shadow-sm">
                    {prod.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-grow">
                  <Link to={`/product/${prod.id}`} className="hover:text-primary transition-colors no-underline">
                    <h4 className="text-xl font-serif font-bold text-text-dark mb-2 hover:text-primary transition-colors line-clamp-2">{prod.name}</h4>
                  </Link>
                  <p className="text-text-light text-sm mb-6 flex-grow line-clamp-3">{prod.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-medium text-primary">
                      {prod.price.toLocaleString("vi-VN")}đ
                    </span>
                    <button
                      onClick={() => window.open("https://shopee.vn/shop/390221422?fbclid=IwY2xjawSMhjlleHRuA2FlbQIxMABicmlkETJQMFExclluRjJpMlFGMzVic3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtZi5C0-rIG6ZFeq5pgP2zQbkquC1HAK1vRhvoTjI8m-GzRZqpHaunCG_z6w_aem_iRTvwLIfvui2igjEoZyAuQ", "_blank")}
                      disabled={prod.stockQuantity <= 0}
                      className={`p-3 rounded-full transition-all duration-200 ${prod.stockQuantity > 0
                          ? "bg-text-dark text-white hover:bg-primary hover:scale-110 active:scale-95"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      aria-label={prod.stockQuantity > 0 ? `Xem chi tiết ${prod.name}` : "Hết hàng"}
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
