import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserAccountByUid,
  updateUserAccountEmail,
  updateUserPassword,
} from "../../util/services";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlinePencil } from "react-icons/hi";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { InputText } from "../../components/layoutComponents";
import { useDispatch } from "react-redux";
import { updateSeafarerEmail } from "../../store/currentViews/viewSlice";
import toast from "react-hot-toast";

export const ApplicantAccount = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.currentViews);
  const [accountData, setAccountData] = useState({});
  const [searched, setSearched] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  /* VER CONTRASENA*/
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* VER CONFIRMAR CONTRASENA */
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const load = async () => {
    const data = await getUserAccountByUid(profile.uid);
    console.log(data);
    if (data == false) {
      setError(true);
    } else {
      setAccountData(data);
    }
    setSearched(true);
  };
  const handleEmailEdit = async () => {
    if (!isEditingEmail) {
      setIsEditingEmail(true);
      setNewEmail(accountData.email);
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      toast.promise(updateUserAccountEmail(profile.uid, newEmail), {
        loading: "Saving...",
        success: <b>Email Updated Successfuly!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      });

      dispatch(updateSeafarerEmail(newEmail));
      setAccountData({ ...accountData, email: newEmail });
      setIsEditingEmail(false);
    } catch (err) {
      // setError('Failed to update email. Please try again.')
      console.log("Failed to update email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordEdit = async () => {
    if (!isEditingPassword) {
      setIsEditingPassword(true);
      setNewPassword("");
      setConfirmPassword("");
      return;
    }

    if (newPassword !== confirmPassword) {
      // setError("Passwords don't match");
      setInvalidPassword(true);
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Simulate API call
      toast.promise(updateUserPassword(profile.uid, confirmPassword), {
        loading: "Saving...",
        success: <b>Password Updated Successfuly!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      });
      setIsEditingPassword(false);
    } catch (err) {
      console.log("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (profile.uid) {
      load();
    }
  }, [profile]);

  return (
    <section className="flex flex-col justify-center ">
      {!searched ? (
        <LoadingState />
      ) : (
        <>
          {error == true ? (
            <div className="flex flex-row gap-4 items-center justify-center">
              <span>This Applicant doesn't have an account yet</span>
              <button
                className="border border-blue-300 bg-white text-blue-600 size-10 md:w-48 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                // onClick={() => handleEmailEdit()}
              >
                <HiOutlinePencil className="h-4 w-4" />
                <span className="hidden md:block ">Create New Account</span>
              </button>
            </div>
          ) : (
            <section>
              <div className="flex flex-row gap-7">
                <div className="flex flex-col gap-2 mb-9">
                  <Label>Account ID</Label>
                  <div className="text-lg font-medium">
                    {accountData?.uid || "--"}
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-9">
                  <Label>Account Provider</Label>
                  <div className="text-lg font-medium">
                    {accountData?.providerData[0].providerId || "--"}
                  </div>
                </div>
              </div>
              <div className="space-y-2 mb-5">
                <Label htmlFor="email">Email</Label>
                {isEditingEmail ? (
                  <div className="flex items-center space-x-2">
                    <TextInput
                      id="email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="flex-grow"
                      required
                    />
                    <Button
                      onClick={handleEmailEdit}
                      isProcessing={isLoading}
                      color="success"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-lg">{accountData?.email || "--"}</div>
                    <button
                      className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                      onClick={() => handleEmailEdit()}
                    >
                      <HiOutlinePencil className="h-4 w-4" />
                      <span className="hidden md:block ">Edit</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                {accountData.providerData[0].providerId !== "google.com" && (
                  <Label htmlFor="password">Password</Label>
                )}
                {isEditingPassword ? (
                  <div className="space-y-2">
                    <section className="flex ">
                      <InputText
                        type={showPassword ? "text" : "password"}
                        label="New Password*"
                        value={newPassword}
                        name="newPassword"
                        onChange={(e) => setNewPassword(e.target.value)}
                        classname={"flex-grow w-full px-0 py-2 ps-5 mb-1"}
                        isValid={!invalidPassword}
                        helpertext="Invalid Password"
                        required
                      />
                      <div
                        onClick={toggleShowPassword}
                        className="w-6 h-6 -translate-x-8 py-2 cursor-pointer items-start translate-y-4"
                      >
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </div>
                    </section>

                    <section className="flex">
                      <InputText
                        type={showConfirmPassword ? "text" : "password"}
                        label="Confirm Password*"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        classname={"flex-grow w-full px-0 py-2 ps-5 mb-1"}
                        isValid={!invalidPassword}
                        helpertext="Invalid Password"
                        required
                      />
                      <div
                        onClick={toggleShowConfirmPassword}
                        className="w-6 h-6 -translate-x-8 py-2 cursor-pointer items-start translate-y-4"
                      >
                        {showConfirmPassword ? (
                          <HiOutlineEyeOff />
                        ) : (
                          <HiOutlineEye />
                        )}
                      </div>
                    </section>
                    <Button
                      onClick={handlePasswordEdit}
                      isProcessing={isLoading}
                      color="success"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                ) : (
                  <>
                    {accountData.providerData[0].providerId == "google.com" ? (
                      <span>Cannot edit the password of Google Auth</span>
                    ) : (
                      <div className="flex items-center justify-between">
                        <button
                          className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                          onClick={() => handlePasswordEdit()}
                        >
                          <HiOutlinePencil className="h-4 w-4" />
                          <span className="hidden md:block ">Edit</span>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </section>
  );
};

export default ApplicantAccount;
