"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ShinydexDesignPicker } from "@/components/shinydex/shinydex-design-picker";
import { updateShinydexDesignAction } from "@/actions/update-shinydex-design.action";

interface ShinydexDesignCustomizerProps {
  initialDesign: string;
}

export function ShinydexDesignCustomizer({ initialDesign }: ShinydexDesignCustomizerProps) {
  const router = useRouter();
  const [design, setDesign] = useState(initialDesign);

  const handleChange = async (newDesign: string) => {
    setDesign(newDesign);
    const result = await updateShinydexDesignAction({ shinydexDesign: newDesign });
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Design mis à jour !");
      router.refresh();
    }
  };

  return (
    <ShinydexDesignPicker value={design} onChange={handleChange} />
  );
}
