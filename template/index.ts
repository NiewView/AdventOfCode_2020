export function calculate(mass: number) {
  const result = Math.floor(mass / 3) - 2;
  return Math.max(result, 0);
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/1/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return calculate(numberInputArray[0]);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/1/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return calculate(numberInputArray[0]);
}
