import { Button, Card, Drawer, Popover, Table } from "flowbite-react";
import {
  InputText,
  SelectComponents,
  YesNoInput,
} from "../../components/layoutComponents";
import { useState } from "react";
import {
  HiDocumentDownload,
  HiDotsVertical,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlinePlus,
  HiXCircle,
} from "react-icons/hi";
import { LoadingState } from "../../components/skeleton/LoadingState";
import { lazy } from "react";
import { useSelector } from "react-redux";
import { Suspense } from "react";
import {
  setProfileView,
  updateSeafarerDepartment,
  updateSeafarerEmail,
  updateSeafarerPosition,
  updateSeafarerStage,
  updateSeafarerVesselType,
} from "../../store/currentViews/viewSlice";
import { useEffect } from "react";
import stageData from "../../assets/tables/json/RecruitmentStage-static.json";
import { useDispatch } from "react-redux";
import { validateEmail } from "../../util/helperFunctions";
import { generatePassword } from "../../util/helperFunctions/generatePassword";
import { validatePassword } from "../../util/helperFunctions/validatePassword";
const RecruitmentSeafarerProfile = lazy(() =>
  import("./components/RecruitmentSeafarerProfile")
);
const RecruitmentDocuments = lazy(() =>
  import("./components/RecruitmentDocuments")
);
const RecruitmentSkills = lazy(() => import("./components/RecruitmentSkills"));
const RecruitmentCertificates = lazy(() =>
  import("./components/RecruitmentCertificates")
);

