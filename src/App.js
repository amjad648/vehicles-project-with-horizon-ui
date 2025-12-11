import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import RTLLayout from "./layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import initialTheme from "./theme/theme";
import { useState } from "react";
import routes from "./routes";

export default function App() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        <Route path="auth/*" element={<AuthLayout />} />
        <Route path="admin/*" element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />}>
          {routes
            .filter(route => route.layout === "/admin")
            .map((route, index) => (
              <Route key={index} path={route.path.replace("/", "")} element={route.component} />
            ))}
        </Route>
        <Route path="rtl/*" element={<RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ChakraProvider>
  );
}

// import './assets/css/App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import AuthLayout from './layouts/auth';
// import AdminLayout from './layouts/admin';
// import RTLLayout from './layouts/rtl';
// import {ChakraProvider} from '@chakra-ui/react';
// import initialTheme from './theme/theme'; //  { themeGreen }
// import { useState } from 'react';
// import routes from './routes';  
// import React from "react";
// import { useKeycloak } from "@react-keycloak/web";

// export default function Main() {
//   const [currentTheme, setCurrentTheme] = useState(initialTheme);
//   const { keycloak } = useKeycloak();

//   if (!keycloak.authenticated) {
//     return <div>Redirecting to login...</div>;
//   }

//   return (
//     <ChakraProvider theme={currentTheme}>
//       <Routes>
//         <Route path="auth/*" element={<AuthLayout />} />
//          {/* ADMIN ROUTES (PARENT) */}
//          <Route
//           path="admin/*"
//           element={<AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />}
//         >
//           {/* CHILD ROUTES */}
//           {routes
//             .filter(route => route.layout === "/admin")
//             .map((route, index) => (
//               <Route
//                 key={index}
//                 path={route.path.replace("/", "")}  // removes leading slash
//                 element={route.component}
//               />
//             ))
//           }
//         </Route>
//         <Route
//           path="rtl/*"
//           element={
//             <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
//           }
//         />
//         <Route path="/" element={<Navigate to="/admin" replace />} />
//       </Routes>
//     </ChakraProvider>
//   );
// }
