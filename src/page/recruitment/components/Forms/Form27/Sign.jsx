import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import ImgFirma from "../../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";

export default function Sign({
  fullName,
  seafarerDocument,
  interview,
  date,
  profile,
  interviewData,
  embark,
}) {
  const styles = StyleSheet.create({
    section: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 5,
      paddingTop: 20,
    },
    column: {
      width: "30%",
      alignItems: "center",
      textAlign: "center",
    },
    text: {
      fontSize: 8,
      marginBottom: 1,
    },
    signatureContainer: {
      alignItems: "flex-start",
      marginTop: 0,
      flexDirection: "row",
    },
    signatureImage: {
      width: 80,
      height: 45,
      marginLeft: 20,
      marginTop: -30, // Ajusta este valor para subir solo la imagen
    },
    underline: {
      borderBottomWidth: 1,
      width: "100%",
      marginVertical: 5,
      marginLeft: -10,
      marginRight: -10,
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
  const interviewId = embark?.interviewer?.id || "";
  const interviewers = interviewData || [];

  // Buscar la firma según la coincidencia entre interviewId y uid
  const firmaEntrevistador =
    interviewers.find((interviewer) => interviewer.id === interviewId)
      ?.signature?.url || null;

  const formattedDate = date ? formatDate(date) : " ";
  const firma = profile?.signature?.url || null;
  return (
    <View>
      {/* Sección para el miembro de la tripulación */}
      <View style={styles.section}>
        <View style={styles.column}>
          <Text style={[styles.text, { color: "#00008B" }]}>{fullName}</Text>
          <View style={styles.underline} /> {/* Línea más larga */}
          <Text style={styles.text}>Crew Member Name</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.signatureContainer}>
            {" "}
            <Text style={[styles.text, { paddingLeft: 40 }]}>
              {seafarerDocument || "\u00A0"}
            </Text>
            {firma ? (
              <Image source={{ uri: firma }} style={styles.signatureImage} />
            ) : (
              <View style={{ marginLeft: 20, marginTop: -30 }} /> // Espacio vacío
            )}
            <View
              style={[
                styles.underline,
                { position: "absolute", top: 10, left: 15 },
              ]}
            />{" "}
          </View>
          <Text style={[styles.text, { paddingTop: 10 }]}>ID# Signature</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.text, { color: "#00008B" }]}>
            {formattedDate || "\u00A0"}
          </Text>
          <View style={styles.underline} /> {/* Línea más larga */}
          <Text style={styles.text}>Date of issue</Text>
        </View>
      </View>

      {/* Sección para el representante de la agencia */}
      <View style={styles.section}>
        <View style={styles.column}>
          <Text style={[styles.text, { color: "#00008B" }]}>
            {interview || "\u00A0"}
          </Text>
          <View style={[styles.underline, { width: "100%" }]} />{" "}
          {/* Línea más larga */}
          <Text style={styles.text}>
            Name of the representative of the placement agency
          </Text>
        </View>
        <View style={styles.column}>
          <View style={styles.signatureContainer}>
            {firmaEntrevistador ? (
              <Image
                source={firmaEntrevistador ? { uri: firmaEntrevistador } : null}
                style={styles.signatureImage}
                resizeMode="contain"
              />
            ) : (
              <View style={{ marginLeft: 20, marginTop: -30 }} /> // Espacio vacío
            )}
            <View
              style={[
                styles.underline,
                { position: "absolute", top: 10, left: 0 },
              ]}
            />{" "}
          </View>{" "}
          <Text style={[styles.text, { paddingTop: 15 }]}> Signature</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.text, { color: "#00008B" }]}>
            {formattedDate || "\u00A0"}
          </Text>
          <View style={styles.underline} />
          <Text style={styles.text}>Date of issue</Text>
        </View>
      </View>
    </View>
  );
}
