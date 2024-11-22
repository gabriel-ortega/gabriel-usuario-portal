import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Encabezado from "../Encabezado";

import PreguntaForm from "./PreguntaForm";

export default function Formulario11({
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
      paddingBottom: 30,
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
      margin: "10 20 18 20",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
    },
    text_subrayado: {
      borderBottom: 0.5,
      marginLeft: 2,
      paddingLeft: 5,
      fontSize: "10px",
      color: "#00008B",
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

  const position = data?.seafarerData?.position?.[0]?.name || " ";
  const country =
    data?.seafarerData?.seafarerProfile?.profile?.countryBirth.CountryName ||
    " ";

  // Obtener el id de posicion
  const positionId = data?.seafarerData?.position?.[0]?.id;

  // Buscar la posicion correspondiente
  const selectedPosition =
    pos.length > 0
      ? pos.find((position) => String(position.Id) === String(positionId))
      : null;

  // Extraer airportCode y city de repatriación si hay coincidencia
  const salario = selectedPosition ? selectedPosition.Salary : " ";

  // Obtener el entrevistador

  const nameInterview = interview.interviewer.name;

  const firma = data?.signature?.url || null;
  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="QUESTIONNAIRE FOR INTERVIEW / JOB DESCRIPTION"
            text2="2nd Interview"
            code="F-PMSSA-11"
            revision="04"
            date="July 31st, 2024"
          />
        </View>
        <View style={[styles.section, {}]}>
          <View style={[{ display: "flex", flexDirection: "row" }]}>
            <Text style={[styles.text, {}]}>Placement Agency:</Text>
            <Text style={[styles.text_subrayado, { width: "200px" }]}>
              Logistic International Services Corp.
            </Text>
            <Text style={[styles.text, { paddingLeft: 20 }]}>Country:</Text>
            <Text style={[styles.text_subrayado, { width: "200px" }]}>
              {country}
            </Text>
          </View>
          <View
            style={[{ paddingTop: 15, display: "flex", flexDirection: "row" }]}
          >
            <Text style={[styles.text, {}]}>Candidate Name:</Text>
            <Text style={[styles.text_subrayado, { width: "200px" }]}>
              {fullName || "\u00A0"}
            </Text>
            <Text style={[styles.text, { paddingLeft: 20 }]}>Date:</Text>
            <Text style={[styles.text_subrayado, { width: "200px" }]}>
              {formattedDate}
            </Text>
          </View>
          <View
            style={[{ paddingTop: 15, display: "flex", flexDirection: "row" }]}
          >
            <Text style={[styles.text, {}]}>Position applicable:</Text>
            <Text
              style={[
                styles.text_subrayado,
                { width: "200px", marginLeft: 20 },
              ]}
            >
              {position}
            </Text>
            <Text style={[styles.text, { paddingLeft: 20 }]}>Salary:</Text>
            <Text
              style={[
                styles.text_subrayado,
                { width: "200px", marginLeft: 10 },
              ]}
            >
              {salario}
            </Text>
            <Text style={[styles.text, { paddingLeft: 20 }]}>Code:</Text>
            <Text style={[styles.text_subrayado, { width: "50px" }]}></Text>
          </View>
          {/*  */}
          <View
            style={[{ paddingTop: 10, display: "flex", flexDirection: "row" }]}
          >
            <Text style={[styles.text, {}]}>Interviewer</Text>
            <Text
              style={[styles.text_subrayado, { width: "400px", marginLeft: 5 }]}
            >
              {nameInterview.toUpperCase() || ""}
            </Text>
            <Text style={[styles.text, { paddingLeft: 5 }]}>
              (BLOCK LETTER)
            </Text>
          </View>
          <View style={[{ paddingTop: 10, paddingBottom: 20 }]}>
            <PreguntaForm resp={interview?.fpmssa11} />
          </View>
        </View>

        <View style={{ width: "100%" }}>
          <Text
            style={{
              fontSize: 10,
              textAlign: "justify",
              marginBottom: 4,
            }}
          >
            Interview by:
          </Text>
        </View>
        <View style={[styles.section, { paddingTop: 5 }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            {/* Columna de la firma */}
            <View
              style={{
                width: "35%",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 50,
              }}
            >
              {" "}
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "justify",
                  color: "#00008B",
                  marginBottom: 5,
                  borderBottomWidth: 1,
                }}
              >
                {nameInterview.toUpperCase() || ""}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "justify",
                }}
              >
                Block letter name
              </Text>
            </View>
            <View
              style={{
                width: "35%",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 50,
              }}
            >
              {/* Ajusta el margen superior para mover la imagen hacia arriba */}
              {firma ? (
                <Image
                  source={firma ? { uri: firma } : null}
                  style={{
                    width: 100,
                    height: 50,
                    left: 50,
                    marginTop: -18, // Ajusta este valor para mover la imagen hacia arriba
                    position: "absolute",
                  }}
                />
              ) : (
                <View style={{}} /> // Espacio vacío
              )}

              <Text
                style={{
                  borderBottomWidth: 1,
                  width: "100%",
                  marginBottom: 2,
                  marginTop: 20,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 5,
                }}
              >
                Sign
              </Text>
            </View>
            <View
              style={{
                width: "30%",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 50,
              }}
            >
              {/* Sección de la fecha */}
              <Text
                style={{
                  borderBottomWidth: 1,
                  fontSize: 10,
                  textAlign: "left",
                  color: "#00008B",
                  marginTop: 10, // Espacio entre el nombre y la fecha
                }}
              >
                {formattedDate}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  paddingTop: 0,
                  textAlign: "left",
                }}
              >
                Date
              </Text>{" "}
            </View>
          </View>
        </View>
      </Page>
    </>
  );
}
