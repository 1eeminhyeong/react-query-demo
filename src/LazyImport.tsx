import { useSuspenseQuery } from '@tanstack/react-query'
import { exampleKeys } from './queries'

const LazyImport = () => {
  const { data: suspenseData } = useSuspenseQuery({ ...exampleKeys.suspense, gcTime: 0, staleTime: 0 })

  return <div>{suspenseData}</div>
}

export default LazyImport
