"use client";

interface ShinydexSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function ShinydexSearchBar({
  searchQuery,
  setSearchQuery,
}: ShinydexSearchBarProps) {
  return (
    <div className="flex justify-center mt-4 px-4 pb-4">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un Pokémon par nom..."
          className="search-bar w-full px-4 py-3 pr-10 rounded-lg font-semibold text-sm transition-all duration-200 outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
        {!searchQuery && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            🔍
          </span>
        )}
      </div>
    </div>
  );
}
