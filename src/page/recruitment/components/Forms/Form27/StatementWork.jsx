import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function StatementWork() {
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      width: "100%",
    },
    sideText: {
      width: 20,
      height: "100%",
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
          W{"\n"}O{"\n"}R{"\n"}K
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
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              I AGREE
            </Text>
          </View>
          <View style={[styles.tableCell, { width: "15%", height: 20 }]}>
            <Text style={[styles.text, { fontSize: 8, color: "white" }]}>
              DISAGREEMENT
            </Text>
          </View>
        </View>

        {/* Filas de datos */}

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>1. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have received an employment letterform my placement agency or
              the programmer / {"\n"}specialist detalling my assignment on the
              boat, the position and date of embarkation.
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
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>2. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              I have had the opportunity to clarify any doubts regarding my
              position
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              { width: "10%", textAlign: "center", height: 20 },
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
              { width: "15%", justifyContent: "center", height: 20 },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>3. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have received a copy of my job description on board. I have read
              and understood and believe that my work skills and experience
              qualify me to perform the functions described
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>4. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have had the opportunity to review my contract and the
              collective bargaining agreement, if {"\n"}applicable, before
              joining the ship.
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>5. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              All my questions have been answered by my placement agency or
              representative of the shipping company to my satisfaction with
              respect to my position.
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
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>6. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              I have understood the position I have accepted
              ______________________
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
        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 60 }]}>
            <Text style={styles.text}>7. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 60 }]}>
            <Text style={styles.text}>
              The total monthly payment guaranteed for this position is $_______
              of 303.1 hours of work. This pay may even be gratification
              received for tipped positions. if this position is eligible to
              work overtime, the hour rate after 303.1 hours of work is
              $________ {"\n"} FOR MANAGEMENT POSITIONS ONLY : the minimum
              minimum salary(USD) for this position is $_____
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>8. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I understand that the monthly salary listed above may be the only
              source of income I earn in my contract. I have not been told that
              there are other opportunities for income.
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
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>9. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              I have understood that I was paid twice a month in cash or a crew
              payroll card.
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

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>10. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I am aware that there is a 90-day test period on board regarding
              my performance at work and that I should receive a performance
              evaluation at the end of my probationary period.
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>11. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have read and understood the dress code of the company regarding
              uniforms, footwear, id cards, jewelry, glasses.
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
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>12. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have had the opportunity to review the collective bargaining
              agreement electronically and can request a written copy when on
              board from the human resources manager.
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
          <View style={[styles.tableCell, { width: "5%", height: 50 }]}>
            <Text style={styles.text}>13. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 50 }]}>
            <Text style={styles.text}>
              I have understood that I have to notify if I am married to any of
              the active crew members on board a ship belonging to the shipping
              agency, I must notify my placement agency or the person who
              recruits me if it is possible that they will be assigned on the
              same ship.
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
            <Text style={styles.text}>14. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I have understood that the company requires that you must complete
              the entire contract, before applying for a transfer or promotion
              to another position or department.
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
          <View style={[styles.tableCell, { width: "5%", height: 20 }]}>
            <Text style={styles.text}>15. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 20 }]}>
            <Text style={styles.text}>
              I understand that once hired for a specific brand, I cannot
              transfer between those brands.
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

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>16. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I understand that any transfer to another ship will be evaluated
              for approval by the shipping agency due to business need or
              exceptional personal circumstances.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              {
                width: "10%",
                textAlign: "center",
                height: 30,
                color: "#00008B",
              },
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
              {
                width: "15%",
                textAlign: "center",
                height: 30,
                color: "#00008B",
              },
            ]}
          >
            <Text style={styles.text}></Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.tableCell, { width: "5%", height: 30 }]}>
            <Text style={styles.text}>17. </Text>
          </View>
          <View style={[styles.tableCell, { width: "70%", height: 30 }]}>
            <Text style={styles.text}>
              I understand that I can work for several consecutive contracts on
              the same boat, but I can be assigned to a different ship depending
              on the needs of the business.
            </Text>
          </View>
          <View
            style={[
              styles.tableCell,
              {
                width: "10%",
                textAlign: "center",
                height: 30,
                color: "#00008B",
              },
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
      </View>
    </View>
  );
}
