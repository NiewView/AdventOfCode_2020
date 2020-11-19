import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import {
  calculateFuelForItem,
  calculateFuelForMultipleItems,
  calculateFuelForMultipleItemsRecursively,
} from "./index.ts";

Deno.test("test fuel calculation for single item", () => {
  assertEquals(calculateFuelForItem(12), 2);
  assertEquals(calculateFuelForItem(14), 2);
  assertEquals(calculateFuelForItem(1969), 654);
  assertEquals(calculateFuelForItem(100756), 33583);
});

Deno.test("test fuel calculation for multiple items", () => {
  assertEquals(calculateFuelForMultipleItems([12]), 2);
  assertEquals(calculateFuelForMultipleItems([12, 14]), 4);
  assertEquals(calculateFuelForMultipleItems([12, 1969]), 656);
  assertEquals(calculateFuelForMultipleItems([100756, 14]), 33585);
});

Deno.test("test fuel calculation for multiple items recursivly", () => {
  assertEquals(calculateFuelForMultipleItemsRecursively([14]), 2);
  assertEquals(calculateFuelForMultipleItemsRecursively([1969]), 966);
  assertEquals(calculateFuelForMultipleItemsRecursively([100756]), 50346);
});
