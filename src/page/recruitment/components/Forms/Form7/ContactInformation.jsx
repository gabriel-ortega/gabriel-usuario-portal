import { Text, View, StyleSheet } from "@react-pdf/renderer";
export default function ContactInformation({ email, harvester, resp }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: "10px",
      fontWeight: "bold",
    },
    text_subrayado: {
      borderBottom: 0.5,
      marginLeft: 2,
      paddingLeft: 5,
      fontSize: "11px",
      color: "#00008B",
    },
  });

  return (
    <>
      <View style={[{ paddingTop: 10 }]}>
        <Text style={[styles.text, {}]}>Contact Information:</Text>
      </View>
      <View style={[{ paddingTop: 15, display: "flex", flexDirection: "row" }]}>
        <Text style={[styles.text, {}]}>Email:</Text>
        <Text style={[styles.text_subrayado, { width: "200px" }]}>
          {email ? email : ""}
        </Text>
        <Text style={[styles.text, { paddingLeft: 15 }]}>Referred by:</Text>
        <Text style={[styles.text_subrayado, { width: "180px" }]}>
          {harvester ? harvester : " "}
        </Text>
      </View>
      <View style={[{ paddingTop: 20, display: "flex", flexDirection: "row" }]}>
        <Text style={[styles.text, {}]}>Resume:</Text>
        <Text style={[styles.text_subrayado, { width: "170px" }]}>
          {resp?.resume || ""}
        </Text>
        <Text style={[styles.text, { paddingLeft: 34 }]}>
          Applicant experience:
        </Text>
        <Text style={[styles.text_subrayado, { width: "150px" }]}>
          {resp?.experience || ""}
        </Text>
      </View>
    </>
  );
}
