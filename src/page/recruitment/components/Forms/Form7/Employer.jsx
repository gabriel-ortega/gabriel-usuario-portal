import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Employer({ resp }) {
  const styles = StyleSheet.create({
    table: {
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderLeft: 1,
    },
    row: {
      flexDirection: "row",
    },
    cell: {
      width: "50%",
      borderStyle: "solid",
      borderColor: "#000",
      borderRight: 1,
      height: "40px",
    },
    text: {
      margin: 5,
      fontSize: 10,
    },
    borderBottom: {
      borderBottomWidth: 1,
    },
  });

  const employees = [
    {
      name: resp?.employer1 || "",
      phone: resp?.employerPhone1 || "",
      email: resp?.employerEmail1 || "",
    },

    {
      name: resp?.employer2 || "",
      phone: resp?.employerPhone2 || "",
      email: resp?.employerEmail2 || "",
    },
  ];
  return (
    <>
      <View style={{ paddingTop: 15, fontSize: "10px" }}>
        <Text>
          32. If i were to reach out to your past employer, what kind of
          feedback could i expect regarding your work style? (provides
          References)
        </Text>
      </View>

      <View style={{ paddingTop: 10 }}>
        {employees.map((employee, index) => (
          <View key={index}>
            <View style={[styles.table, { borderTop: 1 }]}>
              <View style={styles.row}>
                <View
                  style={[styles.cell, { height: "10px", paddingBottom: 5 }]}
                >
                  <Text style={styles.text}>Employer {index + 1}</Text>
                </View>
                <View
                  style={[styles.cell, { height: "10px", paddingBottom: 5 }]}
                >
                  <Text style={styles.text}>Phone</Text>
                </View>
                <View
                  style={[styles.cell, { height: "10px", paddingBottom: 5 }]}
                >
                  <Text style={styles.text}>Email</Text>
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View style={[styles.row, index === 1 && styles.borderBottom]}>
                <View style={styles.cell}>
                  <Text style={[styles.text, { color: "#00008B" }]}>
                    {employee.name}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[styles.text, { color: "#00008B" }]}>
                    {employee.phone}
                  </Text>
                </View>
                <View style={styles.cell}>
                  <Text style={[styles.text, { color: "#00008B" }]}>
                    {employee.email}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </>
  );
}
