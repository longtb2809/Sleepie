import { AlertCircle, Thermometer, Snowflake, Wind, UtensilsCrossed, Clock, Heart } from "lucide-react";

export default function Instruction() {
  return (
    <div className="bg-white pb-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif text-text-dark leading-tight mb-4">
            Hướng Dẫn Sử Dụng Gối Chườm <br className="hidden md:block" />
            <span className="italic text-primary">Thảo Mộc Sleepie</span>
          </h1>
          <p className="text-lg md:text-xl text-text-light font-serif italic mt-6">
            "One warm hug, one loving message" <br />
            "Ôm một hơi ấm, gửi một lời thương"
          </p>
          <p className="text-text-light text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-8">
            Để đảm bảo an toàn tuyệt đối và tối ưu hóa hiệu quả thư giãn của cốt thảo mộc, vui lòng đọc kỹ hướng dẫn dưới đây.
          </p>
        </div>
      </section>

      {/* Method 1: Warm Compress */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-orange-100 text-orange-600">
                <Thermometer size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-serif text-text-dark">Phương Pháp Chườm Nóng</h2>
          </div>
          <p className="text-text-light text-lg leading-relaxed mb-8 px-16 py-4 bg-orange-50 rounded-2xl border border-orange-200">
            <span className="font-medium text-orange-900">✓ Phù hợp để:</span> Làm ấm cơ thể, hỗ trợ giảm đau mỏi cổ vai gáy, lưng hoặc vỗ về vùng bụng trong những ngày nhạy cảm.
          </p>
        </div>

        {/* Step 1 */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-dark mb-2">Chuẩn Bị Thiết Bị</h3>
                <div className="space-y-3 text-text-light">
                  <p>📌 Tháo phần vỏ gối bên ngoài ra</p>
                  <p className="text-sm text-orange-600 font-medium italic">
                    (Lưu ý: Chỉ làm nóng phần ruột gối thảo mộc để đảm bảo độ bền cho vải vỏ gối)
                  </p>
                  <p>📌 Đặt ruột gối chườm vào:</p>
                  <ul className="list-disc list-inside space-y-2 text-text-light pl-2">
                    <li>Nồi chiên không dầu, hoặc</li>
                    <li>Lò vi sóng</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
            <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src="/assets/huongdansudung1.png"
                alt="Hướng dẫn bước 1"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="order-2 md:order-1 bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
            <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src="/assets/huongdansudung2.png"
                alt="Hướng dẫn bước 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold text-text-dark mb-4">Cài Đặt Thời Gian & Nhiệt Độ</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="font-semibold text-text-dark mb-2">🔥 Đối Với Lò Vi Sóng:</p>
                    <ul className="space-y-1 text-text-light text-sm">
                      <li>• Quay từ <span className="font-bold">2 - 3 phút</span></li>
                      <li>• Chế độ làm nóng</li>
                      <li>• Công suất <span className="font-bold">600W</span></li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <p className="font-semibold text-text-dark mb-2">🍳 Đối Với Nồi Chiên Không Dầu:</p>
                    <ul className="space-y-1 text-text-light text-sm">
                      <li>• Nhiệt độ: <span className="font-bold">150°C - 180°C</span></li>
                      <li>• Thời gian: <span className="font-bold">3 phút</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-dark mb-3">Chườm Thư Giãn</h3>
                <div className="space-y-3 text-text-light">
                  <p>✓ Lấy ruột gối ra, lồng lại vào vỏ vải cao cấp</p>
                  <p>✓ Dùng tay kiểm tra lại độ ấm trước khi áp lên da</p>
                  <p className="text-sm font-medium text-orange-600">⚠️ Tránh bị quá nóng</p>
                  <p>✓ Tiến hành chườm lên các vùng cơ thể cần được xoa dịu</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-6 rounded-2xl border-2 border-orange-200">
            <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <img
                src="/assets/huongdansudung3.png"
                alt="Hướng dẫn bước 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Method 2: Cold Compress */}
      <section className="bg-blue-50/50 py-16 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-100 text-blue-600">
                  <Snowflake size={24} />
                </div>
              </div>
              <h2 className="text-3xl font-serif text-text-dark">Phương Pháp Chườm Lạnh</h2>
            </div>
            <p className="text-text-light text-lg leading-relaxed mb-8 px-16 py-4 bg-blue-100 rounded-2xl border border-blue-300">
              <span className="font-medium text-blue-900">✓ Phù hợp để:</span> Làm mát, hỗ trợ giảm sưng tấy hoặc thư giãn tinh thần sau những giờ làm việc căng thẳng.
            </p>
          </div>

          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-dark mb-3">Bọc Kín Sản Phẩm</h3>
                  <div className="space-y-3 text-text-light">
                    <p>✓ Cho túi chườm Sleepie vào một túi zip</p>
                    <p>✓ Khóa kín lại</p>
                    <p className="text-sm font-medium text-blue-600 bg-white p-2 rounded-lg">
                      💡 Lợi ích: Giúp ruột gối không bị bám mùi thực phẩm hoặc ẩm mốc do hơi nước trong tủ lạnh.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-200">
              <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src="/assets/huongdansudung4.png"
                  alt="Hướng dẫn bước 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
            <div className="order-2 md:order-1 bg-white p-6 rounded-2xl border-2 border-blue-200">
              <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src="/assets/huongdansudung5.png"
                  alt="Hướng dẫn bước 5"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-dark mb-3">Làm Lạnh</h3>
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold text-text-dark mb-2">❄️ Lạnh Trong Tủ Lạnh:</p>
                    <ul className="space-y-2 text-text-light text-sm">
                      <li>• Đặt túi zip chứa gối chườm vào ngăn đá tủ lạnh</li>
                      <li>• Thời gian: <span className="font-bold">30 phút đến 1 tiếng</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-dark mb-3">Chườm Thư Giãn</h3>
                  <div className="space-y-2 text-text-light">
                    <p>✓ Lấy túi chườm ra khỏi ngăn đá</p>
                    <p>✓ Bỏ lớp túi zip bên ngoài</p>
                    <p>✓ Nhẹ nhàng chườm lên các vùng cơ thể cần được làm dịu</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-blue-200">
              <p className="text-sm text-text-light mb-3 font-medium">📸 Hình ảnh minh họa</p>
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <img
                  src="/assets/huongdansudung6.png"
                  alt="Hướng dẫn bước 6"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Warnings & Care Guide */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-red-100 text-red-600">
                <AlertCircle size={24} />
              </div>
            </div>
            <h2 className="text-3xl font-serif text-text-dark">Cảnh Báo An Toàn & Hướng Dẫn Bảo Quản</h2>
          </div>
        </div>

        {/* Safety Warnings */}
        <div className="bg-gradient-to-r from-red-50 to-red-50 p-8 rounded-2xl border-2 border-red-300 mb-8">
          <h3 className="text-xl font-semibold text-red-900 mb-6 flex items-center gap-2">
            <AlertCircle size={24} />
            ⚠️ CẢNH BÁO AN TOÀN (QUAN TRỌNG)
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4 bg-white p-4 rounded-lg">
              <div className="text-xl mt-1">🔴</div>
              <div>
                <p className="font-semibold text-text-dark mb-1">Không làm nóng quá lâu hoặc sử dụng công suất quá cao</p>
                <p className="text-text-light text-sm">Tránh làm cháy sém cốt thảo mộc bên trong theo hướng dẫn</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white p-4 rounded-lg">
              <div className="text-xl mt-1">🔴</div>
              <div>
                <p className="font-semibold text-text-dark mb-1">Không để gối chườm đang quá nóng tiếp xúc trực tiếp trên da trần</p>
                <p className="text-text-light text-sm">Luôn kiểm tra nhiệt độ bằng tay trước khi sử dụng</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white p-4 rounded-lg">
              <div className="text-xl mt-1">🔴</div>
              <div>
                <p className="font-semibold text-text-dark mb-1">Cần sự giám sát cẩn thận khi sử dụng cho trẻ em hoặc người nhạy cảm</p>
                <p className="text-text-light text-sm">Đặc biệt với những người có làn da quá nhạy cảm hoặc khó cảm nhận nhiệt độ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Care Instructions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl border-2 border-primary/30">
            <h3 className="text-xl font-semibold text-text-dark mb-6 flex items-center gap-2">
              🌿 Bảo Quản Ruột Gối
            </h3>
            <ul className="space-y-4 text-text-light">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                <span>Để gối ở nơi <span className="font-medium text-text-dark">khô ráo, thoáng mát</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                <span>Tránh môi trường <span className="font-medium text-text-dark">ẩm ướt</span> để phòng ngừa ẩm mốc thảo mộc</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold text-lg leading-none mt-0.5">✓</span>
                <span>Bảo quản ở nơi <span className="font-medium text-text-dark">mát mẻ, tránh ánh nắng trực tiếp</span></span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-8 rounded-2xl border-2 border-secondary/30">
            <h3 className="text-xl font-semibold text-text-dark mb-6 flex items-center gap-2">
              🧺 Vệ Sinh Vỏ Gối
            </h3>
            <ul className="space-y-4 text-text-light">
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold text-lg leading-none mt-0.5">✓</span>
                <span>Thường xuyên tháo rời phần <span className="font-medium text-text-dark">vỏ ngoài bằng Cotton/Linen</span></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold text-lg leading-none mt-0.5">✓</span>
                <span><span className="font-medium text-text-dark">Giặt giũ</span> để giữ vệ sinh sạch sẽ</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold text-lg leading-none mt-0.5">✓</span>
                <span>Giúp bảo dưỡng vỏ gối cho những lần <span className="font-medium text-text-dark">sử dụng tiếp theo</span></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-12 text-center">
        <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 p-12 rounded-3xl border border-primary/20">
          <Heart className="w-10 h-10 text-secondary fill-secondary mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-serif text-text-dark mb-6">
            Chăm Sóc Bản Thân, Vỗ Về Người Thương
          </h3>
          <p className="text-lg text-text-light leading-relaxed max-w-2xl mx-auto">
            Gối chườm thảo mộc Sleepie là lời nhắc nhở đầy tinh tế rằng: <span className="font-medium text-primary italic">"Mong bạn được nghỉ ngơi nhiều hơn"</span>.
            <br /><br />
            Dù bạn chọn Sleepie để nuông chiều bản thân sau một ngày dài kiệt sức, hay làm món quà gửi tặng người thân thương, hãy luôn sử dụng sản phẩm một cách an toàn và lành mạnh.
          </p>
        </div>
      </section>
    </div>
  );
}
