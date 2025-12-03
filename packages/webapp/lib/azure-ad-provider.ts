import { MicrosoftEntraId } from "arctic";

export const azureAD = new MicrosoftEntraId(
  process.env.AZURE_AD_TENANT_ID!,
  process.env.AZURE_AD_CLIENT_ID!,
  process.env.AZURE_AD_CLIENT_SECRET!,
  `${process.env.AUTH_CALLBACK}/api/auth/azure-ad/callback`,
);

export default azureAD;
