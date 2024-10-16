import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query'
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
  const resetFilter = { limit: 10, offset: 0, ...initialFilter } as TFilter
  const [filter, setFilter] = useState<TFilter>(resetFilter)

  const queryResult = useQuery({
    queryKey: keyMethod(filter).queryKey,
    queryFn: keyMethod(filter).queryFn,
    ...options,
  })

  const onPageMove = (index: number) => {
    setFilter((prev) => ({ ...prev, offset: (index - 1) * resetFilter.limit! }))
  }

  return {
    queryResult,
    filter,
    setFilter,
    pagination: {
      pageCount: Math.ceil(
        (queryResult?.data?.count || 0) / resetFilter.limit!
      ),
      pageIndex: (filter?.offset || 0) / resetFilter.limit! + 1,
      pageMove: onPageMove,
    },
  }
}
