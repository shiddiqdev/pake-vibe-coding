import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    message: "Bun, Elysia, Drizzle, and MySQL are working together! 🚀"
  }))
  .get("/users", async () => {
    try {
      const allUsers = await db.select().from(users);
      return {
        success: true,
        data: allUsers
      };
    } catch (error) {
      console.error("Database error:", error);
      return {
        success: false,
        message: "Could not fetch users from database.",
        error: (error as Error).message
      };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
