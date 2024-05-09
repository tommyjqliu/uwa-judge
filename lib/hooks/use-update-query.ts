import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function useUpdateQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  return useCallback(
    (query: string, value: unknown) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(query, value as string);
      } else {
        params.delete(query);
      }
      replace(`${pathname}?${params.toString()}`);
    },
    [pathname, replace, searchParams],
  );
}
