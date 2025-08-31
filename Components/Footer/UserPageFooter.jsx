import Link from "next/link";
import { Github, Instagram, Linkedin, Facebook, Globe } from "lucide-react";

export default function Footer({ user }) {
  const { PageLayout, sites } = user || {};
  const primary = PageLayout?.ColorsPicker?.primary || "#00ff1e";
  const paragraph = PageLayout?.ColorsPicker?.paragraph || "#ffffff";
  const secondary = PageLayout?.ColorsPicker?.secondary || "#b6f7cb";

  // map icons to site names
  const iconMap= { 
    Instagram: <Instagram className="w-5 h-5" />,
    Facebook: <Facebook className="w-5 h-5" />,
    Linkdin: <Linkedin className="w-5 h-5" />,
    Github: <Github className="w-5 h-5" />,
    Google: <Globe className="w-5 h-5" />,
    meta: <Globe className="w-5 h-5" />,
    Chatgpt: <Globe className="w-5 h-5" />,
    Vercel: <Globe className="w-5 h-5" />,
  };

  return (
    <footer
      className="mt-12 border-t"
      style={{ borderColor: secondary, backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Website name */}
        <Link
          href={"/"}
          className="text-3xl text-orange-600 font-extrabold tracking-tight select-none"
          
        >
          JUNCTION
        </Link>

        {/* Social Links */}
        <div className="flex gap-4 flex-wrap justify-center">
          {sites?.map((site) => (
            <a
              key={site._id}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition"
              style={{ color: paragraph }}
            >
              {iconMap[site.name] || <Globe className="w-5 h-5" />}
              <span className="text-sm">{site.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="text-center text-xs py-3"
        style={{ color: paragraph, backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        © {new Date().getFullYear()} JUNCTION. All rights reserved.
      </div>
    </footer>
  );
}
