import { Moon, Activity, BatteryWarning, Brain, HeartPulse, Frown, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Problem() {
  const problems = [
    {
      icon: <Moon className="w-10 h-10 text-indigo-400" />,
      title: "Khó Ngủ & Bồn Chồn",
      desc: "Trằn trọc mỗi đêm, tỉnh giấc nhiều lần, thức dậy nhưng không cảm thấy sảng khoái.",
      details: [
        "Mất trung bình 30-60 phút mới có thể chìm vào giấc ngủ",
        "Thức giấc 2-3 lần mỗi đêm, khó ngủ lại",
        "Giấc ngủ nông, hay mơ và không sâu giấc",
        "Sáng dậy vẫn cảm thấy mệt mỏi, thiếu năng lượng"
      ],
      stat: "73%",
      statLabel: "người Việt từ 18-35 tuổi gặp vấn đề về giấc ngủ",
      color: "bg-indigo-50 border-indigo-100",
      iconBg: "bg-indigo-100"
    },
    {
      icon: <Activity className="w-10 h-10 text-secondary" />,
      title: "Đau Mỏi Cổ Vai Gáy",
      desc: "Ngồi làm việc lâu trước máy tính gây căng cứng, đau nhức vùng cổ và vai gáy.",
      details: [
        "Cơn đau âm ỉ lan từ cổ xuống vai và lưng trên",
        "Cứng cổ, khó xoay đầu vào buổi sáng",
        "Đau đầu do căng thẳng cơ vùng gáy",
        "Tê bì tay, mỏi vai sau giờ làm việc"
      ],
      stat: "62%",
      statLabel: "dân văn phòng bị đau cổ vai gáy mạn tính",
      color: "bg-orange-50 border-orange-100",
      iconBg: "bg-orange-100"
    },
    {
      icon: <BatteryWarning className="w-10 h-10 text-rose-400" />,
      title: "Thiếu Năng Lượng",
      desc: "Luôn cảm thấy uể oải, thiếu sức sống và làm việc kém hiệu quả vào ban ngày.",
      details: [
        "Mệt mỏi triền miên dù ngủ đủ giờ",
        "Khó tập trung, giảm hiệu suất làm việc",
        "Hay cáu gắt, tâm trạng thất thường",
        "Phụ thuộc vào cà phê và chất kích thích"
      ],
      stat: "58%",
      statLabel: "người trẻ cảm thấy kiệt sức mỗi ngày",
      color: "bg-rose-50 border-rose-100",
      iconBg: "bg-rose-100"
    }
  ];

  const impacts = [
    {
      icon: <Brain className="w-7 h-7 text-purple-500" />,
      title: "Suy giảm trí nhớ",
      desc: "Thiếu ngủ kéo dài làm giảm khả năng tập trung và ghi nhớ, ảnh hưởng trực tiếp đến công việc và học tập."
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-red-500" />,
      title: "Nguy cơ sức khỏe",
      desc: "Căng thẳng mạn tính làm tăng huyết áp, suy yếu hệ miễn dịch và tăng nguy cơ mắc các bệnh tim mạch."
    },
    {
      icon: <Frown className="w-7 h-7 text-amber-500" />,
      title: "Ảnh hưởng tinh thần",
      desc: "Mất ngủ và đau mỏi kéo dài gây ra lo âu, stress và giảm chất lượng cuộc sống đáng kể."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-rose-50 to-white overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-orange-100/40 blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-600 font-medium text-sm mb-6">
            <AlertTriangle size={16} />
            <span>Vấn đề của bạn</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-dark leading-tight mb-6">
            Cơ Thể Bạn Đang <br className="hidden md:block" />
            <span className="italic text-primary">Lên Tiếng?</span>
          </h1>
          <p className="text-text-light text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Nếu bạn đang gặp phải những tình trạng dưới đây, đã đến lúc bạn cần một liệu pháp thư giãn thực sự từ thiên nhiên. Hãy lắng nghe cơ thể mình.
          </p>
        </div>
      </section>

      {/* Problem Cards - Chi tiết */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {problems.map((p, i) => (
            <div key={i} className={`rounded-[2rem] border ${p.color} overflow-hidden transition-all duration-300 hover:shadow-xl`}>
              <div className="grid md:grid-cols-5 gap-0">
                {/* Left: Icon + Title + Desc */}
                <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                  <div className={`mb-6 ${p.iconBg} w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm`}>
                    {p.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-text-dark mb-4">{p.title}</h3>
                  <p className="text-text-light text-lg leading-relaxed mb-6">{p.desc}</p>
                  {/* Stat */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-text-dark">{p.stat}</span>
                    <span className="text-text-light text-sm">{p.statLabel}</span>
                  </div>
                </div>

                {/* Right: Detail List */}
                <div className="md:col-span-3 bg-white/60 p-8 md:p-10 flex flex-col justify-center">
                  <h4 className="text-lg font-medium text-text-dark mb-5">Biểu hiện thường gặp:</h4>
                  <ul className="space-y-4">
                    {p.details.map((detail, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-text-light text-base leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tác động lâu dài */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-serif text-text-dark mb-6">Nếu Không Được Xoa Dịu Kịp Thời...</h2>
            <p className="text-text-light text-lg leading-relaxed">
              Những vấn đề tưởng chừng nhỏ nhặt hằng ngày, nếu bị bỏ qua lâu dài, sẽ tích tụ và gây ra những hệ lụy nghiêm trọng cho sức khỏe thể chất lẫn tinh thần.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impacts.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 border border-gray-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium text-text-dark mb-3">{item.title}</h3>
                <p className="text-text-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-text-dark mb-6">Sleepie Có Thể Giúp Bạn</h2>
        <p className="text-text-light text-lg leading-relaxed max-w-2xl mx-auto mb-10">
          Gối chườm thảo mộc Sleepie kết hợp hơi ấm và hương thảo dược tự nhiên, giúp xoa dịu cơn đau mỏi, thư giãn tinh thần và mang lại giấc ngủ ngon hơn — ngay tại nhà, mỗi ngày.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white font-medium px-8 py-4 rounded-xl transition-colors text-lg shadow-lg hover:shadow-xl no-underline"
        >
          Khám phá sản phẩm
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
}
