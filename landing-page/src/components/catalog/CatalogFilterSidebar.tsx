import { FaFilter } from 'react-icons/fa';

interface Category {
    id: string;
    label: string;
    icon: any;
}

interface CatalogFiltersProps {
    categories: Category[];
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
}

export const CatalogFilterSidebar = ({
    categories,
    selectedCategory,
    onSelectCategory,
}: CatalogFiltersProps) => {
    return (
        <aside className="w-full">
            <div className="bg-[#e6d8cc] border border-[#1d2d44]/15 rounded-2xl p-6 sticky top-24 shadow-md text-[#1d2d44]">
                <div className="flex items-center gap-2 mb-6">
                    <FaFilter className="text-[#D47E30]" />
                    <h3 className="text-[#1d2d44] font-normal text-xl tracking-wide" style={{ fontFamily: 'Federo, serif' }}>Filtros</h3>
                </div>

                <div className="space-y-2">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => onSelectCategory(cat.id)}
                                className={`
                                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left group cursor-pointer font-sans text-sm
                                  ${isActive
                                        ? 'bg-[#1d2d44] text-[#f4ece4] font-semibold shadow-sm'
                                        : 'bg-[#f4ece4]/60 border border-transparent text-[#3b5068] hover:bg-[#f4ece4] hover:text-[#1d2d44]'}
                                `}
                            >
                                {Icon && (
                                    <span className={`text-lg transition-colors ${isActive ? 'text-[#D47E30]' : 'text-[#3b5068] group-hover:text-[#D47E30]'}`}>
                                        <Icon />
                                    </span>
                                )}
                                <span className="flex-1 font-medium">{cat.label}</span>

                                {isActive && (
                                    <div className="w-2 h-2 rounded-full bg-[#D47E30]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
