import { parse } from "https://deno.land/std/flags/mod.ts";
import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.74.0/fs/mod.ts";

import jsdom from "https://dev.jspm.io/jsdom";
import "https://deno.land/x/dotenv/load.ts";

function saveReadMe(year, day, html) {
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
}

function saveIssue(year, day) {
  let text = Deno.readTextFileSync(`./${year}/${day}/ReadMe.md`);

  const title = `${year} ${text.match(/---(.*)---/)[1].replace(":", " -")}`;
  const assignees = ["NiewView"];
  const labels = ["adventofcode"];

  text = text.replace(
    /^/,
    `---
title: ${title}
assignees: ${assignees.join(", ")}
labels: ${labels.join(", ")}
---\n\n`
  );

  Deno.writeTextFileSync("./issue.md", text);
}

function copyTemplateFiles(year, day) {
  const destIndex = `./${year}/${day}/index.ts`;
  const destTest = `./${year}/${day}/index.test.ts`;

  if (!existsSync(destIndex))
    Deno.copyFileSync("./template/index.ts", destIndex);
  if (!existsSync(destTest))
    Deno.copyFileSync("./template/index.test.ts", destTest);

  console.log("Copied templates if necessary.");
}

async function fetchInput(year, day) {
  const headers = new Headers();
  if (Deno.env.get("SESSION_TOKEN") != null) {
    headers.set("Cookie", `session=${Deno.env.get("SESSION_TOKEN")}`);
  }

  const inputResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    { headers }
  );
  const input = await inputResponse.text();

  console.log(`Fetched input`);

  Deno.writeTextFileSync(`./${year}/${day}/input.txt`, input);
}

async function fetchHtmlAndSaveReadMe(year, day) {
  const headers = new Headers();
  if (Deno.env.get("SESSION_TOKEN") != null) {
    headers.set("Cookie", `session=${Deno.env.get("SESSION_TOKEN")}`);
  }

  const htmlResponse = await fetch(
    `https://adventofcode.com/${year}/day/${day}`,
    { headers }
  );
  const html = await htmlResponse.text();

  console.log(`Fetched HTML`);

  // Deno.writeTextFileSync(`./${year}/${day}/index.html`, html);
  saveReadMe(year, day, html);
}

const execute = async (args) => {
  const { year, day, partTwo, force } = args;
  const dirPath = `./${year}/${day}`;
  console.log(
    `Load challenge from day ${day} in the year ${year}${
      partTwo ? ", Part 2" : ""
    }`
  );

  if (!existsSync(dirPath) || force) {
    ensureDirSync(dirPath);
    const inputExists = existsSync(`${dirPath}/input.txt`);
    await fetchHtmlAndSaveReadMe(year, day);

    copyTemplateFiles(year, day);
    saveIssue(year, day, partTwo);

    if (!inputExists) {
      await fetchInput(year, day);
    }
    return;
  }

  if (partTwo) {
    ensureDirSync(dirPath);
    const partTwoExists =
      existsSync(`${dirPath}/ReadMe.md`) &&
      Deno.readTextFileSync(`./${year}/${day}/ReadMe.md`).includes("Part Two");
    const inputExists = existsSync(`${dirPath}/input.txt`);

    if (partTwoExists) {
      console.log("Part Two is already loaded for this day.");
      return;
    }

    await fetchHtmlAndSaveReadMe(year, day);
    if (!inputExists) {
      await fetchInput(year, day);
    }
    return;
  }
};

await execute(parse(Deno.args));
