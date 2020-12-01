import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import { calculate } from "./index.ts";

Deno.test("test price calculation", () => {
  assertEquals(calculate([1721, 979, 366, 299, 675, 1456]), 514579);
});
