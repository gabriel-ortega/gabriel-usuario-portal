import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";

export default function Firma({ interview, profile, interviewData }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: "10px",
    },

    preguntaContainer: {
      paddingTop: 20,
    },
    container: {
      paddingTop: 5,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "48%",
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

  // Obtener el entrevistador

  const nameInterview = interview?.interviewer.name;

  const interviewId = interview?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  return (
    <>
      <View style={styles.preguntaContainer}>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              flexWrap: "wrap",
              paddingTop: 10,
            },
          ]}
        >
          <Text style={[styles.text, {}]}>Recommended for employment by:</Text>
          <Text
            style={[
              styles.text,
              {
                width: "360px",
                borderBottom: 1,
                paddingLeft: 25,
                color: "#00008B",
              },
            ]}
          >
            {interview?.fpmssa07?.recommended || "\u00A0"}
          </Text>
        </View>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              flexWrap: "wrap",
              paddingTop: 10,
            },
          ]}
        >
          <Text style={[styles.text, {}]}>
            Detail the reasons why he / she is recommended for that position:
          </Text>
          <Text
            style={[
              styles.text,
              {
                width: "225px",
                borderBottom: 1,
                paddingLeft: 25,
                color: "#00008B",
              },
            ]}
          >
            {interview?.fpmssa07?.detail || "\u00A0"}
          </Text>
        </View>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
              flexWrap: "wrap",
              paddingTop: 10,
              paddingBottom: 10,
            },
          ]}
        >
          <Text style={[styles.text, {}]}>
            Name of interviewer by placement agency
          </Text>
          <Text
            style={[
              styles.text,
              {
                width: "328px",
                borderBottom: 1,
                paddingLeft: 25,
                color: "#00008B",
              },
            ]}
          >
            {nameInterview || "\u00A0 "}
          </Text>
        </View>

        {firmaEntrevistador ? (
          <Image
            source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
            style={{
              width: 120,
              height: 70,
              marginTop: 0, // Ajusta según sea necesario

              marginLeft: 300,

              display: "block",
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={{ width: 120, height: 70 }} /> // Espacio vacío
        )}

        <View style={[styles.container, {}]}>
          <View style={[styles.column, { paddingTop: 0 }]}>
            <Text
              style={[
                styles.text,
                { width: "200px", borderBottom: 1, color: "#00008B" },
              ]}
            >
              {formattedDate}
            </Text>
            <Text style={[styles.text, { paddingLeft: 28, paddingTop: 3 }]}>
              {" "}
              Date of Interview Conducted
            </Text>
          </View>

          <View style={[styles.column, { paddingTop: 0 }]}>
            <Text
              style={[styles.text, { width: "200px", borderBottom: 1 }]}
            ></Text>
            <Text style={[styles.text, { paddingLeft: 28, paddingTop: 3 }]}>
              {" "}
              Signature of LOGISTIC Interviewer
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}
