import { useMutation as useBaseMutation, type UseMutationOptions } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

/**
 *
 * @template TVariable TVariable은 mutate request에 포함되는 body값의 타입입니다.
 * @template TData TData는 mutate request후 return되는 응답값의 타입입니다.
 * @template TError TError는 에러 객체의 타입입니다.
 *
 * @example
 * ```tsx
 * import { useMutation } from '@hexlant/data-fetcher';
 *
 * function useSignIn() {
 *  return useMutation<SignInBody, unknown, ErrorResponse>({
 *    mutationFn: (variable) => axiosInstance.post(URL.SIGN_IN, variable)
 *  })
 * }
 * ```
 */
export function useCustomMutation<TVariable = undefined, TData = unknown, TError = AxiosError<{ message: string; errorCode: string }, any>>(
  options: UseMutationOptions<AxiosResponse<TData>, TError, TVariable, any>
) {
  return useBaseMutation(options)
}
