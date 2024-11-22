import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

export default function Firmas({
  fullName,
  interview,
  profile,
  interviewData,
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
      paddingTop: 50,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
      alignItems: "center",
    },
    signatureContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    signatureLine: {
      width: "100%",
      borderBottom: 1,
      marginTop: 5,
      marginBottom: 10,
    },
    underline: {
      width: "100%",
      height: 1,
      borderBottom: 1,
      marginTop: 2,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
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

  const formattedDate = interview.interviewDate
    ? formatDate(interview.interviewDate)
    : " ";
  // Obtener el entrevistador

  const nameInterview = interview.interviewer.name;

  const firma = profile?.signature?.url || null;

  const interviewId = interview?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.some((interviewer) => {
      if (interviewer.uid === interviewId) {
        return interviewData.signature?.url || null;
      }
    }) || null;

  return (
    <View>
      <View style={[styles.container, { paddingLeft: 10 }]}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>
              Applicant's name:
            </Text>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {fullName}
              </Text>
              <View style={styles.underline} />
            </View>
          </View>
        </View>
        <View style={[styles.column, { marginLeft: 30 }]}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>Signature:</Text>
            <View style={{ alignItems: "center" }}>
              {firma ? (
                <Image
                  source={firma ? { uri: firma } : null}
                  style={{
                    width: 90,
                    height: 50,
                    marginVertical: 5,
                    marginTop: -30,
                  }}
                />
              ) : (
                <View style={{ width: 90, height: 50, marginTop: -30 }} /> // Espacio vacío
              )}

              <View style={styles.underline} />
            </View>
          </View>
        </View>

        <View style={[styles.column, { paddingLeft: -20 }]}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>Date:</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {formattedDate}
              </Text>
              <View style={styles.underline} />
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.container, { paddingLeft: 10 }]}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>
              Hiring Partner:
            </Text>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {nameInterview}
              </Text>
              <View style={styles.underline} />
            </View>
          </View>
        </View>
        <View style={[styles.column, { marginLeft: 30 }]}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>Signature:</Text>
            <View style={{ alignItems: "center" }}>
              {firmaEntrevistador ? (
                <Image
                  source={
                    firmaEntrevistador ? { uri: firmaEntrevistador } : null
                  }
                  style={{
                    width: 90,
                    height: 50,
                    marginVertical: 5,
                    marginTop: -35,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={{
                    width: 90,
                    height: 50,
                    marginVertical: 5,
                    marginTop: -35,
                  }}
                /> // Espacio vacío
              )}

              <View style={styles.underline} />
            </View>
          </View>
        </View>

        <View style={[styles.column, { paddingLeft: -20 }]}>
          <View style={styles.row}>
            <Text style={{ fontSize: 10, marginRight: 3 }}>Date:</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={[styles.text, { textAlign: "center" }]}>
                {formattedDate}
              </Text>
              <View style={styles.underline} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
