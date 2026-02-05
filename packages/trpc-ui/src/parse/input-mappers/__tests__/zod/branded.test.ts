import { type ZodType, z } from "zod";
import type { ParsedInputNode } from "../../../parseNodeTypes";
import { defaultReferences } from "../../defaultReferences";
import { parseZodBrandedDef } from "../../zod/parsers/parseZodBrandedDef";

describe("Parsed ZodBranded", () => {
  it("should parse branded nodes as their base zod type", () => {
    const testCases: {
      node: ParsedInputNode;
      zodType: ZodType;
    }[] = [
      {
        node: {
          type: "number",
          path: [],
        },
        zodType: z.number().brand("number"),
      },
      {
        node: {
          type: "string",
          path: [],
        },
        zodType: z.string().brand("string"),
      },
    ];
    for (const testCase of testCases) {
      // In Zod 4, ZodBrandedDef is not exported
      const parsed = parseZodBrandedDef(
        testCase.zodType._zod.def as any,
        defaultReferences(),
      );
      expect(parsed).toStrictEqual(testCase.node);
    }
  });
});
