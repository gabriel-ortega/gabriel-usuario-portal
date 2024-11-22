import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Details from "./Details";
export default function Formulario13({
  data = {},
  interview = {},
  pos = [],
  interviewData = {},
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 25,
      left: 0,
      right: 0,
      paddingBottom: 45,

      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingBottom: 90,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "10 30 10 30",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
    },
    container: {
      paddingTop: 90,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
    },
  });

  // Función para convertir la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }

    // Ajustar la fecha sumando un día (24 horas)
    date.setUTCDate(date.getUTCDate() + 1);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate = interview?.interviewDate
    ? formatDate(interview.interviewDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");
  // Obtener el entrevistador

  const nameInterview = interview.interviewer.name;
  const firma = data?.signature?.url || null;
  const interviewId = interview?.interviewer?.id || "";
  const interviewers = interviewData || [];

  /*   // Buscar la firma según la coincidencia entre interviewId y uid*/
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="DESCRIPTION OF THE WORK TO BE DONE ON BOARD."
            text2=""
            code="F-PMSSA-13"
            revision="03"
            date="Dec 06th, 2023"
          />
        </View>

        <View style={styles.section}>
          <Details seafarerData={data?.seafarerData} pos={pos} />
          <Text style={[{ fontSize: "10px", paddingTop: 25 }]}>
            Crew member's statement:{" "}
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
              Logistic International Services Corporation{" "}
            </Text>
            has carried out the interview and has explained to me in detail from
            the first moment what my responsilities and tasks are on board, in
            accordance with my job description.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            I have received a copy of my job description on board. I have read
            and understood and believe that my work skills and experience
            qualify me to perform the functions described.
          </Text>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 20 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>Name of crewmember </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "400px",
                  paddingLeft: 5,
                  color: "#00008B",
                },
              ]}
            >
              {fullName}
            </Text>
          </View>
          {firma ? (
            <Image
              source={firma ? { uri: firma } : null}
              style={[
                {
                  width: 50,
                  height: 50,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 370,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 25 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>SIGN </Text>
            <Text
              style={[{ fontSize: "10px", borderBottom: 1, width: "150px" }]}
            ></Text>
          </View>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 10 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>DATE:</Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "150px",
                  color: "#00008B",
                },
              ]}
            >
              {formattedDate ? formattedDate : ""}
            </Text>
          </View>

          <Text style={[{ fontSize: "10px", paddingTop: 30 }]}>
            Concluding Remarks:
          </Text>
          <Text
            style={[{ fontSize: "10px", borderBottom: 1, paddingTop: 10 }]}
          ></Text>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 20 }]}
          >
            <Text style={[{ fontSize: "10px", paddingRight: 10 }]}>
              LOGISTIC Representative Name:{" "}
            </Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "400px",
                  paddingLeft: 10,
                  color: "#00008B",
                },
              ]}
            >
              {nameInterview}
            </Text>
          </View>
          {firmaEntrevistador ? (
            <Image
              source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
              style={[
                {
                  width: 50,
                  height: 50,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 510,
                },
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 25 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>Sign </Text>
            <Text
              style={[{ fontSize: "10px", borderBottom: 1, width: "150px" }]}
            ></Text>
          </View>

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 10 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>DATE:</Text>
            <Text
              style={[
                {
                  fontSize: "10px",
                  borderBottom: 1,
                  width: "150px",
                  color: "#00008B",
                },
              ]}
            >
              {formattedDate ? formattedDate : ""}
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
