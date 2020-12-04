import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";

import {
  isPassportValid,
  parsePassport,
  passportTemplate,
  splitPassports,
} from "./index.ts";

const passportsString = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const passportString = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 hgt:183cm`;

Deno.test("test parse passport", () => {
  assertEquals(parsePassport(passportString).pid, "860033327");
  assertEquals(parsePassport(passportString).ecl, "gry");
  assertEquals(parsePassport(passportString).byr, "1937");
  assertEquals(parsePassport(passportString).hgt, "183cm");
});

Deno.test("test passport splitting", () => {
  assertEquals(splitPassports(passportsString).length, 4);
});

Deno.test("test passport validation", () => {
  assertEquals(isPassportValid(parsePassport(passportString), ["cid"]), true);
  assertEquals(isPassportValid(parsePassport(passportString), []), false);
});
