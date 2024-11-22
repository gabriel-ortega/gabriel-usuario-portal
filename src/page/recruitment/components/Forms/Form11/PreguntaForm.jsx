import { useState, useCallback } from "react";
import Preguntas11 from "./Preguntas11";

export default function PreguntaForm({ resp }) {
  const [justificaciones, setJustificaciones] = useState(Array(11).fill(""));

  const preguntas = [
    {
      pregunta:
        "Have you registered with another placement agency in any other country?",
      respuesta:
        resp?.otherAgencyBoolean !== undefined ? resp.otherAgencyBoolean : null,
    },
    {
      pregunta:
        "Write a little about yourself and your experience (go into details about past experience / position you held)",
      respuesta: resp?.newquestion1 || "",
    },
    {
      pregunta:
        "Why do you want to work on a cruise ship / merchant vessel and what knowledge do you have about living on board a ship?",
      respuesta: resp?.newquestion2 || "",
    },
    {
      pregunta:
        "What languages are you fluent in? (Please include your native language)",
      respuesta: null,
    },
    {
      pregunta: "What languages can you read and write?",
      respuesta: null,
    },
    {
      pregunta:
        "Life on board is very different from life on land. Is there any reason why you can't commit to a 6- or 8-month on board assignment far away from your family and friends, working 10-12 hours a day, 7 days a week?",
      respuesta: resp?.newquestion3 || "",
    },
    {
      pregunta:
        "When living on board, it is possible to share a small cabin with another person; in some cases you may have to share with others up to three people from different parts of the world. How do you feel about this, and what would you do to adapt to this new lifestyle?",
      respuesta: resp?.newquestion4 || "",
    },
    {
      pregunta:
        "Working on a cruise ship / merchant vessel may require stretching, reaching, pulling, lifting up to 50 pounds, and sometimes working in a hot, humid environment. Is there a reason why you won't be able to perform these types of tasks or won't be able to adapt to such an environment?",
      respuesta: resp?.newquestion5 || "",
    },
    {
      pregunta: "What kind of activities do you enjoy in your free time?",
      respuesta: resp?.newquestion6 || "",
    },
    {
      pregunta: "JOB DESCRIPTION / INTERVIEW QUESTIONNAIRE FOR JOB REQUESTED",
      respuesta:
        "Refer to the job description and interview questionnaire, according to the position you will be interviewing for (LOGISTIC internal files)",
    },
    {
      pregunta:
        "Why should I refer you for a contract with a cruise/merchant line?",
      respuesta: resp?.newquestion7 || "",
    },
    {
      pregunta:
        "Comments from the person in charge of the interview by the Placement Agency:",
      respuesta: resp?.newquestion8 || "",
    },
  ];

  const handleJustificacionChange = useCallback((index, value) => {
    setJustificaciones((prevJustificaciones) => {
      const newJustificaciones = [...prevJustificaciones];
      newJustificaciones[index] = value;
      return newJustificaciones;
    });
  }, []);

  return (
    <>
      {preguntas.map((item, index) => {
        return (
          <Preguntas11
            key={index}
            item={item}
            index={index}
            justificaciones={justificaciones}
            handleJustificacionChange={handleJustificacionChange}
            resp={resp}
          />
        );
      })}
    </>
  );
}
