import AzureADProvider from "next-auth/providers/azure-ad";

export const providerId = "azure-ad";

export const azureAdProvider = AzureADProvider({
  clientId: process.env.AZURE_AD_CLIENT_ID!,
  clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
  tenantId: process.env.AZURE_AD_TENANT_ID,
});

export default azureAdProvider;
