import { api } from "@/constants/api";
import { onError } from "@/lib/onError";
import { onSuccessHandler } from "@/lib/onSuccess";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const deleteRequest = (url: string, config?: AxiosRequestConfig) =>
  api.delete(`/${url}/`, config).then((res) => res.data);

export const useDelete = (
  queryKeys: string | string[] | undefined,
  options?: Partial<UseMutationOptions<any, any, string>>,
  config?: AxiosRequestConfig,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, string>({
    mutationFn: (url) => deleteRequest(url, config),
    onSuccess: (data, variables, context) => {
      onSuccessHandler(queryClient, queryKeys);
      options?.onSuccess?.(data, variables, context);
    },
    onError,
    ...(options || {}),
  });
};
