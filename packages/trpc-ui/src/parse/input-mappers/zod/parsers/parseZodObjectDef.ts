import { nodePropertiesFromRef } from "@src/parse/utils";
import type {
  ObjectNode,
  ParseFunction,
  ParsedInputNode,
  UnsupportedNode,
} from "../../../parseNodeTypes";
import { zodSelectorFunction } from "../selector";

export const parseZodObjectDef: ParseFunction<
  any,
  ObjectNode | UnsupportedNode
> = (def, refs) => {
  // In Zod 4, shape is a property, not a method
  const shape = typeof def.shape === "function" ? def.shape() : def.shape;
  const children: { [propertyName: string]: ParsedInputNode } = {};
  for (const propertyName of Object.keys(shape)) {
    const node = zodSelectorFunction(shape[propertyName]?._zod.def, {
      ...refs,
      path: refs.path.concat([propertyName]),
    });
    children[propertyName] = node;
  }
  refs.addDataFunctions.addDescriptionIfExists(def, refs);
  return {
    type: "object",
    children,
    ...nodePropertiesFromRef(refs),
  };
};
