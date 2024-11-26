import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { IoBoatOutline } from "react-icons/io5";
import { MdOutlineFactCheck, MdOutlineRoomService } from "react-icons/md";
import { AddSomethingTable } from "../../application/applicationProfile/components/AddSomethingTable";
import {
  FormsOnBoard,
  FormsOnLand,
  Skill,
} from "../../application/applicationSkill/components";
import { Alert, Card, Checkbox, Label } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import {
  updateSeafarerOnboardDetails,
  updateSeafarerOnlandDetails,
  updateSeafarerSkills,
} from "../../../store/currentViews/viewSlice";
import { useSelector } from "react-redux";
import { LoadingState } from "../../../components/skeleton/LoadingState";

const RecruitmentSkills = ({
  skillsData,
  positionData,
  onChange,
  disabled = false,
}) => {
  const { profile, positions } = useSelector((state) => state.currentViews);
  const [position, setPosition] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (positions) {
      const currentPosition = profile.seafarerData.position[0].id;
      const filteredPosition = positions.find(
        (position) => position.Id == currentPosition
      ).CVFormatId;
      setPosition(filteredPosition);
    }
  }, [profile, positions]);

  // Memoized handler for dispatching skill updates
  const handleSkillsChange = useCallback(
    (updatedData, field) => {
      // onChange(true); // Trigger external onChange handler
      const updatedSkills = { ...skillsData, [field]: updatedData };
      if (updatedSkills !== skillsData) {
        // console.log(updatedSkills);
        dispatch(updateSeafarerSkills(updatedSkills));
      }
    },
    [skillsData, dispatch]
  );

  const handleOnboard = (e) => {
    const { name, checked } = e.target;
    const newObject = {
      ...profile?.seafarerData?.onboardJustified,
      [name]: checked,
    };
    const isJustified = Object.entries(newObject)
      .filter(([key]) => key !== "justified")
      .some(([, value]) => value === true);

    dispatch(
      updateSeafarerOnboardDetails({ ...newObject, justified: isJustified })
    );
  };

  const handleOnland = (e) => {
    const { name, checked } = e.target;
    const newObject = {
      ...profile?.seafarerData?.onlandJustified,
      [name]: checked,
    };
    const isJustified = Object.entries(newObject)
      .filter(([key]) => key !== "justified")
      .some(([, value]) => value === true);

    // Actualizar el estado con `justified` y el nuevo objeto
    dispatch(
      updateSeafarerOnlandDetails({
        ...newObject,
        justified: isJustified,
      })
    );
  };

  const dataByOrder = (data) => {
    if (!data) {
      return [];
    }
    const sortedData = [...data].sort(
      (a, b) => new Date(b.dateOn) - new Date(a.dateOn)
    );
    return sortedData;
  };

  return (
    <>
      <section>
        <TabGroup className="pt-8">
          <TabList className="flex flex-row justify-center bg-white">
            {/* On Board Tab */}
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 flex flex-col md:flex-row py-2 text-sm text-black items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <IoBoatOutline className="w-7 h-7" />
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">ON BOARD EXPERIENCE</span>
            </Tab>

            {/* On Land Tab */}
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 md:translate-y-0 h-15 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <MdOutlineRoomService className="w-7 h-7" />
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">ON LAND EXPERIENCE</span>
            </Tab>

            {/* Skills Tab */}
            <Tab className="data-[selected]:border-b-2 border-blue-500 px-2 py-2 text-sm text-black flex flex-col md:flex-row items-center justify-center md:w-56 relative">
              <div className="relative flex items-center">
                <MdOutlineFactCheck className="w-7 h-7" />
              </div>
              <span className="mt-2 md:mt-0 md:ml-2">SKILLS</span>
            </Tab>
          </TabList>

          <TabPanels>
            {/* On Board Experience Panel */}
            <TabPanel className="items-center">
              <section className="flex flex-col gap-3  justify-center text-xs mt-5 ml-5">
                <span className="font-bold text-gray-500">
                  Experience on board details
                </span>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="dischargeLetter"
                      name="dischargeLetter"
                      checked={
                        profile?.seafarerData?.onboardJustified?.dischargeLetter
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
                        profile?.seafarerData?.onboardJustified
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
                        profile?.seafarerData?.onboardJustified
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
                        profile?.seafarerData?.onboardJustified?.stampedSb
                      }
                      onChange={(e) => handleOnboard(e)}
                    />
                    <Label htmlFor="stampedSb">Stamped Seamanbook</Label>
                  </div>
                </div>
              </section>
              <AddSomethingTable
                formTitle={"On Board Experience"}
                bgClassName=""
                headers={[
                  "Date on",
                  "Date off",
                  "Company name",
                  "Vessel name",
                  "Imo #",
                  "GT/HP",
                  "Type of vessel",
                  "Rank/position",
                  "Attach",
                ]}
                disabled={disabled}
                newFormData={
                  skillsData?.onboard ? dataByOrder(skillsData?.onboard) : []
                }
                childrenForm={
                  <FormsOnBoard
                    userData={{
                      uid: profile?.uid,
                      firstName:
                        profile?.seafarerData?.seafarerProfile?.profile
                          ?.firstName || "",
                      lastName:
                        profile?.seafarerData?.seafarerProfile?.profile
                          ?.lastName || "",
                    }}
                  />
                }
                onDataChange={(e) => {
                  if (e !== skillsData?.onboard) {
                    handleSkillsChange(e, "onboard");
                  }
                }}
              />
            </TabPanel>

            {/* On Land Experience Panel */}
            <TabPanel className="items-center">
              <section className="flex flex-col gap-3  justify-center text-xs mt-5 ml-5">
                <span className="font-bold text-gray-500">
                  Experience on land details
                </span>
                <div className="flex flex-col md:flex-row gap-5">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="referenceLetter"
                      name="referenceLetter"
                      checked={
                        profile?.seafarerData?.onlandJustified?.referenceLetter
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
                        profile?.seafarerData?.onlandJustified?.referenceContact
                      }
                      onChange={(e) => handleOnland(e)}
                    />
                    <Label htmlFor="referenceContact">Reference Contact</Label>
                  </div>
                </div>
              </section>
              <AddSomethingTable
                formTitle={"On Land Experience"}
                bgClassName=""
                headers={[
                  "Date on",
                  "Date off",
                  "Company name",
                  "Name of Contact Person And Telephone number",
                  "Duties or responsibilities",
                  "Rank/position",
                  "Reason for leaving",
                  "Attach",
                ]}
                disabled={disabled}
                newFormData={dataByOrder(skillsData?.onland) || []}
                childrenForm={
                  <FormsOnLand
                    userData={{
                      uid: profile.uid,
                      firstName:
                        profile.seafarerData?.seafarerProfile?.profile
                          ?.firstName || "",
                      lastName:
                        profile.seafarerData?.seafarerProfile?.profile
                          ?.lastName || "",
                    }}
                  />
                }
                onDataChange={(e) => {
                  if (e !== skillsData?.onland) {
                    handleSkillsChange(e, "onland");
                  }
                }}
              />
            </TabPanel>

            {/* Skills Panel */}
            <TabPanel>
              {position?.CVFormatId !== "1" ? (
                <Skill
                  positions={position || ""}
                  data={skillsData?.skill || []}
                  onchangedata={(value) => handleSkillsChange(value, "skill")}
                />
              ) : (
                <div className="flex justify-center items-center pt-12 pb-5 ">
                  <Alert color="success" icon={HiInformationCircle} rounded>
                    <span className="font-bold">
                      The selected position does not require specific skills.
                    </span>
                  </Alert>
                </div>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>
    </>
  );
};

// Named export to prevent Fast Refresh issues
export default React.memo(RecruitmentSkills);
