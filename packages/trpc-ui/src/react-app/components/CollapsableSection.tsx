import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Chevron } from "@src/react-app/components/Chevron";
import {
  collapsables,
  useCollapsableIsShowing,
  useSiteNavigationContext,
} from "@src/react-app/components/contexts/SiteNavigationContext";
import {
  backgroundColor,
  solidColorBg,
  solidColorBorder,
} from "@src/react-app/components/style-utils";
import { useQueryState } from "nuqs";
import React, {
  type MutableRefObject,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import toast from "react-hot-toast";

export type ColorSchemeType =
  | "query"
  | "mutation"
  | "router"
  | "neutral"
  | "subscription";
export function CollapsableSection({
  titleElement,
  fullPath,
  children,
  sectionType,
  isRoot,
  focusOnScrollRef,
}: {
  titleElement: ReactNode;
  fullPath: string[];
  children: ReactNode;
  sectionType: ColorSchemeType;
  isRoot?: boolean;
  focusOnScrollRef?: MutableRefObject<HTMLFormElement | null>;
}) {
  const { scrollToPathIfMatches } = useSiteNavigationContext();
  const shown = useCollapsableIsShowing(fullPath);
  const [_path, setPath] = useQueryState("path");

  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (shown && containerRef.current) {
      if (scrollToPathIfMatches(fullPath, containerRef.current)) {
        // timeout or it'll immediately submit the form (which shows error messages)
        const firstChild =
          focusOnScrollRef?.current &&
          findFirstFormChildInput(focusOnScrollRef.current);
        if (firstChild) {
          setTimeout(() => {
            firstChild.focus({ preventScroll: true });
          }, 0);
        }
      }
    }
  }, [shown]);

  // deals with root router. If it's not collapsable we **simply** render the title element and children
  const collapsable = fullPath.length > 0;
  return (
    <div
      ref={containerRef}
      className={`flex flex-col drop-shadow-sm ${
        collapsable
          ? `${solidColorBorder(sectionType)} ${backgroundColor(sectionType)}`
          : ""
      }${!isRoot ? " rounded-[0.25rem] border" : ""}`}
    >
      {collapsable ? (
        <div className="group/header flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              collapsables.toggle(fullPath);
              if (shown) {
                setPath(null);
              } else {
                setPath(fullPath.join("."));
              }
            }}
            className="flex flex-1 flex-row items-center p-1 transition-all duration-150 active:scale-[0.995]"
          >
            <SectionTypeLabel className="mr-2" sectionType={sectionType} />
            {titleElement}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const pathString = fullPath.join(".");
              navigator.clipboard.writeText(pathString);
              toast.success(`Copied: ${pathString}`, {
                duration: 2000,
                position: "bottom-center",
              });
            }}
            className="mr-2 rounded p-1 opacity-0 transition-opacity hover:bg-gray-100 group-hover/header:opacity-100"
            title="Copy path"
          >
            <ContentCopyIcon className="h-3 w-3 text-gray-400" />
          </button>
        </div>
      ) : (
        titleElement
      )}

      <div
        className={`flex-col justify-between ${collapsable ? ` border-t ${solidColorBorder(sectionType)}` : ""}${shown || !collapsable ? " slide-in flex" : " hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}

export function SectionTypeLabel({
  sectionType,
  className,
}: {
  sectionType: ColorSchemeType;
  className?: string;
}) {
  return (
    <span
      className={`flex w-28 flex-row justify-center rounded-lg px-3 py-1.5 font-bold font-sans text-sm text-white uppercase tracking-wide shadow-sm ${solidColorBg(sectionType)}${className ? ` ${className}` : ""}`}
    >
      {sectionType}
    </span>
  );
}

function findFirstFormChildInput(formElement: HTMLFormElement) {
  for (let i = 0; i < formElement.elements.length; i++) {
    const child = formElement.elements[i];
    if (child?.tagName === "input" || child?.tagName === "INPUT") {
      return child as HTMLInputElement;
    }
  }
  return;
}
