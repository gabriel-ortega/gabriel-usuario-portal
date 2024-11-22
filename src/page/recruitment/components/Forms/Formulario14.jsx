import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

import Encabezado from "./Encabezado";
import { useEffect } from "react";

export default function Formulario14({ data = {}, interview = {} }) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 10,
      left: 0,
      right: 0,
      paddingBottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 10,
      paddingBottom: 5,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "0 40 0 40",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
      lineHeight: 1.0,
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

  const foundDocument = data?.seafarerData?.seafarerDocument?.find(
    (doc) => doc?.documentName?.id === "2"
  );
  const passportNumber = foundDocument?.data?.documentNumber || "";

  const identificationNumber = data?.identification || "";

  const firma = data?.signature?.url || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="STATEMENT OF UNDERSTANDING."
            text2=""
            code="F-PMSSA-14"
            revision="03"
            date="Dec 28th, 2022"
          />
        </View>

        <View
          style={[
            styles.section,
            {
              paddingTop: 10,
              paddingBottom: 0,
              textAlign: "justify",
              marginBottom: 0,
            },
          ]}
        >
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            LOGISTIC INTERNATIONAL SERVICES CORPORATION, or the shipping lines
            it represents, will not be responsible, not morally, nor
            economicaly, for the change, modification, loss, cancellation, or
            postponement of the assignment.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            Each candidate is and will be solely responsible for full compliance
            with the timely submission of the {"\n"} documentation requested.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            {" "}
            If for any reason attributable to the candidate the assignment to a
            job is lost or canceled, all the costs you have covered will be your
            total responsibility and LOGISTIC INTERNATIONAL SERVICES CORPORATION
            or the companies it represents may not be the subject of any type of
            claim by the candidate or third parties.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            The candidate undertakes to carry out all the necessary procedures
            for their shipment with all the seriousness and responsibility in
            the terms that Logistic International Services Corporation requests
            it.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            It is understood that if the candidate receives a job offer, the job
            offer will be conditioned to the satisfactory results of all the
            medical examinations required by the company; to the investigation
            of their police background; to the verification of their labor
            references; obtaining a passport; approving relevant visas; to the
            satisfactory approval of the necessary courses, licenses, diplomas
            and certificates, without limiting to other applicable examens or
            requirements, and that the prior fulfillment of some or all of the
            requirements does not guarantee in any way that the candidate will
            receive an offer of employment.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            The candidate certifies that the information provided to Logistic
            International Services Corporation is true and complete. You
            understand that omissions or falsifications of information
            constitute justification for the denial of the job offer or the
            termination of the employment relationship.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            If hired, the candidate undertakes to comply with all the rules,
            regulations, and directives of the Company. It understands that the
            first three months of employment constitute the probationary period.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
            In addition, you understand that the Employment Application, company
            policies, employee handbooks, or oral statements of a representative
            of the company do not constitute a contract of employment or
            benefits that are expressed. You also understand that only an
            executive of the Company can make a job offer and that such offer
            must be in writing and signed by that executive and the candidate to
            be valid for the company.
          </Text>
        </View>

        <View style={[styles.section, {}]}>
          {/* Contenedor principal con flexDirection: "row" para alinear las columnas */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                width: "100%",
                paddingTop: -50,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "justify",
                  color: "#00008B",
                  marginBottom: 5,
                  marginTop: -20,
                }}
              >
                {fullName + " - " + passportNumber || identificationNumber}
              </Text>
              <Text
                style={{
                  borderBottomWidth: 1,
                  fontSize: 10,
                  textAlign: "justify",
                  color: "#00008B",
                  marginBottom: 2,
                  marginTop: 0,
                  width: "50%",
                }}
              >
                {}
              </Text>
              <Text
                style={{
                  fontSize: 10,
                  textAlign: "justify",
                  marginTop: 5,
                  paddingBottom: 20,
                }}
              >
                Full Name and ID
              </Text>
              {/* Ajusta el margen superior para mover la imagen hacia arriba */}
              {firma ? (
                <Image
                  source={firma ? { uri: firma } : null}
                  style={{
                    width: 100,
                    height: 50,
                    left: 30,
                    marginTop: 20, // Ajusta este valor para mover la imagen hacia arriba
                    position: "absolute",
                  }}
                />
              ) : (
                <View style={{}} /> // Espacio vacío
              )}

              <Text
                style={{
                  borderBottomWidth: 1,
                  width: "50%",
                  marginBottom: 2,
                  marginTop: 15,
                }}
              />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 5,
                  paddingBottom: 20,
                }}
              >
                Sign
              </Text>
              {/* Sección de la fecha */}
              <Text
                style={{
                  borderBottomWidth: 1,
                  fontSize: 10,
                  textAlign: "left",
                  color: "#00008B",
                  width: "50%",
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
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </>
  );
}
