import { uwajudgeDB } from "@/lib/database-client";
import { describe, it } from "vitest";
import bcrypt from "bcrypt";

describe.concurrent("Create User", () => {
  it("should create success", async () => {
    const hashedPassword = await bcrypt.hash("1111", 10);
    console.log(hashedPassword);
  });
});
