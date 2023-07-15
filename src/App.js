
import { RouterProvider } from 'react-router-dom';
import './App.css';
import TokenProvider from './contexts/tokenContext';
import  {privateRoutes} from './routes/routes';
import  {publicRoutes} from './routes/routes'
import Rotas from './routes/routes';
import { useEffect, useState } from 'react';




function App() {

  // const [routes, setRoutes] = useState()
  // let a = true
  
  // useEffect(() => {
  //   if(a){
  //     setRoutes(privateRoutes)
  //   } else {
  //     setRoutes(publicRoutes)
  //   }
  // }, [a])

  return (
    <>
      <TokenProvider>

      <RouterProvider router={publicRoutes}/>
        {/* <Rotas/> */}
      </TokenProvider>
    </>
    

  )
}

export default App
