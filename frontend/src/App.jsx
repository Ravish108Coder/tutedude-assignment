import { useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import PublicRoutes from './components/PublicRoutes'
import PrivateRoutes from './components/PrivateRoutes'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Home from './components/Home'
import Admin from './components/Admin'
import AllCertficates from './components/AllCertficates'
import MyCertificate from './components/MyCertificate'
import AdminRoutes from './components/AdminRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route exact path='/signin' element={<SignIn />} />
        <Route exact path='/signup' element={<SignUp />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/my-certificates' element={<MyCertificate />} />
      </Route>
      <Route element={<AdminRoutes />}>
        <Route exact path='/admin' element={<Admin />} />
        <Route exact path='/all-certificates' element={<AllCertficates />} />
      </Route>
      <Route exact path='*' element={"not found"} />
    </Routes>
  )
}

export default App
