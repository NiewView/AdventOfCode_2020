import { readJson, readJsonSync } from "https://deno.land/x/jsonfile/mod.ts";

export function calculateFuelForItem(mass: number) {
  const result = Math.floor(mass / 3) - 2;
  return Math.max(result, 0);
}

export function calculateFuelForMultipleItems(masses: Array<number>) {
  const result = masses
    .map((mass) => calculateFuelForItem(mass))
    .reduce((currentSum, currentValue) => currentSum + currentValue);

  return result;
}

export function calculateFuelForItemRecursively(mass: number) {
  let result = 0;
  let additionFuel = calculateFuelForItem(mass);

  while (additionFuel > 0) {
    result += additionFuel;
    additionFuel = calculateFuelForItem(additionFuel);
  }

  return Math.max(result, 0);
}

export function calculateFuelForMultipleItemsRecursively(
  masses: Array<number>
) {
  const result = masses
    .map((mass) => calculateFuelForItemRecursively(mass))
    .reduce((currentSum, currentValue) => currentSum + currentValue);
  return result;
}

export async function challenge1() {
  const input: Array<number> = (await readJson("./demo/input.json")) as Array<
    number
  >;
  return calculateFuelForMultipleItems(input);
}

export async function challenge2() {
  const input: Array<number> = (await readJson("./demo/input.json")) as Array<
    number
  >;
  return calculateFuelForMultipleItemsRecursively(input);
}
