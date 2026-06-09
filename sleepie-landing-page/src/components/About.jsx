import { Leaf, Heart, Sparkles, Gift, ShieldCheck, Coffee } from "lucide-react";

export default function About() {
  return (
    <div className="bg-white pb-24">
      {/* Hero Section of About */}
      <section className="relative py-24 bg-gradient-to-b from-primary/10 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-secondary/20 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-primary-light/20 blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">Câu chuyện thương hiệu Sleepie</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-dark leading-tight mb-6">
            Hành Trình Từ <span className="italic text-primary">"Sự Thấu Cảm"</span> <br />
            đến <span className="italic text-primary">"Hơi Ấm Vỗ Về"</span>
          </h1>
        </div>
      </section>

      {/* Section 1 & 2: Vấn đề & Giải pháp */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-medium text-sm mb-2">
              <Coffee size={16} />
              <span>Những "khoảng lặng" mệt mỏi</span>
            </div>
            <h2 className="text-3xl font-serif text-text-dark leading-snug">Giữa guồng quay hối hả của cuộc sống hiện đại</h2>
            <p className="text-text-light text-lg leading-relaxed text-justify">
              Giữa nhịp sống đô thị hiện đại, hình ảnh những người trẻ, dân văn phòng hay các bạn freelancer miệt mài bên bàn làm việc đến tối muộn đã trở nên quá quen thuộc. Sau những giờ gồng mình chạy đua với áp lực công việc và deadline, thứ để lại không chỉ là sự căng thẳng, mệt mỏi về tinh thần mà còn là những cơn đau mỏi vai gáy, đau lưng âm ỉ thể xác.
            </p>
            <p className="text-text-light text-lg leading-relaxed text-justify">
              Hay đối với phái nữ, đó còn là những ngày cơ thể trở nên nhạy cảm, phải chịu đựng cảm giác lạnh bụng và những cơn đau bụng kinh khó chịu. Chúng ta đều cần được xoa dịu, cần một "khoảng lặng để nghỉ lại" và chăm sóc bản thân tốt hơn. Thế nhưng, guồng quay hối hả khiến những giờ phút thư giãn đúng nghĩa đôi khi trở nên thật xa xỉ.
            </p>
          </div>

          <div className="space-y-6 bg-background p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm relative">
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-full shadow-lg text-primary">
              <Sparkles size={32} />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-2">
              <ShieldCheck size={16} />
              <span>Đi tìm mảnh ghép còn thiếu</span>
            </div>
            <h2 className="text-3xl font-serif text-text-dark leading-snug">Giữa "Công năng" và "Cảm xúc"</h2>
            <p className="text-text-light text-lg leading-relaxed text-justify">
              Khi tìm kiếm giải pháp tự chăm sóc và phục hồi tại nhà, đội ngũ Sleepie nhận ra một khoảng trống lớn: Các sản phẩm sức khỏe thường mang thiết kế khô cứng, giống dụng cụ y tế lạnh lẽo. Ngược lại, những món quà tặng đẹp đẽ lại thiếu đi tính ứng dụng thực tế.
            </p>
            <p className="text-text-light text-lg leading-relaxed text-justify">
              <span className="font-medium text-text-dark">Tại sao một sản phẩm chăm sóc sức khỏe lại không thể mang một diện mạo tinh tế, ấm áp? Và tại sao một món quà thẩm mỹ lại không thể đồng hành vỗ về người nhận mỗi ngày?</span> Chính câu hỏi ấy đã thôi thúc Sleepie ra đời – như một cầu nối hoàn hảo hòa quyện giữa công năng chăm sóc cơ thể thực tế và giá trị cảm xúc sâu sắc.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Giá trị cốt lõi */}
      <section className="bg-primary/5 py-20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-text-dark mb-6">Sự ra đời của Sleepie</h2>
            <p className="text-text-light text-lg leading-relaxed">
              Sleepie không định vị mình là một sản phẩm điều trị y tế phức tạp, mà chọn xuất hiện như một giải pháp <span className="font-medium text-primary">self-care (chăm sóc bản thân) nhẹ nhàng, lành tính và an tâm nhất</span>. Nơi hơi ấm hòa quyện cùng thảo mộc.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf size={28} />
              </div>
              <h3 className="text-xl font-medium text-text-dark mb-4">Lõi ruột thảo mộc an lành</h3>
              <p className="text-text-light leading-relaxed">
                Hợp tác chặt chẽ với chuyên gia y học cổ truyền để phối trộn chuẩn hóa nguyên liệu tự nhiên (gừng, quế, sả, ngải cứu...). Khi làm nóng/lạnh, gối tỏa hương dịu nhẹ, giải tỏa stress và xoa dịu vùng đau mỏi.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-medium text-text-dark mb-4">Vỏ ngoài tinh tế, thân thiện</h3>
              <p className="text-text-light leading-relaxed">
                Thiết kế vỏ ngoài tối giản với chất liệu mềm mại (Lanh) vô cùng êm ái với làn da. Vỏ gối thiết kế thông minh, dễ dàng tháo rời để vệ sinh và giặt giũ thường xuyên.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
                <Gift size={28} />
              </div>
              <h3 className="text-xl font-medium text-text-dark mb-4">Trải nghiệm cá nhân hóa</h3>
              <p className="text-text-light leading-relaxed">
                Mỗi sản phẩm đều ở trạng thái "gift-ready" với hộp sang trọng, giấy lụa, thắt nơ nghệ thuật, kèm dịch vụ thêu tên riêng lên vỏ gối và những chiếc thiệp viết tay nhắn gửi tâm tình.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Sứ mệnh */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-8 text-center">
        <h2 className="text-primary font-medium tracking-widest uppercase text-sm mb-6">Sứ mệnh gửi trao</h2>
        <blockquote className="text-2xl md:text-4xl font-serif text-text-dark leading-snug italic mb-10 px-8 py-12 bg-white border-y border-primary/20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4">
            <Heart className="w-8 h-8 text-secondary fill-secondary" />
          </div>
          "One warm hug, one loving message" <br />
          "Ôm một hơi ấm, gửi một lời thương."
        </blockquote>
        <p className="text-text-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-justify md:text-center">
          Gối chườm thảo mộc không dùng điện Sleepie ra đời để trở thành một "cái ôm" ấm áp, an toàn tuyệt đối. Dù bạn chọn Sleepie để nuông chiều bản thân sau một ngày dài kiệt sức, hay làm món quà gửi tặng người thân thương, sản phẩm vẫn luôn là lời nhắc nhở đầy tinh tế:
          <br /><br />
          <span className="font-medium text-text-dark">“Mong bạn được nghỉ ngơi nhiều hơn”</span>.
        </p>
        <p className="text-text-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mt-6 text-justify md:text-center">
          Sleepie tin rằng, một khoản đầu tư cho sức khỏe lâu dài, được gói gọn trong thiết kế duyên dáng và tràn ngập tình cảm, chính là lời chúc sức khỏe và bình yên trọn vẹn nhất.
        </p>
      </section>
    </div>
  );
}
