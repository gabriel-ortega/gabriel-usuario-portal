import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
import Personal from "./Personal";
import Encabezado from "../Encabezado";
import Employer from "./Employer";
import PersonalReference from "./PersonalReference";

export default function Formulario9({
  data = {},
  hiring = {},
  interviewData = {},
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 5,
      left: 0,
      right: 0,
      paddingBottom: 10,

      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 0,
      marginTop: 0,
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
      paddingTop: 60,
      flexDirection: "row",
      alignItems: "flex-start",
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

  // Formatear la fecha si está disponible
  const from1 = hiring?.fpmssa09?.from1
    ? formatDate(hiring?.fpmssa09?.from1)
    : " ";
  const from2 = hiring?.fpmssa09?.from2
    ? formatDate(hiring?.fpmssa09?.from2)
    : " ";
  // Formatear la fecha si está disponible
  const to1 = hiring?.fpmssa09?.to1 ? formatDate(hiring?.fpmssa09?.to1) : " ";
  const to2 = hiring?.fpmssa09?.to2 ? formatDate(hiring?.fpmssa09?.to2) : " ";
  //DATOS DEL PRIMER EMPLOYEER
  const employer1 = hiring?.fpmssa09?.employer1 || "";
  const address1 = hiring?.fpmssa09.address1 || "";
  const contact1 = hiring?.fpmssa09?.contactedBy1?.name || "";
  const pos1 = hiring?.fpmssa09.positionHeld1 || "";

  const wage1 = hiring?.fpmssa09?.wage1 || "";
  const reliability1 = hiring?.fpmssa09.reliability1 || "";
  const organized1 = hiring?.fpmssa09?.organized1 || "";
  const time1 = hiring?.fpmssa09.time1 || "";
  const attendance1 = hiring?.fpmssa09.attendance1 || "";
  const comments1 = hiring?.fpmssa09?.comment1 || "";
  const reason1 = hiring?.fpmssa09?.reason1 || "";
  //DATOS DEL SEGUNDO EMPLOYEER
  const employer2 = hiring?.fpmssa09?.employer2 || "";
  const address2 = hiring?.fpmssa09.address2 || "";
  const contact2 = hiring?.fpmssa09?.contactedBy2?.name || "";
  const pos2 = hiring?.fpmssa09.positionHeld2 || "";

  const wage2 = hiring?.fpmssa09?.wage2 || "";
  const reliability2 = hiring?.fpmssa09.reliability2 || "";
  const organized2 = hiring?.fpmssa09?.organized2 || "";
  const time2 = hiring?.fpmssa09.time2 || "";
  const attendance2 = hiring?.fpmssa09.attendance2 || "";
  const comments2 = hiring?.fpmssa09?.comment2 || "";
  const reason2 = hiring?.fpmssa09?.reason2 || "";
  // Obtener el entrevistador

  const nameInterview = hiring?.interviewer?.name;
  const interviewId = hiring?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  return (
    <>
      <Page size="LEGAL" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="VERIFICATION OF EMPLOYMENT AND PERSONAL"
            text2=" REFERENCE"
            code="F-PMSSA-09"
            revision="02"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <Personal
            profile={data?.seafarerData?.seafarerProfile?.profile}
            contractDate={hiring?.contractDate}
            seafarerDocument={data?.seafarerData?.seafarerDocument}
          />{" "}
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            Background of use: If the dates are not correct, please enter the
            correct dates.
          </Text>
          <Employer
            title="1 employer (newest employer):"
            employer={employer1}
            position={pos1}
            address={address1}
            contactedBy={contact1}
            dateOf={from1}
            dateTo={to1}
            wage={wage1}
            reliability={reliability1}
            organized={organized1}
            time={time1}
            attendance={attendance1}
            reasons={reason1}
            comments={comments1}
          />
          <Employer
            title="2 employer (Next most recent employer):"
            employer={employer2}
            position={pos2}
            address={address2}
            dateOf={from2}
            contactedBy={contact2}
            dateTo={to2}
            wage={wage2}
            reliability={reliability2}
            organized={organized2}
            time={time2}
            attendance={attendance2}
            reasons={reason2}
            comments={comments2}
          />{" "}
          <Text
            style={[
              {
                fontSize: "10px",
                paddingTop: 10,
                paddingBottom: 10,
                border: 1,
              },
            ]}
          >
            Personal references: (optional)
          </Text>
          <PersonalReference personal="Personal refence 1:" />
          <PersonalReference personal="Personal refence 2:" />
          <Text style={[{ fontSize: "10px", paddingTop: 10 }]}>
            Placement Agency Comments:
          </Text>
          <Text style={[{ border: 1, padding: 10, fontSize: "10px" }]}></Text>
          <Text style={[{ fontSize: "10px" }]}>
            Remark: Employment reference checks should include the most current
            employer and another preferably a long-term employer.
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            paddingTop: -30,
            width: "100%",
            paddingBottom: 80,
          }}
        >
          {/* Columna de la firma */}
          <View style={{ width: "50%", marginTop: 0 }}>
            {/* Fila con el nombre y la firma */}
            <View style={{ flexDirection: "column", marginTop: 0 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* Nombre */}
                <Text
                  style={{
                    fontSize: 10,
                    paddingLeft: 5,
                    color: "#00008B",
                  }}
                >
                  {nameInterview || "\u00A0"}
                </Text>

                {/* Imagen de la firma */}
                {firmaEntrevistador ? (
                  <View
                    style={{
                      width: 75,
                      height: 60,
                      position: "absolute",
                      marginLeft: 150,
                    }}
                  >
                    <Image source={{ uri: firmaEntrevistador }} />
                  </View>
                ) : (
                  <View style={{ marginLeft: 10 }} /> // Espacio vacío si no hay firma
                )}
              </View>

              {/* Línea y texto de la firma */}
              <Text style={{ borderBottomWidth: 1, marginTop: 3 }} />
              <Text style={{ fontSize: 10, paddingLeft: 10, paddingTop: 3 }}>
                Signature of the applicant representative of the placement
                agency:
              </Text>
            </View>
          </View>

          {/* Columna de la fecha */}
          <View style={{ width: "50%", paddingLeft: 20 }}>
            <Text
              style={{ borderBottomWidth: 1, fontSize: 10, color: "#00008B" }}
            >
              {formattedDate}
            </Text>
            <Text style={{ fontSize: 10, paddingLeft: 10, paddingTop: 3 }}>
              Date
            </Text>
          </View>
        </View>
      </Page>
    </>
  );
}
