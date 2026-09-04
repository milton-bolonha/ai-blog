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

            <div className="min-h-screen bg-white text-zinc-900 relative catalog-page font-sans">
                {/* Content Wrapper */}
                <div className="relative z-10 flex flex-col min-h-screen">

                    {/* Header */}
                    <div className="pt-16 pb-16 px-6 bg-[#09090b] text-white border-b border-zinc-800">
                        <div className="max-w-7xl mx-auto flex flex-col gap-6">

                            <div className="flex flex-col items-center text-center">
                                <Link href="/" className="mb-6 group flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-[#d4af37] text-zinc-300 hover:text-[#d4af37] transition-all duration-300 shadow-sm">
                                    <FaHome className="text-sm" />
                                    <span className="font-semibold text-xs tracking-widest uppercase">Voltar ao Início</span>
                                </Link>

                                <div className="inline-block px-4 py-1 bg-zinc-900 rounded-full border border-zinc-800 mb-3">
                                    <span className="text-[11px] font-mono font-bold text-[#d4af37] uppercase tracking-widest">
                                        Escola de Artes Gráficas e Design
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3" style={{ fontFamily: 'Federo, serif' }}>
                                    Catálogo de <span className="text-[#d4af37]">Formações</span>
                                </h1>
                                <p className="text-base text-zinc-400 max-w-2xl font-sans leading-relaxed">
                                    Explore nossos cursos práticos, especializações de pré-impressão e fechamento de arquivos para gráficas digitais e offset.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="max-w-7xl mx-auto px-6 py-14 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

                            {/* Main Grid Content (Left) */}
                            <div className="order-2 lg:order-1">
                                {filteredPosts.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredPosts.map((post) => (
                                            <Link
                                                key={post.slug}
                                                href={`/catalogo/${post.slug}`}
                                                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#d4af37] hover:shadow-xl transition-all duration-300 h-full cursor-pointer relative shadow-sm"
                                            >
                                                {/* Image Placeholder */}
                                                <div className="aspect-video relative overflow-hidden bg-zinc-900">
                                                    <img
                                                        src={normalizeImage((post as any).featuredImage, post.title)}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                                                        onError={(e) => {
                                                             const target = e.target as HTMLImageElement;
                                                            target.src = normalizeImage(null, post.title);
                                                        }}
                                                    />

                                                    {/* Colored Badge */}
                                                    <div className="absolute top-4 right-4 z-20 bg-[#09090b] text-[#d4af37] border border-zinc-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                                                        {post.category || 'Curso'}
                                                    </div>
                                                </div>

                                                <div className="p-6 flex-1 flex flex-col">
                                                    <h3 className="text-xl font-bold text-zinc-950 mb-2 group-hover:text-[#d4af37] transition-colors leading-tight" style={{ fontFamily: 'Federo, serif' }}>
                                                        {post.title}
                                                    </h3>

                                                    <div className="text-zinc-600 text-sm mb-4 line-clamp-3 leading-relaxed font-sans">
                                                        {(post as any).description || "Formação profissional disponível. Clique para ver detalhes e ementa."}
                                                    </div>

                                                    <div className="mt-auto pt-4 border-t border-zinc-100 flex items-center justify-between">
                                                        <span className="text-xs text-[#09090b] group-hover:text-[#d4af37] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors">
                                                            Conhecer Curso &rarr;
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-24 border border-dashed border-zinc-300 rounded-3xl bg-zinc-50">
                                        <h3 className="text-2xl font-bold text-zinc-950 mb-2" style={{ fontFamily: 'Federo, serif' }}>Nenhum item encontrado</h3>
                                        <p className="text-zinc-500">
                                            Não encontramos itens nesta categoria no momento.
                                        </p>
                                        <button
                                            onClick={() => updateCategory("Todos")}
                                            className="mt-6 text-[#d4af37] hover:underline font-bold uppercase tracking-wider text-xs"
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
