import { challenge1, challenge2 } from "./2020/1/index.ts";
import {
  challenge1 as challenge1Day2,
  challenge2 as challenge2Day2,
} from "./2020/2/index.ts";
import {
  challenge1 as challenge1Day3,
  challenge2 as challenge2Day3,
} from "./2020/3/index.ts";

import {
  challenge1 as challenge1Day4,
  challenge2 as challenge2Day4,
} from "./2020/4/index.ts";

import {
  challenge1 as challenge1Day5,
  challenge2 as challenge2Day5,
} from "./2020/5/index.ts";

const days: Array<number> = [5];

if (days.includes(1)) {
  console.log("2020/1", "challenge1", await challenge1());
  console.log("2020/1", "challenge2", await challenge2());
}
if (days.includes(2)) {
  console.log("2020/2", "challenge1_2", await challenge1Day2());
  console.log("2020/2", "challenge2_2", await challenge2Day2());
}
if (days.includes(3)) {
  console.log("2020/3", "challenge1_3", await challenge1Day3());
  console.log("2020/3", "challenge2_3", await challenge2Day3());
}

if (days.includes(4)) {
  console.log("2020/4", "challenge1_4", await challenge1Day4());
  console.log("2020/4", "challenge2_4", await challenge2Day4());
}

if (days.includes(5)) {
  console.log("2020/5", "challenge1_5", await challenge1Day5());
  console.log("2020/5", "challenge2_5", await challenge2Day5());
}
