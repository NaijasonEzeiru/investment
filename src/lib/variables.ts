export const apiAddress =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://petsmatchup.vercel.app";

// export const VIPTASKS = [
//   { tasks: 30, cost: 28.3, reward: 41 },
//   { tasks: 28, cost: 97.5, reward: 150 },
//   { tasks: 25, cost: 368, reward: 500 },
//   { tasks: 15, cost: 1500, reward: 2300 },
// ] as const;

export const VIPTASKS = [
  { tasks: 30, cost: 28.3, reward: 41 },
  { tasks: 28, cost: 53.5, reward: 87 },
  { tasks: 25, cost: 200, reward: 420 },
  { tasks: 15, cost: 670, reward: 1100 },
] as const;
