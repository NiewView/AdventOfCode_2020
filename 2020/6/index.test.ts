import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import {
  calculate,
  getUniqueAnswers,
  splitInputIntoGroups,
  sumAnyAnswerCountForGroups,
  sumEverybodiesAnswerCountForGroups,
} from "./index.ts";

const inputArray = [
  "abc",
  "",
  "a",
  "b",
  "c",
  "",
  "ab",
  "ac",
  "",
  "a",
  "a",
  "a",
  "a",
  "",
  "b",
];

Deno.test("test group splitting", () => {
  assertEquals(splitInputIntoGroups(inputArray).length, 5);
  assertEquals(splitInputIntoGroups(inputArray)[0].length, 1);
  assertEquals(splitInputIntoGroups(inputArray)[1].length, 3);
});

Deno.test("test unique answer extraction", () => {
  assertEquals(getUniqueAnswers(["a", "a", "ab"]).length, 2);
  assertEquals(getUniqueAnswers(["ac", "a", "ab"]).length, 3);
  assertEquals(getUniqueAnswers(["abzi", "a", "ab"]).length, 4);
});

Deno.test("test any answer sum", () => {
  assertEquals(sumAnyAnswerCountForGroups(inputArray), 11);
});

Deno.test("test everybodies answer sum", () => {
  assertEquals(sumEverybodiesAnswerCountForGroups(inputArray), 6);
});
