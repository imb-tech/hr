import { api } from "@/constants/api";
import { onError } from "@/lib/onError";
import { onSuccessHandler } from "@/lib/onSuccess";
import {
  MutateOptions,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

export const patchRequest = <T>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig,
) => api.patch(`/${url}/`, payload, config).then((res) => res.data);

export const putRequest = <T>(
  url: string,
  payload: T,
  config?: AxiosRequestConfig,
) => api.put(`/${url}/`, payload, config).then((res) => res.data);

export const usePatch = <P = any, D = any>(
  queryKeys: string | string[] | undefined,
  options?: Partial<UseMutationOptions<D, any, { url: string; payload: P }>>,
  config?: AxiosRequestConfig,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<D, any, { url: string; payload: P }>({
    mutationFn: ({ url, payload }) => patchRequest(url, payload, config),
    onSuccess: (data, variables, context) => {
      onSuccessHandler(queryClient, queryKeys);
      options?.onSuccess?.(data, variables, context);
    },
    onError,
    ...(options || {}),
  });

  const mutate = (
    url: string,
    payload: P,
    mutateOptions?: MutateOptions<D, any, { url: string; payload: P }, unknown>,
  ) => {
    mutation.mutate({ url, payload }, mutateOptions);
  };

  const mutateAsync = (
    url: string,
    payload: P,
    mutateOptions?: MutateOptions<D, any, { url: string; payload: P }, unknown>,
  ) => mutation.mutateAsync({ url, payload }, mutateOptions);

  return { ...mutation, mutate, mutateAsync };
};
