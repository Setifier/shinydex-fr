"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Afficher le bouton quand on scroll vers le bas
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroller vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-primary hover:bg-primary-light text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />

          {/* Effet de glow */}
          <div className="absolute inset-0 rounded-full bg-primary opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
        </button>
      )}
    </>
  );
};
