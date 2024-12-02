import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "../Home";
// import ApplicantApplication from "../ApplicantApplication";
import { LayoutDefault } from "../../components/layoutDefault";
import { lazy, Suspense } from "react";
import { LoadingState } from "../../components/skeleton/LoadingState";
import MyReport from "../application/MyReport";
// import ProfileUpdateRequest from "../application/ProfileUpdateRequest";

const Home = lazy(() => import("../Home"));
const ApplicantApplication = lazy(() => import("../ApplicantApplication"));
const InterviewSchedule = lazy(() => import("../interview/InterviewSchedule"));
const MyProfile = lazy(() => import("../application/MyProfile"));
const MyHiring = lazy(() => import("../application/MyHiring"));
const MyEmbarks = lazy(() => import("../application/MyEmbarks"));
export const ApplicantPortalRoutes = () => {
  return (
    <>
      <LayoutDefault>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/application" element={<ApplicantApplication />} />
            <Route path="/interviewschedule" element={<InterviewSchedule />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/myreport" element={<MyReport />} />
            <Route path="/myhiring" element={<MyHiring />} />
            {/* <Route path="/profileupdaterequest" element={<ProfileUpdateRequest/>} /> */}
            <Route path="/myembarks" element={<MyEmbarks />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </LayoutDefault>
    </>
  );
};
