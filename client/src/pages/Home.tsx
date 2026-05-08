

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Code, Smartphone, Globe, Mail, Phone, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const skills = [
    {
      title: "تطوير الويب",
      description: "بناء تطبيقات ويب حديثة وسريعة باستخدام React و Vue",
      icon: Globe,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
    },
    {
      title: "البرمجة",
      description: "كتابة كود نظيف وفعال باستخدام JavaScript و TypeScript",
      icon: Code,
      color: "bg-cyan-100",
      iconColor: "text-cyan-700",
    },
    {
      title: "تطوير التطبيقات",
      description: "تطوير تطبيقات جوال احترافية وسهلة الاستخدام",
      icon: Smartphone,
      color: "bg-purple-100",
      iconColor: "text-purple-700",
    },
  ];

  const projects = [
    {
      title: "متجر إلكتروني",
      description: "موقع تجارة إلكترونية كامل مع نظام الدفع المتكامل",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "#",
      image: "ecommerce-project.jpg",
    },
    {
      title: "تطبيق إدارة المشاريع",
      description: "تطبيق ويب لإدارة المشاريع والمهام بواجهة سهلة الاستخدام",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      link: "#",
      image: "project-management.jpg",
    },
    {
      title: "تطبيق الطقس",
      description: "تطبيق يعرض حالة الطقس الحالية والتنبؤات المستقبلية",
      technologies: ["React Native", "API", "Firebase"],
      link: "#",
      image: "weather-app.jpg",
    },
    {
      title: "منصة التعليم",
      description: "منصة تعليمية توفر دورات برمجية متنوعة وتفاعلية",
      technologies: ["Vue.js", "Express", "PostgreSQL"],
      link: "#",
      image: "education-platform.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663540763570/DH5btRhjBU5LSWaKAT5x2f/hero-background-Xz6LQPzPyexJFLGZ99ehPx.webp')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 bg-white/70 z-10" />

          <div className="container mx-auto px-4 relative z-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-6 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">
                  مرحباً، أنا <span className="text-blue-700">خالد</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-6">
                  مطور ويب وتطبيقات مهتم بالتكنولوجيا الحديثة
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  أعمل على تطوير مهاراتي في مجال تطوير الويب والتطبيقات، وهدفي أن أصبح مطور محترف قادر على بناء حلول تقنية مبتكرة وفعالة.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#projects" className="inline-block">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
                    شاهد أعمالي
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </a>
                <a href="#contact" className="inline-block">
                  <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 px-8 py-6 text-lg rounded-lg w-full sm:w-auto">
                    تواصل معي
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
                من <span className="text-blue-700">أنا</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="flex justify-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-blue-600 shadow-2xl hover:shadow-blue-600/50 transition-shadow">
                    <img
                      src="/images/my-photo.png.png"
                      alt="خالد عزالدين"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    أنا خالد عزالدين، مطور شاب مهتم بالبرمجة وتطوير الويب. أبدأ رحلتي في عالم التكنولوجيا بشغف وتفاني لتعلم أحدث التقنيات والأدوات.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    أركز على تطوير مهاراتي في بناء تطبيقات ويب حديثة وسريعة وآمنة. أؤمن بأهمية الكود النظيف والممارسات الاحترافية في البرمجة.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    هدفي هو أن أصبح مطور محترف قادر على حل المشاكل المعقدة وتقديم حلول تقنية مبتكرة تحقق قيمة حقيقية للمستخدمين.
                  </p>

                  <div className="pt-4">
                    <a href="#contact" className="inline-block">
                      <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3">
                        تواصل معي الآن
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              <span className="text-blue-700">مهاراتي</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
                  >
                    <div className={`${skill.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-8 h-8 ${skill.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Technical Skills */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                التقنيات التي أستخدمها
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "++C",
                  "React",
                  "TypeScript",
                  "JavaScript",
                  "Tailwind CSS",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Git",
                ].map((tech) => (
                  <div
                    key={tech}
                    className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-center hover:shadow-md transition-shadow"
                  >
                    <p className="font-semibold text-gray-800">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              <span className="text-blue-700">أعمالي</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="h-48 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center relative overflow-hidden"
                    style={{
                      backgroundImage: `url(/images/${project.image || 'default-project.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                    <div className="relative z-10">
                      <Globe className="w-16 h-16 text-white opacity-70" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a href={project.link} className="inline-block">
                      <Button className="bg-blue-700 hover:bg-blue-800 text-white w-full">
                        عرض المشروع
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              <span className="text-blue-700">تواصل معي</span>
            </h2>

            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <a
                      href="mailto:tgdev1khalid.dev@gmail.com"
                      className="text-blue-700 hover:text-blue-800 transition-colors"
                    >
                      tgdev1khalid.dev@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">رقم الهاتف</h3>
                    <a
                      href="tel:717371160"
                      className="text-blue-700 hover:text-blue-800 transition-colors"
                    >
                      717371160
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-6 bg-gray-50 p-8 rounded-xl border border-gray-200">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    الاسم
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="أدخل اسمك"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    الرسالة
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 text-lg">
                  إرسال الرسالة
                </Button>
              </form>

              {/* Social Links */}
              <div className="mt-12 flex justify-center gap-6">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
