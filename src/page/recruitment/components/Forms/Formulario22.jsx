import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "./Encabezado";
import ImgFirma from "../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
export default function Formulario22({ data = {}, hiring = {} }) {
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
      paddingTop: 70,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
      // Ajusta este valor según tus necesidades
    },
    container1: {
      paddingTop: 10,
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
  const formattedDate = hiring.contractDate
    ? formatDate(hiring.contractDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const firma = data?.signature?.url || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="NO SHOW POLICY"
            text2=""
            code="F-PMSSA-22"
            revision="02"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <Text
            style={[
              {
                borderBottom: 1,
                fontSize: "11px",
                width: "55px",
                fontWeight: "bold",
              },
            ]}
          >
            POLITICS{" "}
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            All crew members placed by Logistic International Services
            Corporation and accepting a Letter of Employment (LOE) are expected
            to join the assigned vessel on the scheduled date. If a crew member
            does not join the ship as scheduled, the employee will be considered
            "no show". The absence (no show) disturbs the operation of the
            shipping agency and the service we provide as an agency to our
            clients. A crew member who "does not show up" on the date of his
            assignment, without prior communication with the ground scheduling
            team, will be deemed to voluntarily choose not to accept that task
            and may be considered ineligible for future tasks.
          </Text>

          <Text
            style={[
              {
                borderBottom: 1,
                fontSize: "11px",
                width: "55px",
                fontWeight: "bold",
                paddingTop: 20,
              },
            ]}
          >
            ADDRESS
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Crew members who fail to notify that they will not report to their
            assigned ship, except due to a verified family/personnel emergency
            or other qualified emergency beyond their control (including, but
            not limited to, natural disasters, government actions, terrorism,
            and acts of war), may not be offered another task. If a crew
            member's visa linked to the job offer, their U.S. visa or other
            work. This visa can be cancelled by the shipping agency within 30
            days of the originally scheduled login date.
          </Text>

          <Text
            style={[
              {
                borderBottom: 1,
                fontSize: "11px",
                width: "150px",
                fontWeight: "bold",
                paddingTop: 20,
              },
            ]}
          >
            ELIGIBLE EMERGENCIES
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            If a crew member counts a qualified emergency (see examples above),
            which will prevent him from joining the assigned ship on the date
            specified in the Letter of Employment, the crew member must inform
            the respective recruiter/programmer/specialist immediately. The crew
            member must first inform the respective
            Recruiter/Supervisor/Specialist, prior to any communication to the
            ship or the Contracting Partner.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            The crew member must provide written documentation to verify the
            qualified emergency to the number listed, hotel clerk
            _____________________ and for Marine __________________________, to
            the attention of your planner. Based on the supporting documents
            provided by the crew member, the planner will confirm whether the
            crew member will be rescheduled or not.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Employees who are unable to provide proof of a qualified emergency
            may be considered ineligible to rehire them and may have their work
            visas in the United States or other nationalities, canceled by the
            company within 30 days of the originally scheduled login date.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            The crew member is responsible for notifying their Scheduler when
            they are ready to return to work.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                paddingBottom: 20,
                justifyContent: "space-around",
              },
            ]}
          >
            If it was necessary to replace the crew member to avoid disruption
            to onboard operation, the crew member may experience a delay in a
            future assignment as schedules are often planned months in advance.
            In addition, the returning crew member may be placed at the bottom
            of the rotation and may be reassigned to their original ship or any
            ship within the fleet at the discretion of the Workforce Planning
            and Scheduling Team based on business needs.
          </Text>

          <Text
            style={[
              {
                borderBottom: 1,
                fontSize: "11px",
                width: "320px",
                fontWeight: "bold",
              },
            ]}
          >
            RESIGNATION OF THE EMPLOYEE DURING THE HOLIDAYS:
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Hotel employees who decide, while on vacation, that they do not wish
            to return to work and wish to remain on good terms with the company,
            must notify the company by email at _________________, or phone
            number ___________________, or fax to __________ a minimum of one
            month prior to the scheduled return date . Crew area employees must
            notify their respective Recruiter/Scheduler/Specialist by email or
            phone a minimum of one month prior to scheduled return date.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Employees who give appropriate notice prior to their scheduled
            return date may be eligible for reassignment in the future and may
            be allowed to retain their U.S. Visa.
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Employees who notify 30 or more days prior to the planned return
            date may be eligible for reassignment. In these cases, employees
            should be aware that they will lose their rotation on the assigned
            ship, be placed at the bottom of the job rotation, and be assigned
            to any ship that has vacancies available at the time they can return
            to work.
          </Text>

          <Text
            style={[
              {
                borderBottom: 1,
                fontSize: "11px",
                width: "280px",
                fontWeight: "bold",
                paddingTop: 15,
              },
            ]}
          >
            IF YOU DO NOT SHOW UP DUE TO TRAVEL DELAYS:
          </Text>
          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 10,
                justifyContent: "space-around",
              },
            ]}
          >
            Employees returning to their assigned ship and experiencing a delay
            in travel caused by an airline, contact travel services, which are
            served 24 hours a day, 7 days a week, on phones
            __________________________________ to notify the company that they
            are in transit and to have alternate flight arrangements so they can
            join their scheduled ship as soon as possible.
          </Text>

          <Text
            style={[
              {
                fontSize: "11px",
                lineHeight: 1.5,
                paddingTop: 5,
                justifyContent: "space-around",
              },
            ]}
          >
            The Travel Services Department is responsible for notifying the
            appropriate planner and sending that the employee will not join as
            originally planned and will work with the Scheduling team to make
            travel arrangements to ensure that the employee joins their
            designated vessel at the first available opportunity.
          </Text>

          <View style={[styles.container, { paddingLeft: 10 }]}>
            {firma ? (
              <Image
                source={firma ? { uri: firma } : null}
                style={[
                  {
                    width: 130,
                    height: 90,
                    position: "absolute",
                    marginLeft: 210,
                    marginTop: 25,
                  },
                ]}
              ></Image>
            ) : (
              <View style={{}} /> // Espacio vacío
            )}

            <View style={[styles.column, { paddingTop: 0 }]}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: "11px",
                    width: "160px",
                    borderBottom: 1,
                    textAlign: "center",
                  },
                ]}
              >
                {fullName || "\u00A0"}
              </Text>
              <Text style={[{ paddingLeft: 60, paddingTop: 2, fontSize: 11 }]}>
                {" "}
                Name
              </Text>
            </View>

            <View style={[styles.column, { paddingTop: 17, marginLeft: 35 }]}>
              <Text
                style={[styles.text, { width: "160px", borderBottom: 1 }]}
              ></Text>
              <Text style={[{ paddingLeft: 60, paddingTop: 3, fontSize: 11 }]}>
                {" "}
                Signature
              </Text>
            </View>

            <View style={[styles.column, { paddingTop: 3, marginLeft: 35 }]}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: "11",
                    width: "150px",
                    borderBottom: 1,
                    textAlign: "center",
                  },
                ]}
              >
                {formattedDate || "\u00A0"}
              </Text>
              <Text style={[{ paddingLeft: 60, paddingTop: 3, fontSize: 11 }]}>
                {" "}
                Date
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </>
  );
}
