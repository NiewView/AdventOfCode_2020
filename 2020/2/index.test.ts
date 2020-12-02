import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import { isPasswordValid } from "./index.ts";

Deno.test("validate example passwords", () => {
  assertEquals(isPasswordValid("1-3 a: abcde"), true);
  assertEquals(isPasswordValid("1-3 b: cdefg"), false);
  assertEquals(isPasswordValid("2-9 c: cccccccc"), true);
});
