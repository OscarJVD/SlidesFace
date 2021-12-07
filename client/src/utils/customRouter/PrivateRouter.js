import { Route, Redirect } from 'react-router-dom'

const PrivateRouter = ( props ) => {
  const firstLogin = localStorage.getItem('firstSlidesLogin')
  return firstLogin ? <Route {...props} /> : <Redirect to='/' />
}

export default PrivateRouter
