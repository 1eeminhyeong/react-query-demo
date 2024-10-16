import {
  keepPreviousData,
  QueryFunction,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query'
import { useState } from 'react'

export type BaseFilter = {
  offset?: number
  limit?: number
}

export function useList<TFilter extends BaseFilter, TData>(
  keyMethod: (filter: TFilter) => {
    queryKey: readonly unknown[]
    queryFn: QueryFunction<{ list: TData[]; count: number }, any>
  },
  initialFilter?: TFilter,
  options?: Omit<
    UseQueryOptions<{ list: TData[]; count: number }>,
    'queryKey' | 'queryFn'
  >
) {
  const resetParams = { limit: 10, offset: 0, ...initialFilter } as TFilter
  const [params, setParams] = useState<TFilter>(resetParams)

  const queryResult = useQuery({
    queryKey: keyMethod(params).queryKey,
    queryFn: keyMethod(params).queryFn,
    placeholderData: keepPreviousData,
    ...options,
  })

  const onPageMove = (index: number) => {
    setParams((prev) => ({ ...prev, offset: (index - 1) * resetParams.limit! }))
  }
  const onFilter = (newParams: Partial<TFilter>) => {
    setParams((prev) => ({ ...prev, ...newParams }))
  }

  return {
    queryResult,

    list: queryResult?.data?.list,
    listCount: queryResult?.data?.count,

    params,
    setParams,

    pagination: {
      pageCount: Math.ceil(
        (queryResult?.data?.count || 0) / resetParams.limit!
      ),
      pageIndex: (params?.offset || 0) / resetParams.limit! + 1,
      pageMove: onPageMove,
    },
    onFilter,
  }
}
