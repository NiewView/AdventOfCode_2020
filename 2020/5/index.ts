export function calculate(mass: number) {
  const result = Math.floor(mass / 3) - 2;
  return Math.max(result, 0);
}

export function calculateSeatId(input: string) {
  const { row, column } = splitAndConvertToBinary(input);
  const seatId =
    parseBinaryInputToNumber(row) * 8 + parseBinaryInputToNumber(column);
  return seatId;
}

export function parseBinaryInputToNumber(binaryString: string) {
  return parseInt(binaryString, 2);
}

export function splitAndConvertToBinary(input: string) {
  const row = input
    .match(/([FB]+)/)![1]
    .replace(/B/g, "1")
    .replace(/F/g, "0");
  const column = input
    .match(/([RL]+)/)![1]
    .replace(/R/g, "1")
    .replace(/L/g, "0");

  return { row, column };
}

export function getHighestSeatId(input: Array<string>) {
  const seatIds = input.map((input) => calculateSeatId(input));
  return Math.max(...seatIds);
}

export function getYourSeatId(input: Array<string>) {
  const seatIds = input
    .map((input) => calculateSeatId(input))
    .sort(function (a, b) {
      return a - b;
    });
  for (let i = 0; i < seatIds.length; i++) {
    const seatId = seatIds[i];
    // if (seatId + 1 === seatIds[i + 1]) {
    //   console.log("1 Unterschied", seatId);
    // }
    // if (seatId + 2 === seatIds[i + 1]) {
    //   console.log("2 Unterschied", seatId);
    // }

    if (seatIds.includes(seatId + 16) && !seatIds.includes(seatId + 8)) {
      return seatId + 8;
    }
  }
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/5/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return getHighestSeatId(stringInputArray);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/5/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return getYourSeatId(stringInputArray);
}
