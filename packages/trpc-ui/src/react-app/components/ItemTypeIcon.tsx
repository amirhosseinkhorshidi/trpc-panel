import type { ColorSchemeType } from "@src/react-app/components/CollapsableSection";
import { solidColorBg, textColor } from "@src/react-app/components/style-utils";
import React from "react";

export function ItemTypeIcon({
  colorScheme,
}: {
  colorScheme: ColorSchemeType;
}) {
  const letter = colorScheme[0]?.toUpperCase();
  return (
    <span
      className={`flex h-5 w-5 items-center justify-center rounded font-bold text-white text-xs ${solidColorBg(colorScheme)}`}
    >
      {letter}
    </span>
  );
}
