import MailLockIcon from "@mui/icons-material/MailLockOutlined";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import type { ParsedRouter } from "@src/parse/parseRouter";
import { HeadersPopup } from "@src/react-app/components/HeadersPopup";
import { useHeadersContext } from "@src/react-app/components/contexts/HeadersContext";
import { collapsables } from "@src/react-app/components/contexts/SiteNavigationContext";
import React from "react";

export function TopBar({ rootRouter }: { rootRouter: ParsedRouter }) {
  const { setHeadersPopupShown, headersPopupShown } = useHeadersContext();

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-center py-3">
      <div className="flex h-16 w-full max-w-6xl items-center justify-between rounded-2xl border border-gray-200/50 bg-white/50 px-6 shadow-sm backdrop-blur-lg transition-all">
        {/* Left: Logo/Brand */}
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900 text-xl tracking-tight">
            tRPC UI
          </span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => collapsables.hideAll()}
            className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs transition-all hover:border-gray-400 hover:bg-gray-50"
            type="button"
            title="Collapse All"
          >
            <UnfoldLessIcon className="h-3.5 w-3.5" />
            <span>Collapse All</span>
          </button>
          <div className="relative">
            <button
              onClick={() => setHeadersPopupShown(!headersPopupShown)}
              className={`flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 font-medium text-gray-700 text-xs transition-all hover:border-gray-400 hover:bg-gray-50 ${
                headersPopupShown ? "border-gray-400 bg-gray-50" : ""
              }`}
              type="button"
            >
              <MailLockIcon className="h-3.5 w-3.5" />
              <span>Headers</span>
            </button>
            <HeadersPopup />
          </div>
        </div>
      </div>
    </div>
  );
}
