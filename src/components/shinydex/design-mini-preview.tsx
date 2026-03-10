"use client";

import Image from "next/image";

interface Props { design: string; }

function ScreenContent() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/assets/screenshot.png"
        alt="Aperçu Pokémon"
        fill
        className="object-cover object-top"
        sizes="600px"
      />
    </div>
  );
}

/* ── Classic ────────────────────────────────────────────── */
function ClassicMini() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{
      background: "linear-gradient(150deg, #2a2a2e 0%, #222226 35%, #1e1e22 65%, #26262a 100%)",
      borderRadius: "14px",
      border: "1.5px solid rgba(155,162,175,0.30)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 0 20px rgba(155,162,175,0.08)",
    }}>
      <div style={{
        height: "22px", flexShrink: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(155,162,175,0.12)",
        display: "flex", alignItems: "center", padding: "0 8px", gap: "4px",
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #c8cdd8, #9ba6af, #6a737f)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #a0a8b5, #7a8090, #505860)" }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 8px rgba(155,162,175,0.14), inset 0 0 20px rgba(0,0,0,0.6)" }}>
        <ScreenContent />
      </div>
      <div style={{ height: "14px", flexShrink: 0, background: "rgba(0,0,0,0.15)" }} />
    </div>
  );
}

/* ── Terminal (amber phosphor) ──────────────────────────── */
function TerminalMini() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{
      background: "linear-gradient(148deg, #2a2418 0%, #1e1a10 20%, #141008 50%, #1a1610 80%, #22201a 100%)",
      borderRadius: "14px",
      border: "1.5px solid #100e08",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 0 24px rgba(255,165,30,0.12)",
    }}>
      <div style={{
        height: "22px", flexShrink: 0,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.025) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px",
      }}>
        <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffd580, #ffaa33)", boxShadow: "0 0 4px rgba(255,165,30,0.7)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ffd580, #ffaa33, #a06010)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #e8c070, #c89040, #7a5018)" }} />
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width: 2, height: 8, borderRadius: "1px", background: "rgba(0,0,0,0.6)" }} />
          ))}
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1.5px rgba(255,165,30,0.18), 0 0 16px rgba(255,165,30,0.28), inset 0 0 20px rgba(0,0,0,0.7)" }}>
        <ScreenContent />
      </div>
      <div style={{ height: "14px", flexShrink: 0, background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)" }} />
    </div>
  );
}

/* ── Neon (alien green) ─────────────────────────────────── */
function NeonMini() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{
      background: "linear-gradient(160deg, #060e08 0%, #040c06 50%, #08140a 100%)",
      borderRadius: "10px",
      border: "1px solid rgba(0,255,112,0.28)",
      boxShadow: "0 0 0 1px rgba(0,255,112,0.08), 0 0 26px rgba(0,255,112,0.22), 0 0 55px rgba(0,255,112,0.10)",
    }}>
      <div style={{
        height: "22px", flexShrink: 0,
        background: "linear-gradient(to bottom, rgba(0,255,112,0.04) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(0,255,112,0.10)",
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px",
      }}>
        <span style={{ fontSize: "6px", letterSpacing: "0.28em", color: "rgba(0,255,112,0.70)", textShadow: "0 0 8px rgba(0,255,112,0.85)", fontWeight: 700, textTransform: "uppercase", userSelect: "none" }}>
          SHINYDEX
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff70", boxShadow: "0 0 4px #00ff70, 0 0 10px rgba(0,255,112,0.7)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00cc58", boxShadow: "0 0 4px #00cc58, 0 0 10px rgba(0,200,80,0.7)" }} />
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1px rgba(0,255,112,0.12), 0 0 16px rgba(0,255,112,0.20), inset 0 0 20px rgba(0,0,0,0.7)" }}>
        <ScreenContent />
      </div>
      <div style={{ height: "14px", flexShrink: 0, borderTop: "1px solid rgba(0,255,112,0.06)" }} />
    </div>
  );
}

