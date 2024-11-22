import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Titulo from "./Titulo";
import Footer from "./Footer";

export default function Formulario51({ data = {}, hiring = {} }) {
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
      lineHeight: 1.2,
    },
  });

  //FUNCION PARA LA FECHA DEL FORMATO
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }
    date.setUTCDate(date.getUTCDate() + 1);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };
  // Formatear la fecha si está disponible
  const formattedDate = hiring?.contractDate
    ? formatDate(hiring.contractDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const firma = data?.signature?.url || null;
  return (
    <>
      <Page size="LEGAL" style={styles.page}>
        <Titulo title=" DECLARATION BY THE CANDIDATE FOR SEAFARER" />

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
          <View style={[{ flexDirection: "row", paddingBottom: 0 }]}>
            <Text style={{ fontSize: 11, paddingRight: 3 }}>I, </Text>
            <Text
              style={{
                fontSize: 11,
                color: "#00008B",
                borderBottomWidth: 1, // Grosor más delgado
                borderBottomColor: "black",
                textAlign: "start",
                marginBottom: 2, // Un poco sobre la línea
                width: "100%",
              }}
            >
              {fullName}
            </Text>
            <View
              style={{
                flex: 1,
                height: 1,
                width: 50,
              }}
            />
            {""}
            {/* Línea más larga y delgada */}
            <Text style={{ fontSize: 11, paddingLeft: 5 }}>
              {", hereby declare that:"}
            </Text>
          </View>

          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            1. All the documentation provided to Logistic International Services
            Corporation Agency, is up to date, and that their veracity any time.
            (IMO courses certificates, embarking and disembarking information,
            company letters, seaman book stamped)
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            2. That the information that appears in my seaman book, and
            experiences presented are in accordance with my competences, and
            have been acquired through the time of sea services, and not
            illegally.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            3. That the information provided during the interview conducted with
            the Management of Logistic {"\n"}International Services Corporation,
            is true and that there is no intention to lie to obtain the position
            offered.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            4. During the interview I was asked if I suffered from any disease
            in which I had to take any controlled medication.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            5. That during the interview I was asked if I had suffered any
            injury or ilness that forced me to have a recovery process,
            preventing me form being able to perform the position fo which I had
            previously been hired.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            6. I have been asked what motivated me to leave my current job, and
            why I want to work with this company.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            7. I have not had any legal problems in my country, with deprivation
            of liberty.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            8. I have had no problem with U.S. inmigration laws, I have not been
            deported, and my visa has not been cancelled at any time.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            9. That it is not my intention, to leave the job for which I have
            been hired.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            10. That I was clearly explained the conditions of the work, the
            amount of the salary to be paid and the amount of overtime covered
            under the contract.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            11. Logistic International Services Corporation has never asked me
            for any payment for offering me a job.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            12. That the Logistic International Services Corporation Agency has
            specifically explained to me the tasks to be carried out on board,
            and that I understand and accept the responsibilities indicated at
            the time of the interview.
          </Text>
          <Text style={[{ fontSize: "11px", paddingTop: 15, lineHeight: 1.5 }]}>
            13. I exempt Logistic International Services Corporation from all
            responsibility if at the moment of{"\n"}assuming my position, I am
            unable to perform it properly, because I was explained and consulted
            about my knowledge and abilities to offer me the job.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                paddingTop: 25,
              },
            ]}
          >
            I hereby confirm that I have read and understood the egravity of a
            false testimony, and that I am aware and agree with what is
            expressed herein, for which I sign this note for the record.
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
            {/* Columna de Nombre y Fecha */}
            <View style={{ width: "50%", paddingTop: -50 }}>
              <Text
                style={{
                  fontSize: 11,
                  textAlign: "justify",
                  color: "#00008B",
                  marginBottom: 5,
                  marginTop: -20,
                }}
              >
                {fullName || "\u00A0"}
              </Text>
              <Text
                style={{
                  borderBottomWidth: 1,
                  fontSize: 11,
                  textAlign: "justify",
                  color: "#00008B",
                  marginBottom: 2,
                  marginTop: 0,
                }}
              >
                {data?.seafarerData?.position[0]?.name || "\u00A0"}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  textAlign: "justify",
                  marginTop: 5,
                }}
              >
                Position and Full Name
              </Text>

              {/* Sección de la fecha */}
              <Text
                style={{
                  borderBottomWidth: 1,
                  fontSize: 11,
                  textAlign: "left",
                  color: "#00008B",
                  marginTop: 10, // Espacio entre el nombre y la fecha
                }}
              >
                {formattedDate || "\u00A0"}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  paddingTop: 0,
                  textAlign: "left",
                }}
              >
                Date
              </Text>
            </View>

            {/* Columna de la firma */}
            <View
              style={{
                width: "50%",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: 50,
              }}
            >
              {firma ? (
                <Image
                  source={firma ? { uri: firma } : null}
                  style={{
                    width: 130,
                    height: 60,
                    left: 50,
                    marginTop: -35, // Ajusta este valor para mover la imagen hacia arriba
                    position: "absolute",
                  }}
                />
              ) : (
                <View style={{}} /> // Espacio vacío
              )}
              {/* Ajusta el margen superior para mover la imagen hacia arriba */}

              <Text
                style={{
                  borderBottomWidth: 1,
                  width: "100%",
                  marginBottom: 2,
                  marginTop: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 11,
                  marginTop: 5,
                }}
              >
                Signature
              </Text>
            </View>
          </View>
        </View>

        <Footer
          text1="F-PMSSA-51"
          text2="Revision: 00"
          text3="Effective Date: August 16, 2023"
          text4="Page 1 of 1"
        />
      </Page>
    </>
  );
}
