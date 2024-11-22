import { useState, useEffect } from "react";
import {
  TableComponent,
  ModalYesNo,
  ButtonIcon,
} from "../../../components/layoutComponents";
import { IoBoatOutline } from "react-icons/io5";
import { MdOutlineFactCheck, MdOutlineRoomService } from "react-icons/md";
import { GoPlusCircle } from "react-icons/go";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { FormsOnBoard, FormsOnLand, Skill } from "./components";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  updateApplicationFirestore,
  updateApplicationOnboardDetails,
  updateApplicationOnlandDetails,
  updateApplicationSkill,
  updateApplicationStage,
} from "../../../store/userData";
import { Button, Alert, Tooltip, Checkbox, Label } from "flowbite-react";
import toast from "react-hot-toast";
import {
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
  HiInformationCircle,
} from "react-icons/hi";
import { getPositions } from "../../../util/services";
import { FormPrompt } from "../../../hooks/FormPrompt";

export function ApplicationSkill({ disabled = false }) {
  const dispatch = useDispatch();
  const { userData, isSaving } = useSelector((state) => state.userData);
  const { uid } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const openModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setEditData(null);
  };
  const [position, setPosition] = useState("");
  const [formData, setFormData] = useState(
    userData.applicationData.skills
      ? userData.applicationData.skills
      : {
          onboard: [],
          onland: [],
          skill: [],
        }
  );
  const [isOnBoardValid, setIsOnBoardValid] = useState(true);
  const [isSkillsValid, setIsSkillsValid] = useState(true);

  const headers = {
    onboard: [
      "Date on",
      "Date off",
      "Company name",
      "Vessel name",
      "Imo #",
      "GT/HP",
      "Type of vessel",
      "Rank/position",
    ],
    onland: [
      "Date on",
      "Date off",
      "Company name",
      "Name of Contact Person And Telephone number",
      "Duties or responsibilities",
      "Rank/position",
      "Reason for leaving",
    ],
  };
  const [editData, setEditData] = useState(null);

  const loadResults = async () => {
    try {
      const dataposition = await getPositions();

      setPosition(
        dataposition.filter(
          (item) =>
            item.Id == userData.applicationData.startApplication.position[0].id
        )
      );
      // console.log(
      //   dataposition.filter(
      //     (item) =>
      //       item.Id == userData.applicationData.startApplication.position[0].id
      //   )
      // );
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    loadResults();
  }, []);

  const handleInputChange = (valor, value, data) => {
    const updateData = (prevDataArray) => {
      if (value === 0) {
        const newFormData = [...prevDataArray, data];
        return newFormData.sort(
          (a, b) => new Date(b.Dateon) - new Date(a.Dateon)
        );
      } else if (value === 1) {
        const updatedFormData = prevDataArray.map((item, index) => {
          if (index === editData.id) {
            return { ...data };
          }
          return item;
        });
        return updatedFormData.sort(
          (a, b) => new Date(b.Dateon) - new Date(a.Dateon)
        );
      }
    };

    setFormData((prevFormData) => {
      const prevDataArray = prevFormData[valor] || [];
      return {
        ...prevFormData,
        [valor]: updateData(prevDataArray),
      };
    });
    setEditData(null);
    closeModal();
    setUnsavedChanges(true);
  };

  // const handleAddItem = () => {
  //   console.log(formData);
  //   console.log(editData);
  // };

  const handle = (value) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        skill: value,
      };
    });
    setUnsavedChanges(true);
  };
  const handleBack = (e) => {
    e.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          4
        )
      ),
      {
        loading: "Saving...",
        success: <b>Progress Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setUnsavedChanges(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          userData.uid,
          userData.applicationData,
          true,
          6
        )
      ),
      {
        loading: "Saving...",
        success: <b>Progress Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setUnsavedChanges(false);
  };

  const handleEdit = (valor, id) => {
    if (valor === "onboard" || valor === "onland" || valor === "skill") {
      const item = formData[valor].find((_, index) => index === id);
      if (item) {
        setEditData({ id, data: item });
      }
    }
    setIsOpen(true);
  };

  const handleDelete = (valor, indexToDelete) => {
    if (formData && formData[valor]) {
      setFormData((prevFormData) => {
        const updatedArray = prevFormData[valor].filter(
          (_, index) => index !== indexToDelete
        );
        return {
          ...prevFormData,
          [valor]: updatedArray,
        };
      });
    } else {
      console.error(`Invalid valor: ${valor}`);
    }
    setUnsavedChanges(true);
  };

  const enviar = (event) => {
    event.preventDefault();
    toast.promise(
      dispatch(
        updateApplicationFirestore(
          uid,
          userData.applicationData,
          false,
          userData.applicationStage
        )
      ),
      {
        loading: "Saving...",
        success: <b>Saved!</b>,
        error: <b>Ups! Something went wrong. Try again</b>,
      }
    );
    setUnsavedChanges(false);
  };

  useEffect(() => {
    dispatch(updateApplicationSkill(formData));

    if (
      formData?.onboard?.length < 1 &&
      userData.applicationData.startApplication.vesselType[0].id === "2"
    ) {
      setIsOnBoardValid(false);
    } else {
      setIsOnBoardValid(true);
    }

    if (formData.skill?.length > 0) {
      if (formData.skill.some((skill) => skill.check === true)) {
        setIsSkillsValid(true);
      } else {
        setIsSkillsValid(false);
      }
    }
  }, [formData]);

  const isOnLandValid = true;

  const disabledStyle = disabled ? "opacity-50" : "";
  const handleOnboard = (e) => {
    const { name, checked } = e.target;
    const newObject = {
      ...userData.applicationData.onboardJustified,
      [name]: checked,
    };
    const isJustified = Object.entries(newObject)
      .filter(([key]) => key !== "justified")
      .some(([, value]) => value === true);

    dispatch(
      updateApplicationOnboardDetails({ ...newObject, justified: isJustified })
    );
  };

  const handleOnland = (e) => {
    const { name, checked } = e.target;
    const newObject = {
      ...userData.applicationData.onlandJustified,
      [name]: checked,
    };
    const isJustified = Object.entries(newObject)
      .filter(([key]) => key !== "justified")
      .some(([, value]) => value === true);

    // Actualizar el estado con `justified` y el nuevo objeto
    dispatch(
      updateApplicationOnlandDetails({
        ...newObject,
        justified: isJustified,
      })
    );
  };

  return (
    <>
      <FormPrompt hasUnsavedChanges={unsavedChanges} />
      <section className="">
        <TabGroup className="pt-8">
          <TabList className="flex flex-row  justify-center bg-white ">
            {/* <Tab className="data-[selected]:bg-[#1976d2] p-1 rounded-lg border border-separate  data-[selected]:text-white data-[hover]:underline flex items-center justify-center">
              <IoBoatOutline className="w-7 h-7" /> ON BOARD
            </Tab>
            <Tab className="data-[selected]:bg-[#1976d2] p-1 rounded-lg border border-separate data-[selected]:text-white data-[hover]:underline flex items-center justify-center">
              <MdOutlineRoomService className="w-7 h-7" /> ON LAND
            </Tab>
            <Tab className="data-[selected]:bg-[#1976d2] p-1 w-28  rounded-lg border border-separate data-[selected]:text-white data-[hover]:underline flex items-center justify-center">
              <MdOutlineFactCheck className="w-7 h-7" /> SKILL
            </Tab> */}
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <IoBoatOutline className="w-7 h-7" />
                {!isOnBoardValid && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">ON BOARD EXPERIENCE</span>
            </Tab>
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <MdOutlineRoomService className="w-7 h-7" />
                {!isOnLandValid && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">ON LAND EXPERIENCE</span>
            </Tab>

            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <MdOutlineFactCheck className="w-7 h-7" />
                {!isSkillsValid && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    !
                  </span>
                )}
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">SKILLS</span>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel className="items-center">
              <section
                className={`flex flex-col gap-3  justify-center text-xs mt-5 ml-5 ${
                  userData.role !== 3 ? "" : "hidden"
                }`}
              >
                <span className="font-bold text-gray-500">
                  Experience on board details
                </span>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="dischargeLetter"
                      name="dischargeLetter"
                      checked={
                        userData.applicationData.onboardJustified
                          ?.dischargeLetter
                      }
                      onChange={(e) => handleOnboard(e)}
                    />
                    <Label htmlFor="dischargeLetter">Discharge Letter</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="employmentLetter"
                      name="employmentLetter"
                      checked={
                        userData.applicationData.onboardJustified
                          ?.employmentLetter
                      }
                      onChange={(e) => handleOnboard(e)}
                    />
                    <Label htmlFor="employmentLetter">Employment Letter</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="evaluationsOnboard"
                      name="evaluationsOnboard"
                      checked={
                        userData.applicationData.onboardJustified
                          ?.evaluationsOnboard
                      }
                      onChange={(e) => handleOnboard(e)}
                    />
                    <Label htmlFor="evaluationsOnboard">
                      Evaluations on board
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="stampedSb"
                      name="stampedSb"
                      checked={
                        userData.applicationData.onboardJustified?.stampedSb
                      }
                      onChange={(e) => handleOnboard(e)}
                    />
                    <Label htmlFor="stampedSb">Stamped Seamanbook</Label>
                  </div>
                </div>
              </section>
              <form className={disabledStyle}>
                {/* <fieldset disabled={disabled}> */}
                <ButtonIcon
                  onClick={openModal}
                  classnamebtn="bg-[#1976d2]"
                  classname="flex justify-center md:justify-end pt-7 pb-7"
                  label="Add"
                  icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
                />
                {
                  <ModalYesNo
                    size="4xl"
                    text="ADD NEW EXPERIENCE ON BOARD"
                    disableButtonConfirm={true}
                    disableButtonCancel={true}
                    isOpen={isOpen}
                    closeModal={closeModal}
                  >
                    <FormsOnBoard
                      onDataChange={(value, data) =>
                        handleInputChange("onboard", value, data)
                      }
                      editData={editData}
                      userData={userData}
                      validate
                    />
                  </ModalYesNo>
                }
                {!isOnBoardValid && (
                  <div className="py-3">
                    <Alert color="failure" icon={HiInformationCircle}>
                      Provide, at least, one (1) line of experience on board. If
                      you do not have any experience on board we recommend you
                      <span className="font-medium">
                        {" select a different position."}
                      </span>
                    </Alert>
                  </div>
                )}
                <TableComponent
                  items={formData.onboard}
                  headers={headers.onboard}
                  handleEdite={(value) => handleEdit("onboard", value)}
                  handleDelet={(value) => handleDelete("onboard", value)}
                />
                {/* </fieldset> */}
              </form>
            </TabPanel>
            <TabPanel className="items-center">
              <section
                className={`flex flex-col gap-3  justify-center text-xs mt-5 ml-5 ${
                  userData.role !== 3 ? "" : "hidden"
                }`}
              >
                <span className="font-bold text-gray-500">
                  Experience on land details
                </span>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="referenceLetter"
                      name="referenceLetter"
                      checked={
                        userData.applicationData.onlandJustified
                          ?.referenceLetter
                      }
                      onChange={(e) => handleOnland(e)}
                    />
                    <Label htmlFor="referenceLetter">Reference Letter</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="referenceContact"
                      name="referenceContact"
                      checked={
                        userData.applicationData.onlandJustified
                          ?.referenceContact
                      }
                      onChange={(e) => handleOnland(e)}
                    />
                    <Label htmlFor="referenceContact">Reference Contact</Label>
                  </div>
                </div>
              </section>
              <form className={disabledStyle}>
                {/* <fieldset disabled={disabled}> */}
                <ButtonIcon
                  onClick={openModal}
                  classnamebtn="bg-[#1976d2]"
                  classname="flex justify-center md:justify-end pt-7 pb-7"
                  label="Add"
                  icon={<GoPlusCircle className="ml-2 h-5 w-5" />}
                />
                {
                  <ModalYesNo
                    size="4xl"
                    text="ADD NEW EXPERIENCE ON LAND"
                    disableButtonConfirm={true}
                    disableButtonCancel={true}
                    isOpen={isOpen}
                    closeModal={closeModal}
                  >
                    <FormsOnLand
                      onDataChange={(value, data) =>
                        handleInputChange("onland", value, data)
                      }
                      editData={editData}
                      userData={userData}
                    />
                  </ModalYesNo>
                }
                <TableComponent
                  items={formData.onland}
                  headers={headers.onland}
                  handleEdite={(value) => handleEdit("onland", value)}
                  handleDelet={(value) => handleDelete("onland", value)}
                />
                {/* </fieldset> */}
              </form>
            </TabPanel>
            <TabPanel>
              <form className={disabledStyle}>
                {/* <fieldset disabled={disabled}> */}
                {position[0]?.CVFormatId !== "1" ? (
                  <Skill
                    positions={position[0]?.CVFormatId || ""}
                    data={formData.skill}
                    onchangedata={(value) => handle(value)}
                  />
                ) : (
                  <div className="flex justify-center items-center pt-12 pb-5 ">
                    <Alert color="success" icon={HiInformationCircle} rounded>
                      <span className="font-bold">
                        The selected position does not require specific skills.
                      </span>
                      <br></br>
                    </Alert>
                  </div>
                )}
                {/* </fieldset> */}
              </form>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        {userData.role === 3 && userData.applicationStage < 7 && (
          <div className="flex items-center justify-center pt-7 pb-7 gap-8 ">
            <ButtonIcon
              icon={<HiOutlineArrowSmLeft className="mr-2 h-5 w-5 " />}
              classnamebtn="bg-[#1976d2]  items-center text-center"
              label="Back"
              left={true}
              onClick={handleBack}
            />

            {!(isOnBoardValid && isOnLandValid && isSkillsValid) ? (
              <Tooltip
                content="Make sure you filled all mandatory fields"
                style="light"
              >
                <ButtonIcon
                  onClick={handleConfirm}
                  classnamebtn="bg-[#1976d2]"
                  classname="flex justify-center"
                  label="Next Step"
                  icon={<HiOutlineArrowSmRight className="ml-2 h-5 w-5" />}
                  disabled
                />
              </Tooltip>
            ) : (
              <ButtonIcon
                onClick={handleConfirm}
                classnamebtn="bg-[#1976d2]"
                classname="flex justify-center"
                label="Next Step"
                icon={<HiOutlineArrowSmRight className="ml-2 h-5 w-5" />}
                disabled={false}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
