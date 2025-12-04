import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
import routes from './routes';  
// Chakra imports

export default function Main() {
  // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
         {/* ADMIN ROUTES (PARENT) */}
         <Route
          path="admin/*"
          element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />}
        >
          {/* CHILD ROUTES */}
          {routes
            .filter(route => route.layout === "/admin")
            .map((route, index) => (
              <Route
                key={index}
                path={route.path.replace("/", "")}  // removes leading slash
                element={route.component}
              />
            ))
          }
        </Route>
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}
