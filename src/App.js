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
