import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import { isPasswordValid, isPasswordValidWithNewPolicy } from "./index.ts";

Deno.test("validate example passwords", () => {
  assertEquals(isPasswordValid("1-3 a: abcde"), true);
  assertEquals(isPasswordValid("1-3 b: cdefg"), false);
  assertEquals(isPasswordValid("2-9 c: ccccccccc"), true);
});

Deno.test("validate example passwords with new policy", () => {
  assertEquals(isPasswordValidWithNewPolicy("1-3 a: abcde"), true);
  assertEquals(isPasswordValidWithNewPolicy("1-3 b: cdefg"), false);
  assertEquals(isPasswordValidWithNewPolicy("2-9 c: ccccccccc"), false);
});
