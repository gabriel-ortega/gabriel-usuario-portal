import { useSelector } from "react-redux";

export const ApplicantAccount = () => {
  const { profile } = useSelector((state) => state.currentViews);
  return <div>Applicant Account Settings for {profile.uid}</div>;
};

export default ApplicantAccount;
