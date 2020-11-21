import { parse } from "https://deno.land/std/flags/mod.ts";
import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.74.0/fs/mod.ts";

import jsdom from "https://dev.jspm.io/jsdom";
import TurndownService from "https://jspm.dev/turndown@7.0.0";

const saveReadMe = (html) => {
  const dom = new jsdom.JSDOM(html);
  const window = dom.window;
  const document = window.document;

  document.querySelectorAll("main script").forEach((x) => {
    x.parentNode.removeChild(x);
  });

  let text = document.querySelector("main").textContent;

  text = text.replace(/You can also \[[^\]\[]*\] this puzzle./g, "");
  text = text.replace(/\n([^\n])/g, "\n\n$1");
  text = text.replace(
    /(---.*---)/g,
    "\n\n\n$1\n================================================\n\n"
  );
  text = text.replace(/^\n*/g, "");

  Deno.writeTextFileSync(`./${year}/${day}/ReadMe.md`, text);
};

const fetchInput = async (year, day) => {
  const inputResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`
  );
  const input = await inputResponse.text();

  console.log(`Fetched input`);

  Deno.writeTextFileSync(`./${year}/${day}/input.txt`, input);
};

const fetchHtml = async (year, day) => {
  const htmlResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}`,
    {
      method: "GET",
      headers: {
        cookie:
          "session=53616c7465645f5f469828ff513d0c00707f01fa3c1d31251bbffed830198fb7584e5c982c31e2f991009af04f1b7fe9",
      },
    }
  );
  const html = await htmlResponse.text();

  console.log(`Fetched HTML`);

  Deno.writeTextFileSync(`./${year}/${day}/index.html`, html);
  saveReadMe(html);
};

const { year, day, partTwo } = parse(Deno.args);
const dirPath = `./${year}/${day}`;
console.log(
  `Load challenge from day ${day} in the year ${year}${
    partTwo ? ", Part 2" : ""
  }`
);

if (!existsSync(dirPath) || partTwo) {
  ensureDirSync(dirPath);

  const partTwoExists =
    existsSync(`${dirPath}/ReadMe.md`) &&
    Deno.readTextFileSync(`./${year}/${day}/ReadMe.md`).includes("Part Two");

  if (!partTwo) {
    fetchHtml(year, day);
    fetchInput(year, day);
  } else {
    if (!partTwoExists) {
      fetchHtml(year, day);
    } else {
      console.log("Part Two is already loaded for this day.");
    }
  }
} else {
  console.log("But there is already data present for this day.");
  const html = Deno.readTextFileSync(`./${year}/${day}/index.html`);
  saveReadMe(html);
}
