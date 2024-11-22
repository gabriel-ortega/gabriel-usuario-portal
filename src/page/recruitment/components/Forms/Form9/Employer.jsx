import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function Employer({
  title,
  employer,
  position,
  address,
  dateOf,
  dateTo,
  wage,
  reliability,
  organized,
  time,
  attendance,
  reasons,
  comments,
  contactedBy,
}) {
  const styles = StyleSheet.create({
    tableRow: {
      flexDirection: "row",
      paddingBottom: 5,
    },
    tableCell: {
      padding: 6,
      borderWidth: 0.5,
      borderColor: "#000000",
    },
    tableCellTitulo: {
      borderRight: 1,
      borderTopColor: "black",
      borderColor: "#000000",
    },
    tableCellTituloContent: {
      fontSize: "10px",
    },
    text: {
      fontSize: "12px",
      fontWeight: "bold",
    },
  });
  return (
    <>
      <Text style={[{ fontSize: "10px", paddingTop: 1, paddingBottom: 2 }]}>
        {title}
      </Text>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: 150 }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Employer{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {employer}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Position held:
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  borderBottom: 1,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                  color: "#00008B",
                },
              ]}
            >
              {position}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: 150 }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Address
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {address}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Of:
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 150,
                  paddingTop: 3,
                  borderBottom: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                  color: "#00008B",
                },
              ]}
            >
              {dateOf}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: 250 }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  width: 241,
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Contact by:{" "}
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <View
              style={[
                {
                  fontSize: "10px",
                  width: 241,
                  borderTop: 1,
                  height: "40px",
                  display: "flex",
                  flexDirection: "row",
                },
              ]}
            >
              <View
                style={[
                  {
                    width: "auto",
                    paddingRight: 15,
                    borderRight: 1,
                    display: "flex",
                    flexDirection: "row",
                  },
                ]}
              >
                <Text style={[{ paddingTop: 5, paddingLeft: 5 }]}>
                  Telephone:
                </Text>
                <Text
                  style={[
                    {
                      marginTop: 5,
                      border: 1,
                      width: 10,
                      height: 13,
                      textAlign: "center",
                    },
                  ]}
                >
                  {" "}
                  {contactedBy === "Telephone" ? "x" : ""}
                </Text>
              </View>
              <View
                style={[
                  {
                    width: "auto",
                    paddingRight: 12,
                    borderRight: 1,
                    display: "flex",
                    flexDirection: "row",
                  },
                ]}
              >
                <Text style={[{ paddingTop: 5, paddingLeft: 5 }]}>E-mail:</Text>
                <Text
                  style={[
                    {
                      marginTop: 5,
                      border: 1,
                      width: 10,
                      height: 13,
                      textAlign: "center",
                    },
                  ]}
                >
                  {contactedBy === "E-mail" ? "x" : ""}
                </Text>
              </View>
              <View
                style={[
                  { width: "auto", display: "flex", flexDirection: "row" },
                ]}
              >
                <Text style={[{ paddingTop: 5, paddingLeft: 5 }]}>
                  Whatsapp:
                </Text>
                <Text
                  style={[
                    {
                      marginTop: 5,
                      border: 1,
                      width: 10,
                      height: 13,
                      textAlign: "center",
                    },
                  ]}
                >
                  {contactedBy === "Whatsapp" ? "x" : ""}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.tableCelTituloContent]}>
            <View
              style={[
                {
                  fontSize: "10px",
                  width: 241,
                  borderTop: 1,
                  height: "15px",
                  display: "flex",
                  flexDirection: "row",
                },
              ]}
            >
              <Text style={[{ width: "59%", borderRight: 1 }]}>To:</Text>
              <Text style={[{ width: "43%" }]}>Wage:</Text>
            </View>
          </View>

          <View style={[styles.tableCelTituloContent]}>
            <View
              style={[
                {
                  fontSize: "10px",
                  width: 241,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "15px",
                  display: "flex",
                  flexDirection: "row",
                },
              ]}
            >
              <Text
                style={[{ width: "59%", borderRight: 1, color: "#00008B" }]}
              >
                {dateTo}
              </Text>
              <Text style={[{ width: "43%", color: "#00008B" }]}>{wage}</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={[{ fontSize: "10px", paddingTop: 4 }]}>
        Performance: Use a rating scale of 1 to 3 (1 Bad, 2 Good and 3
        Excellent). If you get a rating of less than 3, be aware of the details
        associated with it.
      </Text>
      <View style={[styles.tableRow]}>
        <View style={[styles.tableCellTitulo, { width: "15%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Reliability
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  borderLeft: 1,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {reliability}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "15%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Organized
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {organized}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "20%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Time management
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {time}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "15%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Attendance
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {attendance}
            </Text>
          </View>
        </View>

        <View style={[styles.tableCellTitulo, { width: "35%" }]}>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  height: "15px",
                },
              ]}
            >
              Reasons for departure
            </Text>
          </View>
          <View style={[styles.tableCelTituloContent, {}]}>
            <Text
              style={[
                {
                  fontSize: "10px",
                  paddingTop: 3,
                  paddingLeft: 4,
                  borderTop: 1,
                  borderBottom: 1,
                  height: "40px",
                  color: "#00008B",
                },
              ]}
            >
              {reasons}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[{ fontSize: "10px" }]}>
        comments: Detail of the comments shared by the party that refers to:
      </Text>
      <Text
        style={[{ border: 1, padding: 10, fontSize: "10px", color: "#00008B" }]}
      >
        {comments}
      </Text>
    </>
  );
}
