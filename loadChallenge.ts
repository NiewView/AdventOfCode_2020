import { parse } from "https://deno.land/std/flags/mod.ts";
import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.74.0/fs/mod.ts";

const { year, day } = parse(Deno.args);
const dirPath = `./${year}/${day}`;
console.log(`Load challenge from day ${day} in the year ${year}`);

if (!existsSync(dirPath)) {
  ensureDirSync(dirPath);

  const response = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`
  );
  const input = await response.text();

  Deno.writeTextFileSync(`./${year}/${day}/input.txt`, input);
} else {
  console.log("But there is already data present for this day.");
}
