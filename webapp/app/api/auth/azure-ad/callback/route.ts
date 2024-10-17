import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import refreshProfile from "@/services/session/refresh-session";
import { redirect } from "next/navigation";
import { azureAD } from "@/lib/azure-ad-provider";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("state")?.value ?? null;
  const storedCodeVerifier = cookies().get("codeVerifier")?.value ?? null;

  if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await azureAD.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const imagePromise = (async () => {
      const response = await fetch(
        `https://graph.microsoft.com/v1.0/me/photos/48x48/$value`,
        { headers: { Authorization: `Bearer ${tokens.accessToken}` } },
      );
      // Confirm that profile photo was returned
      // TODO: Do this without Buffer
      if (response.ok && typeof Buffer !== "undefined") {
        try {
          const pictureBuffer = await response.arrayBuffer();
          const pictureBase64 = Buffer.from(pictureBuffer).toString("base64");
          return `data:image/jpeg;base64, ${pictureBase64}`;
        } catch {}
      }
      return null;
    })();

    const profilePromise = (async () => {
      const response = await fetch(`https://graph.microsoft.com/v1.0/me`, {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      const data = await response.json();
      return data;
    })();

    const [image, profile] = await Promise.all([imagePromise, profilePromise]);

    const email = z.string().email().parse(profile.userPrincipalName);
    let user = await uwajudgeDB.user.findUnique({
      where: {
        email,
      }
    });

    if (!user || !user.active) {
      user = await uwajudgeDB.user.upsert({
        where: {
          email,
        },
        update: {
          email,
          username: profile.displayName,
          active: true,
        },
        create: {
          email,
          username: profile.displayName,
          active: true,
        }
      });
    }

    await refreshProfile(user);
    redirect("/");
  } catch (e) {
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      return new Response(null, {
        status: 400,
      });
    }
    throw e;
  }
}
