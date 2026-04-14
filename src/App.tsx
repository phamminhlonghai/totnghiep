/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Users, 
  Sparkles, 
  Camera, 
  MapPin, 
  Bus, 
  ArrowRight, 
  Send as SendIcon,
  PenTool,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Countdown Component
const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("May 10, 2026 08:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds }
  ];

  return (
    <div className="flex flex-wrap gap-4 md:gap-8 p-8 bg-surface-container-highest rounded-xl border-l-4 border-primary shadow-sm">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-4 md:gap-8">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-headline font-bold text-on-surface">
              {item.value.toString().padStart(2, '0')}
            </span>
            <span className="text-xs font-label uppercase tracking-widest text-secondary mt-1">
              {item.label}
            </span>
          </div>
          {index < items.length - 1 && (
            <div className="text-4xl text-outline-variant font-light hidden sm:block">:</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initial celebration
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ED1B24', '#ffffff', '#000000']
    });
  }, []);

  const handleRSVP = (e: FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert('Cảm ơn bạn đã phản hồi RSVP!');
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-md shadow-xl shadow-red-900/5">
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
          <div className="text-2xl font-black text-primary tracking-tighter font-headline">
            HUST GRAD '26
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Journey', 'Schedule', 'Venue', 'RSVP'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-secondary font-medium hover:text-primary transition-colors font-headline"
              >
                {item}
              </a>
            ))}
            <a 
              href="#rsvp"
              className="bg-primary text-white px-6 py-2 rounded-lg font-headline font-bold hover:opacity-90 transition-all hover:-translate-y-0.5 active:scale-95"
            >
              Register Now
            </a>
          </div>

          <button 
            className="md:hidden text-on-surface"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-surface border-t border-outline-variant p-8 space-y-4"
            >
              {['Journey', 'Schedule', 'Venue', 'RSVP'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-xl font-headline font-bold text-on-surface"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="journey" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-surface">
          <div className="absolute inset-0 tech-grid"></div>
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <div className="inline-block px-4 py-1 rounded-full border border-outline-variant bg-surface-container-low text-primary font-headline text-sm font-bold tracking-widest mb-6 uppercase">
                EST. MAY 10, 2026
              </div>
              <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-on-surface leading-[0.9] tracking-tighter mb-6">
                Finally <span className="text-primary italic">Graduated!</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary max-w-xl mb-12 leading-relaxed">
                Join me for my special day at HUST. Một lễ kỷ niệm cho hành trình học tập đầy khắt khe và sự khởi đầu của một chương mới.
              </p>
              <Countdown />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 relative"
            >
              <div className="aspect-[1/1] bg-surface-container rounded-2xl overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0uj-OeiP6yjt87I0r6VSgHk1HP3wywHzH1QSNkQaQh8ZV-OBP7JD_AxzPCeDQ1GFmrOSBAPs58SpjUgwqJWUDVBT2MQH1Vh6my28-wj4BUG7X-nz5O4izptThNR9mcgLqayreuSvNbr5U2qApEfmozXduHNk4DY1xGHZdKd_6sdyuQnSMl2N4T575rHzCQ5bgsSOj1-zZpbIm45ttF0oc4lVWTkEEXYXvN4BUloSm40MtwaXD2hpAuPdmuhVPCmXeH-bjX4oo67DRl4" 
                  alt="HUST Graduate Professional Portrait"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 border-[20px] border-white/10 group-hover:border-white/5 transition-all"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-xl font-headline font-black text-2xl rotate-3">
                CLASS OF 2026
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-surface rounded-xl p-4 shadow-sm h-64 overflow-hidden"
                    >
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpzzU290pvRI5HLv1C_OxzQpD4YafUsXOUyKGTeMUSXFJYtQKeRBdG7mfYY_kz1ysFI7GE5JdPeHXl-VhlFlS4_z8OZkaSCwTmxpDorzXzQEvkbccVgJcH91dy7iAgFYjakAnObgVJngy2Nj0UMaFSBLanFQIHcIr7yFM52Q4kADtAu4ZN0bAmfb19-bdCsHU8YPhKPpMxmhhQFboRku_FK6-uy2RM6HklUG1LT0BiuNYQJIraIID-hfWXk7bKspbPIqd1pBkw3nHs" 
                        alt="Hanoi University of Science and Technology C1 Building"
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="bg-primary rounded-xl p-8 text-white"
                    >
                      <GraduationCap size={40} className="mb-4" />
                      <div className="text-3xl font-headline font-bold">5 Years</div>
                      <div className="text-sm opacity-80 uppercase tracking-widest">of dedication</div>
                    </motion.div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="bg-surface rounded-xl p-8 border border-outline-variant/30"
                    >
                      <div className="text-primary font-headline font-bold text-4xl mb-2">HUST</div>
                      <p className="text-secondary text-sm">Hanoi University of Science and Technology</p>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="bg-surface rounded-xl p-4 shadow-sm h-72 overflow-hidden"
                    >
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXA4Yf_Kh8mCblgZJ909pOVsi2ehkUFYMwea9cxKGInb_x19w285hryNCaG5t71KELrjYoA0RUjHxhsM7P8pRezmBnTGYXqty3UqC7a__IJ1e84m1lriUxkCChhcF01FFum96UO6UIy2m2yiFEafJEmkebai5o1ZYGrYV5Ay2kijAYyukPQPuBmvlpNQXTHD1S8pG-Gdhzob9ftptlSySozzdBkGxyIjEwI8xwtm4Lay__wSCHfxfNs95z6ZJUtZo2_T4GamMKMiHj" 
                        alt="Scientific research process in lab"
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold mb-8 tracking-tight text-on-surface">
                  BÁCH KHOA HÀ NỘI
                </h2>
                <div className="space-y-6 text-secondary leading-relaxed text-lg">
                  <p>Entering HUST was more than just starting university; it was the beginning of an intellectual forge. Between the sleepless nights in the library and the complex lab sessions, I found my passion for engineering.</p>
                  <p className="font-medium text-on-surface italic">"Hành trình tại HUST... một hành trình dài và khó khăn nhưng chính nó đã tạo nên những bài học quý giá..."</p>
                  <p>As I stand at the threshold of graduation, I look back at the challenges—the rigorous exams, the team projects, and the friendships forged in the pressure of deadlines. This ceremony marks the culmination of that journey.</p>
                </div>
                <div className="mt-10 flex gap-4">
                  <div className="h-[1px] bg-outline-variant w-12 self-center"></div>
                  <span className="font-headline font-bold italic text-on-surface-variant">Phạm Minh Long Hải - 20211221</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-24 bg-surface relative">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-4">
                Event <span className="text-primary">Timeline</span>
              </h2>
              <p className="text-secondary max-w-lg mx-auto">Hy vọng bạn đến đúng giờ để không bỏ lỡ những khoảnh khắc quan trọng của buổi lễ.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  id: '01',
                  time: '07:30 AM',
                  title: 'Chuẩn bị',
                  desc: 'Thư viện Tạ Quang Bửu. Nhận lễ phục và chuẩn bị cho buổi lễ chính thức.',
                  icon: <Users />
                },
                {
                  id: '02',
                  time: '08:00 AM',
                  title: 'Lễ tốt nghiệp chính thức',
                  subtitle: 'Hội trường Thư viện Tạ Quang Bửu',
                  desc: 'Nghi thức trao bằng, các bài phát biểu từ Ban giám hiệu và lễ trao bằng cho sinh viên.',
                  icon: <Sparkles />,
                  featured: true
                },
                {
                  id: '03',
                  time: '08:30 AM - 11:00 AM',
                  title: 'Chụp ảnh & Giao lưu',
                  desc: 'Khu vực thư viện và khuôn viên HUST. Ghi lại những kỷ niệm cùng gia đình, thầy cô và bạn bè.',
                  icon: <Camera />
                }
              ].map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`relative group p-8 rounded-2xl transition-all duration-300 border-b-4 ${
                    item.featured 
                      ? 'bg-surface-container-high shadow-2xl shadow-primary/5 border-primary' 
                      : 'bg-surface-container hover:bg-surface-container-high border-transparent hover:border-primary'
                  }`}
                >
                  <div className="text-primary font-headline font-black text-6xl opacity-10 absolute top-4 right-8 group-hover:opacity-20 transition-opacity">
                    {item.id}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white mb-6">
                      {item.icon}
                    </div>
                    <div className="text-primary font-headline font-bold text-xl mb-1">{item.time}</div>
                    <h3 className="text-2xl font-headline font-bold text-on-surface mb-4">{item.title}</h3>
                    {item.subtitle && (
                      <h4 className="text-sm font-label font-bold text-secondary uppercase tracking-widest mb-4">{item.subtitle}</h4>
                    )}
                    <p className="text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section id="venue" className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-surface rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 lg:p-20">
                <h2 className="text-4xl font-headline font-extrabold mb-8 tracking-tight">
                  The <span className="text-primary">Venue</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="bg-surface-container w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xl mb-1">Thư viện Tạ Quang Bửu, ĐH Bách khoa Hà Nội</h4>
                      <p className="text-secondary">Số 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="bg-surface-container w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bus className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-xl mb-1">Phương tiện công cộng</h4>
                      <p className="text-secondary">Các tuyến xe buýt 31, 35, 38, 44, 51 dừng ngay trước cổng trường.</p>
                    </div>
                  </div>
                  <div className="pt-8">
                    <a 
                      href="https://maps.google.com/?q=Thư+viện+Tạ+Quang+Bửu+Đại+học+Bách+khoa+Hà+Nội" 
                      target="_blank"
                      className="bg-primary text-white px-8 py-4 rounded-lg font-headline font-bold inline-flex items-center gap-3 hover:opacity-90 transition-all group"
                    >
                      Open in Google Maps
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 h-96 lg:h-auto min-h-[400px] relative bg-white">
                <img 
                  src="https://lh3.googleusercontent.com/aida/ADBb0ugYbgXC2lyLlmxHx3_DhviXwZo_pgAPddtfEHRVOxJellF9sPdBPZ6MvLhZW5jBBnnrxX0UOY40qeIqjiLPJxdnPG_8BATgDORsflcyNHJ_2n-mZQd4j-4pD04uQCVOHsM-gRB114X_KZ29NnOOI9lxvef7LSGfaC2RntjAsCxnZCcv2XAQUWjXuGSxxoQpXze7e4SZ8jiIm3lMJHkl1iXfM9kZsJ0Imd32maGeGwbPG_XoFev-JDTMs-YrIcg9Q4xxk3zQ8oS3kY4" 
                  alt="HUST Campus Map - Highlighting Library"
                  className="w-full h-full object-contain p-4"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-10 left-10 bg-on-surface text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg border-2 border-primary">
                  THƯ VIỆN TẠ QUANG BỬU
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Section */}
        <section id="rsvp" className="py-24 bg-surface relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-5">
            <PenTool size={300} />
          </div>
          <div className="max-w-3xl mx-auto px-8 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface mb-8">Vài lời lưu bút</h2>
            <p className="text-xl text-secondary mb-12">Nếu bạn có điều gì muốn nhắn nhủ đến mình thì đừng ngần ngại mà hãy viết ngay tại đây nhé.</p>
            
            <form onSubmit={handleRSVP} className="bg-surface-container border border-outline-variant/30 rounded-3xl p-8 md:p-12 text-left space-y-8">
              <div className="space-y-2">
                <label className="font-headline font-bold text-sm uppercase tracking-widest text-secondary">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter your name"
                  className="w-full bg-surface border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-all py-4 text-lg"
                />
              </div>
              
              <div className="space-y-4">
                <label className="font-headline font-bold text-sm uppercase tracking-widest text-secondary">Will you attend?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-outline-variant cursor-pointer hover:border-primary transition-all group">
                    <input type="radio" name="attendance" value="yes" className="w-5 h-5 text-primary border-outline-variant focus:ring-primary" />
                    <span className="font-headline font-bold">Yes, definitely!</span>
                  </label>
                  <label className="flex items-center gap-4 p-4 bg-surface rounded-xl border border-outline-variant cursor-pointer hover:border-primary transition-all group">
                    <input type="radio" name="attendance" value="no" className="w-5 h-5 text-primary border-outline-variant focus:ring-primary" />
                    <span className="font-headline font-bold">Sorry, I can't</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-headline font-bold text-sm uppercase tracking-widest text-secondary">A message for the graduate?</label>
                <textarea 
                  rows={4}
                  placeholder="Leave a short note..."
                  className="w-full bg-surface border-0 border-b-2 border-outline-variant focus:ring-0 focus:border-primary transition-all py-4 text-lg"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary text-white font-headline font-black py-6 rounded-xl text-xl hover:opacity-90 transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-red-900/10 flex items-center justify-center gap-3"
              >
                SUBMIT RSVP
                <SendIcon />
              </button>

              <div className="pt-6 text-center border-t border-outline-variant/20">
                <p className="text-secondary font-medium">Liên hệ: Long Hải (0866869319 / 0867163064)</p>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant/20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full px-8 py-12 max-w-7xl mx-auto gap-8">
          <div className="font-headline font-bold text-on-surface text-xl tracking-tight">
            HUST GRAD '26
          </div>
          <div className="font-body text-sm tracking-wide text-secondary text-center">
            Cảm ơn AI đã tài trợ trang này :)))
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Technical Archive</a>
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
