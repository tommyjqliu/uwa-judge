import throttle from "@/services/lock/throttle";
import { describe, it } from "vitest";

describe.concurrent("Throttle", () => {
  it("should throttle", async () => {
    await throttle("test", 2, 10);
  });
});
