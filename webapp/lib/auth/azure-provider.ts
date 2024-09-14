import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth"

export interface AzureADProfile extends Record<string, any> {
  sub: string
  nickname: string
  email: string
  picture: string
}

export function AzureADProvider<P extends AzureADProfile>(
  options: OAuthUserConfig<P> & {
    /**
     * https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
     * @default 48
     */
    profilePhotoSize?: 48 | 64 | 96 | 120 | 240 | 360 | 432 | 504 | 648
    /** @default "common" */
    tenantId?: string
  }
): OAuthConfig<P> {
  const tenant = options.tenantId ?? "common"
  const profilePhotoSize = options.profilePhotoSize ?? 48

  return {
    id: "azure-ad",
    name: "Azure Active Directory",
    type: "oauth",
    wellKnown: `https://login.microsoftonline.com/${tenant}/v2.0/.well-known/openid-configuration?appid=${options.clientId}`,
    authorization: {
      params: {
        scope: "openid profile email",
      },
    },
    async profile(profile, tokens) {
      // https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0#examples
      const imagePromise = (async () => {
        const response = await fetch(
          `https://graph.microsoft.com/v1.0/me/photos/${profilePhotoSize}x${profilePhotoSize}/$value`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        // Confirm that profile photo was returned
        // TODO: Do this without Buffer
        if (response.ok && typeof Buffer !== "undefined") {
          try {
            const pictureBuffer = await response.arrayBuffer()
            const pictureBase64 = Buffer.from(pictureBuffer).toString("base64")
            return `data:image/jpeg;base64, ${pictureBase64}`
          } catch {

          }
        }
        return null
      })();

      const profilePromise = (async () => {
        const response = await fetch(
          `https://graph.microsoft.com/v1.0/me`,
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        const data = await response.json()
        return data
      })();

      const [image, _profile] = await Promise.all([imagePromise, profilePromise])

      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: image ?? null,
        principalName: _profile.userPrincipalName,
      }
    },
    style: { logo: "/azure.svg", text: "#fff", bg: "#0072c6" },
    options,
  }
}

export const providerId = "azure-ad";

export const azureAdProvider = AzureADProvider({
  clientId: process.env.AZURE_AD_CLIENT_ID!,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
  tenantId: process.env.AZURE_AD_TENANT_ID,
});

export default azureAdProvider;
