import { db } from "./model";

async function demo() {
  const { id } = await db
    .insertInto("person")
    .values({ first_name: "Jennifer", gender: "female" })
    .returning("id")
    .executeTakeFirstOrThrow();

  await db
    .insertInto("pet")
    .values({ name: "Catto", species: "cat", owner_id: id })
    .execute();

  const person = await db
    .selectFrom("person")
    .innerJoin("pet", "pet.owner_id", "person.id")
    .select(["first_name", "pet.name as pet_name"])
    .where("person.id", "=", id)
    .executeTakeFirst();

  if (person) {
    person.pet_name;
  }
}

(async () => {
  console.log("hello");
})();
