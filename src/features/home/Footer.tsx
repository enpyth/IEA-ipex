'use client'

import Link from 'next/link';
import {
  Globe,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="relative bg-primary py-12 px-4 sm:px-6 lg:px-8 text-white">
      {/* 灰白色遮罩层 */}
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="container mx-auto relative z-10">
        {/* Top Section: Company Info, Contact, Social Media */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Left Section: Company Name & Description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-bold text-white mb-2">
              NovaTech Solutions
            </h2>
            <p className="text-sm leading-relaxed max-w-xs text-white/90">
              Empowering businesses with modern software solutions.
            </p>
          </div>

          {/* Middle Section: Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">
              Contact Us
            </h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-white/90">
                <Phone className="h-4 w-4 text-white/80" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center gap-2 text-white/90">
                <Mail className="h-4 w-4 text-white/80" />
                <span>info@novatech.com</span>
              </p>
              <p className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4 text-white/80" />
                <span>123 Innovation Street, Sydney, Australia</span>
              </p>
            </div>
          </div>

          {/* Right Section: Social Media Links */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors">
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="X (Twitter)" className="text-white/80 hover:text-white transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-white/80 hover:text-white transition-colors">
                <LinkedInIcon className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors">
                <InstagramIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Bar: Copyright, Links, Language Selector */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-sm">
          {/* Copyright and Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <p className="text-white/80">
              © 2025 NovaTech Solutions. All rights reserved.
            </p>
            <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link href="#" className="hover:text-white text-white/80 transition-colors">
                Sitemap
              </Link>
              <Link href="#" className="hover:text-white text-white/80 transition-colors">
                Terms and Privacy
              </Link>
              <Link href="#" className="hover:text-white text-white/80 transition-colors">
                Security
              </Link>
              <Link href="#" className="hover:text-white text-white/80 transition-colors">
                Cookie Settings
              </Link>
            </nav>
          </div>

          {/* Language Selector Placeholder */}
          <div className="flex items-center gap-2 text-white/80">
            <Globe className="h-4 w-4" />
            <span>Australia - EN</span>
            {/* A real language selector would have a dropdown here */}
          </div>
        </div>
      </div>
    </footer>
  );
}
