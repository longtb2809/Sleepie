import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SHOPEE_URL = 'https://shopee.vn/shop/390221422';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/Products/${id}`);
        setProduct(response.data);
        // Lấy danh sách ảnh, ưu tiên imageUrls, nếu không có thì dùng imageUrl
        const images = response.data.imageUrls && response.data.imageUrls.length > 0
          ? response.data.imageUrls
          : (response.data.imageUrl ? [response.data.imageUrl] : ['/assets/product_1.png']);

        setMainImage(images[0]);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin sản phẩm", err);
        setError("Không tìm thấy sản phẩm hoặc có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-text-dark mb-4">{error || "Sản phẩm không tồn tại"}</h2>
        <Link to="/" className="text-primary hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Danh sách ảnh
  const allImages = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : (product.imageUrl ? [product.imageUrl] : ['/assets/product_1.png']);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-12">
            <Link to="/" className="inline-flex items-center gap-2 text-text-light hover:text-primary transition-colors mb-8 font-medium">
              <ArrowLeft size={20} /> Quay lại
            </Link>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 group">
                  <img
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300"
                    onError={(e) => { e.target.src = "/assets/product_1.png"; }}
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => {
                          const idx = allImages.indexOf(mainImage);
                          setMainImage(idx > 0 ? allImages[idx - 1] : allImages[allImages.length - 1]);
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-dark p-2 rounded-full shadow-md transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => {
                          const idx = allImages.indexOf(mainImage);
                          setMainImage(idx < allImages.length - 1 ? allImages[idx + 1] : allImages[0]);
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-text-dark p-2 rounded-full shadow-md transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-5 gap-3">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setMainImage(img)}
                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-primary-light'}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.src = "/assets/product_1.png"; }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${product.stockQuantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stockQuantity > 0 ? `Còn ${product.stockQuantity} sản phẩm` : "Hết hàng"}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="text-3xl font-bold text-primary mb-6">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </div>

                <div className="prose prose-sm md:prose-base text-text-light mb-8 max-w-none whitespace-pre-wrap">
                  {product.description}
                </div>

                <button
                  onClick={() => window.open(SHOPEE_URL, '_blank', 'noopener,noreferrer')}
                  disabled={product.stockQuantity <= 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-text-dark hover:bg-primary text-white px-8 py-4 rounded-xl font-medium transition-colors text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag size={24} />
                  {product.stockQuantity > 0 ? "Tìm hiểu thêm" : "Tạm hết hàng"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
