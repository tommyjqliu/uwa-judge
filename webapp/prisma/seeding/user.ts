import { uwajudgeDB } from "@/lib/database-client";

export default async function seedUser() {
    const emails = Array.from({ length: 20 }, (_, i) => `user${i + 1}@example.com`);
    await uwajudgeDB.user.createMany({
        data: emails.map((email, index) => ({
            email,
            username: `user${index + 1}`,
            password: "password",
        }))
    })
}