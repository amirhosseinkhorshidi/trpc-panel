import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailLockIcon from "@mui/icons-material/MailLockOutlined";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import type { ParsedProcedure } from "@src/parse/parseProcedure";
import { Chevron } from "@src/react-app/components/Chevron";
import { ItemTypeIcon } from "@src/react-app/components/ItemTypeIcon";
import { useHeadersContext } from "@src/react-app/components/contexts/HeadersContext";
import {
  collapsables,
  useCollapsableIsShowing,
  useSiteNavigationContext,
} from "@src/react-app/components/contexts/SiteNavigationContext";
import { colorSchemeForNode } from "@src/react-app/components/style-utils";
import React, { useCallback } from "react";
import type { ParsedRouter } from "../../parse/parseRouter";

// Helper function to count procedures recursively
function countProcedures(node: ParsedRouter | ParsedProcedure): number {
  if (node.nodeType === "procedure") {
    return 1;
  }
  return Object.values(node.children).reduce(
    (count, child) => count + countProcedures(child),
    0,
  );
}
export function SideNav({
  rootRouter,
}: {
  rootRouter: ParsedRouter;
}) {
  const { setHeadersPopupShown } = useHeadersContext();

  return (
    <div
      style={{ maxHeight: "100vh", width: "380px" }}
      className="flex flex-col border-gray-200 border-r bg-white"
    >
      {/* Action Buttons */}
      <div className="flex flex-col gap-2 border-gray-200 border-b p-4">
        {/* Collapse/Expand All Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => collapsables.showAll()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-200 px-2 py-1.5 font-medium font-sans text-gray-600 text-xs tracking-tight transition-colors hover:bg-gray-50"
            type="button"
          >
            <ExpandMoreIcon className="h-3.5 w-3.5" />
            <span>Expand All</span>
          </button>
          <button
            onClick={() => collapsables.hideAll()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-200 px-2 py-1.5 font-medium font-sans text-gray-600 text-xs tracking-tight transition-colors hover:bg-gray-50"
            type="button"
          >
            <UnfoldLessIcon className="h-3.5 w-3.5" />
            <span>Collapse All</span>
          </button>
        </div>

        <button
          onClick={() => setHeadersPopupShown(true)}
          className="flex flex-row items-center justify-center gap-2 rounded-md border border-gray-200 px-3 py-2 font-medium font-sans text-gray-700 text-sm tracking-tight transition-colors hover:bg-gray-50"
          type="button"
        >
          <MailLockIcon className="h-4 w-4" />
          <span>Headers</span>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="scrollbar-hide flex-1 space-y-1 overflow-y-auto px-4 py-6">
        <SideNavItem node={rootRouter} path={[]} />
      </div>
    </div>
  );
}

function SideNavItem({
  node,
  path,
}: {
  node: ParsedRouter | ParsedProcedure;
  path: string[];
}) {
  const { markForScrollTo } = useSiteNavigationContext();
  const shown = useCollapsableIsShowing(path) || path.length === 0;

  const onClick = useCallback(function onClick() {
    collapsables.toggle(path);
    markForScrollTo(path);
  }, []);

  const currentItemName = path[path.length - 1] || "";

  // Count procedures for routers
  const procedureCount = node.nodeType === "router" ? countProcedures(node) : 0;

  return (
    <>
      {path.length > 0 && (
        <button
          type="button"
          className={`group flex w-full flex-row items-center rounded-md px-3 py-2 font-medium font-sans text-sm tracking-tight transition-all duration-150 hover:bg-gray-50 active:scale-[0.995] ${
            shown ? "text-gray-900" : "text-gray-600"
          }`}
          onClick={onClick}
        >
          <span className="flex flex-row items-center gap-2">
            <ItemTypeIcon colorScheme={colorSchemeForNode(node)} />
            <span className="truncate font-medium">{currentItemName}</span>
            {node.nodeType === "router" && procedureCount > 0 && (
              <span className="ml-1 rounded-full bg-gray-100 px-2 py-0.5 font-mono font-semibold text-gray-600 text-xs tabular-nums">
                {procedureCount}
              </span>
            )}
          </span>
        </button>
      )}
      {shown && node.nodeType === "router" && (
        <div className="slide-in flex flex-col items-start space-y-0.5 self-stretch pl-4">
          {Object.entries(node.children).map(([key, node]) => {
            return (
              <SideNavItem
                path={
                  node.nodeType === "procedure"
                    ? node.pathFromRootRouter
                    : node.path
                }
                node={node}
                key={key}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