/* ── Rose (cristal) ─────────────────────────────────────── */
function RoseMini() {
  return (
    <div className="w-full h-full" style={{
      padding: "2px", borderRadius: "14px",
      background: "linear-gradient(135deg, #ff80c8, #d946b0, #a855f7, #818cf8, #fb7185, #f0abfc, #ff80c8)",
      backgroundSize: "300% 300%",
      animation: "rose-border-shimmer 5s ease-in-out infinite",
    }}>
      <div className="w-full h-full flex flex-col overflow-hidden" style={{
        background: "linear-gradient(150deg, #1a0e1f 0%, #130a18 35%, #0f0714 65%, #1a0e1f 100%)",
        borderRadius: "12px",
        boxShadow: "inset 0 1px 0 rgba(255,150,220,0.08), 0 0 50px rgba(217,79,138,0.08)",
      }}>
        <div style={{
          height: "22px", flexShrink: 0,
          background: "linear-gradient(rgba(14,5,16,1), rgba(14,5,16,1)) padding-box, linear-gradient(90deg, rgba(217,79,138,0.55), rgba(147,51,234,0.55), rgba(217,79,138,0.55)) border-box",
          borderBottom: "1px solid transparent",
          display: "flex", alignItems: "center", padding: "0 8px", gap: "4px",
        }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #ff80c8, #d94f8a)", boxShadow: "0 0 4px rgba(217,79,138,0.7)" }} />
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #d8b4fe, #a855f7)", boxShadow: "0 0 4px rgba(147,51,234,0.7)" }} />
        </div>
        <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1px rgba(217,79,138,0.14), 0 0 0 3px rgba(147,51,234,0.08), 0 0 16px rgba(217,79,138,0.22), inset 0 0 20px rgba(0,0,0,0.8)" }}>
          <ScreenContent />
        </div>
        <div style={{ height: "14px", flexShrink: 0, background: "rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  );
}

/* ── Cobalt (acier cyan) ────────────────────────────────── */
function CobaltMini() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{
      background: "linear-gradient(160deg, #252c32 0%, #1e2428 30%, #181e24 60%, #222830 100%)",
      borderRadius: "6px",
      border: "2px solid #1e2428",
      boxShadow: "0 0 0 1px rgba(0,0,0,0.85), 6px 8px 0 rgba(0,0,0,0.45), 0 0 26px rgba(30,200,255,0.18), inset 0 1px 0 rgba(30,200,255,0.10)",
    }}>
      <div style={{
        height: "22px", flexShrink: 0,
        background: "linear-gradient(to bottom, #2e3840 0%, #222c34 100%)",
        borderBottom: "1.5px solid #181e24",
        display: "flex", alignItems: "center", padding: "0 8px",
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "radial-gradient(circle at 38% 38%, #2e3840, #141c24)", border: "1px solid #121820", boxShadow: "inset 0 1px rgba(30,200,255,0.28)" }} />
        <div style={{ flex: 1 }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "radial-gradient(circle at 38% 38%, #2e3840, #141c24)", border: "1px solid #121820", boxShadow: "inset 0 1px rgba(30,200,255,0.28)" }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1.5px rgba(30,200,255,0.16), 0 0 16px rgba(30,200,255,0.28), 2px 3px 0 rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.75)" }}>
        <ScreenContent />
      </div>
      <div style={{ height: "14px", flexShrink: 0, background: "repeating-linear-gradient(-52deg, #1c2228, #1c2228 2px, #202830 2px, #202830 8px)" }} />
    </div>
  );
}

/* ── Manga ──────────────────────────────────────────────── */
function MangaMini() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{
      background: "#161618",
      borderRadius: "10px",
      border: "3px solid #0a0a0a",
      boxShadow: "4px 6px 0 rgba(0,0,0,0.75), 0 0 0 1px rgba(0,0,0,0.9)",
    }}>
      <div style={{
        height: "22px", flexShrink: 0,
        background: "linear-gradient(to bottom, #e8383b, #c82d30)",
        borderBottom: "2px solid #0a0a0a",
        display: "flex", alignItems: "center", padding: "0 8px", gap: "4px",
      }}>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", opacity: 0.75, border: "1px solid rgba(0,0,0,0.4)" }} />
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", opacity: 0.40, border: "1px solid rgba(0,0,0,0.4)" }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden", boxShadow: "0 0 0 2px rgba(0,0,0,0.8), 0 0 0 4px rgba(232,56,59,0.15), 2px 3px 0 rgba(0,0,0,0.6), inset 0 0 16px rgba(0,0,0,0.55)" }}>
        <ScreenContent />
      </div>
      <div style={{ height: "14px", flexShrink: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3) 0%, #161618 100%)" }} />
    </div>
  );
}

export function DesignMiniPreview({ design }: Props) {
  switch (design) {
    case "classic": return <ClassicMini />;
    case "device":  return <TerminalMini />;
    case "neon":    return <NeonMini />;
    case "rose":    return <RoseMini />;
    case "cobalt":  return <CobaltMini />;
    case "manga":   return <MangaMini />;
    default:        return <ClassicMini />;
  }
}
