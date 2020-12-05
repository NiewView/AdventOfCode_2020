import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import {
  calculate,
  calculateSeatId,
  parseBinaryInputToNumber,
  splitAndConvertToBinary,
} from "./index.ts";

Deno.test("test row unifing", () => {
  assertEquals(splitAndConvertToBinary("FBFBBFFRLL").row, "0101100");
  assertEquals(splitAndConvertToBinary("FBBBBFFRLL").row, "0111100");
  assertEquals(splitAndConvertToBinary("FBFBFFFRLL").row, "0101000");
});

Deno.test("test column unifing", () => {
  assertEquals(splitAndConvertToBinary("FBFBFFRLL").column, "100");
  assertEquals(splitAndConvertToBinary("FBBBFFLRR").column, "011");
  assertEquals(splitAndConvertToBinary("FBFFFFLRL").column, "010");
});

Deno.test("parse binary string", () => {
  assertEquals(parseBinaryInputToNumber("0101100"), 44);
  assertEquals(parseBinaryInputToNumber("0101101"), 45);
  assertEquals(parseBinaryInputToNumber("1101101"), 109);
});

Deno.test("calculate seat id", () => {
  assertEquals(calculateSeatId("BFFFBBFRRR"), 567);
  assertEquals(calculateSeatId("FFFBBBFRRR"), 119);
  assertEquals(calculateSeatId("BBFFBBFRLL"), 820);
});
