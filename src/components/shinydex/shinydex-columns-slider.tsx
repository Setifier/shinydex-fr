"use client";

interface ShinydexColumnsSliderProps {
  columnsPerRow: number;
  sliderValues: number[];
  sliderIndex: number;
  handleSliderChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ShinydexColumnsSlider({
  columnsPerRow,
  sliderValues,
  sliderIndex,
  handleSliderChange,
}: ShinydexColumnsSliderProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-6 px-4">
      <span className="text-sm text-muted-foreground font-semibold whitespace-nowrap">
        Pokémon par ligne :
      </span>
      <div className="flex flex-col gap-1 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground font-bold">3</span>
          <div className="relative flex-1">
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={sliderIndex}
              onChange={handleSliderChange}
              className="pokemon-slider w-full"
            />
            {/* Marques de graduation */}
            <div className="absolute top-full mt-1 left-0 right-0 flex justify-between px-[0.35rem]">
              {sliderValues.map((value) => (
                <div
                  key={value}
                  className="w-0.5 h-2 bg-muted-foreground/40"
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-bold">15</span>
          <span className="text-sm text-primary font-bold min-w-[2rem] text-center">
            {columnsPerRow}
          </span>
        </div>
      </div>
    </div>
  );
}
