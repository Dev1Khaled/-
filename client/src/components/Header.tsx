import { Link } from "wouter";
import { Menu, X, Instagram, Music } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "الرئيسية", href: "#home" },
    { name: "من أنا", href: "#about" },
    { name: "المهارات", href: "#skills" },
    { name: "الأعمال", href: "#projects" },
    { name: "التواصل", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors">
              خالد
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Media Icons */}
          <div className="hidden md:flex items-center gap-3">
            {/* TikTok */}
            <a
              href="https://tiktok.com/@khaled.ezzeldin.hassan.s"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110"
              aria-label="TikTok"
              title="تابعني على TikTok"
            >
              <Music className="w-5 h-5" />
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com/developer_khaled1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-lg transition-all duration-300 transform hover:scale-110"
              aria-label="Instagram"
              title="تابعني على Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-gray-100 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {/* Mobile Social Media Icons */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <a
                href="https://tiktok.com/@khaled.ezzeldin.hassan.s"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label="TikTok"
              >
                <Music className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/developer_khaled1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-pink-600 hover:bg-gray-100 rounded-lg transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
