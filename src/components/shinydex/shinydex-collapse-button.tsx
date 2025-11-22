"use client";

interface ShinydexCollapseButtonProps {
  isSticky: boolean;
  isNavbarCollapsed: boolean;
  isRotating: boolean;
  handleToggleNavbar: () => void;
}

export function ShinydexCollapseButton({
  isSticky,
  isNavbarCollapsed,
  isRotating,
  handleToggleNavbar,
}: ShinydexCollapseButtonProps) {
  if (!isSticky) return null;

  return (
    <div className="flex justify-center py-3">
      <button
        onClick={handleToggleNavbar}
        className="w-10 h-10 flex items-center justify-center bg-primary/20 hover:bg-primary/30 text-primary rounded-full transition-all duration-200 border-2 border-primary/40 hover:border-primary/60 shadow-lg group"
        aria-label={
          isNavbarCollapsed
            ? "Développer la navigation"
            : "Réduire la navigation"
        }
      >
        <span
          className={`text-2xl font-bold leading-none ${
            isNavbarCollapsed ? "navbar-arrow-down" : "navbar-arrow-up"
          } ${
            isRotating
              ? isNavbarCollapsed
                ? "navbar-arrow-rotating-down"
                : "navbar-arrow-rotating-up"
              : ""
          }`}
        >
          ▲
        </span>
      </button>
    </div>
  );
}
