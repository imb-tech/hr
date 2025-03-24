import { api } from "@/constants/api"
import { MutateOptions, useMutation, UseMutationOptions, useQueryClient } from "@tanstack/react-query"
import { AxiosRequestConfig } from "axios"
import { onError } from "@/lib/onError";
import { onSuccessHandler } from "@/lib/onSuccess";

export const postRequest = <T>(
    url: string,
    payload: T,
    config: AxiosRequestConfig = {},
) =>
    api.post(`/${url}/`, payload, {
        headers: {
            "Content-Type": "application/json",
        },
        ...config,
    })
        .then((res) => res.data)



export const usePost = <P = any, D = any>(
    queryKeys: string | string[],
    options?: Partial<UseMutationOptions<D, any, { url: string; payload: P }>>,
    config?: AxiosRequestConfig,
) => {

    const queryClient = useQueryClient();

    const mutation = useMutation<D, any, { url: string; payload: P }>({
        mutationFn: ({ url, payload }) => postRequest(url, payload, config),
        onSuccess: (data, variables, context) => {
            onSuccessHandler(queryClient, queryKeys);
            options?.onSuccess?.(data, variables, context);
        },
        onError,
        ...(options || {}),
    })

    const mutate = (
        url: string,
        payload: P,
        mutateOptions?: MutateOptions<D, any, { url: string; payload: P }, unknown>,
    ) => {
        mutation.mutate({ url, payload }, mutateOptions)
    }

    const mutateAsync = (
        url: string,
        payload: P,
        mutateOptions?: MutateOptions<D, any, { url: string; payload: P }, unknown>,
    ) => mutation.mutateAsync({ url, payload }, mutateOptions)

    return { ...mutation, mutate, mutateAsync }
}