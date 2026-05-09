

import { Github, Linkedin, Mail, Instagram, Music } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com",
      label: "زيارة GitHub",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com",
      label: "زيارة LinkedIn",
    },
    {
      name: "TikTok",
      icon: Music,
      href: "https://tiktok.com/@khaled.ezzeldin.hassan.s",
      label: "تابعني على TikTok",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/developer_khaled1",
      label: "تابعني على Instagram",
    },
    {
      name: "البريد الإلكتروني",
      icon: Mail,
      href: "mailto:tgdev1khalid.dev@gmail.com‏",
      label: "إرسال بريد إلكتروني",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-blue-700 mb-3">خالد عزالدين</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              مطور ويب وتطبيقات مهتم بالتكنولوجيا الحديثة وتطوير المهارات. متخصص في React وتطوير الويب الحديث.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">الروابط السريعة</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-600 hover:text-blue-700 transition-colors">
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-blue-700 transition-colors">
                  من أنا
                </a>
              </li>
              <li>
                <a href="#skills" className="text-gray-600 hover:text-blue-700 transition-colors">
                  المهارات
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-600 hover:text-blue-700 transition-colors">
                  الأعمال
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-blue-700 transition-colors">
                  التواصل
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">تابعني على وسائل التواصل</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={link.label}
                    title={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>
              © {currentYear} خالد عزالدين. جميع الحقوق محفوظة.
            </p>
            <p>
              تم بناء هذا الموقع باستخدام React و Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}