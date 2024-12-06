import React, { Fragment, ReactNode, Suspense } from "react";
import "./App.css";
import Layout from "./Layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Error from "./Layout/Error";
import DocType from "./Views/DocType";
import Balance from "./Views/Balance";
import Client from "./Views/Client";
import Transaction from "./Views/Transaction";
import CreditHistory from "./Views/CreditHistory";

export function useUserRoles() {
  const Rol = localStorage.getItem("Role");
  const userRole = Rol && Rol !== "undefined" ? Rol : "public";
  return userRole;
}
export function RolesAuthRoute({
  children,
  rol,
}: {
  children: ReactNode;
  rol: Array<string>;
}) {
  const userRoles = useUserRoles();

  const canAccess = true//rol.some((userRole) => userRole.includes(userRoles));

  if (canAccess) return <Fragment>{children}</Fragment>;

  return <Navigate to="/login" />;
}
function App() {
  return (
   
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              
              element={
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                    <Home />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <Login />
              }
            />
             <Route
              path="/TipoDoc"
              element={
                
                <Suspense fallback={<></>}>
                  <RolesAuthRoute rol={["admin"]}>
                  <DocType />
                  </RolesAuthRoute>
                </Suspense>
              }
            />
             <Route
              path="/cliente"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Client />
                </RolesAuthRoute>
              </Suspense>
              }
            />
            
             <Route
              path="/transaccion"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Transaction />
                </RolesAuthRoute>
              </Suspense>
              }
            />
             <Route
              path="/balance"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <Balance />
                </RolesAuthRoute>
              </Suspense>
              }
            />
            <Route
              path="/credito"
              element={
                
                <Suspense fallback={<></>}>
                <RolesAuthRoute rol={["admin"]}>
                <CreditHistory />
                </RolesAuthRoute>
              </Suspense>
              }
            />
            <Route path="*" element={<Error/>} />
          </Routes>
        </BrowserRouter>
      </>
 
  );
}

export default App;
