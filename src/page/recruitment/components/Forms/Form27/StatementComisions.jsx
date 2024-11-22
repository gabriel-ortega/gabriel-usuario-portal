import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementComisions() {
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
        <Text style={{ color: "white" }}>
          C{"\n"}O{"\n"}M{"\n"}I{"\n"}S{"\n"}I{"\n"}O{"\n"}N{"\n"}S
        </Text>
      </View>
      <View style={styles.table}>
        {/* Encabezado */}
        <View style={[styles.row, { backgroundColor: "black" }]}>
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              #
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              STATEMENT
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "10%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}></Text>
          </View>
          <View style={[styles.tableCell, { width: "15%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}></Text>
          </View>
        </View>

        {/* Filas de datos */}

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 40 }]}>
            <Text style={styles.text}>30. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 40 }]}>
            <Text style={styles.text}>
              My Placement Agency / Represent before the shipping agency has
              informed me that I do not have to pay a commission or any fee for
              submitting an application, processing or location with the
              shipping agency
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

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>31. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              All my questions have been answered by the placement agency or
              representative of the shipping agency to my satisfaction regarding
              the services and additional fees.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 30 },
            ]}
          >
            {" "}
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
              { width: "15%", justifyContent: "center", height: 30 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 50 }]}>
            <Text style={styles.text}>32. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 50 }]}>
            <Text style={styles.text}>
              I have been informed and understand that there may be a cost for
              certain uniform items without logo and that it is my
              responsibility to cover the initial cost and for any replacements.
              For my convenience, the company has established a payment plan
              once I am on board, which provides me with ninety (90) days for
              such payment.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 50 },
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
              { width: "15%", justifyContent: "center", height: 50 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>33. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I got a full receipt for any additional services I wascharged by
              the placement agency. Which I mustkeep for any claim or refund,
              when eligible.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 30 },
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
              { width: "15%", justifyContent: "center", height: 30 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 40 }]}>
            <Text style={styles.text}>34. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 40 }]}>
            <Text style={styles.text}>
              I understand that I do not have to use the placement agency's
              services, including the position to obtain the air ticket to
              board, and if I do use their services, this is of my own free
              will. (Some examples of additional services are language training,
              resume writing, restaurant/server/bar training, etc.)
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
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 55 }]}>
            <Text style={styles.text}>35. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 55 }]}>
            <Text style={styles.text}>
              I have not been charged any commission or other fees, in whole or
              in part, for employment other than: the cost of obtaining a
              national medical certificate, certificate, the national seafarers'
              book, a passport or other similar personal travel documents, any
              training required for my position, i.e., licenses, Certificates,
              education, etc. (The cost of the visa is covered by the company).
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 55 },
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
              { width: "15%", justifyContent: "center", height: 55 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
      </View>
    </View>
  );
}
