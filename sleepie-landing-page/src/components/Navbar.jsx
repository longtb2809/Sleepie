import { useState, useContext, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logoImg from '../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const links = [
    { name: "Trang chủ", href: "/" },
    { name: "Về chúng tôi", href: "/about" },
    { name: "Vấn đề của bạn", href: "/problem" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Hướng dẫn", href: "/instruction" },
  ];

  // Click ngoài dropdown thì đóng
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-white/70 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Link về trang chủ */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 no-underline">
            <img src={logoImg} alt="Sleepie Logo" className="h-16 md:h-20 w-auto object-contain" />

            <span className="font-serif text-2xl font-bold text-text-dark tracking-wide"></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-text-light hover:text-primary transition-colors font-medium text-sm lg:text-base relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* User Account Section */}
            {user ? (
              <div className="relative border-l pl-4 border-gray-200" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white text-sm font-bold shadow-sm">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-text-dark max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`text-text-light transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
                    {/* Thông tin tài khoản */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-text-dark truncate">{user.name}</p>
                      <p className="text-xs text-text-light truncate">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-text-light" />
                        Hồ sơ của tôi
                      </Link>

                      {user.role === 'staff' && (
                        <Link
                          to="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-text-dark hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-text-light" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} />
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l pl-4 border-gray-200">
                <Link to="/login" className="text-text-light hover:text-primary font-medium text-sm lg:text-base">
                  Đăng nhập
                </Link>
                <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-light transition-colors font-medium text-sm lg:text-base shadow-md hover:shadow-lg">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-text-dark hover:text-primary focus:outline-none p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-white/95 backdrop-blur-xl absolute w-full border-b border-gray-100 shadow-lg`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-medium text-text-dark hover:text-primary hover:bg-primary-light/10 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-text-dark hover:text-primary hover:bg-primary-light/10">
                  Hồ sơ của tôi
                </Link>
                {user.role === 'staff' && (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-text-dark hover:text-primary hover:bg-primary-light/10">
                    Admin Dashboard
                  </Link>
                )}
                <button onClick={() => { setIsOpen(false); handleLogout(); }} className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-red-500 hover:bg-red-50">
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <div className="border-t border-gray-200 pt-3 mt-3 flex gap-3 px-3">
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex-1 text-center py-2 rounded-lg border border-gray-200 text-text-dark font-medium hover:bg-gray-50">Đăng nhập</Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="flex-1 text-center py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-light">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
