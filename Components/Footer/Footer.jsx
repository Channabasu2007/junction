"use client";

import Link from "next/link";
import ModeToggle from "../Workers/ModeToggle";

const Footer = () => {
  const Navs = [
    { name: "Home", link: "/" },
    { name: "Pricing", link: "/pricing" },
    { name: "Guide", link: "/guide" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <footer className="bg-zinc-100 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-300 border-t border-zinc-200 dark:border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-extrabold text-orange-600 mb-4">JUNCTION</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Your one-stop solution to build, share, and grow your digital presence — all in one junction.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            {Navs.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="hover:text-orange-500 transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="text-zinc-500 dark:text-zinc-400">Email:</span>{" "}
              <a
                href="mailto:support@junction.in"
                className="hover:text-orange-500"
              >
                support@junction.in
              </a>
            </li>
            <li>
              <span className="text-zinc-500 dark:text-zinc-400">Location:</span>{" "}
              Dharwad - Karnataka, India
            </li>
            <li>
              <span className="text-zinc-500 dark:text-zinc-400">Support:</span>{" "}
              Mon–Fri, 10 AM – 6 PM
            </li>
          </ul>
        </div>

        {/* Extras */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Preferences</h3>
          <ModeToggle />
          <div className="flex gap-4 text-orange-500 pt-2">
            <a href="#" aria-label="Twitter" className="hover:text-orange-600">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-orange-600">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-orange-600">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-zinc-500 dark:text-zinc-600 py-6 border-t border-zinc-200 dark:border-zinc-800">
        © {new Date().getFullYear()} Junction. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
