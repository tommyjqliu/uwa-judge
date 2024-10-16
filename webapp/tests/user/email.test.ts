import { describe, it } from "vitest";
import { sendEmail } from "@/services/email/send-email";

describe.skip.concurrent("Email", () => {
  it("should email success", async () => {
    await sendEmail("tommyjqliu@outlook.com", "Test", "Test");
  });
});
