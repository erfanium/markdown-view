import { h1, h2, tableHead, tableRow } from "../mod.ts";

type F = (x: number, y: number) => number

interface Problem {
  f: F;
  x0: number;
  y0: number;
  x: number;
}

function simple(f: F, x0: number, y0: number, h: number, xFinal: number) {
  let i = 0;
  let y = y0;
  let x = x0;
  let yNext: number;
  tableHead("n", "x(n)", "y(n)", "f(x(n), y(n))", "y(n + 1)");

  while (true) {
    yNext = y + h * f(x, y);
    tableRow(i, x, y, f(x, y), yNext);
    if (Math.abs(x - xFinal) < 0.001) break;
    y = yNext;
    x = x + h;
    i++;
  }
}

function improved(f: F, x0: number, y0: number, h: number, xFinal: number) {
  let i = 0;
  let y = y0;
  let x = x0;
  let yNext: number;
  let yStar: number;
  tableHead(
    "n",
    "x(n)",
    "y(n)",
    "f(x(n), y(n))",
    "y*(n)",
    "f*(x(n), y(n))",
    "y(n + 1)",
  );
  while (true) {
    yStar = y + h * f(x, y);
    yNext = y + h * ((f(x, y) + f(x + h, yStar)) / 2);
    tableRow(i, x, y, f(x, y), yStar, f(x + h, yStar), yNext);
    if (Math.abs(x - xFinal) < 0.001) break;
    y = yNext;
    x = x + h;
    i += 1;
  }
}

const problems: Problem[] = [
  {
    f: (x, y) => 4 * x - 2 * y,
    x0: 0.0,
    y0: 2.0,
    x: 0.5,
  },
  {
    f: (x, y) => x ** 2 + y ** 2,
    x0: 0.0,
    y0: 1.0,
    x: 0.5,
  },
  {
    f: (x, y) => x + y ** 2,
    x0: 0.0,
    y0: 0.0,
    x: 0.5,
  },
  {
    f: (x, y) => x * y + Math.sqrt(y),
    x0: 0.0,
    y0: 1.0,
    x: 0.5,
  },
  {
    f: (x, y) => y - y ** 2,
    x0: 0.0,
    y0: 0.5,
    x: 0.5,
  },
];

problems.forEach((prob, i) => {
  h1("Exercise", i);
  h2("Simple", "h = 0.1");
  simple(prob.f, prob.x0, prob.y0, 0.1, prob.x);

  h2("Simple", "h = 0.05");
  simple(prob.f, prob.x0, prob.y0, 0.05, prob.x);

  h2("Improved", "h = 0.1");
  improved(prob.f, prob.x0, prob.y0, 0.1, prob.x);

  h2("Improved", "h = 0.05");
  improved(prob.f, prob.x0, prob.y0, 0.05, prob.x);
});
