import { db } from "./model";

const db_ = db(true);

(async () => {
  console.log("hello");

  const result = await db_
    .insertInto("user")
    .values({
      username: "yeah",
      password: "pass",
    })
    .executeTakeFirst();

  console.log(result);
})();
