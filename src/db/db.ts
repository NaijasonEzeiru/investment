import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema";

// const sql = postgres(process.env.DATABASE_URL!, {
//   max: 1,
// });

const db = drizzle(process.env.DATABASE_URL!, { schema });
// const db = drizzle(sql, { schema });

export { db };
