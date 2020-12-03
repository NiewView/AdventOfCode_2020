export function countTreeCrashs(
  treeStringPattern: Array<string>,
  start: [number, number],
  step: [number, number]
) {
  const treePattern = treeStringPattern.map((line) =>
    line.split("").map((symbol) => symbol === "#")
  );
  let count = 0;
  const currentPosition = start;
  while (currentPosition[1] < treePattern.length) {
    if (isTree(treePattern, currentPosition)) {
      count += 1;
    }
    currentPosition[0] += step[0];
    currentPosition[1] += step[1];
  }
  return count;
}

export function isTree(
  treePattern: Array<Array<boolean>>,
  coordinates: [number, number]
): boolean {
  const [x, y] = coordinates;
  if (y > treePattern.length) return false;
  const row = treePattern[y];
  const isTreeAtPosition = row[x % row.length];
  return isTreeAtPosition;
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/3/input.txt");
  const stringInputArray: Array<string> = input.replace(/\r/g, "").split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return countTreeCrashs(stringInputArray, [0, 0], [3, 1]);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/3/input.txt");
  const stringInputArray: Array<string> = input.replace(/\r/g, "").split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return countTreeCrashs(stringInputArray, [0, 0], [3, 1]);
}
