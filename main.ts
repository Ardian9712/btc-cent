import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const H = 240;
const minPrice = 0.00001;
const maxPrice = 9_999_999.99999;

type InputCase = { markets: { id: string; prices: number[] }[] };

mkdirSync(outputDir, { recursive: true });
for (const file of readdirSync(inputDir).filter((name) => name.endsWith('.in')).sort()) {
  const id = file.slice(0, -3);
  const input = JSON.parse(readFileSync(join(inputDir, file), 'utf8')) as InputCase;
  if (!Array.isArray(input.markets) || input.markets.length !== 1) throw new Error(`invalid markets in ${file}`);
  const prices = input.markets[0].prices;
  if (!Array.isArray(prices) || prices.length === 0 || !Number.isFinite(prices.at(-1))) throw new Error(`invalid prices in ${file}`);
  // The evaluation did not validate a nonzero conditional median correction out of sample.
  const guess = Math.max(minPrice, Math.min(maxPrice, prices.at(-1)!));
  const price = Math.round(guess * 100_000) / 100_000;
  writeFileSync(join(outputDir, `${id}.out`), `${JSON.stringify({ forecasts: [{ case: id, price }] })}\n`);
}
