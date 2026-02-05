import { nodePropertiesFromRef } from "@src/parse/utils";
import type {
  LiteralNode,
  ParseFunction,
  UnionNode,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodUnionDef: ParseFunction<any, UnionNode> = (def, refs) => {
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "union",
    values: def.options.map(
      (o: any) =>
        zodSelectorFunction(o._zod.def, { ...refs, path: [] }) as LiteralNode,
    ),
    ...nodePropertiesFromRef(refs),
  };
};
