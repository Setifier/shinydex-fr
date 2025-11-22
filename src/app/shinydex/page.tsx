"use client";

import { useState, useRef, useEffect } from "react";
import { getAllRegions, getAllForms } from "@/lib/pokemon-data";
import type { Pokemon } from "@/types/pokemon";
import type { PokemonFormCategory } from "@/types/forms";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ShinydexNavbar } from "@/components/shinydex/shinydex-navbar";
import { ShinydexGrid } from "@/components/shinydex/shinydex-grid";
import { PokemonModal } from "@/components/shinydex/pokemon-modal";

const regions = getAllRegions();
const forms = getAllForms();

export default function ShinydexPage() {
  const [selectedView, setSelectedView] = useState<"regions" | "forms">(
    "regions"
  );
  const [selectedForm, setSelectedForm] = useState<PokemonFormCategory | null>(
    null
  );
  const [activeRegion, setActiveRegion] = useState<string>("1 - KANTO");
  const [columnsPerRow, setColumnsPerRow] = useState<number>(6);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState<boolean>(false);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const regionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Configuration dynamique selon le nombre de colonnes
  const getGridConfig = (cols: number) => {
    switch (cols) {
      case 3:
        return { gap: "gap-8", fontSize: "text-lg", padding: "p-4" };
      case 6:
        return { gap: "gap-4", fontSize: "text-sm", padding: "p-2" };
      case 9:
        return { gap: "gap-2.5", fontSize: "text-xs", padding: "p-1.5" };
      case 12:
        return { gap: "gap-1.5", fontSize: "text-[0.65rem]", padding: "p-1" };
      case 15:
        return { gap: "gap-1", fontSize: "text-[0.6rem]", padding: "p-1" };
      default:
        return { gap: "gap-4", fontSize: "text-sm", padding: "p-2" };
    }
  };

  const gridConfig = getGridConfig(columnsPerRow);

  // Gestion du slider avec valeurs discrètes
  const sliderValues = [3, 6, 9, 12, 15];
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.value);
    setColumnsPerRow(sliderValues[index]);
  };
  const sliderIndex = sliderValues.indexOf(columnsPerRow);

  // Filtrage par recherche
  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filterPokemonsBySearch = (pokemons: Pokemon[]) => {
    if (!searchQuery.trim()) return pokemons;
    const normalizedQuery = normalizeString(searchQuery);
    return pokemons.filter((pokemon) => {
      // Recherche par nom
      const nameMatch = normalizeString(pokemon.name).includes(normalizedQuery);

      // Recherche par numéro (extraire le numéro de base de l'ID)
      const baseNumber = pokemon.id.split("-")[0];
      const numberMatch = baseNumber.includes(searchQuery.trim());

      return nameMatch || numberMatch;
    });
  };

  // Filtrer les régions et formes avec résultats
  const filteredRegions = regions.map((region) => ({
    ...region,
    pokemons: filterPokemonsBySearch(region.pokemons),
    hasResults: filterPokemonsBySearch(region.pokemons).length > 0,
  }));

  const filteredForms = forms.map((form) => ({
    ...form,
    pokemons: filterPokemonsBySearch(form.pokemons),
    hasResults: filterPokemonsBySearch(form.pokemons).length > 0,
  }));

  const currentFormData = selectedForm
    ? filteredForms.find((f) => f.form === selectedForm) || null
    : null;

  // Détection du sticky (navbar collée en haut)
  useEffect(() => {
    const handleScroll = () => {
      // La flèche apparaît quand les premiers Pokémons touchent le haut
      // (environ 600-650px = titre + navbar sticky complète)
      setIsSticky(window.scrollY > 620);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Réinitialiser le collapse quand on revient vraiment en haut de la page
  useEffect(() => {
    const handleScroll = () => {
      // Redévelopper automatiquement seulement quand on est vraiment en haut (< 200px)
      if (window.scrollY < 200 && isNavbarCollapsed) {
        setIsNavbarCollapsed(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavbarCollapsed]);

  // Détection de la région visible au scroll
  useEffect(() => {
    if (selectedView !== "regions") return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2 + window.scrollY;
      let closestRegion: string | null = null;
      let closestDistance = Infinity;

      // Parcourir toutes les régions
      Object.entries(regionRefs.current).forEach(([regionName, ref]) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const absoluteTop = rect.top + window.scrollY;
        const regionCenter = absoluteTop + rect.height / 2;
        const distance = Math.abs(viewportCenter - regionCenter);

        // Vérifier que la région est au moins partiellement visible
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible && distance < closestDistance) {
          closestDistance = distance;
          closestRegion = regionName;
        }
      });

      if (closestRegion && closestRegion !== activeRegion) {
        setActiveRegion(closestRegion);
      }
    };

    // Appeler au montage et à chaque scroll
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedView, activeRegion]);

  // Fonction pour scroller vers une région
  const scrollToRegion = (regionName: string) => {
    const element = regionRefs.current[regionName];
    if (element) {
      const offset = 200; // Espace pour les boutons fixes
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Fonction pour afficher les formes
  const handleFormClick = (formName: PokemonFormCategory) => {
    setSelectedView("forms");
    setSelectedForm(formName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fonction pour revenir aux régions
  const handleBackToRegions = () => {
    setSelectedView("regions");
    setSelectedForm(null);
  };

  // Fonction pour gérer le toggle avec animation
  const handleToggleNavbar = () => {
    setIsRotating(true);
    setIsNavbarCollapsed(!isNavbarCollapsed);
    setTimeout(() => setIsRotating(false), 900);
  };

  // Fonction pour ouvrir la modale
  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  // Fonction pour naviguer vers un autre Pokémon depuis la modale
  const handleNavigate = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  // Construire la liste de tous les Pokémon selon la vue actuelle
  const getAllPokemonList = (): Pokemon[] => {
    if (selectedView === "forms" && currentFormData) {
      return currentFormData.pokemons;
    }
    // Pour la vue régions, aplatir tous les Pokémon de toutes les régions filtrées
    return filteredRegions.flatMap((region) => region.pokemons);
  };

  const allPokemonList = getAllPokemonList();

  return (
    <div className="min-h-screen py-8 pokedex-page-bg">
      <ScrollToTop />
      <div className="container mx-auto px-4">
        {/* Titre principal */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-heading text-primary mb-8">Shinydex</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Découvrez tous les Pokémon chromatiques
          </p>
        </div>

        {/* Navigation par régions - Sticky */}
        <ShinydexNavbar
          selectedView={selectedView}
          selectedForm={selectedForm}
          activeRegion={activeRegion}
          columnsPerRow={columnsPerRow}
          searchQuery={searchQuery}
          isNavbarCollapsed={isNavbarCollapsed}
          isRotating={isRotating}
          isSticky={isSticky}
          filteredRegions={filteredRegions}
          filteredForms={filteredForms}
          sliderValues={sliderValues}
          sliderIndex={sliderIndex}
          handleBackToRegions={handleBackToRegions}
          scrollToRegion={scrollToRegion}
          handleFormClick={handleFormClick}
          handleToggleNavbar={handleToggleNavbar}
          handleSliderChange={handleSliderChange}
          setSearchQuery={setSearchQuery}
        />

        {/* Affichage selon le mode */}
        <ShinydexGrid
          selectedView={selectedView}
          filteredRegions={filteredRegions}
          currentFormData={currentFormData}
          gridConfig={gridConfig}
          columnsPerRow={columnsPerRow}
          regionRefs={regionRefs}
          onPokemonClick={handlePokemonClick}
        />
      </div>

      {/* Modale Pokémon */}
      <PokemonModal
        isOpen={isModalOpen}
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
        allPokemonList={allPokemonList}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
