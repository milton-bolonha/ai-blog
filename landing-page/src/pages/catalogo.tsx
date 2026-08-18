import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getBusinessSettings, getGeneralSettings } from "@/lib/settings";
import { getSortedPostsData, PostData } from "@/lib/posts";
import { ClientOnly } from "@/components/commons/ClientOnly";
import { FaRobot, FaGlobe, FaBook, FaGamepad, FaChalkboardTeacher, FaRocket, FaHome, FaFilter } from "react-icons/fa";
import { GridBackground } from "@/components/commons/GridBackground";
import ContactSection from "@/components/Home/ContactSection";
import { normalizeImage } from "@/lib/media";
import { getCategoryGradient, getCategoryColor } from "@/lib/colors";
import { CatalogFilterSidebar } from "@/components/catalog/CatalogFilterSidebar";
import { Footer } from "@/components/commons/Footer";

interface CatalogoProps {
    businessSettings: any;
    generalSettings: any;
    allPosts: PostData[];
}

// Links to categories
const CATEGORIES = [
    { id: "Todos", label: "Todos", icon: FaFilter },
    { id: "AI", label: "AI Solutions", icon: FaRobot },
    { id: "WEB", label: "Web Services", icon: FaGlobe },
    { id: "GAME DEV", label: "Game Dev", icon: FaGamepad },
    { id: "BOOK", label: "Books", icon: FaBook },
    { id: "MENTORIA", label: "Mentoria", icon: FaChalkboardTeacher },
    { id: "ENTREPRENEUR", label: "Entrepreneur", icon: FaRocket },
];

const CatalogoContent = ({
    businessSettings,
    allPosts,
}: CatalogoProps) => {
    const { t } = useLanguage();
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [filteredPosts, setFilteredPosts] = useState<PostData[]>(allPosts);

    // Filter posts when category changes
    useEffect(() => {
        if (selectedCategory === "Todos") {
            setFilteredPosts(allPosts);
        } else {
            setFilteredPosts(allPosts.filter((post) => post.category === selectedCategory));
        }
    }, [selectedCategory, allPosts]);

    // Sync with URL query param
    useEffect(() => {
        if (router.query.category && typeof router.query.category === 'string') {
            const cat = router.query.category.toUpperCase();
            // Verify if it's a valid category or mapped one
            if (CATEGORIES.some(c => c.id === cat)) {
                setSelectedCategory(cat);
            }
        }
    }, [router.query]);

    const updateCategory = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <>
            <Head>
                <title>
                    Catálogo | {businessSettings.brandName}
                </title>
                <meta
                    name="description"
                    content={`Catálogo completo de soluções, mentorias e produtos de ${businessSettings.brandName}.`}
                />
            </Head>

            <div className="min-h-screen bg-[#f4ece4] text-[#1d2d44] relative catalog-page font-sans">
                {/* Background Grid */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <GridBackground inverted={false} />
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col min-h-screen">

                    {/* Header */}
                    <div className="pt-12 pb-12 px-6 bg-[#e6d8cc]/80 backdrop-blur-sm border-b border-[#1d2d44]/10">
                        <div className="full-width mx-auto flex flex-col gap-6">

                            <div className="flex flex-col items-center full-width text-center">
                                <Link href="/" className="mb-6 group flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#f4ece4] border border-[#1d2d44]/15 hover:border-[#D47E30] hover:text-[#D47E30] transition-all duration-300 shadow-sm">
                                    <FaHome className="text-sm" />
                                    <span className="font-semibold text-xs tracking-widest uppercase text-[#1d2d44]">Voltar ao Início</span>
                                </Link>

                                <h1 className="text-4xl md:text-6xl font-normal text-[#1d2d44] mb-3" style={{ fontFamily: 'Federo, serif' }}>
                                    Catálogo de <span className="text-[#D47E30]">Coleções</span>
                                </h1>
                                <p className="text-base text-[#3b5068] max-w-2xl font-sans leading-relaxed">
                                    Explore os ensaios de moda, retratos fine art, editoriais e direções de arte por Larissa Canhas.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="max-w-8xl mx-auto px-6 py-12 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

                            {/* Main Grid Content (Left) */}
                            <div className="order-2 lg:order-1">
                                {filteredPosts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredPosts.map((post) => (
                                            <Link
                                                key={post.slug}
                                                href={`/catalogo/${post.slug}`}
                                                className="group flex flex-col bg-[#e6d8cc] rounded-2xl overflow-hidden border border-[#1d2d44]/15 hover:border-[#D47E30] hover:shadow-xl transition-all duration-300 h-full cursor-pointer relative shadow-sm"
                                            >
                                                {/* Image Placeholder */}
                                                <div className="aspect-video relative overflow-hidden bg-black/10">
                                                    <img
                                                        src={normalizeImage((post as any).featuredImage, post.title)}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = normalizeImage(null, post.title);
                                                        }}
                                                    />

                                                    {/* Colored Badge */}
                                                    <div className="absolute top-4 right-4 z-20 bg-[#D47E30] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                        {post.category || 'Geral'}
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="text-xl font-normal text-[#1d2d44] mb-2 group-hover:text-[#D47E30] transition-colors leading-tight" style={{ fontFamily: 'Federo, serif' }}>
                                                        {post.title}
                                                    </h3>

                                                    <div className="text-[#3b5068] text-sm mb-4 line-clamp-3 leading-relaxed font-sans">
                                                        {(post as any).description || "Coleção autoral disponível. Clique para ver detalhes."}
                                                    </div>

                                                    <div className="mt-auto pt-4 border-t border-[#1d2d44]/10 flex items-center justify-between">
                                                        <span className="text-xs text-[#D47E30] font-bold uppercase tracking-wider group-hover:underline flex items-center gap-1">
                                                            Ver Obra &rarr;
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-32 border border-dashed border-[#1d2d44]/20 rounded-3xl bg-[#e6d8cc]">
                                        <h3 className="text-2xl font-normal text-[#1d2d44] mb-2" style={{ fontFamily: 'Federo, serif' }}>Nenhum item encontrado</h3>
                                        <p className="text-[#3b5068]">
                                            Não encontramos itens nesta categoria no momento.
                                        </p>
                                        <button
                                            onClick={() => updateCategory("Todos")}
                                            className="mt-6 text-[#D47E30] hover:underline font-medium uppercase tracking-wider text-xs"
                                        >
                                            Limpar filtros
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Filters (Right) */}
                            <div className="order-1 lg:order-2">
                                <CatalogFilterSidebar
                                    categories={CATEGORIES.filter(cat =>
                                        cat.id === "Todos" || allPosts.some(post => post.category === cat.id)
                                    )}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={updateCategory}
                                />
                            </div>

                        </div>
                    </div>

                    {/* Footer at the bottom */}
                    <Footer />
                </div>
            </div>
        </>
    );
};

const Catalogo = (props: CatalogoProps) => {
    return (
        <ClientOnly>
            <CatalogoContent {...props} />
        </ClientOnly>
    );
};

export const getStaticProps: GetStaticProps<CatalogoProps> = async () => {
    const businessSettings = getBusinessSettings();
    const generalSettings = getGeneralSettings();
    const allPosts = getSortedPostsData();

    return {
        props: {
            businessSettings,
            generalSettings,
            allPosts,
        },
    };
};

export default Catalogo;
