"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [socialOpen, setSocialOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const dropdownRef = useRef(null);
  const iconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const labelRef = useRef(null);

  const menu = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Desktop dropdown animation (social)
  useEffect(() => {
    if (dropdownRef.current) {
      gsap.to(dropdownRef.current, {
        height: socialOpen ? "auto" : 0,
        opacity: socialOpen ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [socialOpen]);

  // Animate + / - icon for social dropdown
  useEffect(() => {
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: socialOpen ? 180 : 0,
        scale: socialOpen ? 1.2 : 1,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [socialOpen]);

  // Animate mobile menu + stagger text reveal
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (menuOpen) {
        gsap.to(mobileMenuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });

        gsap.fromTo(
          menuItemsRef.current,
          { clipPath: "inset(100% 0 0 0)", opacity: 0 },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
          }
        );

        gsap.to(labelRef.current, { text: "Close", duration: 0.3 });
      } else {
        gsap.to(menuItemsRef.current, {
          clipPath: "inset(100% 0 0 0)",
          opacity: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.in",
        });

        gsap.to(mobileMenuRef.current, {
          y: "-100%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
          delay: 0.2,
        });

        gsap.to(labelRef.current, { text: "Menu", duration: 0.3 });
      }
    }
  }, [menuOpen]);

  return (
    <nav className="w-full mt-5 fixed top-0 left-0 z-50">
      <div className="max-w-9xl mx-auto px-4">
        {/* Desktop Navbar */}
        <ul className="hidden lg:grid grid-cols-5 text-center text-white font-semibold">
          <li className="w-full">
            <Link href="/" className="inline-block py-4 z-99">
              Mafujur
            </Link>
          </li>
          <li>
            <Link href="/projects" className="inline-block py-4 ">
              Projects
            </Link>
          </li>
          <li className="relative">
            <div
              className="inline-block relative"
              onMouseEnter={() => setSocialOpen(true)}
              onMouseLeave={() => setSocialOpen(false)}
            >
              <Link
                href="#"
                className="inline-flex items-center justify-center gap-1 py-4 "
              >
                Social
                <span ref={iconRef} className="ml-1 text-lg inline-block">
                  +
                </span>
              </Link>
              <div
                ref={dropdownRef}
                className="absolute left-1/2 -translate-x-1/2 w-40 bg-black overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <ul className="flex flex-col text-sm">
                  <li>
                    <Link href="https://linkedin.com" target="_blank" className="block py-2 px-4 hover:bg-gray-700">
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com" target="_blank" className="block py-2 px-4 hover:bg-gray-700">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="/resume.pdf" target="_blank" className="block py-2 px-4 hover:bg-gray-700">
                      Resume
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <Link href="/about" className="inline-block py-4 ">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="inline-block py-4 ">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile & Tablet Navbar */}
        <div className="flex items-center justify-between lg:hidden text-white">
          <Link href="/" className="font-bold text-lg z-50">
            Mafujur
          </Link>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1 border border-white rounded-full text-sm">
              Let’s talk
            </button>
            {/* Animated menu icon (hamburger -> X) with label */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 relative z-50"
            >
              <span ref={labelRef}>Menu</span>
              <div className="flex flex-col gap-1 ml-2">
                <span
                  className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                ></span>
                <span
                  className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#16213e] text-white flex flex-col justify-center items-start px-6 z-40"
        style={{ transform: "translateY(-100%)", opacity: 0 }}
      >
        <ul className="text-6xl md:text-8xl font-extrabold ">
          {menu.map((item, idx) => (
            <li
              key={item.name}
              ref={(el) => (menuItemsRef.current[idx] = el)}
              className="opacity-0"
            >
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Links */}
        <div className="mt-10 text-sm md:text-xl w-full">
          <ul className="space-y-2">
            <li className="flex justify-between items-center">
              <span>LinkedIn</span>
              <a
                href="https://linkedin.com/in/mafujur_rahman_dev"
                target="_blank"
                className="text-[#abb6e0] hover:underline ml-auto text-right"
              >
                mafujur_rahman_dev
              </a>
            </li>
            <li className="flex justify-between items-center">
              <span>GitHub</span>
              <a
                href="https://github.com/mafujur_rahman_dev"
                target="_blank"
                className="text-[#abb6e0] hover:underline ml-auto text-right"
              >
                mafujur_rahman_dev
              </a>
            </li>
            <li className="flex justify-between items-center">
              <span>Resume</span>
              <a
                href="/resume.pdf"
                target="_blank"
                className="text-[#abb6e0] hover:underline ml-auto text-right"
              >
                mafujur_rahman_dev
              </a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
}
