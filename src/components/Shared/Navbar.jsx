"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import emailjs from "@emailjs/browser";

export default function Navbar() {
  const [socialOpen, setSocialOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dropdownRef = useRef(null);
  const iconRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const labelRef = useRef(null);
  const formRef = useRef(null);
  const formElement = useRef(null);

  const menu = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "#" },
  ];

  // GSAP animations ----------------------
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

  useEffect(() => {
    if (formRef.current) {
      if (formOpen) {
        gsap.to(formRef.current, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
        });
      } else {
        gsap.to(formRef.current, {
          x: "100%",
          opacity: 0,
          duration: 0.5,
          ease: "power3.inOut",
        });
      }
    }
  }, [formOpen]);

  // Handle EmailJS form submit ----------------------------
  const handleSendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    emailjs
      .sendForm(
        "service_kboju8j",
        "template_tcpkd5p",
        formElement.current,
        "z9EFpzKDjYZ10nfV-"
      )
      .then(
        () => {
          setMessage("✅ Message sent successfully!");
          setLoading(false);
          formElement.current.reset();
        },
        (error) => {
          console.error(error);
          setMessage("❌ Failed to send message. Try again.");
          setLoading(false);
        }
      );
  };

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
                  {socialOpen ? "−" : "+"}
                </span>
              </Link>
              <div
                ref={dropdownRef}
                className="absolute left-1/2 -translate-x-1/2 w-40 bg-black overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <ul className="flex flex-col text-sm">
                  <li>
                    <Link href="https://www.linkedin.com/in/mafujurrahman/" target="_blank" className="block py-2 px-4 ">
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link href="https://github.com/mafujur-rahman" target="_blank" className="block py-2 px-4 ">
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link href="/resume.pdf" target="_blank" className="block py-2 px-4 ">
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
            <button
              onClick={() => setFormOpen(true)}
              className="inline-block py-4 cursor-pointer"
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Mobile & Tablet Navbar */}
        <div className="flex items-center justify-between lg:hidden text-white">
          <Link href="/" className="font-bold text-lg z-50">
            Mafujur
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFormOpen(true)}
              className="px-4 py-1 border border-white rounded-full text-sm"
            >
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
              {item.name === "Contact" ? (
                <button onClick={() => { setMenuOpen(false); setFormOpen(true); }}>
                  Contact
                </button>
              ) : (
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Social Links */} <div className="mt-10 text-sm md:text-xl w-full">
          <ul className="space-y-2">
            <li className="flex justify-between items-center"> <span>LinkedIn</span> <a href="https://www.linkedin.com/in/mafujurrahman/" target="_blank" className="text-[#abb6e0] hover:underline ml-auto text-right" > mafujur_rahman_dev </a> </li>
            <li className="flex justify-between items-center"> <span>GitHub</span> <a href="https://github.com/mafujur-rahman" target="_blank" className="text-[#abb6e0] hover:underline ml-auto text-right" > mafujur_rahman_dev </a> </li>
            <li className="flex justify-between items-center"> <span>Resume</span> <a href="/resume.pdf" target="_blank" className="text-[#abb6e0] hover:underline ml-auto text-right" > mafujur_rahman_dev </a> </li>
          </ul>
        </div>
      </div>

      {/* Contact Form Popup */}
      <div
        ref={formRef}
        className="fixed top-0 right-0 w-full lg:w-[450px] h-screen bg-[#16213e] text-white z-50 overflow-y-auto px-6 py-10"
        style={{ transform: "translateX(100%)", opacity: 0 }}
      >
        <button
          onClick={() => setFormOpen(false)}
          className="absolute top-4 right-4 text-2xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold">Let’s Create Something Great Together.</h2>
        <p className="mt-2 text-sm">You’re just one step away from bringing your ideas to life. Fill out the form below.</p>

        <form
          ref={formElement}
          onSubmit={handleSendEmail}
          className="mt-6 space-y-4"
        >
          <div>
            <label className="block text-sm">My Name*</label>
            <input
              type="text"
              name="user_name"
              placeholder="ex. John Doe"
              required
              className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">My Email*</label>
            <input
              type="email"
              name="user_email"
              placeholder="ex. john@doe.com"
              required
              className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">My Budget</label>
            <select
              name="user_budget"
              className="w-full px-3 py-2 bg-transparent border border-gray-600 text-gray-600 rounded-md"
            >
              <option>$1,000 - $3,000</option>
              <option>$3,000 - $5,000</option>
              <option>$5,000+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm">Project Details</label>
            <textarea
              name="message"
              placeholder="Write your project details..."
              className="w-full px-3 py-2 bg-transparent border border-gray-600 rounded-md"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-md font-bold"
          >
            {loading ? "Sending..." : "Send the Message"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm">{message}</p>}
        <p className="mt-6 text-sm">Thanks for reaching out! <span className="text-cyan-400">mdmafuj000@gmail.com</span></p>
      </div>
    </nav>
  );
}
