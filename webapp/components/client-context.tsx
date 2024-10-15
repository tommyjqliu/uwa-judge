import { AssertClientContext } from "@/lib/hooks/use-assert-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function ClientContext({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AssertClientContext.Provider value={true}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AssertClientContext.Provider>
  );
}

