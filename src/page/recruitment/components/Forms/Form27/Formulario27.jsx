import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";

import StatementWork from "./StatementWork";
import StatementHealth from "./StatementHealth";
import Sign from "./Sign";
import StatementTrips from "./StatementTrips";
import StatementTrip from "./StatementTrip";
import StatementComisions from "./StatementComisions";
import StatementLms from "./StatementLms";
import StatementCart from "./StatementCart";
import StatementDoc from "./StatementDoc";
export default function Formulario27({
  data = {},
  embark = {},

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
  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const date = embark?.formatsDate || "";

  // Obtener el entrevistador
  const interview = embark?.interviewer?.name || "";

  const foundDocument = data?.seafarerData?.seafarerDocument?.find(
    (doc) => doc?.documentName?.id === "2"
  );
  const passportNumber = foundDocument?.data?.documentNumber || "";

  const identificationNumber = data?.identification || "";

  return (
    <>
      {
        <Page size="LEGAL" style={styles.page}>
          <View style={styles.header} fixed>
            <Encabezado
              text1="HIRED CREW MEMBER CHECKLIST"
              text2=""
              code="F-PMSSA-27"
              revision="03"
              date="Oct 28th, 2024"
            />
          </View>
          <View style={styles.section}>
            <Text style={[{ fontSize: "9px", paddingBottom: 5 }]}>
              Please read and complete the following items in the list by
              placing your initials in the column representing your answer. Once
              you have completed the list, please sign and return it to your
              hiring partner before you leave your home. You must also carry a
              copy on board your boat.
            </Text>
            <Text style={[{ fontSize: "9px" }]}>
              As a result of participation in the recruitment process:{" "}
            </Text>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <StatementWork />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 5 }}>
              <StatementHealth />
            </View>
            <View style={{ paddingTop: 10, paddingBottom: 6 }}>
              <StatementTrips />
            </View>
            <View style={{ paddingTop: 33, paddingBottom: 5 }}>
              <StatementTrip />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <StatementComisions />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <StatementLms />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <StatementCart />
            </View>
            <View style={{ paddingTop: 5, paddingBottom: 5 }}>
              <StatementDoc />
            </View>

            <Sign
              fullName={fullName}
              seafarerDocument={passportNumber || identificationNumber || ""}
              date={date}
              interview={interview}
              profile={data}
              interviewData={interviewData}
              embark={embark}
            />
          </View>
        </Page>
      }
    </>
  );
}
