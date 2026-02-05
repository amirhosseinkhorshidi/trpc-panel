import XIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Lock";
import { AddItemButton } from "@src/react-app/components/AddItemButton";
import { Button } from "@src/react-app/components/Button";
import { useHeadersContext } from "@src/react-app/components/contexts/HeadersContext";
import { FieldError } from "@src/react-app/components/form/fields/FieldError";
import { BaseTextField } from "@src/react-app/components/form/fields/base/BaseTextField";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export function HeadersPopup() {
  const {
    headersPopupShown,
    setHeadersPopupShown,
    getHeaders,
    setHeaders: setContextHeaders,
    saveHeadersToLocalStorage,
    setSaveHeadersToLocalStorage,
  } = useHeadersContext();
  const [headers, setHeaders] = useState<[string, string][]>([]);
  const [errors, setErrors] = useState<boolean[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function addHeader() {
    setHeaders((old) => [...old, ["", ""]]);
  }

  function clearErrorIfNecessary(index: number) {
    if (!errors[index]) return;
    const newErrors = [...errors];
    newErrors[index] = false;
    setErrors(newErrors);
  }

  function update(index: number, value: string, type: "key" | "value") {
    const newHeaders = [...headers];
    const newValue = newHeaders[index]!;
    newValue[type === "key" ? 0 : 1] = value;
    newHeaders[index] = newValue;
    setHeaders(newHeaders);
    clearErrorIfNecessary(index);
  }

  function deleteHeader(index: number) {
    const newHeaders = [...headers];
    const newErrors = [...errors];
    newHeaders.splice(index, 1);
    newErrors.splice(index, 1);
    setHeaders(newHeaders);
    setErrors(newErrors);
  }

  function onExitPress() {
    setHeadersPopupShown(false);
  }

  function onConfirmClick() {
    const newErrors: boolean[] = [...errors];
    let i = 0;
    for (const [headerKey, headerValue] of headers) {
      if (!headerKey || !headerValue) {
        newErrors[i] = true;
      }
      i++;
    }
    if (newErrors.some((e) => e)) {
      setErrors(newErrors);
      return;
    }
    setContextHeaders(Object.fromEntries(headers));
    setHeadersPopupShown(false);
    toast.success("Headers updated.", {
      duration: 2000,
      position: "bottom-center",
    });
  }

  useEffect(() => {
    if (headersPopupShown) {
      setHeaders(Object.entries(getHeaders()));
    }
  }, [headersPopupShown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        headersPopupShown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setHeadersPopupShown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [headersPopupShown, setHeadersPopupShown]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-full right-0 z-50 mt-6 w-[500px] transition-opacity duration-200 ${
        headersPopupShown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirmClick();
        }}
        className="flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
      >
        <div className="flex flex-row items-center justify-between border-gray-200 border-b bg-gray-50 px-4 py-3">
          <h2 className="font-semibold text-gray-900 text-sm">Headers</h2>
          <button
            type="button"
            onClick={onExitPress}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-col space-y-2 bg-white px-4 py-3">
          {headers.map(([headerKey, headerValue], i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: their order doesn't change
            <div className="flex flex-col" key={i}>
              <div className="flex flex-row items-start">
                <BaseTextField
                  className="flex-1"
                  label="Key"
                  value={headerKey}
                  onChange={(value) => update(i, value, "key")}
                />
                <span className="h-1 w-2" />
                <BaseTextField
                  label="Value"
                  className="flex-1"
                  value={headerValue}
                  onChange={(value) => update(i, value, "value")}
                />
                <button
                  type="button"
                  className="ml-2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  onClick={() => deleteHeader(i)}
                >
                  <XIcon className="mt-[0.45rem] h-4 w-4" />
                </button>
              </div>
              {errors[i] && (
                <FieldError errorMessage="Headers require a key and a value." />
              )}
            </div>
          ))}
          <AddItemButton onClick={addHeader} />
        </div>
        <div className="flex flex-row items-center justify-between border-gray-200 border-t bg-gray-50 px-4 py-3">
          <label className="flex flex-row items-center gap-2 text-gray-600 text-xs">
            <input
              type="checkbox"
              className="h-3.5 w-3.5 rounded border-gray-300"
              checked={saveHeadersToLocalStorage}
              onChange={(e) => setSaveHeadersToLocalStorage(e.target.checked)}
            />
            <span>Save Headers</span>
          </label>
          <Button variant="query" type="submit">
            Confirm <SaveIcon className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
