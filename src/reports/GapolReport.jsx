import { Font, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logistic from "../assets/imagenes/LOGO-LOGISTIC.png";

export default function GapolReport({ date, data, deptFilter }) {
  const { applicantsTotal, recruitmentDepartments } = data;
  /* const currentDate = new Date(); */

  /*  Font.register({
    family: 'robotoBold',
    src: 'https://mp-ip.edu.pa/plantillas/fuente/Open_Sans/static/OpenSans-Bold.ttf',
  });

  Font.register({
    family: 'openSans',
    src: 'https://mp-ip.edu.pa/plantillas/fuente/Open_Sans/static/OpenSans-Light.ttf',
  });
 */
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 15,
      left: 0,
      right: 0,
      paddingBottom: 45,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    page: {
      paddingBottom: 40,
      paddingLeft: 30,
      paddingRight: 30,
      backgroundColor: "#FFFFFF",
    },
    section: {
      flexGrow: 1,
    },
    text: {
      fontSize: 10,
      color: "black",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
    },
    column: {
      marginRight: 100,
    },
    logo: {
      width: 150,
      paddingTop: 8,
    },
    container: {
      paddingTop: 10,
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    table: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 20,
    },
    tableColumn: {
      width: "33%",
      paddingHorizontal: 5,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footer: {
      position: "fixed",
      bottom: -20,
      left: 0,
      right: 0,
      paddingHorizontal: 50,
      textAlign: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      fontSize: 10,
      color: "#888",
    },text1: {
      fontSize: 10,
      color: 'black',
    },
    table1: {
     
    },
    tableRow1: {
      flexDirection: 'row',
      alignItems: 'stretch',
    },
    tableColumn1: {
      flex: 1,
      borderTop: 1,
      borderColor: 'black',
    }
  });

  return (
    <>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={logistic} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.text,
                { fontSize: 18, marginLeft: 30 /* fontFamily:"robotoBold" */ },
              ]}
            >
              REPORT: GAP POOL
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          {deptFilter == "All Departments" || !deptFilter ? (
            <>
              {/* Título de la sección */}

              <Text
                style={[
                  styles.text,
                  {
                    backgroundColor: "#1888b9",
                    color: "white",
                    padding: 5,
                    marginTop: -20,
                  },
                  {
                    /* fontFamily:"robotoBold" */
                  },
                ]}
              >
                General Data
              </Text>

              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: 20,
                    alignItems: "center",
                    marginTop: 20,
                  },
                ]}
              >
                <View style={[{ flexDirection: "row", marginRight: 20 }]}>
                  <Text style={[styles.text, { marginRight: 10 }]}>
                    Total Applicants
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */
                      },
                    ]}
                  >
                    {applicantsTotal?.total || ""}
                  </Text>
                </View>
                <View style={[{ flexDirection: "row", marginRight: 20 }]}>
                  <Text style={[styles.text, { marginRight: 10 }]}>
                    Available
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */
                      },
                    ]}
                  >
                    {applicantsTotal?.available || ""}
                  </Text>
                </View>
                <View style={[{ flexDirection: "row", marginRight: 20 }]}>
                  <Text style={[styles.text, { marginRight: 10 }]}>
                    Unavailable
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */
                      },
                    ]}
                  >
                    {applicantsTotal?.unavailable}
                  </Text>
                </View>

                <View style={[{ flexDirection: "row", marginRight: 20 }]}>
                  <Text style={[styles.text, { width: 120, marginRight: 10 }]}>
                    Available Applicants with experience on board
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */
                      },
                    ]}
                  >
                    {applicantsTotal?.availableExperience}
                  </Text>
                </View>
                <View style={[{ flexDirection: "row" }]}>
                  <Text style={[styles.text, { width: 120, marginRight: 10 }]}>
                    Unavailable Applicants with experience on board
                  </Text>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */
                      },
                    ]}
                  >
                    {applicantsTotal?.unavailableExperience}
                  </Text>
                </View>
              </View>

              <View style={[styles.table, { marginTop: 30, paddingLeft: 65 }]}>
                {/* Columna de Posiciones */}
                <View style={[styles.tableColumn, { width: "30%" }]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */ marginBottom: 10,
                        marginLeft: 30,
                      },
                    ]}
                  >
                    Applicants By Position
                  </Text>
                  {applicantsTotal.position.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.tableRow, { width: 180, marginTop: 7 }]}
                    >
                      <Text style={[styles.text, { width: 150 }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.text]}>{item.total}</Text>
                    </View>
                  ))}
                </View>

                {/* Columna de Departamentos */}
                <View style={[styles.tableColumn, { width: "30%" }]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */ marginBottom: 10,
                        marginLeft: 30,
                      },
                    ]}
                  >
                    Applicants By Department
                  </Text>
                  {applicantsTotal.department.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.tableRow, { width: 180, marginTop: 7 }]}
                    >
                      <Text style={[styles.text, { width: 150 }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.text]}>{item.total}</Text>
                    </View>
                  ))}
                </View>

                {/* Columna de Nacionalidades */}
                <View style={[styles.tableColumn, { width: "30%" }]}>
                  <Text
                    style={[
                      styles.text,
                      {
                        /* fontFamily:"robotoBold" */ marginBottom: 10,
                        marginLeft: 30,
                      },
                    ]}
                  >
                    Applicants By Nationality
                  </Text>
                  {applicantsTotal.nationality.map((item, index) => (
                    <View
                      key={index}
                      style={[styles.tableRow, { width: 180, marginTop: 7 }]}
                    >
                      <Text style={[styles.text, { width: 150 }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.text]}>{item.total}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </>
          ) : null}
          {deptFilter == "All Departments" || !deptFilter
            ? Object.keys(recruitmentDepartments).map(
                (departmentKey, index) => {
                  const departmentData = recruitmentDepartments[departmentKey]; // Accede dinámicamente a cada departamento

                  return (
                    <View key={index} style={{ marginTop: 20 }}>
                      <Text
                        style={[
                          styles.text,
                          {
                            backgroundColor: "#1888b9",
                            color: "white",
                            padding: 5,
                          },
                          {
                            /* fontFamily:"robotoBold" */
                          },
                        ]}
                      >
                        {departmentKey}
                      </Text>

                      {/* Información Total de Solicitantes */}
                      <View
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 20,
                            alignItems: "center",
                            marginTop: 20,
                          },
                        ]}
                      >
                        <View
                          style={[{ flexDirection: "row", marginRight: 20 }]}
                        >
                          <Text style={[styles.text, { marginRight: 10 }]}>
                            Total Applicants
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */
                              },
                            ]}
                          >
                            {departmentData.total || ""}
                          </Text>
                        </View>
                        <View
                          style={[{ flexDirection: "row", marginRight: 20 }]}
                        >
                          <Text style={[styles.text, { marginRight: 10 }]}>
                            Available
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */
                              },
                            ]}
                          >
                            {departmentData.available || ""}
                          </Text>
                        </View>
                        <View
                          style={[{ flexDirection: "row", marginRight: 20 }]}
                        >
                          <Text style={[styles.text, { marginRight: 10 }]}>
                            Unavailable
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */
                              },
                            ]}
                          >
                            {departmentData.unavailable}
                          </Text>
                        </View>

                        <View
                          style={[{ flexDirection: "row", marginRight: 20 }]}
                        >
                          <Text
                            style={[
                              styles.text,
                              { width: 120, marginRight: 10 },
                            ]}
                          >
                            Available Applicants with experience on board
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */
                              },
                            ]}
                          >
                            {departmentData.availableExperienceboard}
                          </Text>
                        </View>
                        <View style={[{ flexDirection: "row" }]}>
                          <Text
                            style={[
                              styles.text,
                              { width: 120, marginRight: 10 },
                            ]}
                          >
                            Unavailable Applicants with experience on board
                          </Text>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */
                              },
                            ]}
                          >
                            {departmentData.unavailableExperienceboard}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.table,
                          { marginTop: 30, paddingLeft: 65 },
                        ]}
                      >
                        {/* Columna de Posiciones */}
                        <View style={[styles.tableColumn, { width: "30%" }]}>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */ marginBottom: 10,
                                marginLeft: 30,
                              },
                            ]}
                          >
                            Applicants By Position
                          </Text>
                          {departmentData.position.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableRow,
                                { width: 180, marginTop: 7 },
                              ]}
                            >
                              <Text style={[styles.text, { width: 150 }]}>
                                {item.name}
                              </Text>
                              <Text style={[styles.text]}>{item.total}</Text>
                            </View>
                          ))}
                        </View>

                        {/* Columna de Departamentos */}
                        <View style={[styles.tableColumn, { width: "30%" }]}>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */ marginBottom: 10,
                                marginLeft: 30,
                              },
                            ]}
                          >
                            Applicants By Department
                          </Text>
                          {departmentData.department.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableRow,
                                { width: 180, marginTop: 7 },
                              ]}
                            >
                              <Text style={[styles.text, { width: 150 }]}>
                                {item.name}
                              </Text>
                              <Text style={[styles.text]}>{item.total}</Text>
                            </View>
                          ))}
                        </View>

                        {/* Columna de Nacionalidades */}
                        <View style={[styles.tableColumn, { width: "30%" }]}>
                          <Text
                            style={[
                              styles.text,
                              {
                                /* fontFamily:"robotoBold" */ marginBottom: 10,
                                marginLeft: 30,
                              },
                            ]}
                          >
                            Applicants By Nationality
                          </Text>
                          {departmentData.nationality.map((item, index) => (
                            <View
                              key={index}
                              style={[
                                styles.tableRow,
                                { width: 180, marginTop: 7 },
                              ]}
                            >
                              <Text style={[styles.text, { width: 150 }]}>
                                {item.name}
                              </Text>
                              <Text style={[styles.text]}>{item.total}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                      {/* UN ONBOARD */}
                      {departmentData.availableExperienceBoardList ? (
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {
                                backgroundColor: "",
                                color: "black",
                                padding: 5,
                                textDecoration: "underline",
                              },
                              { /* fontFamily:"robotoBold" */ marginTop: 10 },
                            ]}
                          >
                            Available Seafarers with Experience onboard
                          </Text>

                          <View
                            style={[
                              styles.tableRow1,
                              {
                                flexDirection: "row",
                                alignItems: "stretch",
                                marginHorizontal: 20,
                                marginTop: 20,
                              },
                            ]}
                          >
                            <View style={[{ flex: 0.4 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                No
                              </Text>
                            </View>
                            <View style={[{ flex: 0.6 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Logistic ID
                              </Text>
                            </View>
                            <View style={[{ flex: 2 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Name
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Position
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Nationality
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Embarked
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Emb. Company
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Employee Number
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.table1,
                              { marginTop: 10, marginHorizontal: 20 },
                            ]}
                          >
                            {departmentData.availableExperienceBoardList.map(
                              (available, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow1,
                                    {
                                      flexDirection: "row",
                                      alignItems: "stretch",
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.4,
                                        padding: 3,
                                        textAlign: "left",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {index + 1}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.6,
                                        padding: 3,
                                        textAlign: "center",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.logisticId}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 2, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.position}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.nationality}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previouslyEmbarked}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previousCompany}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.employeeNumber}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      ) : null}

                      {/* ONlAND */}

                      {departmentData.availableExperienceLandList ? (
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {
                                backgroundColor: "",
                                color: "black",
                                padding: 5,
                                textDecoration: "underline",
                              },
                              { /* fontFamily:"robotoBold" */ marginTop: 10 },
                            ]}
                          >
                            Available Seafarers with Experience onland
                          </Text>

                          <View
                            style={[
                              styles.tableRow1,
                              {
                                flexDirection: "row",
                                alignItems: "stretch",
                                marginHorizontal: 20,
                                marginTop: 20,
                              },
                            ]}
                          >
                            <View style={[{ flex: 0.4 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                No
                              </Text>
                            </View>
                            <View style={[{ flex: 0.6 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Logistic ID
                              </Text>
                            </View>
                            <View style={[{ flex: 2 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Name
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Position
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Nationality
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Embarked
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Emb. Company
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Employee Number
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.table1,
                              { marginTop: 10, marginHorizontal: 20 },
                            ]}
                          >
                            {departmentData.availableExperienceLandList.map(
                              (available, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow1,
                                    {
                                      flexDirection: "row",
                                      alignItems: "stretch",
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.4,
                                        padding: 3,
                                        textAlign: "left",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {index + 1}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.6,
                                        padding: 3,
                                        textAlign: "center",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.logisticId}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 2, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.position}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.nationality}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previouslyEmbarked}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previousCompany}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.employeeNumber}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      ) : null}
                      {/* Una Onboard */}
                      {departmentData.unavailableExperienceBoardList ? (
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {
                                backgroundColor: "",
                                color: "black",
                                padding: 5,
                                textDecoration: "underline",
                              },
                              { /* fontFamily:"robotoBold" */ marginTop: 10 },
                            ]}
                          >
                            Unavailable Seafarers with Experience onboard
                          </Text>

                          <View
                            style={[
                              styles.tableRow1,
                              {
                                flexDirection: "row",
                                alignItems: "stretch",
                                marginHorizontal: 20,
                                marginTop: 20,
                              },
                            ]}
                          >
                            <View style={[{ flex: 0.4 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                No
                              </Text>
                            </View>
                            <View style={[{ flex: 0.6 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Logistic ID
                              </Text>
                            </View>
                            <View style={[{ flex: 2 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Name
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Position
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Nationality
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Embarked
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Emb. Company
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Employee Number
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.table1,
                              { marginTop: 10, marginHorizontal: 20 },
                            ]}
                          >
                            {departmentData.unavailableExperienceBoardList.map(
                              (available, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow1,
                                    {
                                      flexDirection: "row",
                                      alignItems: "stretch",
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.4,
                                        padding: 3,
                                        textAlign: "left",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {index + 1}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.6,
                                        padding: 3,
                                        textAlign: "center",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.logisticId}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 2, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.position}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.nationality}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previouslyEmbarked}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previousCompany}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.employeeNumber}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      ) : null}

                      {/* ONlAND */}

                      {departmentData.unavailableExperienceLandList ? (
                        <View>
                          <Text
                            style={[
                              styles.text,
                              {
                                backgroundColor: "",
                                color: "black",
                                padding: 5,
                                textDecoration: "underline",
                              },
                              { /* fontFamily:"robotoBold" */ marginTop: 10 },
                            ]}
                          >
                            Unavailable Seafarers with Experience onland
                          </Text>

                          <View
                            style={[
                              styles.tableRow1,
                              {
                                flexDirection: "row",
                                alignItems: "stretch",
                                marginHorizontal: 20,
                                marginTop: 20,
                              },
                            ]}
                          >
                            <View style={[{ flex: 0.4 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                No
                              </Text>
                            </View>
                            <View style={[{ flex: 0.6 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Logistic ID
                              </Text>
                            </View>
                            <View style={[{ flex: 2 }]}>
                              <Text
                                style={[
                                  styles.text1,
                                  { fontWeight: "bold", textAlign: "center" },
                                ]}
                              >
                                Name
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Position
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Nationality
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Embarked
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Previously Emb. Company
                              </Text>
                            </View>
                            <View style={[{ flex: 1 }]}>
                              <Text
                                style={[styles.text1, { fontWeight: "bold" }]}
                              >
                                Employee Number
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.table1,
                              { marginTop: 10, marginHorizontal: 20 },
                            ]}
                          >
                            {departmentData.unavailableExperienceLandList.map(
                              (available, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow1,
                                    {
                                      flexDirection: "row",
                                      alignItems: "stretch",
                                    },
                                  ]}
                                >
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.4,
                                        padding: 3,
                                        textAlign: "left",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {index + 1}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      {
                                        flex: 0.6,
                                        padding: 3,
                                        textAlign: "center",
                                      },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.logisticId}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 2, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.position}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.nationality}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previouslyEmbarked}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.previousCompany}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.tableColumn1,
                                      { flex: 1, padding: 3 },
                                    ]}
                                  >
                                    <Text style={[styles.text]}>
                                      {available.employeeNumber}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )}
                          </View>
                        </View>
                      ) : null}
                    </View>
                  );
                }
              )
            : Object.keys(recruitmentDepartments).map(
                (departmentKey, index) => {
                  const departmentData = recruitmentDepartments[departmentKey]; // Accede dinámicamente a cada departamento

                  // Si el nombre del departamento coincide con el filtro, procede a renderizar
                  if (departmentKey === deptFilter) {
                    return (
                      <View key={index} style={{ marginTop: 20 }}>
                        <Text
                          style={[
                            styles.text,
                            {
                              backgroundColor: "#1888b9",
                              color: "white",
                              padding: 5,
                            },
                          ]}
                        >
                          {departmentKey}
                        </Text>

                        {/* Información Total de Solicitantes */}
                        <View
                          style={[
                            {
                              flexDirection: "row",
                              justifyContent: "center",
                              gap: 20,
                              alignItems: "center",
                              marginTop: 20,
                            },
                          ]}
                        >
                          <View
                            style={[{ flexDirection: "row", marginRight: 20 }]}
                          >
                            <Text style={[styles.text, { marginRight: 10 }]}>
                              Total Applicants
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */
                                },
                              ]}
                            >
                              {departmentData.total || ""}
                            </Text>
                          </View>
                          <View
                            style={[{ flexDirection: "row", marginRight: 20 }]}
                          >
                            <Text style={[styles.text, { marginRight: 10 }]}>
                              Available
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */
                                },
                              ]}
                            >
                              {departmentData.available || ""}
                            </Text>
                          </View>
                          <View
                            style={[{ flexDirection: "row", marginRight: 20 }]}
                          >
                            <Text style={[styles.text, { marginRight: 10 }]}>
                              Unavailable
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */
                                },
                              ]}
                            >
                              {departmentData.unavailable}
                            </Text>
                          </View>

                          <View
                            style={[{ flexDirection: "row", marginRight: 20 }]}
                          >
                            <Text
                              style={[
                                styles.text,
                                { width: 120, marginRight: 10 },
                              ]}
                            >
                              Available Applicants with experience on board
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */
                                },
                              ]}
                            >
                              {departmentData.availableExperience}
                            </Text>
                          </View>
                          <View style={[{ flexDirection: "row" }]}>
                            <Text
                              style={[
                                styles.text,
                                { width: 120, marginRight: 10 },
                              ]}
                            >
                              Unavailable Applicants with experience on board
                            </Text>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */
                                },
                              ]}
                            >
                              {departmentData.unavailableExperience}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={[
                            styles.table,
                            { marginTop: 30, paddingLeft: 65 },
                          ]}
                        >
                          {/* Columna de Posiciones */}
                          <View style={[styles.tableColumn, { width: "30%" }]}>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */ marginBottom: 10,
                                  marginLeft: 30,
                                },
                              ]}
                            >
                              Applicants By Position
                            </Text>
                            {departmentData.position.map((item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 180, marginTop: 7 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.total}</Text>
                              </View>
                            ))}
                          </View>

                          {/* Columna de Departamentos */}
                          <View style={[styles.tableColumn, { width: "30%" }]}>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */ marginBottom: 10,
                                  marginLeft: 30,
                                },
                              ]}
                            >
                              Applicants By Department
                            </Text>
                            {departmentData.department.map((item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 180, marginTop: 7 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.total}</Text>
                              </View>
                            ))}
                          </View>

                          {/* Columna de Nacionalidades */}
                          <View style={[styles.tableColumn, { width: "30%" }]}>
                            <Text
                              style={[
                                styles.text,
                                {
                                  /* fontFamily:"robotoBold" */ marginBottom: 10,
                                  marginLeft: 30,
                                },
                              ]}
                            >
                              Applicants By Nationality
                            </Text>
                            {departmentData.nationality.map((item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 180, marginTop: 7 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.total}</Text>
                              </View>
                            ))}
                          </View>
                        </View>

                        {/* UN ONBOARD */}
                        {departmentData.availableExperienceBoardList ? (
                          <View>
                            <Text
                              style={[
                                styles.text,
                                {
                                  backgroundColor: "",
                                  color: "black",
                                  padding: 5,
                                  textDecoration: "underline",
                                },
                                { /* fontFamily:"robotoBold" */ marginTop: 10 },
                              ]}
                            >
                              Available Seafarers with Experience onboard
                            </Text>

                            <View
                              style={[
                                styles.tableRow1,
                                {
                                  flexDirection: "row",
                                  alignItems: "stretch",
                                  marginHorizontal: 20,
                                  marginTop: 20,
                                },
                              ]}
                            >
                              <View style={[{ flex: 0.4 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  No
                                </Text>
                              </View>
                              <View style={[{ flex: 0.6 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Logistic ID
                                </Text>
                              </View>
                              <View style={[{ flex: 2 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Name
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Position
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Nationality
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Embarked
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Emb. Company
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Employee Number
                                </Text>
                              </View>
                            </View>

                            <View
                              style={[
                                styles.table1,
                                { marginTop: 10, marginHorizontal: 20 },
                              ]}
                            >
                              {departmentData.availableExperienceBoardList.map(
                                (available, index) => (
                                  <View
                                    key={index}
                                    style={[
                                      styles.tableRow1,
                                      {
                                        flexDirection: "row",
                                        alignItems: "stretch",
                                      },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.4,
                                          padding: 3,
                                          textAlign: "left",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {index + 1}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.6,
                                          padding: 3,
                                          textAlign: "center",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.logisticId}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 2, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.position}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.nationality}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previouslyEmbarked}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previousCompany}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.employeeNumber}
                                      </Text>
                                    </View>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ) : null}

                        {/* ONlAND */}

                        {departmentData.availableExperienceLandList ? (
                          <View>
                            <Text
                              style={[
                                styles.text,
                                {
                                  backgroundColor: "",
                                  color: "black",
                                  padding: 5,
                                  textDecoration: "underline",
                                },
                                { /* fontFamily:"robotoBold" */ marginTop: 10 },
                              ]}
                            >
                              Available Seafarers with Experience onland
                            </Text>

                            <View
                              style={[
                                styles.tableRow1,
                                {
                                  flexDirection: "row",
                                  alignItems: "stretch",
                                  marginHorizontal: 20,
                                  marginTop: 20,
                                },
                              ]}
                            >
                              <View style={[{ flex: 0.4 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  No
                                </Text>
                              </View>
                              <View style={[{ flex: 0.6 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Logistic ID
                                </Text>
                              </View>
                              <View style={[{ flex: 2 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Name
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Position
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Nationality
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Embarked
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Emb. Company
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Employee Number
                                </Text>
                              </View>
                            </View>

                            <View
                              style={[
                                styles.table1,
                                { marginTop: 10, marginHorizontal: 20 },
                              ]}
                            >
                              {departmentData.availableExperienceLandList.map(
                                (available, index) => (
                                  <View
                                    key={index}
                                    style={[
                                      styles.tableRow1,
                                      {
                                        flexDirection: "row",
                                        alignItems: "stretch",
                                      },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.4,
                                          padding: 3,
                                          textAlign: "left",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {index + 1}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.6,
                                          padding: 3,
                                          textAlign: "center",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.logisticId}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 2, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.position}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.nationality}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previouslyEmbarked}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previousCompany}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.employeeNumber}
                                      </Text>
                                    </View>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ) : null}
                        {/* Una Onboard */}
                        {departmentData.unavailableExperienceBoardList ? (
                          <View>
                            <Text
                              style={[
                                styles.text,
                                {
                                  backgroundColor: "",
                                  color: "black",
                                  padding: 5,
                                  textDecoration: "underline",
                                },
                                { /* fontFamily:"robotoBold" */ marginTop: 10 },
                              ]}
                            >
                              Unavailable Seafarers with Experience onboard
                            </Text>

                            <View
                              style={[
                                styles.tableRow1,
                                {
                                  flexDirection: "row",
                                  alignItems: "stretch",
                                  marginHorizontal: 20,
                                  marginTop: 20,
                                },
                              ]}
                            >
                              <View style={[{ flex: 0.4 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  No
                                </Text>
                              </View>
                              <View style={[{ flex: 0.6 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Logistic ID
                                </Text>
                              </View>
                              <View style={[{ flex: 2 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Name
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Position
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Nationality
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Embarked
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Emb. Company
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Employee Number
                                </Text>
                              </View>
                            </View>

                            <View
                              style={[
                                styles.table1,
                                { marginTop: 10, marginHorizontal: 20 },
                              ]}
                            >
                              {departmentData.unavailableExperienceBoardList.map(
                                (available, index) => (
                                  <View
                                    key={index}
                                    style={[
                                      styles.tableRow1,
                                      {
                                        flexDirection: "row",
                                        alignItems: "stretch",
                                      },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.4,
                                          padding: 3,
                                          textAlign: "left",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {index + 1}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.6,
                                          padding: 3,
                                          textAlign: "center",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.logisticId}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 2, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.position}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.nationality}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previouslyEmbarked}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previousCompany}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.employeeNumber}
                                      </Text>
                                    </View>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ) : null}

                        {/* ONlAND */}

                        {departmentData.unavailableExperienceLandList ? (
                          <View>
                            <Text
                              style={[
                                styles.text,
                                {
                                  backgroundColor: "",
                                  color: "black",
                                  padding: 5,
                                  textDecoration: "underline",
                                },
                                { /* fontFamily:"robotoBold" */ marginTop: 10 },
                              ]}
                            >
                              Unavailable Seafarers with Experience onland
                            </Text>

                            <View
                              style={[
                                styles.tableRow1,
                                {
                                  flexDirection: "row",
                                  alignItems: "stretch",
                                  marginHorizontal: 20,
                                  marginTop: 20,
                                },
                              ]}
                            >
                              <View style={[{ flex: 0.4 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  No
                                </Text>
                              </View>
                              <View style={[{ flex: 0.6 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Logistic ID
                                </Text>
                              </View>
                              <View style={[{ flex: 2 }]}>
                                <Text
                                  style={[
                                    styles.text1,
                                    { fontWeight: "bold", textAlign: "center" },
                                  ]}
                                >
                                  Name
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Position
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Nationality
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Embarked
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Previously Emb. Company
                                </Text>
                              </View>
                              <View style={[{ flex: 1 }]}>
                                <Text
                                  style={[styles.text1, { fontWeight: "bold" }]}
                                >
                                  Employee Number
                                </Text>
                              </View>
                            </View>

                            <View
                              style={[
                                styles.table1,
                                { marginTop: 10, marginHorizontal: 20 },
                              ]}
                            >
                              {departmentData.unavailableExperienceLandList.map(
                                (available, index) => (
                                  <View
                                    key={index}
                                    style={[
                                      styles.tableRow1,
                                      {
                                        flexDirection: "row",
                                        alignItems: "stretch",
                                      },
                                    ]}
                                  >
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.4,
                                          padding: 3,
                                          textAlign: "left",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {index + 1}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        {
                                          flex: 0.6,
                                          padding: 3,
                                          textAlign: "center",
                                        },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.logisticId}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 2, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.name}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.position}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.nationality}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previouslyEmbarked}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.previousCompany}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.tableColumn1,
                                        { flex: 1, padding: 3 },
                                      ]}
                                    >
                                      <Text style={[styles.text]}>
                                        {available.employeeNumber}
                                      </Text>
                                    </View>
                                  </View>
                                )
                              )}
                            </View>
                          </View>
                        ) : null}
                      </View>
                    );
                  }
                  return null;
                }
              )}
        </View>
        {/* Pie de página */}
        <View style={styles.footer} fixed>
          <Text>{"Printed on: " + date || ""}</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </>
  );
}
