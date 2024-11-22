import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";
import PreguntasForm7 from "./PreguntasForm7";
import ContactInformation from "./ContactInformation";
import Firma from "./Firma";
import PersonalData from "./PersonalData";
import Rating from "./Rating";
import Requirements from "./Requirements";
import Employer from "./Employer";

export default function Formulario7({
  data = {},
  interview = {},
  interviewData = {},
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 20,
      left: 0,
      right: 0,
      paddingBottom: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 10,
      paddingBottom: 15,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "20 20 20 20",
      flexGrow: 1,
    },
    tableRow: {
      flexDirection: "row",
    },
    tableCell: {
      padding: 6,
      borderWidth: 0.5,
      borderColor: "#000000",
    },
    tableCellTitulo: {
      borderBottom: 0.5,
      borderRight: 0.5,
      borderTop: 0.5,
      borderTopColor: "black",
      borderColor: "#000000",
    },
    tableCellTituloContent: {
      fontSize: "11px",
    },
    text: {
      fontSize: "11px",
      fontWeight: "bold",
    },
    textNegrita: {
      fontSize: "11px",
      fontWeight: "bold",
    },
    text_subrayado: {
      borderBottom: 0.5,
      marginLeft: 2,
      paddingLeft: 5,
      fontSize: "11px",
    },
  });

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="INTERVIEW EVALUATION FOR NEW APPLICANT"
            text2="1st Interview"
            code="F-PMSSA-07"
            revision="05"
            date="Dec.06th, 2023"
          />
        </View>
        <View style={styles.section}>
          <PersonalData
            profile={data?.seafarerData?.seafarerProfile?.profile}
            interviewDate={interview?.interviewDate}
            seafarerData={data?.seafarerData}
          />

          <View style={[{ paddingTop: 15 }]}>
            <Text
              style={[
                styles.text,
                { fontWeight: "bold", borderBottom: 1, width: "260px" },
              ]}
            >
              Objective of the interview evaluation for new applicant:
            </Text>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: 10,
                  textAlign: "justify",
                  lineHeight: 1.5,
                  width: "515px",
                },
              ]}
            >
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                Logistic International Services Corporation is a company
                dedicated to Recruiment and Placement of Seafarers,
              </Text>{" "}
              so the first interview servers to determine the type of candidate
              that is applying,whether they have experience on board or want to
              enter the maritime industry for the first time, and who has
              experience on land. After this first interview, the candidates
              will be separated according to their {""}
              <Text
                style={[styles.text, { fontSize: "12px", fontWeight: "bold" }]}
              >
                application for the merchant vessel or the cruise vessel,
              </Text>
              depending on their knowledge, skills, and competencies, in
              addition to their command of the English language, Logistic
              International Services Corporation is a company that maintains its
              principles based on the MLC 2006 code, which provides equal
              opportunity to anyone who wishes to apply for an initial
              interview.
            </Text>
          </View>

          <ContactInformation
            harvester={
              data?.seafarerData?.seafarerProfile?.profile?.harvester?.name
            }
            email={data?.email}
            resp={interview?.fpmssa07}
          />

          <PreguntasForm7
            resp={interview?.fpmssa07}
            profile={data?.seafarerData?.seafarerProfile?.profile}
          />
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="INTERVIEW EVALUATION FOR NEW APPLICANT"
            text2="1st Interview"
            code="F-PMSSA-07"
            revision="05"
            date="Dec.06th, 2023"
          />
        </View>
        <View style={styles.section}>
          <Employer resp={interview?.fpmssa07} />
          <Rating resp={interview?.fpmssa07} />
          <View style={[{ paddingTop: 5 }]}>
            <Text
              style={[
                styles.text,
                {
                  paddingTop: 5,
                  textAlign: "justify",
                  lineHeight: 1.2,
                  width: "525px",
                },
              ]}
            >
              {" "}
              Comment:
            </Text>{" "}
            <Text
              style={[
                styles.text,
                {
                  borderBottom: 1,
                  width: "100%",
                  paddingLeft: 5,
                  marginLeft: 5,
                  fontSize: "10px",
                  color: "#00008B",
                },
              ]}
            >
              {interview?.fpmssa07?.comments || ""}{" "}
            </Text>{" "}
          </View>
          <Requirements
            seafarerDocument={data?.seafarerData?.seafarerDocument}
            seafarerCertificates={data?.seafarerData?.seafarerCertificates}
            covid={data?.seafarerData?.seafarerProfile?.vaccines?.covid}
            yellowFever={
              data?.seafarerData?.seafarerProfile?.vaccines?.yellowFever
            }
            resp={interview?.fpmssa07}
          />
        </View>
      </Page>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="INTERVIEW EVALUATION FOR NEW APPLICANT"
            text2="1st Interview"
            code="F-PMSSA-07"
            revision="05"
            date="Dec.06th, 2023"
          />
        </View>
        <View style={styles.section}>
          <Firma
            interview={interview}
            interviewData={interviewData}
            profile={data}
          />{" "}
        </View>
      </Page>
    </>
  );
}
