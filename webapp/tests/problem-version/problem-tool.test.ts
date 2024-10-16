import { describe, it, expect } from "vitest";
import axios from "axios";
import fs from "fs";
import { readProblems } from "../utils/read-problems";

describe("File Upload Endpoint", async () => {
  const problems = await readProblems();
  it("should upload a zip file and receive a PDF file in response", async () => {
    const url = "http://problemtools:5000/problem2pdf"; // URL to your Flask app

    // Create form data
    const form = new FormData();
    form.append("file", problems[1]);

    // Make the POST request
    const response = await axios.postForm(url, form, {
      responseType: "arraybuffer",
    });

    // Check response status and headers
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("application/pdf");

    if (!fs.existsSync("temp")) {
      fs.mkdirSync("temp");
    }

    // Optionally, you could write the response data to a file to manually verify, or perform additional automated checks
    fs.writeFileSync("temp/output.pdf", response.data);
  });
});
