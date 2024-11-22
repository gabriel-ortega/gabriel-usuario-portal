import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";

export default function Sign({ date, profile, embark, interviewData }) {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      textAlign: "center",
      fontSize: 9,
      padding: 1,
      lineHeight: 1.0,
    },
    table: {
      border: 0.7,
      display: "flex",
      flexDirection: "column",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: 30, // Ajusta la altura aquí
      marginBottom: 0,
    },
    text: {
      margin: 0,
      textAlign: "left", // Cambiado a "left" para alinear el texto adecuadamente
      fontSize: 9,
    },
    tableCell: {
      width: "50%", // Cambiado a un ancho fijo
      height: "100%",
      border: 0.6,
      padding: 2,
      display: "flex",
      flexDirection: "column", // Asegura que el contenido se apile verticalmente
      justifyContent: "center", // Centra el contenido verticalmente
      alignItems: "flex-start",
    },
    headerCell: {
      width: "100%",
      height: 20,
      border: 0.6,
      padding: 2,
      justifyContent: "justify",
      alignItems: "flex-start",
      display: "flex",
      fontWeight: "bold",
    },
    signatureImage: {
      width: 75,
      height: 90,
      marginTop: 1, // Ajusta el margen superior
      marginLeft: 70,
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
  const formattedDate = date ? formatDate(date) : "";

  const firma = profile?.signature?.url || null;
  const interviewId = embark?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  return (
    <View style={styles.container}>
      <View style={styles.sideText} />
      <View style={styles.table}>
        {/* Encabezado de la tabla */}

        <View style={styles.row}>
          <View style={styles.tableCell}>
            <Text style={styles.text}>Insured signature:</Text>
            {firma ? (
              <Image source={{ uri: firma }} style={styles.signatureImage} />
            ) : (
              <View style={{ width: 75, height: 90 }} /> // Espacio vacío
            )}
          </View>

          <View style={styles.tableCell}>
            <Text style={styles.text}>
              Date of signature:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>
                {formattedDate}
              </Text>{" "}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.tableCell}>
            <Text style={styles.text}>Witness:</Text>

            {firmaEntrevistador ? (
              <Image
                source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            ) : (
              <View style={{}} /> // Espacio vacío
            )}
          </View>
          <View style={styles.tableCell}>
            <Text style={styles.text}>
              Date of signature:{" "}
              <Text style={[styles.text, { color: "#00008B" }]}>
                {formattedDate}{" "}
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
