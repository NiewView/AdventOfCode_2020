import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import { countTreeCrashs, isTree } from "./index.ts";

const treeStringPattern = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];
const treePattern = treeStringPattern.map((line) =>
  line.split("").map((symbol) => symbol === "#")
);

Deno.test("is there a tree at the current position", () => {
  assertEquals(isTree(treePattern, [0, 0]), false);
  assertEquals(isTree(treePattern, [1, 0]), false);
  assertEquals(isTree(treePattern, [0, 1]), true);
  assertEquals(isTree(treePattern, [4, 5]), true);
  assertEquals(isTree(treePattern, [6, 3]), false);
  assertEquals(isTree(treePattern, [0, 100]), false);
  assertEquals(isTree(treePattern, [12, 0]), false);
  assertEquals(isTree(treePattern, [14, 0]), true);
  assertEquals(isTree(treePattern, [15, 9]), true);
  assertEquals(isTree(treePattern, [14, 9]), false);
});

Deno.test("test tree crash count", () => {
  assertEquals(countTreeCrashs(treeStringPattern, [0, 0], [3, 1]), 7);
});
