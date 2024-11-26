import React, { useState, useEffect } from "react";
import preguntas from "./preguntas.json";
import { getHeader, getPosition } from "./getHeaders";
export function Skill({ positions, data, onchangedata }) {
  const [skillData, setSkillData] = useState([]);
  useEffect(() => {
    console.log(positions);
    if (data && data.length > 0) {
      setSkillData(data);
    } else {
      if (positions) {
        const Skills = preguntas.filter(
          (item) => item.position === getPosition(positions)
        );
        setSkillData(Skills);
      }
    }
  }, [positions]);

  const handleCheckboxChange = (index) => {
    setSkillData((prevFormData) => {
      const updatedSkills = prevFormData.map((item) => {
        if (item.id === index) {
          return { ...item, check: !item.check };
        }
        return item;
      });
      return updatedSkills;
    });
  };

  useEffect(() => {
    if (skillData.length > 0) {
      const updatedSkills = skillData.map((item) => ({ ...item }));
      onchangedata(updatedSkills);
    }
  }, [skillData]);

  return (
    <>
      <div className="overflow-y-auto border p-4">
        <table className="table-fixed min-w-full border-b border-b-black">
          <thead>
            <tr>
              <th className="py-2 border-b text-sm text-black bg-slate-300 ">
                SKILLS / RESPONSIBILITIES / LEARNING EXPERIENCE / ACHIEVEMENTS
              </th>
              <th className="py-2 px-4 border-b text-sm text-black bg-slate-300">
                YES/NO
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <td
                colSpan={2}
                className="py-2 px-4 border-b bg-slate-200 text-center text-sm font-semibold"
              >
                MARK THE FOLLOW SKILLS /RESPONSIBILITIES / LEANING EXPERIENCE /
                ACHIEVEMENTS IF YOU HAVE KNOWLEDGE, COMPETENCE, AND EXPERIENCE
                ABOUT:
              </td>
            </tr>
            {skillData && skillData.length > 0 ? (
              skillData.map((item, index) => (
                <React.Fragment key={`fragment-${item.id}`}>
                  {positions.length > 0 &&
                    getHeader(getPosition(positions), index + 1) && (
                      <tr
                        key={`header-${positions}-${index + 1}`}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <td
                          colSpan={2}
                          className="py-2 px-4 border-b text-sm font-semibold bg-slate-200 text-center"
                        >
                          {getHeader(getPosition(positions), index + 1)}
                        </td>
                      </tr>
                    )}
                  <tr
                    key={`row-${item.id}`}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <td className="py-2 px-4 border-b text-sm text-justify">
                      {item.skill}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      <input
                        checked={item.check}
                        onChange={() => handleCheckboxChange(item.id)}
                        id={`check-${item.id}`}
                        type="checkbox"
                        className="w-5 h-5 md:w-4 md:h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <td colSpan={2} className="py-2 px-4 border-b text-center">
                  No skills available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
