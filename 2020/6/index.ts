export function calculate(mass: number) {
  const result = Math.floor(mass / 3) - 2;
  return Math.max(result, 0);
}

export function sumAnyAnswerCountForGroups(input: Array<string>): number {
  const count = splitInputIntoGroups(input).reduce((accumulator, current) => {
    return accumulator + getUniqueAnswers(current).length;
  }, 0);
  return count;
}

export function sumEverybodiesAnswerCountForGroups(
  input: Array<string>
): number {
  const count = splitInputIntoGroups(input).reduce((accumulator, current) => {
    return accumulator + getAnswersPresentInAllInputs(current).length;
  }, 0);
  return count;
}

export function getUniqueAnswers(input: Array<string>) {
  return [...new Set(input.join(""))];
}

export function getAnswersPresentInAllInputs(input: Array<string>) {
  const uniqueAnswers = [...new Set(input.join(""))];
  const answersPresentInAllInputs: Array<string> = [];
  uniqueAnswers.forEach((item) => {
    if (input.every((arr) => arr.includes(item))) {
      answersPresentInAllInputs.push(item);
    }
  });
  return answersPresentInAllInputs;
}

export function splitInputIntoGroups(input: Array<string>) {
  const inputCopy = [...input];
  const groups: Array<Array<string>> = [[]];
  let currentGroupIndex = 0;

  while (inputCopy.length > 0) {
    const personAnswers: string = inputCopy.shift()!;
    if (personAnswers === "") {
      groups.push([]);
      currentGroupIndex += 1;
    } else {
      groups[currentGroupIndex].push(personAnswers);
    }
  }

  return groups;
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/6/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return sumAnyAnswerCountForGroups(stringInputArray);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/6/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return sumEverybodiesAnswerCountForGroups(stringInputArray);
}
