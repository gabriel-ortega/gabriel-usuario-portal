import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy } from "react";
import { Suspense } from "react";
import { LayoutDefault } from "../../components/layoutDefault";
import { LoadingState } from "../../components/skeleton/LoadingState";
import Interview from "../interview/Interview";
import InterviewSchedule from "../interview/InterviewSchedule";

const Dashboard = lazy(() => import("../Dashboard"));
const NewApplicant = lazy(() => import("../recruitment/NewApplicant"));
const Applicants_Seafarers = lazy(() =>
  import("../recruitment/Applicants_Seafarers")
);
const RecruitmentProfile = lazy(() =>
  import("../recruitment/RecruitmentProfile")
);
const Applicants_Aplications = lazy(() =>
  import("../recruitment/Applicants_Aplications")
);
const ReviewApplication = lazy(() =>
  import("../application/ReviewApplication")
);
const ReviewUpdate = lazy(() => import("../recruitment/ReviewUpdate"));
const FirstInterviewList = lazy(() =>
  import("../applicationProcess/FirstInterviewList")
);
const FirstInterview = lazy(() =>
  import("../applicationProcess/FirstInterview")
);
const SecondInterviewList = lazy(() =>
  import("../applicationProcess/SecondInterviewList")
);
const SecondInterview = lazy(() =>
  import("../applicationProcess/SecondInterview")
);
const GapPoolList = lazy(() => import("../recruitment/GapPoolList"));
const HiringsDashboard = lazy(() => import("../recruitment/HiringsDashboard"));
const EmbarksDashboard = lazy(() => import("../recruitment/EmbarksDashboard"));
const Contract = lazy(() => import("../recruitment/Contract"));
const Embark = lazy(() => import("../recruitment/Embark"));
const ExpiredDocumentsView = lazy(() =>
  import("../recruitment/ExpiredDocumentsView")
);
const UpdateRequests = lazy(() => import("../recruitment/UpdateRequests"));
const SearchTest = lazy(() => import("../../components/searchBar/SearchTest"));
const RetireRequest = lazy(() => import("../recruitment/RetireRequest"));

export const PortalRoutes = () => {
  const { userData } = useSelector((state) => state.userData);
  return (
    <>
      <LayoutDefault>
        <Suspense fallback={<LoadingState />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shortnotice" element={<NewApplicant />} />
            <Route path="/seafarers" element={<Applicants_Seafarers />} />
            <Route path="/submissions" element={<Applicants_Aplications />} />
            <Route path="/firstinterviews" element={<FirstInterviewList />} />
            <Route path="/secondinterviews" element={<SecondInterviewList />} />
            <Route path="/gappool" element={<GapPoolList />} />
            <Route path="/hirings" element={<HiringsDashboard />} />
            <Route path="/contract/:id" element={<Contract />} />

            <Route path="/embarks" element={<EmbarksDashboard />} />
            <Route path="/embark/:id" element={<Embark />} />
            <Route path="/interviewappointments" element={<Interview />} />
            <Route path="/interviewschedule" element={<InterviewSchedule />} />
            <Route path="/profile/:id" element={<RecruitmentProfile />} />
            <Route
              path="/reviewapplication/:id"
              element={<ReviewApplication />}
            />
            <Route path="/reviewupdate/:id" element={<ReviewUpdate />} />

            <Route path="/globalsearch" element={<SearchTest />} />
            <Route path="/interview-first/:id" element={<FirstInterview />} />
            <Route path="/interview-second/:id" element={<SecondInterview />} />
            <Route path="/expired" element={<ExpiredDocumentsView />} />
            <Route path="/updaterequests" element={<UpdateRequests />} />
            <Route path="/retirerequests" element={<RetireRequest />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Suspense>
      </LayoutDefault>
    </>
  );
};
