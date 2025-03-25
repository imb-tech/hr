import { QueryClient } from "@tanstack/react-query";

export const onSuccessHandler = (
  queryClient: QueryClient,
  queryKeys?: string | string[],
) => {
  if (!queryKeys) return;
  (Array.isArray(queryKeys) ? queryKeys : [queryKeys]).forEach((key) =>
    queryClient.invalidateQueries({ queryKey: [key] }),
  );
};
