export interface Passport {
  byr: string | null;
  iyr: string | null;
  eyr: string | null;
  hgt: string | null;
  hcl: string | null;
  ecl: string | null;
  pid: string | null;
  cid: string | null;
}

export function countValidPassports(
  input: string,
  ignoreProps: Array<string>
): number {
  let count = 0;
  const passwordStrings = splitPassports(input);
  for (const passwordString of passwordStrings) {
    const password = parsePassport(passwordString);
    const isValid = isPassportValid(password, ignoreProps);
    if (isValid) {
      count += 1;
    }
  }
  return count;
}

export const passportTemplate: Passport = {
  byr: "",
  iyr: "",
  eyr: "",
  hgt: "",
  hcl: "",
  ecl: "",
  pid: "",
  cid: "",
};

export function isPassportValid(
  passport: Passport,
  ignoreProps: Array<string>
): boolean {
  const necessaryProps = Object.keys(passportTemplate).filter(
    (item) => !ignoreProps.includes(item)
  );

  for (const necessaryProp of necessaryProps) {
    if (passport[necessaryProp as keyof Passport] === null) {
      return false;
    }
  }
  return true;
}

export function splitPassports(input: string): Array<string> {
  return input.split(/\n\n/g);
}

export function parsePassport(input: string): Passport {
  const passport: Passport = { ...passportTemplate };
  input = " " + input.replace(/\n/g, " ").replace(/\s+/g, " ") + " ";
  const template = " template:([^ ]+) ";

  for (const key in passport) {
    const propKey = key as keyof Passport;
    const reg = new RegExp(template.replace("template", propKey));
    const matches = input.match(reg);
    passport[propKey] = matches && matches.length > 1 ? matches![1] : null;
  }
  return passport;
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/4/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return countValidPassports(input, ["cid"]);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/4/input.txt").replace(
    /\r/g,
    ""
  );
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  // return isPassportValid(numberInputArray[0]);
}
