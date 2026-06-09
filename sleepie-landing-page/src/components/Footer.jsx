import { Phone, MapPin, Mail } from "lucide-react";
import logoImg from '../assets/logo.png';
import shopeeImg from '../assets/shopee.png';
import facebookImg from '../assets/facebook.png';
import tiktokImg from '../assets/tiktok.png';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
    <footer className="bg-[#f4f8f5] text-text-light pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">

          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 no-underline">
              <img src={logoImg} alt="Sleepie Logo" className="h-16 md:h-24 w-auto object-contain" />
              <span className="font-serif text-2xl font-bold text-text-dark tracking-wide"></span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Giải pháp thư giãn và chăm sóc giấc ngủ hoàn toàn từ thảo mộc thiên nhiên, an toàn và lành tính.
            </p>
            <div className="flex gap-4 text-text-dark">
              <a href="https://www.facebook.com/sleepie.official" className="hover:opacity-80 transition-opacity flex items-center justify-center" title="Facebook">
                <img src={facebookImg} alt="Facebook" className="w-6 h-6 object-contain" />
              </a>

              <a href="https://www.tiktok.com/@sleepie.offficial" className="hover:opacity-80 transition-opacity flex items-center justify-center" title="TikTok">
                <img src={tiktokImg} alt="TikTok" className="w-6 h-6 object-contain" />
              </a>

              <a href="https://shopee.vn/shop/390221422?fbclid=IwY2xjawSMhjlleHRuA2FlbQIxMABicmlkETJQMFExclluRjJpMlFGMzVic3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHtZi5C0-rIG6ZFeq5pgP2zQbkquC1HAK1vRhvoTjI8m-GzRZqpHaunCG_z6w_aem_iRTvwLIfvui2igjEoZyAuQ" className="hover:opacity-80 transition-opacity flex items-center justify-center" title="Shopee">
                <img src={shopeeImg} alt="Shopee" className="w-6 h-6 object-contain" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-text-dark font-semibold mb-6 uppercase tracking-wider text-sm">Về Sleepie</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-primary transition-colors">Câu chuyện thương hiệu</a></li>
              <li><a href="/products" className="hover:text-primary transition-colors">Sản phẩm</a></li>
              <li><a href="/instruction" className="hover:text-primary transition-colors">Hướng dẫn sử dụng</a></li>
              
            </ul>
          </div>

          <div>
            <h4 className="text-text-dark font-semibold mb-6 uppercase tracking-wider text-sm">Liên hệ</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Quốc lộ 21, huyện Thạch Thất,thành phố Hà Nội</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>0983093868</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>sleepieherbal@gmail.com</span>
              </li>
            </ul>
          </div>

          <div id="survey" className="bg-white p-6 rounded-2xl border border-primary/20 shadow-sm">
            <h4 className="text-text-dark font-semibold mb-3">Feedback sản phẩm</h4>
            <p className="text-sm text-text-light mb-6">Tham gia khảo sát feedback sản phẩm.</p>
            <a
              href="#"
              className="inline-block w-full text-center bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded-xl transition-colors"
            >
              Làm khảo sát ngay
            </a>
          </div>

        </div>

        <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-text-light">
          <p>&copy; {new Date().getFullYear()} Sleepie Vietnam. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-primary transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
