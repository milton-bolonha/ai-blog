import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPostSlugs, getPostData, PostData, getSortedPostsData } from '@/lib/posts';
import { getSeoSettings } from '@/lib/seoSettings';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ClientOnly } from '@/components/commons/ClientOnly';
import { CustomSignInButton } from "@/components/commons/clerk/SignInButton";
import Seo from '@/components/commons/Seo';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaHome, FaExternalLinkAlt, FaCheck, FaTag, FaLayerGroup, FaDatabase, FaServer, FaCode } from 'react-icons/fa';
import citiesData from "../../../../content/cities.json";
import { GridBackground } from "@/components/commons/GridBackground";
import ContactSection from "@/components/Home/ContactSection";
import { normalizeImage } from "@/lib/media";
import { extractTableData, getSpecValue } from '@/lib/extractTableData';
import { TechnicalSidebar } from '@/components/catalog/TechnicalSidebar';

const SignedIn = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedIn), { ssr: false });
const SignedOut = dynamic(() => import("@clerk/nextjs").then((mod) => mod.SignedOut), { ssr: false });

interface CityPostProps {
    postData: PostData;
    seoSettings: any;
    city: { id: string, name: string };
    relatedPosts: PostData[];
}

const CityCatalogItem = ({ postData, seoSettings, city, relatedPosts }: CityPostProps) => {
    if (!postData || !city) {
        return <div className="min-h-screen flex items-center justify-center text-white bg-black">Carregando...</div>;
    }

    // Extract technical specs from markdown
    const { specs, contentWithoutTable } = extractTableData(postData.content);

    // Generate placeholder images (4 images for gallery)
    const galleryImages = [
        normalizeImage((postData as any).featuredImage, postData.title),
        normalizeImage(null, `${postData.title} em ${city.name} - Vista 2`),
        normalizeImage(null, `${postData.title} em ${city.name} - Vista 3`),
        normalizeImage(null, `${postData.title} em ${city.name} - Detalhes`),
    ];

    // Get link from specs if available (fallback) or frontmatter (primary)
    const linkSpec = getSpecValue(specs, 'Link') || getSpecValue(specs, 'Demo');
    const externalLink = postData.link || (linkSpec && !linkSpec.includes('N/A') && !linkSpec.includes('Sob') ? linkSpec : undefined);

    const bannerImage = galleryImages[0];

    // SEO Injection: "Item em City"
    const localTitle = `${postData.title} em ${city.name}`;
    const localDescription = `Encontre ${postData.title} de alta qualidade em ${city.name}. Soluções de ${postData.category} verificadas e disponíveis para ${city.name} e região.`;

    const seoData = {
        title: localTitle,
        description: localDescription,
        keywords: [...((postData as any).keywords || []), city.name, `em ${city.name}`, "Ribeirão Preto região"],
        author: postData.author,
        siteUrl: seoSettings.siteUrl,
        slug: `/cities/${city.id}/${postData.slug}`,
        articleUrl: `${seoSettings.siteUrl}/cities/${city.id}/${postData.slug}`,
        featuredImage: bannerImage || seoSettings.defaultImage,
        brandCardImage: seoSettings.brandCardImage,
        topology: 'post' as const,
        datePublished: postData.date,
        themeColor: seoSettings.themeColor,
        twitterHandle: seoSettings.twitterHandle,
        locale: seoSettings.locale,
    };

    const ImageRenderer = ({ node, ...props }: any) => {
        return (
            <div className="flex justify-center items-center mb-8">
                <Image
                    {...props}
                    alt={`${props.alt || 'Imagem'} em ${city.name}`}
                    width={800}
                    height={600}
                    className="w-full h-auto max-w-3xl rounded-xl shadow-2xl border border-white/10"
                />
            </div>
        );
    };

    const ParagraphRenderer = ({ node, ...props }: any) => {
        return (
            <p {...props} className="mb-6 leading-relaxed text-base text-[#3b5068] font-sans" />
        );
    };

    const HeadingRenderer = ({ node, ...props }: any) => {
        return <h2 {...props} className="text-2xl font-normal text-[#1d2d44] mt-8 mb-4" style={{ fontFamily: 'Federo, serif' }} />;
    };

    return (
        <>
            <Seo data={seoData} />
            <div className="min-h-screen bg-[#f4ece4] text-[#1d2d44] font-sans relative catalog-page">
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
                    <GridBackground inverted={false} />
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    {/* Navigation */}
                    <div className="sticky top-0 z-50 bg-[#f4ece4]/90 backdrop-blur-md border-b border-[#1d2d44]/10 px-6 py-4">
                        <div className="max-w-7xl mx-auto grid grid-cols-3 items-center">
                            {/* Left: Back */}
                            <div className="flex justify-start">
                                <Link href={`/cities/${city.id}`} className="inline-flex items-center gap-2 text-[#1d2d44] hover:text-[#D47E30] transition-colors font-medium text-sm">
                                    &larr; Voltar
                                </Link>
                            </div>

                            {/* Center: Home */}
                            <div className="flex justify-center">
                                <Link href="/" className="inline-flex items-center gap-2 text-[#1d2d44] hover:text-[#D47E30] transition-colors font-semibold uppercase tracking-widest text-xs">
                                    <FaHome size={16} />
                                    <span className="hidden md:inline">Home</span>
                                </Link>
                            </div>

                            {/* Right: Location + Link */}
                            <div className="flex justify-end items-center gap-4">
                                <div className="text-[#3b5068] text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                                    <FaMapMarkerAlt /> <span className="hidden md:inline">{city.name}</span>
                                </div>
                                {externalLink && (
                                    <a
                                        href={externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-[#D47E30] hover:underline transition-colors font-semibold text-xs uppercase tracking-wider"
                                    >
                                        <span className="hidden md:inline">Visitar</span>
                                        <FaExternalLinkAlt size={12} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hero Header */}
                    <div className="pt-16 pb-12 px-6 bg-[#e6d8cc] border-b border-[#1d2d44]/10">
                        <div className="max-w-7xl mx-auto">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1d2d44]/15 bg-[#f4ece4] text-[#D47E30] font-semibold text-xs mb-4 uppercase tracking-widest shadow-sm">
                                <FaMapMarkerAlt />
                                Disponível em {city.name}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-normal text-[#1d2d44] mb-4" style={{ fontFamily: 'Federo, serif' }}>
                                {postData.title}
                            </h1>
                            {(postData as any).description && (
                                <p className="text-lg text-[#3b5068] max-w-3xl font-sans leading-relaxed">
                                    {(postData as any).description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Main Content with Sidebar */}
                    <div className="container mx-auto px-6 max-w-7xl py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
                            {/* Main Content */}
                            <main>
                                {/* Attributes Header */}
                                {specs.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 border-b border-[#1d2d44]/15 pb-12">
                                        {specs.map((spec, idx) => {
                                            if (['Link', 'Demo'].includes(spec.label)) return null;

                                            let icon = <FaCheck className="text-green-600" />;
                                            let colorClass = "text-[#1d2d44]";

                                            if (spec.label === 'Categoria') { icon = <FaTag className="text-[#D47E30]" />; colorClass = "text-[#D47E30] font-semibold"; }
                                            if (spec.label === 'Tipo') { icon = <FaLayerGroup className="text-purple-600" />; }
                                            if (spec.label === 'Stack Principal') { icon = <FaCode className="text-[#D47E30]" />; colorClass = "text-[#1d2d44] font-bold"; }
                                            if (spec.label === 'Tecnologias') { icon = <FaDatabase className="text-cyan-600" />; }
                                            if (spec.label === 'Status') { icon = <FaCheck className="text-green-600" />; }

                                            return (
                                                <div key={idx} className="bg-[#e6d8cc] rounded-xl p-4 border border-[#1d2d44]/15 shadow-sm">
                                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-[#3b5068]">
                                                        {icon}
                                                        {spec.label}
                                                    </div>
                                                    <div className={`text-sm leading-relaxed ${colorClass}`}>
                                                        {spec.value}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {postData.public ? (
                                    <div className="prose prose-lg max-w-none
                                        prose-headings:text-[#1d2d44] prose-h2:text-[#1d2d44] prose-h3:text-[#1d2d44]
                                        prose-p:text-[#3b5068] prose-li:text-[#3b5068] prose-strong:text-[#1d2d44]
                                        prose-a:text-[#D47E30] hover:prose-a:text-[#b86924] prose-a:underline
                                        prose-blockquote:border-l-[#D47E30] prose-blockquote:bg-[#e6d8cc] prose-blockquote:text-[#1d2d44]
                                        prose-code:text-[#1d2d44] prose-code:bg-[#e6d8cc] prose-code:px-1 prose-code:rounded
                                        prose-th:text-[#1d2d44] prose-td:text-[#3b5068]">
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            rehypePlugins={[rehypeRaw]}
                                            components={{
                                                img: ImageRenderer,
                                                p: ParagraphRenderer,
                                                h2: HeadingRenderer,
                                            }}
                                        >
                                            {contentWithoutTable}
                                        </ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="max-w-2xl mx-auto my-8">
                                        <ClientOnly>
                                            {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
                                                <>
                                                    <SignedOut>
                                                        <div className="bg-red-900/10 border border-red-500/20 text-red-200 px-8 py-10 rounded-2xl text-center backdrop-blur-sm">
                                                            <h3 className="text-2xl font-bold mb-4">Acesso Restrito em {city.name} 🔒</h3>
                                                            <p className="mb-8 text-white/70">Este conteúdo é exclusivo para membros. Faça login para continuar.</p>
                                                            <CustomSignInButton />
                                                        </div>
                                                    </SignedOut>
                                                    <SignedIn>
                                                        <div className="prose prose-lg prose-invert max-w-none">
                                                            <ReactMarkdown
                                                                remarkPlugins={[remarkGfm]}
                                                                rehypePlugins={[rehypeRaw]}
                                                                components={{
                                                                    img: ImageRenderer,
                                                                    p: ParagraphRenderer,
                                                                }}
                                                            >
                                                                {contentWithoutTable}
                                                            </ReactMarkdown>
                                                        </div>
                                                    </SignedIn>
                                                </>
                                            ) : (
                                                <div className="bg-red-900/10 border border-red-500/20 text-red-200 px-8 py-10 rounded-2xl text-center backdrop-blur-sm">
                                                    <h3 className="text-2xl font-bold mb-4">Acesso Restrito em {city.name} 🔒</h3>
                                                    <p className="mb-8 text-white/70">Este conteúdo é exclusivo para membros.</p>
                                                </div>
                                            )}
                                        </ClientOnly>
                                    </div>
                                )}
                            </main>

                            {/* Sidebar */}
                            <TechnicalSidebar
                                specs={specs}
                                images={galleryImages}
                                title={`${postData.title} em ${city.name}`}
                                link={externalLink}
                                technologies={postData.technologies}
                                relatedPosts={relatedPosts}
                                category={postData.category}
                            />
                        </div>
                    </div>

                    {/* Contact Footer */}
                    <div className="relative z-10 w-full bg-black">
                        <ContactSection
                            contacts={[
                                { name: "LinkedIn", link: "https://www.linkedin.com/in/miltonbolonha/" },
                                { name: "GitHub", link: "https://github.com/miltonbolonha" },
                                { name: "Email", link: "contato@miltonbolonha.com.br", isMail: true },
                                { name: "Baixar Currículo", link: "/files/Curriculo 02072025.pdf", isDownload: true },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getSortedPostsData();
    const paths: any[] = [];

    // Generate Cartesian Product: Cities * Posts
    citiesData.forEach(city => {
        posts.forEach(post => {
            paths.push({
                params: {
                    city: city.id,
                    slug: post.slug
                }
            });
        });
    });

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps<CityPostProps> = async ({ params }) => {
    const postData = await getPostData(params?.slug as string);
    const seoSettings = getSeoSettings();
    const city = citiesData.find(c => c.id === params?.city) || { id: 'sp', name: 'São Paulo' };
    const allPosts = getSortedPostsData();

    const relatedPosts = allPosts
        .filter(p => p.category === postData.category && p.slug !== postData.slug && p.published)
        .slice(0, 3);

    return {
        props: {
            postData,
            seoSettings,
            city,
            relatedPosts
        },
    };
};

export default CityCatalogItem;
