"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function Page() {
  return (
    <Button
      onClick={() =>
        signIn("credentials", {
          message: JSON.stringify({ test: 111 }),
          redirect: false,
          password: "test",
        })
      }
    >
      Sign In
    </Button>
  );
}
