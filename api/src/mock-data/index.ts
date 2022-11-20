import { database } from "../model/database";

const db = database({ fileMustExist: true });

(async () => {
  await db
    .insertInto("user")
    .values({
      id: 1,
      username: "mockuser",
      password: "pass",
    })
    .execute();

  await db
    .insertInto("service")
    .values({
      id: 1,
      userId: 1,
      title: "gmail",
    })
    .execute();

  await db
    .insertInto("serviceField")
    .values({
      id: 1,
      serviceId: 1,
      key: "url",
      value: "https://gmail.com",
    })
    .execute();

  await db
    .insertInto("profile")
    .values({
      id: 1,
      serviceId: 1,
      title: "main",
    })
    .execute();

  await db
    .insertInto("profileField")
    .values({
      id: 1,
      profileId: 1,
      key: "username",
      value: "mockdata@gmail.com",
    })
    .execute();

  await db
    .insertInto("profileField")
    .values({
      id: 2,
      profileId: 1,
      key: "password",
      value: "pass",
    })
    .execute();

  //
})();
