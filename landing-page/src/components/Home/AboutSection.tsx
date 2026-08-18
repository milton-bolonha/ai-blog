import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { OptimizedImage } from '@/components/commons/OptimizedImage';
import { trackEvent } from '@/lib/analytics';
import { TextMotion } from '@/components/ui/TextMotion';
import aboutData from '../../../content/home/about.json';
import { GridBackground } from "@/components/commons/GridBackground";

export const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full h-full min-h-screen flex items-center bg-[#e6d8cc] text-[#1d2d44]">
      <GridBackground inverted={false} />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Image Card */}
          <div className="order-2 lg:order-1">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <div className="relative aspect-[3/4] overflow-hidden shadow-2xl bg-[#f4ece4] border-2 border-[#1d2d44]/20 md:rounded-2xl">
                <OptimizedImage
                  src={aboutData.about.photo.url}
                  alt={aboutData.about.photo.alt}
                  fill
                  className="object-cover"
                  cubeFrame={true}
                  enableFlip={true}
                />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <div className="inline-block px-4 py-2 bg-[#f4ece4] rounded-full border border-[#1d2d44]/15 mb-6 shadow-sm">
                <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase">
                  Sobre Larissa Canhas
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-normal text-[#1d2d44] mb-6 leading-tight" style={{ fontFamily: 'Federo, serif' }}>
                <TextMotion trigger={true} stagger={0.05}>
                  {aboutData.about.title}
                </TextMotion>
              </h2>
            </div>

            <div className="space-y-4 text-base text-[#3b5068] font-sans leading-relaxed">
              {aboutData.about.description.split('\n\n').map((paragraph: string, idx: number) => (
                <p key={idx}>{paragraph}</p>
              ))}

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {aboutData.about.list.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-center gap-2 text-sm font-medium text-[#1d2d44]">
                    <span className="w-2 h-2 rounded-full bg-[#D47E30]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/sobre"
              onClick={() => trackEvent('click', 'CTA', 'Learn More - About')}
              className="inline-flex items-center gap-3 text-[#1d2d44] hover:text-[#D47E30] font-medium group transition-all duration-300 uppercase tracking-wider text-sm"
            >
              <span className="relative font-semibold">
                {aboutData.about.cta}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D47E30] group-hover:w-full transition-all duration-300" />
              </span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};