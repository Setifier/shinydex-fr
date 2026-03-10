"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Pencil } from "lucide-react";
import { UserAvatar } from "@/components/avatar/user-avatar";
import { AvatarGrid } from "@/components/onboarding/avatar-grid";
import { AvatarBackgroundPicker } from "@/components/avatar/avatar-background-picker";
import { updateAvatarAction } from "@/actions/update-avatar.action";

interface AvatarEditButtonProps {
  initialAvatar: string;
  initialAvatarBg: string;
}

export function AvatarEditButton({ initialAvatar, initialAvatarBg }: AvatarEditButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen]       = useState(false);
  const [avatar, setAvatar]           = useState(initialAvatar);
  const [bg, setBg]                   = useState(initialAvatarBg);
  const [stagingAvatar, setStagingAvatar] = useState(initialAvatar);
  const [stagingBg, setStagingBg]     = useState(initialAvatarBg);
  const [saving, setSaving]           = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const openModal = () => {
    setStagingAvatar(avatar);
    setStagingBg(bg);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const handleSave = async () => {
    setSaving(true);
    const result = await updateAvatarAction({ avatar: stagingAvatar, avatarBackground: stagingBg });
    setSaving(false);
    if (!result.error) {
      setAvatar(stagingAvatar);
      setBg(stagingBg);
      closeModal();
    }
  };

  const unchanged = stagingAvatar === avatar && stagingBg === bg;

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="group relative cursor-pointer rounded-full"
        title="Modifier l'avatar"
      >
        <UserAvatar avatar={avatar} background={bg} size="2xl" />
        <div className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/35 transition-colors flex items-center justify-center overflow-hidden">
          <Pencil className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
        </div>
      </button>

      {mounted && open && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-card border border-border/50 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center transition-colors z-10 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-6 pt-6 pb-4 border-b border-border/30">
              <h2 className="text-lg font-heading text-foreground">Avatar</h2>
            </div>

            <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto">
              <div className="flex justify-center">
                <UserAvatar avatar={stagingAvatar} background={stagingBg} size="2xl" />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Personnage</p>
                <AvatarGrid value={stagingAvatar} background={stagingBg} onChange={setStagingAvatar} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">Couleur de fond</p>
                <AvatarBackgroundPicker value={stagingBg} onChange={setStagingBg} />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-border/30 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-muted/40 hover:bg-muted/70 border border-border/50 transition-all cursor-pointer"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || unchanged}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-default"
              >
                {saving ? "Enregistrement…" : "Sauvegarder"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
