import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';
import MagneticButton from '@/components/ui/MagneticButton';
import { TextMotion } from '@/components/ui/TextMotion';
import ctaData from '../../../content/home/cta.json';

export const CTASection = () => {
  const { t } = useLanguage();

  const titleText = t('home.cta.title') !== 'home.cta.title' 
    ? t('home.cta.title') 
    : 'Qual capítulo você quer guardar?';
    
  const descriptionText = t('home.cta.description') !== 'home.cta.description' 
    ? t('home.cta.description') 
    : 'Uma nova família. Um novo amor. Uma celebração. Uma infância. Um momento que nunca mais será exatamente igual.';

  const buttonText = t('home.cta.button') !== 'home.cta.button' 
    ? t('home.cta.button') 
    : 'Reserve seu Capítulo';

  return (
    <section id="cta" className="relative bg-[#f4ece4] text-[#1d2d44] py-24 overflow-hidden border-t border-[#1d2d44]/10">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-[#e6d8cc] rounded-full border border-[#1d2d44]/15 shadow-sm">
            <span className="text-xs font-semibold text-[#D47E30] tracking-widest uppercase">Vamos Conversar</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-normal text-[#1d2d44]" style={{ fontFamily: 'Federo, serif' }}>
            {ctaData.cta.titleEmoji}{' '}
            <TextMotion trigger={true} stagger={0.05}>
              {titleText}
            </TextMotion>
          </h2>
          
          <p className="text-lg text-[#3b5068] font-sans max-w-2xl mx-auto leading-relaxed">
            {descriptionText}
          </p>
          
          <MagneticButton>
            <Link
              href={ctaData.cta.link}
              onClick={() => trackEvent('click', 'CTA', 'Final CTA - Home')}
              className="inline-flex items-center gap-3 bg-[#D47E30] text-white hover:bg-[#b86924] font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-md uppercase tracking-wider text-xs cursor-pointer"
            >
              {buttonText}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MagneticButton>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 text-[#3b5068]">
            {ctaData.cta.contacts.map((contact) => {
              if (contact.type === 'email') {
                const rawEmail = contact.translationKey ? t(contact.translationKey) : '';
                const email = (!rawEmail || rawEmail.includes('contact.'))
                  ? 'contato@larissacanhas.com.br'
                  : rawEmail;

                return (
                  <a
                    key={contact.type}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 hover:text-[#D47E30] transition-colors font-medium text-sm font-sans"
                  >
                    <svg className="w-5 h-5 text-[#D47E30]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>Email: {email}</span>
                  </a>
                );
              } else if (contact.url && contact.label) {
                return (
                  <a
                    key={contact.type}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#D47E30] transition-colors font-medium text-sm font-sans"
                  >
                    <svg className="w-5 h-5 text-[#D47E30]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <span>{contact.label}</span>
                  </a>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
