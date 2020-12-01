export function calculate(prices: Array<number>) {
  for (let i = 0; i < prices.length; i++) {
    const price1 = prices[i];
    for (let j = 0; j < prices.length; j++) {
      const price2 = prices[j];
      const sum = price1 + price2;
      if (sum === 2020) {
        return price1 * price2;
      }
    }
  }
}

export function calculateWithThree(prices: Array<number>) {
  // pretty ugly...
  for (let i = 0; i < prices.length; i++) {
    const price1 = prices[i];
    for (let j = 0; j < prices.length; j++) {
      const price2 = prices[j];
      for (let j = 0; j < prices.length; j++) {
        const price3 = prices[j];
        const sum = price1 + price2 + price3;
        if (sum === 2020) {
          return price1 * price2 * price3;
        }
      }
    }
  }
}

export async function challenge1() {
  const input: string = Deno.readTextFileSync("./2020/1/input.txt");
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return calculate(numberInputArray);
}

export async function challenge2() {
  const input: string = Deno.readTextFileSync("./2020/1/input.txt");
  const stringInputArray: Array<string> = input.split("\n");
  const numberInputArray: Array<number> = input
    .split("\n")
    .map((item) => Number(item));

  return calculateWithThree(numberInputArray);
}
