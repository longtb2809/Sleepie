import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosInstance';
import { getImageUrl } from '../utils/image';
import { LogOut, Plus, Edit2, Trash2, X, ImageIcon } from 'lucide-react';
import logoImg from '../assets/logo.png';

const BACKEND_URL = 'http://localhost:5194';

function getImageSrc(product) {
  if (product.imageUrls && product.imageUrls.length > 0) return product.imageUrls[0];
  if (product.imageUrlJson && product.imageUrlJson.startsWith('[')) {
    try {
      const arr = JSON.parse(product.imageUrlJson);
      if (arr.length > 0) return arr[0];
    } catch {}
  }
  if (product.imageUrlJson && !product.imageUrlJson.startsWith('[')) return product.imageUrlJson;
  return null;
}

export default function AdminDashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null = thêm mới, có giá trị = đang sửa
  const [formData, setFormData] = useState({ name: '', description: '', price: 0, stockQuantity: 0 });
  const [imageFiles, setImageFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (user && user.role !== 'staff') {
      navigate('/');
    } else if (user) {
      fetchProducts();
    }
  }, [user, navigate]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/Products');
      setProducts(response.data);
    } catch (error) {
      console.error("Lỗi khi tải sản phẩm", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openAddForm = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: 0, stockQuantity: 0 });
    setImageFiles([]);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
    setImageFiles([]);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setImageFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let imageUrls = editingProduct
        ? (editingProduct.imageUrls || []) // giữ nguyên ảnh cũ
        : [];

      // Tải ảnh mới nếu có
      if (imageFiles && imageFiles.length > 0) {
        const fileData = new FormData();
        Array.from(imageFiles).forEach(file => {
          fileData.append('files', file);
        });

        const uploadRes = await api.post('/Products/upload', fileData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        // Cộng dồn ảnh cũ và ảnh mới
        imageUrls = [...imageUrls, ...(uploadRes.data.urls || [])];
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        imageUrls: imageUrls,
      };

      if (editingProduct) {
        // Cập nhật sản phẩm
        await api.put(`/Products/${editingProduct.id}`, {
          ...payload,
          id: editingProduct.id,
          isActive: editingProduct.isActive,
          createdAt: editingProduct.createdAt,
        });
      } else {
        // Thêm mới
        await api.post('/Products', payload);
      }

      closeForm();
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm", error);
      alert("Đã xảy ra lỗi khi lưu sản phẩm. Kiểm tra console để biết chi tiết.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/Products/${productId}`);
      setDeletingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm", error);
      alert("Đã xảy ra lỗi khi xoá sản phẩm.");
    }
  };

  if (!user || user.role !== 'staff') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b px-6 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <img src={logoImg} alt="Sleepie Logo" className="h-16 md:h-20 w-auto object-contain" />
          <span className="font-serif text-xl font-bold text-text-dark">Admin Dashboard</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-text-light">Xin chào, {user.name}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-text-dark">Quản lý Sản phẩm</h1>
          <button
            onClick={openAddForm}
            className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Thêm Sản phẩm
          </button>
        </div>

        {/* Modal Form Thêm / Sửa */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-lg font-bold text-text-dark">
                  {editingProduct ? 'Cập nhật sản phẩm' : 'Thêm mới sản phẩm'}
                </h2>
                <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Tên sản phẩm</label>
                  <input
                    required type="text" value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Giá bán (VNĐ)</label>
                  <input
                    required type="number" min="0" value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-dark mb-1">Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-dark mb-1">Số lượng kho</label>
                  <input
                    required type="number" min="0" value={formData.stockQuantity}
                    onChange={e => setFormData({ ...formData, stockQuantity: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-dark mb-3">
                    Ảnh Sản Phẩm {editingProduct && <span className="text-gray-400 font-normal">(có thể chọn thêm hoặc xoá ảnh)</span>}
                  </label>
                  
                  <div className="flex gap-4 flex-wrap items-center">
                    {/* Preview ảnh cũ khi đang sửa */}
                    {editingProduct && editingProduct.imageUrls && editingProduct.imageUrls.map((url, idx) => (
                      <div key={`old-${idx}`} className="relative group">
                        <img
                          src={getImageUrl(url)}
                          alt={`img-${idx}`}
                          className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                          onError={e => { e.target.style.display = 'none'; }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...editingProduct.imageUrls];
                            updated.splice(idx, 1);
                            setEditingProduct({...editingProduct, imageUrls: updated});
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {/* Preview ảnh mới chọn */}
                    {imageFiles && Array.from(imageFiles).map((file, idx) => (
                      <div key={`new-${idx}`} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`new-img-${idx}`}
                          className="w-24 h-24 object-cover rounded-xl border-2 border-primary border-dashed shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}

                    {/* Nút Thêm Ảnh */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-24 h-24 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all bg-gray-50"
                    >
                      <Plus size={24} />
                      <span className="text-xs font-medium">Thêm ảnh</span>
                    </button>
                    
                    {/* Input ẩn */}
                    <input
                      type="file" multiple accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={e => {
                        if (e.target.files && e.target.files.length > 0) {
                          const newFiles = Array.from(e.target.files);
                          setImageFiles(prev => [...prev, ...newFiles]);
                        }
                        e.target.value = ''; // Reset input
                      }}
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                  <button type="button" onClick={closeForm} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                    Huỷ
                  </button>
                  <button
                    type="submit" disabled={submitting}
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light disabled:opacity-60"
                  >
                    {submitting ? 'Đang lưu...' : (editingProduct ? 'Cập nhật' : 'Lưu Sản phẩm')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Xác nhận Xóa */}
        {deletingId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-red-500" size={24} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">Xác nhận xoá</h3>
              <p className="text-text-light text-sm mb-6">Sản phẩm sẽ bị ẩn đi và không còn xuất hiện trên cửa hàng. Bạn có chắc chắn muốn xoá?</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setDeletingId(null)}
                  className="px-5 py-2 border rounded-lg text-sm hover:bg-gray-50"
                >
                  Huỷ
                </button>
                <button
                  onClick={() => handleDelete(deletingId)}
                  className="px-5 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                >
                  Xoá
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bảng sản phẩm */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-medium text-text-light w-16">Ảnh</th>
                <th className="px-6 py-4 text-sm font-medium text-text-light">Tên sản phẩm</th>
                <th className="px-6 py-4 text-sm font-medium text-text-light">Giá bán</th>
                <th className="px-6 py-4 text-sm font-medium text-text-light">Tồn kho</th>
                <th className="px-6 py-4 text-sm font-medium text-text-light">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr><td colSpan="5" className="text-center py-8 text-text-light">Đang tải...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-8 text-text-light">Chưa có sản phẩm nào</td></tr>
              ) : (
                products.map((product) => {
                  const imgSrc = getImageSrc(product);
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {imgSrc ? (
                          <img
                            src={getImageUrl(imgSrc)}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded shadow-sm border"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 shadow-sm border">
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-dark font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-text-light">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-light">{product.stockQuantity}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <button
                          onClick={() => openEditForm(product)}
                          className="text-blue-500 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Sửa sản phẩm"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeletingId(product.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Xoá sản phẩm"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
