import useAuth from './hooks/useAuth'

export default function withAuth(Component: Function) {
  return function(...props: any) {
    const [ user ] = useAuth()
    return (
      <>
        {user && <Component {...props} />}
      </>
    )
  }
}