import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementTrip() {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      width: 20, // Ajusta el ancho según sea necesario
      height: "100%", // Tomar toda la altura
      textAlign: "center",
      justifyContent: "center",
      backgroundColor: "black",
      color: "white",
      fontSize: 8,
      padding: 1,
      lineHeight: 1.5,
    },
    table: {
      border: 0.7,
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      height: "auto",
    },
    text: {
      margin: 2,
      textAlign: "justify",
      fontSize: 8,
    },
    tableCell: {
      width: "100%",
      height: 45,
      border: 0.6,
      padding: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.sideText}>
        <Text style={{ color: "white" }}></Text>
      </View>
      <View style={styles.table}>
        {/* Filas de datos */}

        <View style={[styles.row]}>
          <View style={[styles.tableCell, { width: "5%", height: 60 }]}>
            <Text style={styles.text}>25. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 60 }]}>
            <Text style={styles.text}>
              My placement agency or shipping agency gave me the name and
              password where I could verify: {"\n"}A._____ assigned ship name.
              {"\n"} B._____Name and phone number of the contact person at the
              port.
              {"\n"} C._____ Hotel name and address (if applicable).
              {"\n"} D._____Instructions how to get to the hotel (if applicable)
              {"\n"} E._____Instructions how my boat should arrive. {"\n"}
              F._____ information on where the ship is docked.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 60 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 60 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 60 }]}>
            <Text style={styles.text}>26. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 60 }]}>
            <Text style={styles.text}>
              FOR POSITIONS WITH TIPS (CAT C) ONLY: It has been reported that
              the cost of the travel package will be $________. I understand
              this as a voluntary program, but if I do not participate, I will
              not be eligible for discounts provided by the company and other
              services. These benefits include hotel room, a meal voucher for
              dinner and in most hotels breakfast, plus transportation from
              airport-to-hotel and from hotel to dock to join the ship.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 60 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 60 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>27. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              Your placement agency warned you of the estimated costs of
              boarding.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 20 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 20 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={[styles.tableCell, { width: "5%", height: 40 }]}>
            <Text style={styles.text}>28. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 40 }]}>
            <Text style={styles.text}>
              You are willing to pay the costs of joining the boarding, medical
              certificate, seafarer's seaman book, passport or some other
              personal document for the trip (excluding visa expenses) and the
              training required for your job.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 40 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 40 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>29. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              You have had to pay the placement agency to perform your
              application.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 20 },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: "#00008B",
                  justifyContent: "center",
                  textAlign: "center",
                },
              ]}
            >
              x
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "15%", justifyContent: "center", height: 20 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
      </View>
    </View>
  );
}
