import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Requirements({
  seafarerDocument,
  seafarerCertificates,
  covid,
  yellowFever,
  resp,
}) {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
    },
    row: {
      flexDirection: "row",
    },
    cell: {
      height: "60px",
      borderStyle: "solid",
      borderColor: "#000",
      borderLeft: 1,
      borderTop: 1,
    },
    cellinvisible: {
      borderStyle: "solid",
      borderColor: "#000",
      borderLeft: 1,
      borderTop: 1,
    },
    text: {
      margin: 5,
      fontSize: 9.5,
    },
    borderBottom: {
      borderBottomWidth: 1,
    },
  });

  // Función para verificar si un documento está presente por ID
  const hasDocumentById = (docId) => {
    if (!Array.isArray(seafarerDocument)) {
      return "";
    }

    return seafarerDocument?.some((doc) => doc?.documentName?.id === docId)
      ? "X"
      : "";
  };

  // Similar para hasCertificateById
  const hasCertificateById = (docId) => {
    if (!Array.isArray(seafarerCertificates)) {
      return "";
    }

    return seafarerCertificates?.some((doc) => doc?.documentName?.id === docId)
      ? "X"
      : "";
  };

  //FUNCION PARA VALIDAR LAS VACUNAS DE COVID
  const hasCovidDoses = () => {
    if (!Array.isArray(covid?.cards)) {
      return "";
    }
    const requiredDoses = ["First Dose", "Second Dose", "Booster Dose"];
    const hasAllDoses = requiredDoses.every((Doze) => {
      const doseCard = covid?.cards?.find((card) => card?.Doze === Doze);
      return doseCard && doseCard.IssueDate;
    });

    return hasAllDoses ? "X" : "";
  };

  //FUNCION PARA VALIDAR LA YELLOW FEVER
  const hasYellowFeverCard = () => {
    if (!Array.isArray(yellowFever?.cards)) {
      return "";
    }

    const hasValidCard = yellowFever?.cards?.some((card) => {
      if (card?.Doze === "Limited Dose") {
        return card?.IssueDate; // Solo se requiere IssueDate
      } else if (card?.Doze === "Unlimited Dose") {
        return card?.IssueDate && card?.ExpireDate; // Ambas fechas son requeridas
      }
      return false;
    });

    return hasValidCard ? "X" : "";
  };

  return (
    <>
      <View style={[styles.tableRow, { paddingBottom: 5, paddingTop: 20 }]}>
        <View>
          <View style={[styles.table]}>
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  REQUIREMENTS
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { backgroundColor: "#808080", width: "9%", height: "40px" },
                ]}
              ></View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  CONDITIONS OF EMPLOYMENT
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { backgroundColor: "#808080", width: "9%", height: "40px" },
                ]}
              ></View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={[styles.text, { textAlign: "center" }]}>
                  CRUISE LINES
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    backgroundColor: "#808080",
                    width: "9%",

                    height: "40px",
                  },
                ]}
              ></View>
            </View>

            {/* fila 2 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>ID</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    textAlign: "center",
                    height: "30px",
                    borderRight: 1,
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasDocumentById("23") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>WORKING HOURS</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.workingHours ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>ROYAL CARIBBEAN</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.royalCaribbean ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 3 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>VALID PASSPORT</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasDocumentById("2") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={styles.text}>DURATION OF THE CONTRACT</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "40px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.durationContract ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>CELEBRITY</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.celebrity ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila4 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>POLICE RECORD</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "30px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasDocumentById("22") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>SALARY AND BENEFITS</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.salaryBenefits ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>AZAMARA</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.azamara ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 5 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>C 1/D VISA</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "30px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasDocumentById("3") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>OVERTIME</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.overtime ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>CARNIVAL</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.carnival ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 6 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>YELLOW FEVER CARD</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "30px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasYellowFeverCard()}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>TIPS</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.tips ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>COSTA CROCIERE</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.costaCrociere ? "X" : " "}
                </Text>{" "}
              </View>
            </View>
            {/* fila transaprente */}
            <View
              style={[
                styles.row,
                {
                  paddingBottom: 40,
                },
              ]}
            >
              <View
                style={[
                  styles.cell,
                  {
                    width: "25%",
                    height: "10px",

                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              >
                <Text style={styles.text}></Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    textAlign: "center",
                    height: "10px",
                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "27%",
                    height: "10px",
                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    height: "10px",
                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              ></View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "23%",
                    height: "10px",
                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              >
                <Text style={styles.text}></Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    height: "10px",
                    borderRight: 0,
                    borderBottom: 0,
                    borderLeft: 0,
                    borderRigh: 0,
                  },
                ]}
              ></View>
            </View>
            {/* fila 7 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>COVID-19 + BOOSTER</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "30px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCovidDoses() || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>BONUSES</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.bonuses ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>IMAGE</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.image ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 8 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "30px" }]}>
                <Text style={styles.text}>MEDICAL EXAMINATIONS</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              ></View>
              <View style={[styles.cell, { width: "27%", height: "30px" }]}>
                <Text style={styles.text}>VACATION</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "30px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.vacation ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "30px" }]}>
                <Text style={styles.text}>STARBOARD</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "30px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.starboard ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 9 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  BASIC SAFETY COURSES STCW 1978 AMENDED.
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("50") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={styles.text}>JOB DESCRIPTION</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "40px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.jobDescription ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>MSC</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.msc ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 10 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  Personal Survival Techniques IMO 1.19
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("1") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={styles.text}>TECHNICAL QUESTION</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "40px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.technicalQuestion ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>VIRGIN</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.virgin ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila11 */}
            <View style={[styles.row]}>
              <View
                style={[
                  styles.cell,
                  { width: "25%", height: "40px", paddingBottom: 5 },
                ]}
              >
                <Text style={styles.text}>Basic First Aid IMO 1.13</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("3") || ""}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={styles.text}>F-PMSSA-01 APPLICATION FORM</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "40px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.applicationForm ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}> DISNEY </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.disney ? "X" : " "}
                </Text>{" "}
              </View>
            </View>
            {/* fila 12 */}

            <View style={[styles.row, { break: "avoid" }]}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>Basic Fire Fighting IMO 1.20</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("2")}
                </Text>
              </View>
              <View style={[styles.cell, { width: "27%", height: "40px" }]}>
                <Text style={styles.text}>
                  SHIPOWNER'S LETTER OF EMPLOYMENT
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", height: "40px", color: "#00008B" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.shipowners ? "X" : " "}
                </Text>{" "}
              </View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>MERCHANT VESSEL</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                    backgroundColor: "#808080",
                  },
                ]}
              ></View>
            </View>

            {/* fila 13 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  Personal Safety and Social Responsibilities IMO 1.21
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("4")}
                </Text>
              </View>
              <View
                style={[
                  {
                    width: "27%",
                    borderLeft: 1,
                    borderTop: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              ></View>
              <View
                style={[{ width: "9%", borderTop: 1, height: "40px" }]}
              ></View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>REEDEREI NORDGERMANY</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.reedereiNord ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 14 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  Security Awareness training for All Seafarers IMO 3.27
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("5")}
                </Text>
              </View>
              <View
                style={[
                  {
                    width: "27%",
                    borderLeft: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              ></View>
              <View style={[{ width: "9%", height: "40px" }]}></View>
              <View style={[styles.cell, { width: "23%", height: "40px" }]}>
                <Text style={styles.text}>Marin Ship Management Ltd </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    height: "40px",
                    color: "#00008B",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.marinShip ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 15 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "70px" }]}>
                <Text style={styles.text}>
                  Proficiency in crisis management and human behaviour,
                  including passenger safety, and cargo and hull integrity IMO
                  1.46
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "70px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("26")}
                </Text>
              </View>
              <View
                style={[{ width: "27%", borderLeft: 1, height: "70px" }]}
              ></View>
              <View style={[{ width: "9%", height: "70px" }]}></View>
              <View
                style={[
                  styles.cell,
                  { width: "23%", borderBottom: 1, height: "70px" },
                ]}
              >
                <Text style={[styles.text]}>MSC</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderRight: 1,
                    borderBottom: 1,
                    color: "#00008B",
                    height: "70px",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {resp?.msc1 ? "X" : " "}
                </Text>{" "}
              </View>
            </View>

            {/* fila 16 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  Passenger Ship Crowd Management IMO 1.41
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("11")}
                </Text>
              </View>
              <View
                style={[{ width: "27%", borderLeft: 1, height: "40px" }]}
              ></View>
              <View style={[{ width: "9%", height: "40px" }]} />
              <View style={[{ width: "23%", height: "40px" }]} />

              <View style={[{ width: "9%", height: "40px" }]} />
            </View>

            {/* fila 17 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%", height: "40px" }]}>
                <Text style={styles.text}>
                  Passenger Ship Crisis Management IMO 1.42
                </Text>
              </View>
              <View
                style={[
                  styles.cell,
                  { width: "9%", textAlign: "center", height: "40px" },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("25")}
                </Text>
              </View>
              <View style={[{ width: "27%", borderLeft: 1, height: "40px" }]} />

              <View style={[{ width: "9%", height: "40px" }]} />
              <View style={[{ width: "23%", height: "40px" }]} />

              <View style={[{ width: "9%", height: "40px" }]} />
            </View>

            {/* fila 18 */}
            <View style={styles.row}>
              <View style={[styles.cell, { width: "25%" }]}>
                <Text style={styles.text}>
                  Safety training for personnel who provide direct service to
                  passengers in passengers spaces. IMO 1.44
                </Text>
              </View>
              <View style={[styles.cell, { width: "9%", textAlign: "center" }]}>
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasCertificateById("10")}
                </Text>
              </View>
              <View style={[{ width: "27%", borderLeft: 1 }]} />
              <View style={[{ width: "9%" }]} />
              <View style={[{ width: "23%" }]} />

              <View style={[{ width: "9%" }]} />
            </View>

            {/* fila 19*/}
            <View style={styles.row}>
              <View
                style={[
                  styles.cell,
                  { width: "25%", borderBottom: 1, height: "30px" },
                ]}
              >
                <Text style={styles.text}>Seaman Book</Text>
              </View>
              <View
                style={[
                  styles.cell,
                  {
                    width: "9%",
                    borderBottom: 1,
                    textAlign: "center",
                    height: "30px",
                  },
                ]}
              >
                <Text style={[styles.text, { color: "#00008B" }]}>
                  {hasDocumentById("1")}
                </Text>
              </View>
              <View style={[{ width: "27%", borderLeft: 1, height: "30px" }]} />
              <View style={[{ width: "9%", height: "30px" }]} />
              <View style={[{ width: "23%", height: "30px" }]} />

              <View style={[{ width: "9%", height: "30px" }]} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
