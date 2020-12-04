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
  ignoreProps: Array<string>,
  validateFields = false
): number {
  let count = 0;
  const passwordStrings = splitPassports(input);
  for (const passwordString of passwordStrings) {
    const password = parsePassport(passwordString);
    const isValid = isPassportValid(password, ignoreProps, validateFields);
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
  ignoreProps: Array<string>,
  validateFields = false
): boolean {
  const necessaryProps = Object.keys(passportTemplate).filter(
    (item) => !ignoreProps.includes(item)
  );

  for (const necessaryProp of necessaryProps) {
    const value = passport[necessaryProp as keyof Passport];
    if (value === null) {
      return false;
    }
    if (validateFields && !isPassportFieldValueValid(necessaryProp, value)) {
      return false;
    }
  }
  return true;
}

export function isPassportFieldValueValid(field: string, value: string) {
  /* eslint-disable no-case-declarations */
  try {
    switch (field) {
      case "byr":
        const byr = Number(value);
        return byr >= 1920 && byr <= 2002;
      case "iyr":
        const iyr = Number(value);
        return iyr >= 2010 && iyr <= 2020;
      case "eyr":
        const eyr = Number(value);
        return eyr >= 2020 && eyr <= 2030;
      case "hgt":
        const hgt_number = Number(value.match(/^(\d+)[a-zA-Z]+$/)![1]);
        const hgt_unit = value.match(/^\d+([a-zA-Z]+)$/)![1];
        if (hgt_unit === "cm") {
          return !isNaN(hgt_number) && hgt_number >= 150 && hgt_number <= 193;
        }
        if (hgt_unit === "in") {
          return !isNaN(hgt_number) && hgt_number >= 49 && hgt_number <= 76;
        }
        return false;
      case "hcl":
        return /^#[a-f0-9]{6}$/.test(value);
      case "ecl":
        const ecl_values = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
        return ecl_values.includes(value);
      case "pid":
        return /^\d{9}$/.test(value);
      case "cid":
        return true;
      default:
        return false;
      /* eslint-enable no-case-declarations */
    }
  } catch (error) {
    return false;
  }
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

  return countValidPassports(input, ["cid"], true);
}
