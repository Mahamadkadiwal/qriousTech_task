
import './App.css'
import HomePage from './Pages/HomePage';
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Signup />
    },
    {
      path:"/signin",
      element: <Signin />
    },
    {
      path:"/home",
      element: <HomePage />
    },

  ]);

  return <RouterProvider router={router}/>
};

export default App
