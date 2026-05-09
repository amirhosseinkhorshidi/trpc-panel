import ReactJson from "@microlink/react-json-view";
import prettyBytes from "pretty-bytes";
import prettyMs from "pretty-ms";
import React from "react";
import { FormSection } from "./FormSection";

export function Response({
  children,
  size,
  time,
}: {
  children: string | object;
  size?: number;
  time?: number;
}) {
  const title = size
    ? time
      ? `Response (${prettyBytes(size)}, ${prettyMs(time)})`
      : `Response (${prettyBytes(size)})`
    : time
      ? `Response (${prettyMs(time)})`
      : "Response";

  return (
    <FormSection title={title}>
      <ReactJson src={typeof children === "string" ? { value: children } : children as object} theme="rjv-default" displayDataTypes={false} />
    </FormSection>
  );
}
