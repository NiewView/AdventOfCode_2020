import { parse } from "https://deno.land/std/flags/mod.ts";
import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.74.0/fs/mod.ts";

import jsdom from "https://dev.jspm.io/jsdom@16.2.5";
//@deno-types="https://unpkg.com/@types/showdown@1.9.3/index.d.ts"
import showdown from "https://unpkg.com/showdown@1.9.3";

const { year, day } = parse(Deno.args);
const dirPath = `./${year}/${day}`;
console.log(`Load challenge from day ${day} in the year ${year}`);

if (!existsSync(dirPath)) {
  ensureDirSync(dirPath);

  const inputResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`
  );
  const input = await inputResponse.text();

  Deno.writeTextFileSync(`./${year}/${day}/input.txt`, input);

  const htmlResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}`
  );

  const dom = new jsdom.JSDOM(htmlResponse);
  const window = dom.window;
  const document = window.document;

  document.querySelectorAll("main script").forEach(
    // deno-lint-ignore no-explicit-any
    (x: any) => {
      x.parentNode.removeChild(x);
    }
  );

  showdown();
  console.log(document.querySelector("main").textContent); // "Hello world"
} else {
  console.log("But there is already data present for this day.");
}
