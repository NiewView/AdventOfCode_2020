export function isPasswordValid(input: string): boolean {
  const parsedInput = parseInput(input);
  const count = parsedInput.password
    .split("")
    .filter((char) => char === parsedInput.letter).length;
  // const result = Math.floor(mass / 3) - 2;
  return count <= parsedInput.max && count >= parsedInput.min;
}

interface ParsedInput {
  password: string;
  letter: string;
  min: number;
  max: number;
}

function parseInput(input: string): ParsedInput {
  // 3-5 v: qvjjdhvl
  const regexPwd = /: (.*)/;
  const regexLetter = /(.):/;
  const regexMin = /^(\d*)-\d*/;
  const regexMax = /^\d*-(\d*)/;
  return {
    password: input.match(regexPwd)![1],
    letter: input.match(regexLetter)![1],
    min: Number(input.match(regexMin)![1]),
    max: Number(input.match(regexMax)![1]),
  };
}

export function countValidPasswords(inputs: Array<string>) {
  let validCount = 0;
  inputs.forEach((input) => {
    if (isPasswordValid(input)) {
      validCount += 1;
    }
  });
  return validCount;
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/2/input.txt");
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return countValidPasswords(stringInputArray);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/2/input.txt");
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  // return calculate(numberInputArray[0]);
}
