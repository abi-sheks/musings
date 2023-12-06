import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, LandingPage, RegisterScreen, LoginScreen, ProjectScreen } from './routes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'

const customTheme = extendTheme({
  colors: {
    primary: {
      100: "#F1FCCF",
      200: "#E1F9A0",
      300: "#C6EF6F",
      400: "#AAE04A",
      500: "#83CC16",
      600: "#69AF10",
      700: "#51920B",
      800: "#3C7607",
      900: "#2D6104",
    },
    secondary: "#ffffff",
    bg: "#EEEEEE",
    tertiary: "#44403C",
  }
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/projects/:projectID",
    element: <ProjectScreen />
  },
  {
    path: "/login",
    element: <LoginScreen />
  },
  {
    path: "/register",
    element: <RegisterScreen />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider theme={customTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
);
