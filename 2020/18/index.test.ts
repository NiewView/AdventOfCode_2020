import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import { calculate } from "./index.ts";

Deno.test("test fuel calculation for single item", () => {
  assertEquals(calculate(12), 2);
  assertEquals(calculate(14), 2);
  assertEquals(calculate(1969), 654);
  assertEquals(calculate(100756), 33583);
});
