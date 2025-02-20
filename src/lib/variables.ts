export const apiAddress =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://petsmatchup.vercel.app";

export const VIPTASKS = [30, 28, 25, 15];