export const NewApplicant = ({ ...props }) => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { profile, vesselTypes, positions, departments } = useSelector(
    (state) => state.currentViews
  );
  const [isOpen, setIsOpen] = useState(false);
  const [drafts, setDrafts] = useState([
    { addedBy: "Gabriel", createdOn: "2024-11-24", name: "Alan perez" },
  ]);
  const handleClose = () => setIsOpen(false);
  const [createAccount, setCreateAccount] = useState(false);
  const [recruitmentStage, setRecruitmentStage] = useState(0);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [disableSeafarerData, setDisableSeafarerData] = useState(true);
  const [currentTab, setCurrentTab] = useState("1");
  const [selectedValues, setSelectedValues] = useState({
    vesselType: [{ id: "" }],
    department: [{ id: "" }],
    position: [{ id: "" }],
  });
  const [datafilter, setDataFilter] = useState({
    Departament: {},
    Position: {},
  });
  const [clean, setClean] = useState();
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [tabs, setTabs] = useState([
    {
      Id: 1,
      value: "Profile",
    },
    {
      Id: 2,
      value: "Documents",
    },
    {
      Id: 3,
      value: "Certificates",
    },
    {
      Id: 4,
      value: "Experience & Skills",
    },
  ]);
  const [disableSelect, setDisableSelect] = useState({
    Vessel: false,
    Departament: true,
    Position: true,
  });

  useEffect(() => {
    dispatch(
      setProfileView({
        role: 3,
        applicationStage: 1,
        available: true,
        logisticId: "",
        seafarerData: {
          seafarerProfile: {},
          seafarerDocument: [],
          seafarerCertificates: [],
          skills: {},
        },
      })
    );
  }, []);

  const handleSelectChange = (value, name) => {
    if (
      selectedValues.vesselType[0].id == "" &&
      disableSelect.Departament == true
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        department: [{ id: "", name: "" }],
      }));
    }

    if (
      (selectedValues.department[0].id == "" &&
        disableSelect.Position == true) ||
      selectedValues.vesselType[0].id == ""
    ) {
      setSelectedValues((prevState) => ({
        ...prevState,
        position: [{ id: "", name: "" }],
      }));
    }
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setClean(clean == false ? true : false);
    if (name == "vesselType") {
      dispatch(updateSeafarerVesselType(value));
    } else if (name == "position") {
      dispatch(updateSeafarerPosition(value));
    } else if (name == "department") {
      dispatch(updateSeafarerDepartment(value));
    }
  };

  const handleStageChange = (e) => {
    dispatch(updateSeafarerStage(Number(e)));
    setRecruitmentStage(e);
  };

  useEffect(() => {
    if (vesselTypes && positions && departments) {
      if (
        Object.keys(vesselTypes).length !== 0 &&
        Object.keys(departments).length !== 0 &&
        Object.keys(positions).length !== 0
      ) {
        setDisableSelect((prevState) => ({
          ...prevState,
          Departament:
            selectedValues.vesselType[0].id.length > 0 ? false : true,
          Position:
            selectedValues.vesselType[0].id.length > 0 &&
            selectedValues.department[0].id.length > 0
              ? false
              : true,
        }));
        if (!disableSelect.Vessel) {
          setDataFilter((prevState) => ({
            ...prevState,
            Departament: departments.filter((item) => {
              const filterdepartament = item.TypeOfVessel.replace(
                /[{}]/g,
                ""
              ).split(",");
              return filterdepartament.includes(
                selectedValues.vesselType[0].id
              );
            }),
            Position: positions.filter((dept) =>
              selectedValues.vesselType[0].id === "1"
                ? dept.PassengerDeptID == selectedValues.department[0].id
                : dept.MerchantDeptID == selectedValues.department[0].id
            ),
          }));
        }
        //   dispatch(updateApplicationStart(selectedValues));
      }
    }
  }, [
    clean,
    departments,
    disableSelect.Vessel,
    positions,
    selectedValues.department,
    selectedValues.vesselType,
    vesselTypes,
  ]);

  useEffect(() => {
    if (
      recruitmentStage &&
      selectedValues.department[0].id &&
      selectedValues.vesselType[0].id &&
      selectedValues.position[0].id
    ) {
      setDisableSeafarerData(false);
    } else {
      setDisableSeafarerData(true);
    }
  }, [recruitmentStage, selectedValues]);

  const handleEmail = (e) => {
    setEmail(e);
    // dispatch(updateSeafarerEmail(e))
  };

  useEffect(() => {
    if (email) {
      const isEmailValid = validateEmail(email);
      setEmailValid(isEmailValid);
    }
  }, [email]);

  const handlePassword = (e) => {
    setPassword(e);
  };

  const handleGeneratePassword = () => {
    const generated = generatePassword(10);
    setPassword(generated);
  };

  useEffect(() => {
    if (password) {
      const isPasswordValid = validatePassword(password);
      setPasswordValid(setPasswordValid(isPasswordValid.isValid));
      console.log(isPasswordValid);
    }
  }, [password]);

  const handleProfileChange = (e) => {
    console.log(e);
  };

  const handleCreateSeafarer = () => {
    const data = {
      email,
      password,
      seafarerData: profile,
    };
    console.log(data);
  };

  return (
    <section className="p-4">
      <Drawer
        open={isOpen}
        onClose={handleClose}
        position="right"
        className="md:w-1/3"
      >
        <Drawer.Header
          title="New Applicants Drafts"
          titleIcon={() => <HiDotsVertical className="h-4 w-4 mr-2" />}
        />
        <Drawer.Items>
          <section className="space-y-5">
            <div>
              <button
                // onClick={}
                className="text-sm font-sans text-green-500 hover:text-white bg-green-50 hover:bg-green-500 py-2 px-4 rounded flex items-center gap-2 transition-all duration-200"
              >
                Save Current Data as Draft
              </button>
            </div>
            <Card className="rounded-md max-h-60 overflow-y-auto mt-2 shadow-md">
              <Table className="table-auto w-full">
                <Table.Head>
                  <Table.HeadCell>Added By</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {drafts.length < 1 ? (
                    <Table.Row>
                      <Table.Cell>{"--"}</Table.Cell>
                      <Table.Cell>{"--"}</Table.Cell>
                    </Table.Row>
                  ) : (
                    drafts.map((draft, index) => (
                      <Popover
                        arrow={false}
                        key={index}
                        content={
                          <div className="flex justify-center gap-2">
                            <button
                              className={`border border-blue-300 bg-white text-blue-600 size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed`}
                              onClick={() => {}}
                            >
                              <HiDocumentDownload className="h-4 w-4" />
                              <span className="hidden md:block ">Load</span>
                            </button>
                            <button
                              className={`border border-red-600 bg-red-600 text-white size-10 md:w-28 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed`}
                              onClick={() => {}}
                            >
                              <HiXCircle className="h-4 w-4" />
                              <span className="hidden md:block ">Delete</span>
                            </button>
                          </div>
                        }
                      >
                        <Table.Row className="hover:bg-gray-100 cursor-pointer">
                          <Table.Cell>
                            <div className="flex flex-col">
                              <span>{draft.addedBy}</span>
                              <span className="text-xs font-light">
                                {"on: " + draft.createdOn}
                              </span>
                            </div>
                          </Table.Cell>
                          <Table.Cell>{draft.name || "--"}</Table.Cell>
                        </Table.Row>
                      </Popover>
                    ))
                  )}
                </Table.Body>
              </Table>
            </Card>
          </section>
        </Drawer.Items>
      </Drawer>
      {props.isModal ? (
        <div className="flex justify-center">
          <span>Add New Applicant</span>
        </div>
      ) : (
        <div className="flex justify-between">
          <h1 className="md:pl-5 text-lg md:text-lg text-black font-bold">
            Add New Applicant
          </h1>
          <div className="flex flex-row gap-2 items-center">
            <button
              className="border border-[#010064] bg-[#010064] text-white size-10 md:w-48 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-[#262550] disabled:opacity-30"
              onClick={() => handleCreateSeafarer()}
              disabled={disableSeafarerData}
            >
              <HiOutlinePlus className="h-4 w-4" />
              <span className="hidden md:block ">Add New Applicant</span>
            </button>
            {/* <button
              className="border border-blue-300 bg-white text-blue-600 size-10 md:w-28 md:h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
              onClick={() => setIsOpen(true)}
            >
              <HiDotsVertical className="h-4 w-4" />
              <span className="hidden md:block ">Drafts</span>
            </button> */}
          </div>
        </div>
      )}
      <div className="space-y-3 my-3">
        <Card className="space-y-2">
          <span className="font-light text-md text-zinc-500">Basic Data:</span>
          <div className="flex flex-col md:flex-row gap-3 items-end">
            <SelectComponents
              data={vesselTypes}
              name="vesselType"
              idKey="Id"
              valueKey="Name"
              className="flex-grow md:pr-4"
              valueDefault="Recruitment Department"
              id="vesselType"
              classnamediv=""
              classelect="truncate overflow-ellipsis m-auto"
              onChange={(value) => handleSelectChange(value, "vesselType")}
              disabled={disableSelect.Vessel}
              name_valor={true}
              initialValue={selectedValues.vesselType[0].id}
              isValid={selectedValues.vesselType[0].id}
            />
            <SelectComponents
              data={datafilter.Departament}
              name="department"
              idKey="Id"
              valueKey="DepartmentName"
              className="flex-grow pt-7 md:pr-4 md:pt-0 "
              valueDefault="Department"
              id="Department"
              classnamediv=""
              classelect="truncate overflow-ellipsis m-auto"
              onChange={(value) => handleSelectChange(value, "department")}
              disabled={disableSelect.Departament}
              name_valor={true}
              initialValue={selectedValues.department[0].id}
              isValid={selectedValues.department[0].id}
            />
            <SelectComponents
              data={datafilter.Position}
              name="position"
              idKey="Id"
              valueKey="PositionName"
              className="flex-grow pt-7 md:pt-0 "
              valueDefault="Position"
              id="Position"
              classelect="truncate overflow-ellipsis m-auto"
              classnamediv=""
              name_valor={true}
              onChange={(value) => handleSelectChange(value, "position")}
              disabled={disableSelect.Position}
              initialValue={selectedValues.position[0].id}
              isValid={selectedValues.position[0].id}
            />
            <SelectComponents
              data={stageData}
              name="stage"
              idKey="Id"
              valueKey="StageName"
              className="flex-grow pt-7 md:pt-0 "
              valueDefault="Recruitment Stage"
              id=""
              classelect="truncate overflow-ellipsis m-auto"
              classnamediv=""
              name_valor={false}
              onChange={(e) => handleStageChange(e.target.value)}
              isValid={recruitmentStage}
            />
          </div>
          <div className="flex flex-row gap-3 items-end">
            <InputText
              type="email"
              label="Email*"
              value={email}
              name="email"
              onChange={(e) => handleEmail(e.target.value)}
              classname={""}
              isValid={!emailValid ? false : true}
              helpertext={!emailValid ? "Invalid E-mail" : ""}
              required
            />
            <YesNoInput
              disabled={!email || !emailValid ? true : false}
              text="Create Account"
              name="createAccount"
              onChange={(e) => setCreateAccount(e.target.value)}
              // onChange={(e) => console.log(e.target.value)}
            />
          </div>
          {createAccount && (
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-start mt-3 transition-all duration-75">
              <div className="flex">
                <section className="flex">
                  <InputText
                    type={showPassword ? "text" : "password"}
                    label="Password*"
                    value={password}
                    name="password"
                    onChange={(e) => handlePassword(e.target.value)}
                    classname={"flex-grow w-full"}
                    // isValid={passwordValid && formSubmitted ? false : true}
                    // helpertext={
                    //   !!passwordValid && formSubmitted ? passwordValid : ""
                    // }
                    // helpertext={!!passwordValid && formSubmitted ? passwordValid : ""}
                    // color={!!passwordValid && formSubmitted ? "error" : "default"}
                    required
                  />
                  <div
                    onClick={toggleShowPassword}
                    className="w-6 h-6 -translate-x-8 cursor-pointer items-start translate-y-4"
                  >
                    {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                  </div>
                  <button
                    className="border border-blue-300 bg-white text-blue-600 w-28 h-10 flex gap-2 justify-center items-center rounded-lg text-sm hover:bg-blue-50"
                    onClick={() => handleGeneratePassword()}
                  >
                    Generate
                  </button>
                </section>
              </div>
            </div>
          )}
        </Card>
        <Card>
          <span className="font-light text-md text-zinc-500">
            Seafarer Data:
          </span>
          {disableSeafarerData ? (
            <span>Complete the basic data.</span>
          ) : (
            <section>
              <div className="hidden md:flex flex-col items-center mt-3 overflow-x-auto">
                <Button.Group>
                  <Button color="gray" onClick={() => setCurrentTab("1")}>
                    {/* <HiUserCircle className="mr-3 h-4 w-4" /> */}
                    {tabs[0].value}
                  </Button>
                  <Button color="gray" onClick={() => setCurrentTab("2")}>
                    {/* <HiAdjustments className="mr-3 h-4 w-4" /> */}
                    {tabs[1].value}
                  </Button>
                  <Button color="gray" onClick={() => setCurrentTab("3")}>
                    {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                    {tabs[2].value}
                  </Button>
                  <Button color="gray" onClick={() => setCurrentTab("4")}>
                    {/* <HiCloudDownload className="mr-3 h-4 w-4" /> */}
                    {tabs[3].value}
                  </Button>
                </Button.Group>
              </div>
              <section className="w-auto overflow-x-auto">
                {!currentTab ? (
                  <LoadingState />
                ) : currentTab === "1" ? (
                  <Suspense fallback={<LoadingState />}>
                    <RecruitmentSeafarerProfile
                      isNew={true}
                      data={profile.seafarerData?.seafarerProfile}
                      uid={profile.uid}
                      onChange={(e) => console.log(e)}
                      //   disabled={userData.profileUpdate || false}
                    />
                  </Suspense>
                ) : currentTab === "2" ? (
                  <Suspense fallback={<LoadingState />}>
                    <RecruitmentDocuments
                      documentsData={
                        profile.seafarerData?.seafarerDocument || []
                      }
                      additionalData={
                        profile.seafarerData?.additionalDocuments || []
                      }
                      seafarerData={{
                        uid: profile?.uid,
                        firstName:
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.firstName,
                        lastName:
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.lastName,
                      }}
                      //   onChange={(e) => handleDocumentsChange(e)}
                      //   disabled={userData.profileUpdate || false}
                      // onChange={(e) => console.log(e)}
                    />
                  </Suspense>
                ) : currentTab === "3" ? (
                  <Suspense fallback={<LoadingState />}>
                    <RecruitmentCertificates
                      certificatesData={
                        profile.seafarerData?.seafarerCertificates || []
                      }
                      additionalData={
                        profile.seafarerData?.additionalCertificates || []
                      }
                      seafarerData={{
                        uid: profile?.uid,
                        firstName:
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.firstName,
                        lastName:
                          profile.seafarerData?.seafarerProfile?.profile
                            ?.lastName,
                      }}
                      //   onChange={(e) => handleCertificatesChange(e)}
                      //   disabled={userData.profileUpdate || false}
                    />
                  </Suspense>
                ) : currentTab === "4" ? (
                  <Suspense fallback={<LoadingState />}>
                    <RecruitmentSkills
                      skillsData={profile.seafarerData?.skills}
                      positionData={profile.seafarerData?.position || []}
                      //   disabled={userData.profileUpdate || false}
                      // onChange={(e) => handleSkillsChange(e)}
                    />
                  </Suspense>
                ) : (
                  <Suspense fallback={<LoadingState />}>
                    <div>User Account Manager</div>
                  </Suspense>
                )}
              </section>
            </section>
          )}
        </Card>
      </div>
    </section>
  );
};

export default NewApplicant;
