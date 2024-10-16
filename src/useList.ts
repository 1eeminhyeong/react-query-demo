import { QueryFunction, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { useState } from 'react'

export function useList<
  TFilter extends Record<string, any>,
  TData,
  TKey extends (filter: TFilter) => {
    queryKey: readonly unknown[]
    queryFn: QueryFunction<{ list: TData[]; count: number }, any>
  },
>(
  keyMethod: TKey,
  initialFilter: TFilter,
  options?: UseQueryOptions<{ list: TData[]; count: number }>
) {
  const [filter, setFilter] = useState<TFilter>(initialFilter)

  const queryResult = useQuery({
    queryKey: keyMethod(filter).queryKey,
    queryFn: keyMethod(filter).queryFn,
    ...options,
  })

  return { ...queryResult, filter, setFilter }
}
