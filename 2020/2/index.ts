export function isPasswordValid(input: string): boolean {
  const parsedInput = parseInput(input);
  const count = parsedInput.password
    .split("")
    .filter((char) => char === parsedInput.letter).length;

  return count <= parsedInput.secondNumber && count >= parsedInput.firstNumber;
}

interface ParsedInput {
  password: string;
  letter: string;
  firstNumber: number;
  secondNumber: number;
}

export function isPasswordValidWithNewPolicy(input: string): boolean {
  const parsedInput = parseInput(input);
  let validChars: number = 0;
  validChars +=
    parsedInput.password[parsedInput.firstNumber - 1] === parsedInput.letter
      ? 1
      : 0;
  validChars +=
    parsedInput.password[parsedInput.secondNumber - 1] === parsedInput.letter
      ? 1
      : 0;

  return validChars === 1;
}

interface ParsedInput {
  password: string;
  letter: string;
  firstNumber: number;
  secondNumber: number;
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
    firstNumber: Number(input.match(regexMin)![1]),
    secondNumber: Number(input.match(regexMax)![1]),
  };
}

export function countValidPasswords(
  inputs: Array<string>,
  policy: (input: string) => boolean
) {
  let validCount = 0;
  inputs.forEach((input) => {
    if (policy(input)) {
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

  return countValidPasswords(stringInputArray, isPasswordValid);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/2/input.txt");
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return countValidPasswords(stringInputArray, isPasswordValidWithNewPolicy);
}
