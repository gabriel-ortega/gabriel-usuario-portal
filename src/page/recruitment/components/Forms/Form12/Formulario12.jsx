import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";
import Information from "./Information";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
export default function Formulario12({
  data = {},
  interview = {},
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
      margin: "10 20 20 20",
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

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="RECORDING OF LIFE ON BOARD VIDEOS AND"
            text2="TRAINING SEEN BY THE CREW MEMBER."
            code="F-PMSSA-12"
            revision="02"
            date="Dec 28th, 2022"
          />
        </View>

        <View style={styles.section}>
          <Information seafarerData={data?.seafarerData} />
          <Text style={[{ fontSize: "10px", paddingTop: 25 }]}>
            Crew member's statement:{" "}
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            I have seen and understood the videos presented about life on board
            as well as those related to the work to be performed, and I think
            that the information contained will help me understand the functions
            I will perform on board the ship and understand what life is like at
            sea.
          </Text>
          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 30 }]}
          >
            <Text style={[{ fontSize: "10px" }]}>CREW MEMBER'S NAME: </Text>
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
                  width: 70,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 275,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
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

          <Text style={[{ fontSize: "10px", marginRight: 10, paddingTop: 30 }]}>
            LOGISTIC Representative Name:{" "}
          </Text>
          <Text
            style={[
              {
                fontSize: "10px",
                borderBottom: 1,
                width: "300px",
                paddingLeft: 5,
                paddingTop: 20,
                color: "#00008B",
              },
            ]}
          >
            {nameInterview}
          </Text>
          {firmaEntrevistador ? (
            <Image
              source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
              style={[
                {
                  width: 70,
                  height: 70,
                  position: "absolute",
                  marginLeft: 60,
                  marginTop: 480,
                },
              ]}
              resizeMode="contain"
            />
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View
            style={[{ display: "flex", flexDirection: "row", paddingTop: 50 }]}
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
