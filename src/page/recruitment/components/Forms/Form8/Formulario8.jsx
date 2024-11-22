import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Encabezado from "../Encabezado";
import Costs from "./Costs";

export default function Formulario8({
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
      // Ajusta este valor según tus necesidades
    },
    container1: {
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "flex-start",
    },
  });
  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  // Obtener el entrevistador

  const nameInterview = interview.interviewer.name;
  const interviewId = interview?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  const firma = data?.signature?.url || null;
  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="ESTIMATED COST OF BOARDING"
            text2=""
            code="F-PMSSA-08"
            revision="04"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <Text style={[{ fontSize: 12 }]}>
            The following costs are an estimate that the seafarer must be
            responsible for embarking in the future:
          </Text>
          <Costs
            /* COLUMNA DEL NOMBRE DEL COSTO */
            text1="Maritime Medical Certificate"
            text2="Seamanbook"
            text3="Passport"
            text4="Yellow fever vaccine"
            text5="Miscellaneaous Travel Expenses"
            text6="RT-PCR"
            /* COSTO */
            text8="75"
            text9="25"
            text10="100"
            text11="10"
            text12=""
            text13="50-75"
          />
          <View
            style={[
              styles.container1,
              { border: 1, marginLeft: 60, marginRight: 60 },
            ]}
          >
            <View style={[{ padding: 5 }]}>
              <Text style={[{ fontSize: "15px", justifyContent: "center" }]}>
                TOTAL COST ESTIMATE
              </Text>
            </View>

            <View style={[{ padding: 5, paddingLeft: 40, textAlign: "start" }]}>
              <View style={[{ display: "flex", flexDirection: "row" }]}>
                <Text style={[{ fontSize: "15px" }]}>$</Text>
                <Text
                  style={[
                    {
                      fontSize: "15px",
                      borderBottom: 1,
                      width: "60%",
                      color: "#00008B",
                    },
                  ]}
                ></Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={[{ borderBottom: 1, paddingTop: 1 }]}></Text>
        <Text
          style={[
            {
              fontSize: "10px",

              justifyContent: "center",
              textAlign: "center",
            },
          ]}
        >
          Based on your position, the following additional costs should be
          included
        </Text>
        <View style={[styles.section, { paddingTop: 0 }]}>
          <Costs
            /* COLUMNA DEL NOMBRE DEL COSTO */
            text1="License 1 _____________________________"
            text2="License 2 _____________________________"
            text3="Additional STCW 1978 Certificate___"
            text4="Basic Safety training"
            text5="Visas (if applicable, refundable)"
            text6="Medical Examinations Required by the"
            text7="Shipping Company. (If applicable, refundable)"
            /* COSTO */
            text8=""
            text9=""
            text10="IT CAN VARY"
            text11=""
            text12="REFUNDABLE"
            text13="REFUNDABLE"
          />
        </View>
        <View
          style={[
            styles.container1,
            { paddingTop: 1, paddingLeft: 60, flexDirection: "row" },
          ]}
        >
          <View style={[{ paddingTop: 3, width: "50%" }]}>
            {/* nombre del marino */}
            <Text style={[styles.text, { paddingBottom: 0 }]}>
              {fullName || ""}
            </Text>
            {/* línea de nombre */}
            <Text
              style={[
                styles.text,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  marginBottom: 1,
                },
              ]}
            ></Text>

            {/* FIRMA con margen */}
            <View style={{ marginBottom: 1 }}>
              {firma ? (
                <Image
                  source={firma ? { uri: firma } : null}
                  style={[
                    {
                      marginLeft: 30,
                      width: 90,
                      height: 45,
                    },
                  ]}
                />
              ) : (
                <View style={{ marginLeft: 30, width: 90, height: 45 }} /> // Espacio vacío
              )}

              {/* LINEA DE LA FIRMA */}
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    marginTop: 1,
                  },
                ]}
              ></Text>
            </View>

            <Text style={[{ fontSize: 10, paddingTop: 1 }]}>
              {" "}
              Name and Signature of the Applicant
            </Text>
          </View>

          <View style={[{ width: "50%", marginRight: 50, paddingLeft: 30 }]}>
            {/* nombre del reclutador */}
            <Text style={[styles.text, { paddingBottom: 0 }]}>
              {nameInterview}
            </Text>
            {/* línea de nombre */}
            <Text
              style={[
                styles.text,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: "black",
                  marginBottom: 1,
                },
              ]}
            ></Text>

            {/* FIRMA con margen */}
            <View style={{ marginBottom: 1 }}>
              {firmaEntrevistador ? (
                <Image
                  source={
                    firmaEntrevistador ? { uri: firmaEntrevistador } : null
                  }
                  style={[
                    {
                      width: 90,
                      height: 45,
                      marginLeft: 30,
                    },
                  ]}
                  resizeMode="contain"
                />
              ) : (
                <View style={{ width: 90, height: 45, marginLeft: 30 }} /> // Espacio vacío
              )}

              {/* LINEA DE LA FIRMA */}
              <Text
                style={[
                  styles.text,
                  {
                    borderBottomWidth: 1,
                    borderBottomColor: "black",
                    marginTop: 1,
                  },
                ]}
              ></Text>
            </View>

            <Text style={[{ fontSize: 10, paddingTop: 1 }]}>
              {" "}
              Name and Signature by Logistic
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
