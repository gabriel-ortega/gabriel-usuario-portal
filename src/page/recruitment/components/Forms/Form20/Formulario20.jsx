import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";

import Owner from "./Owner";
import Insured from "./Insured";
import Dependent from "./Dependent";
import Beneficiary from "./Beneficiary";
import Sign from "./Sign";

export default function Formulario20({
  data = {},
  embark = {},
  hiring = {},
  vessel = [],
  interviewData = {},
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 5,
      left: 0,
      right: 0,
      paddingBottom: 5,
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
      margin: "10 20 10 20",
      flexGrow: 1,
    },
    text: {
      fontSize: "10px",
      fontWeight: "bold",
      color: "#00008B",
    },
  });
  const email = data?.email || "";
  const profile = data?.seafarerData?.seafarerProfile?.profile || "";
  const position = data?.seafarerData?.position[0].name;
  const vesselId = embark?.vessel?.id; // Obtener el ID del buque
  const seafarerDocument = data?.seafarerData?.seafarerDocument;
  // Acceder a los datos del buque
  const selectedVessel = vessel[vesselId - 1];

  // Acceder al tipo de buque
  const vesselType = selectedVessel?.["Vessel Type"];

  const imo = selectedVessel?.IMO;
  const date = embark?.formatsDate || "";
  const split1 = embark?.fpmssa20?.split1 || " ";
  const name1 = embark?.fpmssa20?.firstName1 || " ";
  const surname1 = embark?.fpmssa20?.surName1 || " ";
  const date1 = embark?.fpmssa20?.dateBirth1 || " ";
  const email1 = embark?.fpmssa20?.email1 || " ";
  const address1 = embark?.fpmssa20?.address1 || " ";
  const code1 = embark?.fpmssa20?.zipCode1 || " ";
  const state1 = embark?.fpmssa20?.state1 || "";
  const country1 = embark?.fpmssa20?.countryBirth1?.CountryName || "";
  const phone1 = embark?.fpmssa20?.phone1?.value || "";

  const split2 = embark?.fpmssa20?.split2 || " ";
  const name2 = embark?.fpmssa20?.firstName2 || " ";
  const surname2 = embark?.fpmssa20?.surName2 || " ";
  const date2 = embark?.fpmssa20?.dateBirth2 || " ";
  const email2 = embark?.fpmssa20?.email2 || " ";
  const address2 = embark?.fpmssa20?.address2 || " ";
  const code2 = embark?.fpmssa20?.zipCode2 || " ";
  const state2 = embark?.fpmssa20?.state2 || "";
  const country2 = embark?.fpmssa20?.countryBirth2?.CountryName || "";
  const phone2 = embark?.fpmssa20?.phone2?.value || "";

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return " ";
    }

    // Obtener los componentes de la fecha
    const day = String(date.getUTCDate()).padStart(2, "0"); // Asegurarse de que tenga dos dígitos
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Sumar 1 para obtener el mes correcto
    const year = date.getUTCFullYear();

    // Formato en DD/MM/YYYY
    return `${day}/${month}/${year}`;
  };

  const dateNew1 = date1 ? formatDate(date1) : " ";

  const dateNew2 = date2 ? formatDate(date2) : " ";

  return (
    <>
      {
        <Page size="LEGAL" style={styles.page}>
          <View style={styles.header} fixed>
            <Encabezado
              text1="DESIGNATION OF THE LIFE INSURANCE BENEFICIARY"
              text2="NOMINATED BENEFICIARY / DEPENDENT CHILD"
              code="F-PMSSA-20"
              revision="03"
              date="Oct 28th, 2024"
            />
          </View>
          <View style={styles.section}>
            <Text style={[{ fontSize: "10px", paddingBottom: 3 }]}>
              The purpose of this form is to allow you to designate a
              beneficiary(ies) for any death compensation that may be payable
              from the shipping agency's life insurance plan while you are
              working on the ship. If you wish to change your beneficiary or if
              the dependent (under the age of 18) changes, you must complete and
              sign a new form.
            </Text>
            <View style={[styles.section, {}]}>
              <Owner
                embark={embark}
                imo={imo}
                vesselType={vesselType}
                hiring={hiring}
                position={position}
              />
            </View>
            <View style={[styles.section, {}]}>
              <Insured
                email={email}
                profile={profile}
                seafarerDocument={seafarerDocument}
              />
            </View>

            <View style={[styles.section, {}]}>
              <Beneficiary
                title="Primary beneficiary: "
                split={split1}
                name={name1}
                surname={surname1}
                phone={phone1}
                date={dateNew1}
                email={email1}
                code={code1}
                state={state1}
                country={country1}
                address={address1}
              />
            </View>
            <View style={[styles.section, {}]}>
              <Beneficiary
                title="Contingency beneficiary: "
                split={split2}
                name={name2}
                surname={surname2}
                phone={phone2}
                date={dateNew2}
                email={email2}
                code={code2}
                state={state2}
                country={country2}
                address={address2}
              />
            </View>
            <View style={[styles.section, {}]}>
              <Dependent />
            </View>
            <View style={[styles.section, {}]}>
              <Sign
                date={date}
                profile={data}
                interviewData={interviewData}
                embark={embark}
              />
            </View>
            <View
              style={[
                styles.section,
                { paddingTop: 10, paddingBottom: 5, textAlign: "center" },
              ]}
            >
              {" "}
              <Text style={[{ fontSize: "8px", paddingBottom: 5 }]}>
                The original must be signed with blue ink: Placement agency to
                send to the shipping company.
              </Text>{" "}
              <Text style={[{ fontSize: "8px", paddingBottom: 5 }]}>
                2 signed copies: 1 for the filling agency; 1 for the employee.
              </Text>
            </View>
          </View>
        </Page>
      }
    </>
  );
}
