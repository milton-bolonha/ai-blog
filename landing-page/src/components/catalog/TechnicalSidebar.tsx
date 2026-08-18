import { TechnicalSpec } from '@/lib/extractTableData';
import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery';
import { FaCheckCircle, FaExternalLinkAlt, FaPlus, FaCode, FaDatabase, FaServer, FaTools } from 'react-icons/fa';
import Link from 'next/link';
import { PostData } from '@/lib/posts';
import { normalizeImage } from '@/lib/media';
import { BsOpenai, BsAmazon } from 'react-icons/bs';
import {
    SiNextdotjs, SiMongodb, SiClerk, SiStripe, SiTailwindcss,
    SiReact, SiPrisma, SiPostgresql, SiVercel, SiTypescript, SiJavascript,
    SiNodedotjs, SiPython, SiDocker, SiGooglecloud, SiFirebase
} from 'react-icons/si';

interface TechnicalSidebarProps {
    specs: TechnicalSpec[];
    images: string[];
    title: string;
    link?: string;
    technologies?: string[];
    relatedPosts?: PostData[];
    category?: string;
}

// Subcomponent to handle individual post card logic, specifically robust image error handling
const RelatedPostCard = ({ post }: { post: PostData }) => {
    const [imgSrc, setImgSrc] = useState(normalizeImage(post.featuredImage, post.title));
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setImgSrc(normalizeImage(post.featuredImage, post.title));
        setHasError(false);
    }, [post]);

    const handleImageError = () => {
        if (!hasError) {
            setImgSrc(normalizeImage(null, post.title));
            setHasError(true);
        }
    };

    return (
        <Link
            href={`/catalogo/${post.slug}`}
            className="block group relative rounded-xl overflow-hidden bg-[#e6d8cc] border border-[#1d2d44]/15 hover:border-[#D47E30] transition-all duration-300 shadow-sm"
        >
            <div className="h-32 w-full relative">
                <img
                    src={imgSrc}
                    alt={post.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2d44]/90 to-transparent" />
            </div>

            <div className="p-4 relative mt-[-40px]">
                <div className="text-sm font-normal text-white group-hover:text-[#D47E30] transition-colors leading-tight" style={{ fontFamily: 'Federo, serif' }}>
                    {post.title}
                </div>
                {post.description && (
                    <div className="text-xs text-[#f4ece4]/80 mt-1 line-clamp-2 leading-relaxed font-sans">
                        {post.description}
                    </div>
                )}
            </div>
        </Link>
    );
};

export const TechnicalSidebar = ({ specs, images, title, link, technologies, relatedPosts, category }: TechnicalSidebarProps) => {

    const getTechIcon = (tech: string) => {
        const lower = tech.toLowerCase().trim();
        if (lower.includes('next')) return <SiNextdotjs className="text-[#1d2d44]" />;
        if (lower.includes('openai') || lower.includes('gpt')) return <BsOpenai className="text-[#D47E30]" />;
        if (lower.includes('mongo')) return <SiMongodb className="text-green-600" />;
        if (lower.includes('stripe')) return <SiStripe className="text-purple-600" />;
        if (lower.includes('tailwind')) return <SiTailwindcss className="text-cyan-600" />;
        if (lower.includes('react')) return <SiReact className="text-blue-600" />;
        if (lower.includes('prisma')) return <SiPrisma className="text-[#1d2d44]" />;
        if (lower.includes('postgres')) return <SiPostgresql className="text-blue-600" />;
        if (lower.includes('vercel')) return <SiVercel className="text-[#1d2d44]" />;
        if (lower.includes('typescript')) return <SiTypescript className="text-blue-600" />;
        if (lower.includes('javascript')) return <SiJavascript className="text-amber-600" />;
        if (lower.includes('node')) return <SiNodedotjs className="text-green-600" />;
        if (lower.includes('docker')) return <SiDocker className="text-blue-600" />;
        if (lower.includes('aws')) return <BsAmazon className="text-[#D47E30]" />;
        if (lower.includes('firebase')) return <SiFirebase className="text-amber-600" />;
        if (lower.includes('python')) return <SiPython className="text-blue-600" />;
        return <FaCode className="text-[#3b5068]" />;
    };

    const allTechs = technologies && technologies.length > 0
        ? technologies
        : Array.from(new Set(
            specs.filter(s => ['Stack Principal', 'Tecnologias'].some(label => s.label.includes(label)))
                .flatMap(spec => spec.value.split(',').map(t => t.trim()))
        ));

    return (
        <aside className="space-y-6">
            {/* CTA Button */}
            <div className="w-full">
                {link ? (
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#D47E30] text-white font-semibold py-4 px-6 rounded-xl border border-[#D47E30] hover:bg-[#b86924] transition-all uppercase tracking-wider text-xs shadow-md"
                    >
                        <span>Acessar Obra / Projeto</span>
                        <FaExternalLinkAlt className="text-xs" />
                    </a>
                ) : null}
            </div>

            {/* Tech Stack Icons */}
            {allTechs.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center py-4 border-b border-[#1d2d44]/10 bg-[#e6d8cc] rounded-xl p-4 shadow-sm">
                    {allTechs.map((tech, idx) => (
                        <div key={idx} className="relative group cursor-help">
                            <div className="text-2xl transition-transform group-hover:scale-110">
                                {getTechIcon(tech)}
                            </div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#1d2d44] text-[#f4ece4] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#1d2d44]/10 z-50">
                                {tech}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Image Gallery */}
            <div>
                <ImageGallery images={images} title={title} />

                {/* Related Posts */}
                {relatedPosts && relatedPosts.length > 0 && category && (
                    <div className="mt-8">
                        <h3 className="text-[#1d2d44] font-normal text-base uppercase tracking-wider mb-4 flex items-center gap-2" style={{ fontFamily: 'Federo, serif' }}>
                            + {category}
                        </h3>
                        <div className="space-y-4">
                            {relatedPosts.map((post) => (
                                <RelatedPostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};
