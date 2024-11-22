import { useState, useCallback } from "react";
import Pregunta from "./Pregunta";
import { useEffect } from "react";

export default function PreguntasForm7({ resp, profile }) {
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [justificaciones, setJustificaciones] = useState(Array(32).fill(""));

  const preguntasRespuestas = [
    {
      pregunta:
        "1. What can you tell us about your experience working on board?",
      respuesta: resp?.newquestion1 || "",
      justification: null,
    },
    {
      pregunta:
        "2. How many years of experience do you have working in this position?",
      respuesta: resp?.newquestion2 || "",
      justification: null,
    },
    {
      pregunta:
        "3. Let's talk little bit about you, and what do you expect from this job?",
      respuesta: resp?.newquestion3 || "",
      justification: null,
    },
    {
      pregunta: "4. Are you currently employed",
      respuesta: resp?.newquestion4 !== undefined ? resp?.newquestion4 : null,
      justification: null,
    },
    {
      pregunta:
        "5. If your answer is no, why did you come out of the last job?",
      respuesta: resp?.newquestion5 || "",
      justification: null,
    },
    {
      pregunta:
        "6. Would you like to work on a cruise ship or in a merchant vessel?",
      respuesta: resp?.newquestion6 || "",
      justification: null,
    },
    {
      pregunta:
        "7. Would you be willing to share the cabin with other staff who might be of other nationalities? (not apply for merchant vessel)",
      respuesta: resp?.newquestion7 || "",
      justification: null,
    },
    {
      pregunta:
        "8. Are you currently studying? (Not apply for merchant Vessel)",
      respuesta: resp?.newquestion8 || "",
      justification: null,
    },
    {
      pregunta:
        "9. Let's talk little bit about you, and what do you expect from this job?",
      respuesta: resp?.newquestion9 || "",
      justification: null,
    },
    {
      pregunta:
        "10. Have you ever been arrested (or have a pervious / currently legal problem subject to criminal prosecution?",
      respuesta: resp?.newquestion10 !== undefined ? resp?.newquestion10 : null,
      justification: resp?.newquestion10Why || "",
    },
    {
      pregunta: "11. Have you ever applied for an US VISA C1D?",
      respuesta: resp?.newquestion11 !== undefined ? resp?.newquestion11 : null,
      justification: null,
    },
    {
      pregunta: "12. If your answer is yes: Has it been denied?",
      respuesta: resp?.newquestion12 !== undefined ? resp?.newquestion12 : null,
      justification: null,
    },
    {
      pregunta: "13. Have you ever been deported or have a VISA Cancelled?",
      respuesta: resp?.newquestion13 !== undefined ? resp?.newquestion13 : null,
      justification: null,
    },
    {
      pregunta: "14. Have you ever studied or worked in the United States?",
      respuesta: resp?.newquestion14 !== undefined ? resp?.newquestion14 : null,
      justification: null,
    },
    {
      pregunta:
        "15. Do you have any physical limitations, preventing you from being able to perform the position you are applying for?",
      respuesta: resp?.newquestion15 !== undefined ? resp?.newquestion15 : null,
      justification: null,
    },
    {
      pregunta: "16. Please, confirm your height and weight?",
      respuesta: resp?.newquestion16 || "",
      justification: null,
    },
    ,
    {
      pregunta:
        "17. Have you suffered from any accident or serious Illness causing a medical condition that requires some sort of treatment to keep you under controlled medication?",
      respuesta: resp?.newquestion17 !== undefined ? resp?.newquestion17 : null,
      justification: null,
    },
    {
      pregunta: "18. Do you use any kind of illegal drugs",
      respuesta: resp?.newquestion18 !== undefined ? resp?.newquestion18 : null,
      justification: null,
    },
    {
      pregunta:
        "19. Would you be willing to work on board the ship, for a period of 6 to 8 months, away from your family and friends, working 10 - 12 hours a day, 7 days a week?",
      respuesta: resp?.newquestion19 !== undefined ? resp?.newquestion19 : null,
      justification: null,
    },
    {
      pregunta:
        "20. If I ask the person responsible in your previous job, what could he or she tell me about your work habits, punctuality, and reason for your departure? ",
      respuesta: resp?.newquestion20 !== undefined ? resp?.newquestion20 : null,
      justification: null,
    },
    {
      pregunta:
        "21. What qualities do you have for the position you are applying for?",
      respuesta: resp?.newquestion21 || "",
      justification: null,
    },
    {
      pregunta:
        "22. Where would you like you be in your career five years from now? ",
      respuesta: resp?.newquestion22 || "",
      justification: null,
    },
    {
      pregunta: "23. What do you know about our company and what we do? ",
      respuesta: resp?.newquestion23 || "",
      justification: null,
    },
    {
      pregunta:
        "24. According to your resumen, what has been your experience in your last 3 years",
      respuesta: resp?.newquestion24 || "",
      justification: null,
    },
    {
      pregunta:
        "25. What was the largest tonnage ship you have workend on, and what was your rank on that ship? \n\n Note: As an applicant you should keep in mind that based on your previousexperiences and skills you may be offered a lower position when your application in evaluated. ",
      respuesta: resp?.newquestion25 || "",
      justification: null,
    },
    {
      pregunta:
        "26. What can you tell us about the types of merchant ships you have workend on? ",
      respuesta: resp?.newquestion26 || "",
      justification: null,
    },
    {
      pregunta:
        "27. Have you had any type of reprimand or warning for poor performance in the companies that you have workend?",
      respuesta: resp?.newquestion27 || "",
      justification: null,
    },
    {
      pregunta:
        "28. How would you motivate your employees and foster teamwork? (Only cruise vessels) ",
      respuesta: resp?.newquestion28 || "",
      justification: null,
    },
    {
      pregunta:
        "29. What is your major weakness and your biggest strength? (Only cruise vessels)",
      respuesta: resp?.newquestion29 || "",
      justification: null,
    },
    {
      pregunta:
        "30. How do you think your previous work experience will benefit you in these positions? (Only cruise vessels)",
      respuesta: resp?.newquestion30 || "",
      justification: null,
    },
    {
      pregunta: "31. Why did you choose this position? (Only cruise vessels)",
      respuesta: resp?.newquestion31 || "",
      justification: null,
    },
    {
      pregunta:
        "32. Why do you have gaps in your employment history? (if apply it)",
      respuesta: resp?.newquestion32 || "",
      justification: null,
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
      {preguntasRespuestas.map((item, index) => {
        return (
          <Pregunta
            key={index}
            item={item}
            index={index}
            altura={altura}
            setAltura={setAltura}
            peso={peso}
            setPeso={setPeso}
            justificaciones={justificaciones}
            handleJustificacionChange={handleJustificacionChange}
            resp={resp}
            prof={profile}
          />
        );
      })}
    </>
  );
}
