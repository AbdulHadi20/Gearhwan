import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

interface FooterProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Gearhwan",
    links: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Buy a Car", href: "/buyacar" },
      { name: "Rent a Car", href: "/rentacar" },
      { name: "Guides", href: "/guides" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contactpage" },
      { name: "FAQ", href: "/faqs" },
      { name: "Sign In", href: "/signin" },
      { name: "Sign Up", href: "/register" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-8" />, href: "#", label: "Instagram" },
  { icon: <FaFacebook className="size-8" />, href: "#", label: "Facebook" },
  { icon: <FaTwitter className="size-8" />, href: "#", label: "Twitter" },
  { icon: <FaLinkedin className="size-8" />, href: "#", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/termsandconditions" },
];

export const Footer = ({
  logo = {
    url: "/",
    src: "/mainWhiteLogo.svg",
    alt: "logo",
  },
  sections = defaultSections,
  description = "Buy or rent your next ride with confidence.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2024 Gearhwan. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: FooterProps) => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-center lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            {/* Logo */}
            <div className="flex items-center gap-2 lg:justify-start justify-center">
              <a href={logo.url}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12"
                />
              </a>
            </div>
            <p className="text-md lg:text-lg text-center text-accent text-wrap">
              {description}
            </p>
            <ul className="flex items-center justify-center space-x-8 lg:space-x-12 text-accent text-center">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-secondary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-2 lg:gap-50">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="my-4 font-bold text-secondary text-center lg:text-left text-wrap text-2xl">{section.title}</h3>
                <ul className="space-y-3 text-md lg:text-lg text-accent text-center lg:text-left">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-secondary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-md lg:text-md font-medium text-accent md:flex-row md:items-center md:text-left text-wrap text-center">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-secondary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

