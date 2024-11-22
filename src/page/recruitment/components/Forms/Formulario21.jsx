import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "./Encabezado";
import ImgFirma from "../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
export default function Formulario21({
  data = {},
  hiring = {},
  countries = [],
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
      fontSize: "12px",
      fontWeight: "bold",
      color: "#00008B",
      textAlign: "center",
    },
    container: {
      paddingTop: 90,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
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

  const formattedDate = hiring?.contractDate
    ? formatDate(hiring.contractDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName.toUpperCase() ||
      "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName.toUpperCase() ||
      "");

  // Obtener el countryResidency
  const countryResidencyId =
    data.seafarerData?.seafarerProfile?.profile?.countryResidency?.Id;

  // Buscar el país correspondiente
  const selectedCountry =
    countries.length > 0
      ? countries.find(
          (country) => String(country.Id) === String(countryResidencyId)
        )
      : null;

  // Extraer airportCode y city de repatriación si hay coincidencia
  const airportCode = selectedCountry
    ? selectedCountry.AirportCode.toUpperCase()
    : " ";
  const repatriationCity = selectedCountry
    ? selectedCountry.CityOfRepatriation.toUpperCase()
    : " ";

  // Obtener el entrevistador

  const nameInterview = hiring?.interviewer.name;

  const firma = data?.signature?.url || null;

  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="PROOF OF REPATRIATION - CITY OF ORIGIN"
            text2=""
            code="F-PMSSA-21"
            revision="02"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <View style={[styles.container1, {}]}>
            <View style={[{ paddingTop: 10, width: "50%" }]}>
              {/* PRIMERA PARTE DEL FORMATO - DATOS  */}
              <Text style={[styles.text, { borderBottom: 1 }]}>
                {fullName || ""}
              </Text>

              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 20,
                    paddingTop: 3,
                    paddingBottom: 10,
                  },
                ]}
              >
                {" "}
                Name of the crew member (block letter)
              </Text>
              <Text
                style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
              >
                LOGISTIC INTERNATIONAL SERVICES{"\n"}CORPORATION
              </Text>
              <Text
                style={[{ fontSize: "10px", paddingLeft: 20, paddingTop: 3 }]}
              >
                {" "}
                Name of the placement agency (block letter)
              </Text>
            </View>

            <View style={[{ paddingTop: 10, width: "50%", marginLeft: 50 }]}>
              <Text
                style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
              >
                {hiring?.employeeNumber
                  ? hiring.employeeNumber.toString().toUpperCase()
                  : "\u00A0"}
              </Text>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 40,
                    paddingTop: 3,
                    paddingBottom: 10,
                  },
                ]}
              >
                Employee number (block letter)
              </Text>
              <Text
                style={[
                  styles.text,
                  { borderBottom: 1, fontSize: "10px", paddingTop: 10 },
                ]}
              >
                {nameInterview ? nameInterview.toUpperCase() : "\u00A0"}{" "}
              </Text>
              <Text
                style={[{ fontSize: "10px", paddingLeft: 20, paddingTop: 3 }]}
              >
                Name of the person of the placement agency
              </Text>
            </View>
          </View>

          <Text style={[{ borderBottom: 1, paddingTop: 20 }]}></Text>
          <Text
            style={[
              {
                fontSize: "10px",
                paddingTop: 30,
                paddingBottom: 30,
                textAlign: "center",
              },
            ]}
          >
            I understand that my permanent repatriation airport (city of origin)
            will be:
          </Text>
          <View style={[styles.container1, {}]}>
            <View style={[{ paddingTop: 10, width: "50%" }]}>
              <Text
                style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
              >
                {repatriationCity || "\u00A0"}
              </Text>
              <Text
                style={[{ fontSize: "10px", paddingLeft: 30, paddingTop: 3 }]}
              >
                {" "}
                City of repatriation (block letter)
              </Text>
            </View>

            <View style={[{ paddingTop: 10, width: "50%", marginLeft: 50 }]}>
              <Text
                style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
              >
                <Text
                  style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
                >
                  {airportCode || "\u00A0"}
                </Text>
              </Text>
              <Text
                style={[{ fontSize: "10px", paddingLeft: 100, paddingTop: 3 }]}
              >
                City code
              </Text>
            </View>
          </View>
          <Text style={[{ fontSize: "10px", paddingTop: 20, lineHeight: 2 }]}>
            Once hired, the assigned repatriation listed above will remain my
            point of origin and return. I understand that, if I were to request
            a repatriation change, a change of home city request form must be
            completed and submitted for processing, in accordance with the
            guidelines set by the company. This includes the presentation of
            official documentation to corroborate a (recent) permanent change of
            residence, such as the driver's license, lease or utility bill. Bank
            statements are not accepted. In case this also includes a change of
            country of residence, government proof of legal residence (e.g.,
            Visa) is also required.
          </Text>
          <Text style={[{ fontSize: "10px", paddingTop: 15 }]}>
            I acknowledge that I have read and understood the above statement.
          </Text>
          {firma ? (
            <Image
              source={firma ? { uri: firma } : null}
              style={[
                {
                  width: 130,
                  height: 90,
                  position: "absolute",
                  marginLeft: 50,
                  marginTop: 360,
                },
              ]}
            ></Image>
          ) : (
            <View style={{}} /> // Espacio vacío
          )}

          <View style={[styles.container1, { paddingTop: 60 }]}>
            <View style={[{ paddingTop: 10, width: "50%" }]}>
              <Text style={[styles.text, { borderBottom: 1 }]}></Text>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 50,
                    paddingTop: 3,
                    paddingBottom: 10,
                  },
                ]}
              >
                {" "}
                Crewmember's Sign
              </Text>
              <Text style={[styles.text, { borderBottom: 1 }]}>
                {fullName || "\u00A0"}
              </Text>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 20,
                    paddingTop: 3,
                  },
                ]}
              >
                {" "}
                Name of the crew member (Block Letter)
              </Text>
            </View>

            <View style={[{ paddingTop: 0, width: "50%", marginLeft: 50 }]}>
              <Text
                style={[styles.text, { borderBottom: 1, fontSize: "10px" }]}
              >
                {formattedDate || "\u00A0"}
              </Text>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 100,
                    paddingTop: 3,
                    paddingBottom: 10,
                  },
                ]}
              >
                Date
              </Text>
              <Text style={[styles.text, { borderBottom: 1 }]}>
                {hiring?.employeeNumber
                  ? hiring.employeeNumber.toString().toUpperCase()
                  : "\u00A0"}
              </Text>
              <Text
                style={[
                  {
                    fontSize: "10px",
                    paddingLeft: 70,
                    paddingTop: 3,
                  },
                ]}
              >
                Employee number
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </>
  );
}
