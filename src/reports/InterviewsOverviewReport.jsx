import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logistic from "../assets/imagenes/LOGO-LOGISTIC.png";
import { formatDate } from "../util/helperFunctions";

export default function InterviewsOverviewReport({
  date,
  datefilter,
  data,
  deptFilter,
  title,
}) {
  const { recruitmentDepartmentTotal = {}, recruimentDepartment = {} } = data;
  /* const currentDate = new Date(); */
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
      fontSize: 8,
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
    },
    text1: {
      fontSize: 10,
      color: "black",
    },
    table1: {},
    tableRow1: {
      flexDirection: "row",
      alignItems: "stretch",
    },
    tableColumn1: {
      flex: 1,
      borderTop: 1,
      borderColor: "black",
    },
  });

  return (
    <>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={logistic} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { fontSize: 12, marginLeft: 30 }]}>
              Report: {title} Interviews Overview
            </Text>
            <Text style={[styles.text, { fontSize: 10, marginLeft: 30 }]}>
              {datefilter}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          {deptFilter == "All Departments" || !deptFilter ? (
            <>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 12,
                    backgroundColor: "#1888b9",
                    color: "white",
                    padding: 5,
                    marginTop: -20,
                  },
                ]}
              >
                {title + " Interview Total"}
              </Text>

              <Text
                style={[
                  styles.text1,
                  { fontSize: 12, borderBottom: 1, color: "black", padding: 5 },
                ]}
              >
                Interviews Done
              </Text>

              <View
                style={[styles.table, { marginTop: 1, marginHorizontal: 50 }]}
              >
                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 80 }]}>
                      Interviews Done
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.interviewsDone}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100 }]}>
                      Interviews in Review
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.interviewsReview}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, { width: 120, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 100 }]}>
                      Retired Applicants
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.RetiredApplicants}
                    </Text>
                  </View>
                </View>

                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100 }]}>Approved</Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.approved}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, { width: 120, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 100 }]}>
                      Folders Pending
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.foldersPending}
                    </Text>
                  </View>
                </View>

                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100 }]}>
                      Dissaproved
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.dissaproved}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, { width: 120, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 100 }]}>
                      Folders Done
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.foldersDone}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.table, { marginLeft: 60, marginRight: 80 }]}>
                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 8 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          width: 150,
                          fontSize: 9,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Inteviews by Interviewer
                    </Text>
                  </View>
                  {recruitmentDepartmentTotal.interviewsByInterviewer?.length >
                  0 ? (
                    recruitmentDepartmentTotal.interviewsByInterviewer?.map(
                      (item, index) => (
                        <View
                          key={index}
                          style={[
                            styles.tableRow,
                            { width: 150, marginTop: 4, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 150 }]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.text]}>{item.count}</Text>
                        </View>
                      )
                    )
                  ) : (
                    <Text style={[styles.text]}>{"No Data"}</Text>
                  )}
                </View>
                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 8 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          width: 150,
                          fontSize: 9,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Inteviews by Nationality
                    </Text>
                  </View>
                  {recruitmentDepartmentTotal.interviewsByNationality?.length >
                  0 ? (
                    recruitmentDepartmentTotal.interviewsByNationality?.map(
                      (item, index) => (
                        <View
                          key={index}
                          style={[
                            styles.tableRow,
                            { width: 150, marginTop: 4, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 150 }]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.text]}>{item.count}</Text>
                        </View>
                      )
                    )
                  ) : (
                    <Text style={[styles.text]}>{"No Data"}</Text>
                  )}
                </View>
              </View>

              <View style={[styles.table, { marginLeft: 60, marginRight: 80 }]}>
                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 8 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          width: 150,
                          fontSize: 9,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Inteviews by Position
                    </Text>
                  </View>
                  {recruitmentDepartmentTotal.interviewsByPosition?.length >
                  0 ? (
                    recruitmentDepartmentTotal.interviewsByPosition?.map(
                      (item, index) => (
                        <View
                          key={index}
                          style={[
                            styles.tableRow,
                            { width: 150, marginTop: 4, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 150 }]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.text]}>{item.count}</Text>
                        </View>
                      )
                    )
                  ) : (
                    <Text style={[styles.text]}>{"No Data"}</Text>
                  )}
                </View>
                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 8 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        {
                          width: 150,
                          fontSize: 9,
                          textAlign: "center",
                        },
                      ]}
                    >
                      Inteviews by Department
                    </Text>
                  </View>
                  {recruitmentDepartmentTotal.interviewsByDepartment?.length >
                  0 ? (
                    recruitmentDepartmentTotal.interviewsByDepartment?.map(
                      (item, index) => (
                        <View
                          key={index}
                          style={[
                            styles.tableRow,
                            { width: 150, marginTop: 4, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 150 }]}>
                            {item.name}
                          </Text>
                          <Text style={[styles.text]}>{item.count}</Text>
                        </View>
                      )
                    )
                  ) : (
                    <Text style={[styles.text]}>{"No Data"}</Text>
                  )}
                </View>
              </View>

              <Text
                style={[
                  styles.text,
                  {
                    color: "black",
                    padding: 2,
                    marginTop: 10,
                    border: 1,
                    marginHorizontal: 10,
                  },
                ]}
              >
                Done Interviews List
              </Text>

              {/* Encabezado de las columnas */}
              <View
                style={[
                  styles.tableRow1,
                  {
                    flexDirection: "row",
                    alignItems: "stretch",
                    marginHorizontal: 20,
                    marginTop: 10,
                  },
                ]}
              >
                <View style={[{ flex: 0.4 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>No</Text>
                </View>
                <View style={[{ flex: 2 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Name
                  </Text>
                </View>
                <View style={[{ flex: 2 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Position
                  </Text>
                </View>
                <View style={[{ flex: 1 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Nationality
                  </Text>
                </View>
                <View style={[{ flex: 1 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Status
                  </Text>
                </View>
                <View style={[{ flex: 1 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Date
                  </Text>
                </View>
              </View>

              {/* Filas con datos de listDone */}
              <View
                style={[styles.table1, { marginTop: 10, marginHorizontal: 20 }]}
              >
                {recruitmentDepartmentTotal.listDone?.map((person, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow1,
                      { flexDirection: "row", alignItems: "stretch" },
                    ]}
                  >
                    {/* Columna de Name */}
                    <View
                      style={[styles.tableColumn1, { flex: 0.4, padding: 3 }]}
                    >
                      <Text style={[styles.text]}>{index + 1}</Text>
                    </View>

                    <View
                      style={[styles.tableColumn1, { flex: 2, padding: 3 }]}
                    >
                      <Text style={[styles.text]}>{person.name}</Text>
                    </View>

                    {/* Columna de Position */}
                    <View
                      style={[styles.tableColumn1, { flex: 2, padding: 3 }]}
                    >
                      <Text style={[styles.text]}>{person.position}</Text>
                    </View>

                    {/* Columna de Nationality */}
                    <View
                      style={[styles.tableColumn1, { flex: 1, padding: 5 }]}
                    >
                      <Text style={[styles.text]}>{person.nationality}</Text>
                    </View>

                    {/* Columna de Status */}
                    <View
                      style={[styles.tableColumn1, { flex: 1, padding: 5 }]}
                    >
                      <Text style={[styles.text]}>{person.status}</Text>
                    </View>

                    {/* Columna de Date */}
                    <View
                      style={[styles.tableColumn1, { flex: 1, padding: 5 }]}
                    >
                      <Text style={[styles.text]}>
                        {formatDate(person.interviewDate, "mm-dd-yyyy")}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <Text
                style={[
                  styles.text1,
                  { fontSize: 12, borderBottom: 1, color: "black", padding: 5 },
                ]}
              >
                Pending / Appointed Interviews
              </Text>

              <View
                style={[styles.table, { marginTop: 1, marginHorizontal: 50 }]}
              >
                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View style={[styles.tableRow, { width: 120, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 80 }]}>
                      Pending Interviews
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.pendingInterview}
                    </Text>
                  </View>
                </View>

                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View style={[styles.tableRow, { width: 120, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 100 }]}>
                      Appointed Interviews
                    </Text>
                    <Text style={[styles.text]}>
                      {recruitmentDepartmentTotal.appointedInterview}
                    </Text>
                  </View>
                </View>
              </View>

              {/* <Text
                style={[
                  styles.text1,
                  { fontSize: 12, borderBottom: 1, color: "black", padding: 5 },
                ]}
              >
                Pending Interviews List
              </Text> */}
              <Text
                style={[
                  styles.text,
                  {
                    color: "black",
                    padding: 2,
                    border: 1,
                    marginHorizontal: 10,
                    marginTop: 10,
                  },
                ]}
              >
                Pending Interviews List
              </Text>

              {/* Encabezado de las columnas */}
              <View
                style={[
                  styles.tableRow1,
                  {
                    flexDirection: "row",
                    alignItems: "stretch",
                    marginHorizontal: 20,
                    marginTop: 3,
                  },
                ]}
              >
                <View style={[{ flex: 0.4 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>No</Text>
                </View>
                <View style={[{ flex: 5 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Name
                  </Text>
                </View>
                <View style={[{ flex: 3 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Position
                  </Text>
                </View>
                <View style={[{ flex: 2 }]}>
                  <Text style={[styles.text1, { fontWeight: "bold" }]}>
                    Nationality
                  </Text>
                </View>
              </View>

              {/* Filas con datos de listDone */}
              <View
                style={[styles.table1, { marginTop: 10, marginHorizontal: 20 }]}
              >
                {recruitmentDepartmentTotal.pendingList?.map(
                  (person, index) => (
                    <View
                      key={index}
                      style={[
                        styles.tableRow1,
                        { flexDirection: "row", alignItems: "stretch" },
                      ]}
                    >
                      {/* Columna de Name */}
                      <View
                        style={[styles.tableColumn1, { flex: 0.4, padding: 3 }]}
                      >
                        <Text style={[styles.text]}>{index + 1}</Text>
                      </View>

                      <View
                        style={[styles.tableColumn1, { flex: 5, padding: 3 }]}
                      >
                        <Text style={[styles.text]}>{person.name}</Text>
                      </View>

                      {/* Columna de Position */}
                      <View
                        style={[styles.tableColumn1, { flex: 3, padding: 3 }]}
                      >
                        <Text style={[styles.text]}>{person.position}</Text>
                      </View>

                      {/* Columna de Nationality */}
                      <View
                        style={[styles.tableColumn1, { flex: 2, padding: 3 }]}
                      >
                        <Text style={[styles.text]}>{person.nationality}</Text>
                      </View>
                    </View>
                  )
                )}
              </View>
            </>
          ) : null}

          {deptFilter == "All Departments" || !deptFilter
            ? Object.keys(recruimentDepartment).map((departmentKey, index) => {
                const departmentData = recruimentDepartment[departmentKey]; // Accede dinámicamente a cada departamento

                return (
                  <View key={index} style={{ marginTop: 20 }}>
                    {/* Encabezado de Total de Entrevistas */}
                    <Text
                      style={[
                        styles.text,
                        {
                          fontSize: 12,
                          backgroundColor: "#1888b9",
                          color: "white",
                          padding: 5,
                          marginTop: 10,
                        },
                      ]}
                    >
                      {departmentData.name + " " + title + " Interview Total"}
                    </Text>

                    <Text
                      style={[
                        styles.text1,
                        {
                          fontSize: 12,
                          borderBottom: 1,
                          color: "black",
                          padding: 5,
                        },
                      ]}
                    >
                      Interviews Done
                    </Text>
                    <View
                      style={[
                        styles.table,
                        { marginTop: 1, marginHorizontal: 50 },
                      ]}
                    >
                      <View style={[styles.tableColumn, { marginTop: 10 }]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 80 }]}>
                            Interviews Done
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.interviewsDone}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Interviews in Review
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.interviewsReview}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Retired Applicants
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.RetiredApplicants}
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.tableColumn, { marginTop: 10 }]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Approved
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.approved}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Folders Pending
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.foldersPending}
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.tableColumn, { marginTop: 10 }]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7, marginBottom: 8 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Dissaproved
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.dissaproved}
                          </Text>
                        </View>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Folders Done
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.foldersDone}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Información de entrevistas */}
                    <View
                      style={[
                        styles.table,
                        { marginLeft: 60, marginRight: 80 },
                      ]}
                    >
                      <View style={[styles.tableColumn, {}]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 150, marginBottom: 8 },
                          ]}
                        >
                          <Text
                            style={[
                              styles.text,
                              {
                                width: 150,
                                fontSize: 9,
                                textAlign: "center",
                              },
                            ]}
                          >
                            Inteviews by Interviewer
                          </Text>
                        </View>
                        {departmentData.interviewsByInterviewer?.length > 0 ? (
                          departmentData.interviewsByInterviewer?.map(
                            (item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 150, marginTop: 4, marginBottom: 8 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.count}</Text>
                              </View>
                            )
                          )
                        ) : (
                          <Text style={[styles.text]}>{"No Data"}</Text>
                        )}
                      </View>
                      <View style={[styles.tableColumn, {}]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 150, marginBottom: 8 },
                          ]}
                        >
                          <Text
                            style={[
                              styles.text,
                              {
                                width: 150,
                                fontSize: 9,
                                textAlign: "center",
                              },
                            ]}
                          >
                            Inteviews by Nationality
                          </Text>
                        </View>
                        {departmentData.interviewsByNationality?.length > 0 ? (
                          departmentData.interviewsByNationality?.map(
                            (item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 150, marginTop: 4, marginBottom: 8 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.count}</Text>
                              </View>
                            )
                          )
                        ) : (
                          <Text style={[styles.text]}>{"No Data"}</Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={[
                        styles.table,
                        { marginLeft: 60, marginRight: 80 },
                      ]}
                    >
                      <View style={[styles.tableColumn, {}]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 150, marginBottom: 8 },
                          ]}
                        >
                          <Text
                            style={[
                              styles.text,
                              {
                                width: 150,
                                fontSize: 9,
                                textAlign: "center",
                              },
                            ]}
                          >
                            Inteviews by Position
                          </Text>
                        </View>
                        {departmentData.interviewsByPosition?.length > 0 ? (
                          departmentData.interviewsByPosition?.map(
                            (item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 150, marginTop: 4, marginBottom: 8 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.count}</Text>
                              </View>
                            )
                          )
                        ) : (
                          <Text style={[styles.text]}>{"No Data"}</Text>
                        )}
                      </View>
                      <View style={[styles.tableColumn, {}]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 150, marginBottom: 8 },
                          ]}
                        >
                          <Text
                            style={[
                              styles.text,
                              {
                                width: 150,
                                fontSize: 9,
                                textAlign: "center",
                              },
                            ]}
                          >
                            Inteviews by Department
                          </Text>
                        </View>
                        {departmentData.interviewsByDepartment?.length > 0 ? (
                          departmentData.interviewsByDepartment?.map(
                            (item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 150, marginTop: 4, marginBottom: 8 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.count}</Text>
                              </View>
                            )
                          )
                        ) : (
                          <Text style={[styles.text]}>{"No Data"}</Text>
                        )}
                      </View>
                    </View>

                    {/* Lista de Done */}

                    <Text
                      style={[
                        styles.text,
                        {
                          color: "black",
                          padding: 2,
                          marginTop: 10,
                          border: 1,
                          marginHorizontal: 10,
                        },
                      ]}
                    >
                      Done Interviews List
                    </Text>

                    {/* Encabezado de las columnas */}
                    <View
                      style={[
                        styles.tableRow1,
                        {
                          flexDirection: "row",
                          alignItems: "stretch",
                          marginHorizontal: 20,
                          marginTop: 10,
                        },
                      ]}
                    >
                      <View style={[{ flex: 0.4 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          No
                        </Text>
                      </View>
                      <View style={[{ flex: 2 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Name
                        </Text>
                      </View>
                      <View style={[{ flex: 2 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Position
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Nationality
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Status
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Date
                        </Text>
                      </View>
                    </View>

                    {/* Filas con datos de listDone */}
                    <View
                      style={[
                        styles.table1,
                        {
                          marginTop: 10,
                          marginHorizontal: 20,
                        },
                      ]}
                    >
                      {departmentData.listDone?.map((person, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.tableRow1,
                            { flexDirection: "row", alignItems: "stretch" },
                          ]}
                        >
                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 0.4, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{idx + 1}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 2, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{person.name}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 2, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{person.position}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 1, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>
                              {person.nationality}
                            </Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 1, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{person.status}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 1, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>
                              {formatDate(person.interviewDate, "mm-dd-yyyy")}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>

                    {/* Sección de Entrevistas Pendientes */}

                    <Text
                      style={[
                        styles.text1,
                        {
                          fontSize: 12,
                          borderBottom: 1,
                          color: "black",
                          padding: 5,
                        },
                      ]}
                    >
                      Pending / Appointed Interviews
                    </Text>

                    <View
                      style={[
                        styles.table,
                        { marginTop: 1, marginHorizontal: 50 },
                      ]}
                    >
                      <View style={[styles.tableColumn, { marginTop: 10 }]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 80 }]}>
                            Pending Interviews
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.pendingInterview}
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.tableColumn, { marginTop: 10 }]}>
                        <View
                          style={[
                            styles.tableRow,
                            { width: 120, marginTop: 7 },
                          ]}
                        >
                          <Text style={[styles.text, { width: 100 }]}>
                            Appointed Interviews
                          </Text>
                          <Text style={[styles.text]}>
                            {departmentData.appointedInterview}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Lista de Pendientes */}

                    <Text
                      style={[
                        styles.text,
                        {
                          color: "black",
                          padding: 2,
                          marginTop: 10,
                          border: 1,
                          marginHorizontal: 10,
                        },
                      ]}
                    >
                      Pending Interview List
                    </Text>

                    {/* Encabezado de las columnas para la lista de pendientes */}
                    <View
                      style={[
                        styles.tableRow1,
                        {
                          flexDirection: "row",
                          alignItems: "stretch",
                          marginHorizontal: 20,
                          marginTop: 10,
                        },
                      ]}
                    >
                      <View style={[{ flex: 0.4 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          No
                        </Text>
                      </View>
                      <View style={[{ flex: 2 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Name
                        </Text>
                      </View>
                      <View style={[{ flex: 2 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Position
                        </Text>
                      </View>
                      <View style={[{ flex: 1 }]}>
                        <Text style={[styles.text1, { fontWeight: "bold" }]}>
                          Nationality
                        </Text>
                      </View>
                    </View>

                    {/* Filas con datos de pendingList */}
                    <View
                      style={[
                        styles.table1,
                        { marginTop: 10, marginHorizontal: 20 },
                      ]}
                    >
                      {departmentData.pendingList?.map((person, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.tableRow1,
                            { flexDirection: "row", alignItems: "stretch" },
                          ]}
                        >
                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 0.4, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{idx + 1}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 2, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{person.name}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 2, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>{person.position}</Text>
                          </View>

                          <View
                            style={[
                              styles.tableColumn1,
                              { flex: 1, padding: 2 },
                            ]}
                          >
                            <Text style={[styles.text]}>
                              {person.nationality}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })
            : Object.keys(recruimentDepartment).map((departmentKey, index) => {
                const departmentData = recruimentDepartment[departmentKey]; // Accede dinámicamente a cada departamento

                // Si el nombre del departamento coincide con el filtro, procede a renderizar
                if (departmentData.name === deptFilter) {
                  return (
                    <View key={index} style={{ marginTop: 20 }}>
                      {/* Encabezado de Total de Entrevistas */}
                      <Text
                        style={[
                          styles.text,
                          {
                            fontSize: 12,
                            backgroundColor: "#1888b9",
                            color: "white",
                            padding: 5,
                            marginTop: 10,
                          },
                        ]}
                      >
                        {departmentData.name + " " + title + " Interview Total"}
                      </Text>

                      <Text
                        style={[
                          styles.text1,
                          {
                            fontSize: 12,
                            borderBottom: 1,
                            color: "black",
                            padding: 5,
                          },
                        ]}
                      >
                        Interviews Done
                      </Text>
                      <View
                        style={[
                          styles.table,
                          { marginTop: 1, marginHorizontal: 50 },
                        ]}
                      >
                        <View style={[styles.tableColumn, { marginTop: 10 }]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 80 }]}>
                              Interviews Done
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.interviewsDone}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Interviews in Review
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.interviewsReview}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Retired Applicants
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.RetiredApplicants}
                            </Text>
                          </View>
                        </View>

                        <View style={[styles.tableColumn, { marginTop: 10 }]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Approved
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.approved}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Folders Pending
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.foldersPending}
                            </Text>
                          </View>
                        </View>

                        <View style={[styles.tableColumn, { marginTop: 10 }]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Dissaproved
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.dissaproved}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Folders Done
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.foldersDone}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Información de entrevistas */}
                      <View
                        style={[
                          styles.table,
                          { marginLeft: 60, marginRight: 80 },
                        ]}
                      >
                        <View style={[styles.tableColumn, {}]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  width: 150,
                                  fontSize: 9,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Inteviews by Interviewer
                            </Text>
                          </View>
                          {departmentData.interviewsByInterviewer?.length >
                          0 ? (
                            departmentData.interviewsByInterviewer?.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow,
                                    {
                                      width: 150,
                                      marginTop: 4,
                                      marginBottom: 8,
                                    },
                                  ]}
                                >
                                  <Text style={[styles.text, { width: 150 }]}>
                                    {item.name}
                                  </Text>
                                  <Text style={[styles.text]}>
                                    {item.count}
                                  </Text>
                                </View>
                              )
                            )
                          ) : (
                            <Text style={[styles.text]}>{"No Data"}</Text>
                          )}
                        </View>
                        <View style={[styles.tableColumn, {}]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  width: 150,
                                  fontSize: 9,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Inteviews by Nationality
                            </Text>
                          </View>
                          {departmentData.interviewsByNationality?.length >
                          0 ? (
                            departmentData.interviewsByNationality?.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow,
                                    {
                                      width: 150,
                                      marginTop: 4,
                                      marginBottom: 8,
                                    },
                                  ]}
                                >
                                  <Text style={[styles.text, { width: 150 }]}>
                                    {item.name}
                                  </Text>
                                  <Text style={[styles.text]}>
                                    {item.count}
                                  </Text>
                                </View>
                              )
                            )
                          ) : (
                            <Text style={[styles.text]}>{"No Data"}</Text>
                          )}
                        </View>
                      </View>

                      <View
                        style={[
                          styles.table,
                          { marginLeft: 60, marginRight: 80 },
                        ]}
                      >
                        <View style={[styles.tableColumn, {}]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  width: 150,
                                  fontSize: 9,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Inteviews by Position
                            </Text>
                          </View>
                          {departmentData.interviewsByPosition?.length > 0 ? (
                            departmentData.interviewsByPosition?.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow,
                                    {
                                      width: 150,
                                      marginTop: 4,
                                      marginBottom: 8,
                                    },
                                  ]}
                                >
                                  <Text style={[styles.text, { width: 150 }]}>
                                    {item.name}
                                  </Text>
                                  <Text style={[styles.text]}>
                                    {item.count}
                                  </Text>
                                </View>
                              )
                            )
                          ) : (
                            <Text style={[styles.text]}>{"No Data"}</Text>
                          )}
                        </View>
                        <View style={[styles.tableColumn, {}]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  width: 150,
                                  fontSize: 9,
                                  textAlign: "center",
                                },
                              ]}
                            >
                              Inteviews by Department
                            </Text>
                          </View>
                          {departmentData.interviewsByDepartment?.length > 0 ? (
                            departmentData.interviewsByDepartment?.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow,
                                    {
                                      width: 150,
                                      marginTop: 4,
                                      marginBottom: 8,
                                    },
                                  ]}
                                >
                                  <Text style={[styles.text, { width: 150 }]}>
                                    {item.name}
                                  </Text>
                                  <Text style={[styles.text]}>
                                    {item.count}
                                  </Text>
                                </View>
                              )
                            )
                          ) : (
                            <Text style={[styles.text]}>{"No Data"}</Text>
                          )}
                        </View>
                      </View>

                      {/* Lista de Done */}

                      <Text
                        style={[
                          styles.text,
                          {
                            color: "black",
                            padding: 2,
                            marginTop: 10,
                            border: 1,
                            marginHorizontal: 10,
                          },
                        ]}
                      >
                        Done Interviews List
                      </Text>

                      {/* Encabezado de las columnas */}
                      <View
                        style={[
                          styles.tableRow1,
                          {
                            flexDirection: "row",
                            alignItems: "stretch",
                            marginHorizontal: 20,
                            marginTop: 10,
                          },
                        ]}
                      >
                        <View style={[{ flex: 0.4 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            No
                          </Text>
                        </View>
                        <View style={[{ flex: 2 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Name
                          </Text>
                        </View>
                        <View style={[{ flex: 2 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Position
                          </Text>
                        </View>
                        <View style={[{ flex: 1 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Nationality
                          </Text>
                        </View>
                        <View style={[{ flex: 1 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Status
                          </Text>
                        </View>
                        <View style={[{ flex: 1 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Date
                          </Text>
                        </View>
                      </View>

                      {/* Filas con datos de listDone */}
                      <View
                        style={[
                          styles.table1,
                          {
                            marginTop: 10,
                            marginHorizontal: 20,
                          },
                        ]}
                      >
                        {departmentData.listDone?.map((person, idx) => (
                          <View
                            key={idx}
                            style={[
                              styles.tableRow1,
                              { flexDirection: "row", alignItems: "stretch" },
                            ]}
                          >
                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 0.4, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>{idx + 1}</Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 2, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>{person.name}</Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 2, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>
                                {person.position}
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 1, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>
                                {person.nationality}
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 1, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>{person.status}</Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 1, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>
                                {formatDate(person.interviewDate, "mm-dd-yyyy")}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>

                      {/* Sección de Entrevistas Pendientes */}

                      <Text
                        style={[
                          styles.text1,
                          {
                            fontSize: 12,
                            borderBottom: 1,
                            color: "black",
                            padding: 5,
                          },
                        ]}
                      >
                        Pending / Appointed Interviews
                      </Text>

                      <View
                        style={[
                          styles.table,
                          { marginTop: 1, marginHorizontal: 50 },
                        ]}
                      >
                        <View style={[styles.tableColumn, { marginTop: 10 }]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 80 }]}>
                              Pending Interviews
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.pendingInterview}
                            </Text>
                          </View>
                        </View>

                        <View style={[styles.tableColumn, { marginTop: 10 }]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7 },
                            ]}
                          >
                            <Text style={[styles.text, { width: 100 }]}>
                              Appointed Interviews
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.appointedInterview}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* Lista de Pendientes */}

                      <Text
                        style={[
                          styles.text,
                          {
                            color: "black",
                            padding: 2,
                            marginTop: 10,
                            border: 1,
                            marginHorizontal: 10,
                          },
                        ]}
                      >
                        Pending Interview List
                      </Text>

                      {/* Encabezado de las columnas para la lista de pendientes */}
                      <View
                        style={[
                          styles.tableRow1,
                          {
                            flexDirection: "row",
                            alignItems: "stretch",
                            marginHorizontal: 20,
                            marginTop: 10,
                          },
                        ]}
                      >
                        <View style={[{ flex: 0.4 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            No
                          </Text>
                        </View>
                        <View style={[{ flex: 2 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Name
                          </Text>
                        </View>
                        <View style={[{ flex: 2 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Position
                          </Text>
                        </View>
                        <View style={[{ flex: 1 }]}>
                          <Text style={[styles.text1, { fontWeight: "bold" }]}>
                            Nationality
                          </Text>
                        </View>
                      </View>

                      {/* Filas con datos de pendingList */}
                      <View
                        style={[
                          styles.table1,
                          { marginTop: 10, marginHorizontal: 20 },
                        ]}
                      >
                        {departmentData.pendingList?.map((person, idx) => (
                          <View
                            key={idx}
                            style={[
                              styles.tableRow1,
                              { flexDirection: "row", alignItems: "stretch" },
                            ]}
                          >
                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 0.4, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>{idx + 1}</Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 2, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>{person.name}</Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 2, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>
                                {person.position}
                              </Text>
                            </View>

                            <View
                              style={[
                                styles.tableColumn1,
                                { flex: 1, padding: 2 },
                              ]}
                            >
                              <Text style={[styles.text]}>
                                {person.nationality}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    </View>
                  );
                }
                return null; // Si no coincide con el filtro, no se renderiza nada
              })}
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
