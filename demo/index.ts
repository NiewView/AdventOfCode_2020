import { readJson, readJsonSync } from "https://deno.land/x/jsonfile/mod.ts";

function calculateFuelForItem(mass: number) {
  return Math.floor(mass / 3) - 2;
}

function calculationFuelForMultipleItems(masses: Array<number>) {
  return masses
    .map((mass) => calculateFuelForItem(mass))
    .reduce((currentSum, currentValue) => currentSum + currentValue);
}

const input: Array<number> = (await readJson("./demo/input.json")) as Array<
  number
>;
console.log(calculationFuelForMultipleItems(input));
