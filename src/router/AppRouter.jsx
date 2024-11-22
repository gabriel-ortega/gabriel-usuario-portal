import { Route, Routes, Navigate } from "react-router-dom";

import { useCheckAuth } from "../hooks";
import { LoginRoutes } from "../page/login/routes/LoginRoutes";
import { PortalRoutes } from "../page/routes/PortalRoutes";
import { CheckingAuth } from "../components/skeleton/CheckingAuth";
import { useSelector } from "react-redux";
import { ApplicantPortalRoutes } from "../page/routes/ApplicantPortalRoutes";
import { lazy } from "react";
import { Suspense } from "react";

// const PortalRoutes = lazy(() => import("../page/routes/PortalRoutes"));
// const ApplicantPortalRoutes = lazy(() =>
//   import("../page/routes/ApplicantPortalRoutes")
// );

export const AppRouter = () => {
  const { status } = useCheckAuth();
  const { userData } = useSelector((state) => state.userData);
  const { role } = userData;

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <Routes>
      {status === "authenticated" ? (
        role === 3 ? (
          <Route path="/*" element={<ApplicantPortalRoutes />} />
        ) : role === 1 || role === 2 ? (
          <Route path="/*" element={<PortalRoutes />} />
        ) : (
          <Route path="/*" element={<CheckingAuth />} />
        )
      ) : (
        <>
          <Route path="/auth/*" element={<LoginRoutes />} />
        </>
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
