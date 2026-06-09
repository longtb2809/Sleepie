import { ArrowRight, Leaf } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary/30 blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-light/40 blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4 border border-primary/20">
              <Leaf size={16} />
              <span>100% Thảo dược tự nhiên</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-text-dark leading-tight">
              Mang trọn thiên nhiên <br /><span className="text-primary italic">vào giấc ngủ của bạn</span>
            </h1>

            <p className="text-lg sm:text-xl text-text-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Sleepie kết tinh từ các loại thảo mộc trị liệu truyền thống, tạo ra những sản phẩm
              chườm ấm và hỗ trợ giấc ngủ, giúp bạn xoa dịu mệt mỏi và chìm vào giấc ngủ sâu sau một ngày dài.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="/products" className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-1">
                Khám phá sản phẩm <ArrowRight size={20} />
              </a>
              <a href="/about" className="inline-flex justify-center items-center px-8 py-4 rounded-full font-medium text-text-dark bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all">
                Tìm hiểu thêm
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/20 bg-white aspect-[4/5] sm:aspect-square lg:aspect-[4/5]">
              {/* Product Image */}
              <img
                src="/assets/hero_image.png"
                alt="Sleepie Thảo Mộc"
                fetchPriority="high"
                loading="eager"
                className="w-full h-full object-cover origin-center hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">4.9/5 Điểm</p>
                <p className="text-xs text-text-light">Từ 1000+ khách hàng</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
