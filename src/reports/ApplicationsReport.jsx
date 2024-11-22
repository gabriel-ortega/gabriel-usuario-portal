import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import logistic from "../assets/imagenes/LOGO-LOGISTIC.png";

export default function ApplicationsReport({
  date = "",
  datefilter = "",
  data,
  deptFilter,
}) {
  const { generalApplications = {}, recruimentApplications = {} } = data;
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
  });

  return (
    <>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={styles.header} fixed>
          <Image src={logistic} style={styles.logo} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { fontSize: 12, marginLeft: 30 }]}>
              Report: General Applications and Evaluations
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 10, marginLeft: 30, marginTop: 5 },
              ]}
            >
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
                General Applications and Evaluations
              </Text>

              <View
                style={[styles.table, { marginTop: 1, marginHorizontal: 50 }]}
              >
                <View style={[styles.tableColumn, { marginTop: 10 }]}>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 170, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100, fontSize: 9 }]}>
                      Applications Recieved
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.recieved}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 170, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 120, fontSize: 9 }]}>
                      Applications in Evaluation
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.evaluation}
                    </Text>
                  </View>
                  <View style={[styles.tableRow, { width: 170, marginTop: 7 }]}>
                    <Text style={[styles.text, { width: 150, fontSize: 9 }]}>
                      Applications pending correction
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.pendingCorrection}
                    </Text>
                  </View>

                  <View style={[styles.tableRow, { width: 170, marginTop: 14 }]}>
                    <Text style={[styles.text, { width: 150, fontSize: 9 }]}>
                    Total Gap Pool 
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.gapPoolTotal}
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
                    <Text style={[styles.text, { width: 100, fontSize: 9 }]}>
                      Approved
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.approved}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100, fontSize: 9 }]}>
                      Dissaproved
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.dissaproved}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.tableRow,
                      { width: 120, marginTop: 7, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.text, { width: 100, fontSize: 9 }]}>
                      New Gap Pool
                    </Text>
                    <Text style={[styles.text]}>
                      {generalApplications.newGapPool}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[styles.table, { marginLeft: 60, marginRight: 80 }]}>
                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 2 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Position
                    </Text>
                  </View>

                  {generalApplications.generalPosition.map((item, index) => (
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
                  ))}

                  <View
                    style={[
                      styles.tableRow,
                      { width: 150, marginTop: 15, marginBottom: 4 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Nationality
                    </Text>
                  </View>
                  {generalApplications.generalNationality.map((item, index) => (
                    <View
                      key={index}
                      style={[
                        styles.tableRow,
                        { width: 150, marginTop: 7, marginBottom: 8 },
                      ]}
                    >
                      <Text style={[styles.text, { width: 150 }]}>
                        {item.name}
                      </Text>
                      <Text style={[styles.text]}>{item.count}</Text>
                    </View>
                  ))}
                </View>

                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 2 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Department
                    </Text>
                  </View>
                  {generalApplications.generalDepartment.map((item, index) => (
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
                  ))}
                  <View
                    style={[
                      styles.tableRow,
                      { width: 150, marginBottom: 2, marginTop: 15 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Source
                    </Text>
                  </View>
                  {generalApplications.generalSource.map((item, index) => (
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
                  ))}
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
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Harvester
                    </Text>
                  </View>
                  {generalApplications.generalHarvester.map((item, index) => (
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
                  ))}
                </View>

                <View style={[styles.tableColumn, {}]}>
                  <View
                    style={[styles.tableRow, { width: 150, marginBottom: 8 }]}
                  >
                    <Text
                      style={[
                        styles.text,
                        { width: 150, fontSize: 9, textAlign: "center" },
                      ]}
                    >
                      Applications By Captador
                    </Text>
                  </View>
                  {generalApplications.generalCaptador.map((item, index) => (
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
                  ))}
                </View>
              </View>
            </>
          ) : null}

          {deptFilter == "All Departments" || !deptFilter
            ? Object.keys(data.recruimentApplications).map(
                (departmentKey, index) => {
                  const departmentData = recruimentApplications[departmentKey]; // Accede dinámicamente a cada departamento

                  return (
                    <View key={index} style={{ marginTop: 20 }}>
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
                        {departmentData.name +
                          " General Applications and Evaluations"}
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
                              { width: 170, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[styles.text, { width: 100, fontSize: 9 }]}
                            >
                              Applications Recieved
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.recieved}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 170, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[styles.text, { width: 120, fontSize: 9 }]}
                            >
                              Applications in Evaluation
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.evaluation}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 170, marginTop: 7 },
                            ]}
                          >
                            <Text
                              style={[styles.text, { width: 150, fontSize: 9 }]}
                            >
                              Applications pending correction
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.pendingCorrection}
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
                            <Text
                              style={[styles.text, { width: 100, fontSize: 9 }]}
                            >
                              Approved
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.approved}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            <Text
                              style={[styles.text, { width: 100, fontSize: 9 }]}
                            >
                              Dissaproved
                            </Text>
                            <Text style={[styles.text]}>
                              {departmentData.dissaproved}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 120, marginTop: 7, marginBottom: 8 },
                            ]}
                          >
                            {/* <Text style={[styles.text, { width: 100, fontSize: 9 }]}>
                        First Folder Done
                      </Text>
                      <Text style={[styles.text]}>
                        {departmentData.firstFolderDone}
                      </Text> */}
                          </View>
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
                              { width: 150, marginBottom: 2 },
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
                              Applications By Position
                            </Text>
                          </View>

                          {departmentData.generalPosition.map((item, index) => (
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
                          ))}

                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginTop: 15, marginBottom: 4 },
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
                              Applications By Nationality
                            </Text>
                          </View>
                          {departmentData.generalNationality.map(
                            (item, index) => (
                              <View
                                key={index}
                                style={[
                                  styles.tableRow,
                                  { width: 150, marginTop: 7, marginBottom: 8 },
                                ]}
                              >
                                <Text style={[styles.text, { width: 150 }]}>
                                  {item.name}
                                </Text>
                                <Text style={[styles.text]}>{item.count}</Text>
                              </View>
                            )
                          )}
                        </View>

                        <View style={[styles.tableColumn, {}]}>
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 2 },
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
                              Applications By Department
                            </Text>
                          </View>
                          {departmentData.generalDepartment.map(
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
                          )}
                          <View
                            style={[
                              styles.tableRow,
                              { width: 150, marginBottom: 2, marginTop: 15 },
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
                              Applications By Source
                            </Text>
                          </View>
                          {departmentData.generalSource.map((item, index) => (
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
                          ))}
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
                              Applications By Harvester
                            </Text>
                          </View>
                          {departmentData.generalHarvester.map(
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
                              Applications By Captador
                            </Text>
                          </View>
                          {departmentData.generalCaptador.map((item, index) => (
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
                          ))}
                        </View>
                      </View>
                    </View>
                  );
                }
              )
            : Object.keys(data.recruimentApplications).map(
                (departmentKey, index) => {
                  const departmentData = recruimentApplications[departmentKey]; // Accede dinámicamente a cada departamento

                  // Si el nombre del departamento coincide con el filtro, procede a renderizar
                  if (departmentData.name === deptFilter) {
                    return (
                      <View key={index} style={{ marginTop: 20 }}>
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
                          {departmentData.name +
                            " General Applications and Evaluations"}
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
                                { width: 170, marginTop: 7, marginBottom: 8 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { width: 100, fontSize: 9 },
                                ]}
                              >
                                Applications Recieved
                              </Text>
                              <Text style={[styles.text]}>
                                {departmentData.recieved}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.tableRow,
                                { width: 170, marginTop: 7, marginBottom: 8 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { width: 120, fontSize: 9 },
                                ]}
                              >
                                Applications in Evaluation
                              </Text>
                              <Text style={[styles.text]}>
                                {departmentData.evaluation}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.tableRow,
                                { width: 170, marginTop: 7 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { width: 150, fontSize: 9 },
                                ]}
                              >
                                Applications pending correction
                              </Text>
                              <Text style={[styles.text]}>
                                {departmentData.pendingCorrection}
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
                              <Text
                                style={[
                                  styles.text,
                                  { width: 100, fontSize: 9 },
                                ]}
                              >
                                Approved
                              </Text>
                              <Text style={[styles.text]}>
                                {departmentData.approved}
                              </Text>
                            </View>
                            <View
                              style={[
                                styles.tableRow,
                                { width: 120, marginTop: 7, marginBottom: 8 },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.text,
                                  { width: 100, fontSize: 9 },
                                ]}
                              >
                                Dissaproved
                              </Text>
                              <Text style={[styles.text]}>
                                {departmentData.dissaproved}
                              </Text>
                            </View>
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
                                { width: 150, marginBottom: 2 },
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
                                Applications By Position
                              </Text>
                            </View>

                            {departmentData.generalPosition.map(
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
                            )}

                            <View
                              style={[
                                styles.tableRow,
                                { width: 150, marginTop: 15, marginBottom: 4 },
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
                                Applications By Nationality
                              </Text>
                            </View>
                            {departmentData.generalNationality.map(
                              (item, index) => (
                                <View
                                  key={index}
                                  style={[
                                    styles.tableRow,
                                    {
                                      width: 150,
                                      marginTop: 7,
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
                            )}
                          </View>

                          <View style={[styles.tableColumn, {}]}>
                            <View
                              style={[
                                styles.tableRow,
                                { width: 150, marginBottom: 2 },
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
                                Applications By Department
                              </Text>
                            </View>
                            {departmentData.generalDepartment.map(
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
                            )}
                            <View
                              style={[
                                styles.tableRow,
                                { width: 150, marginBottom: 2, marginTop: 15 },
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
                                Applications By Source
                              </Text>
                            </View>
                            {departmentData.generalSource.map((item, index) => (
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
                            ))}
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
                                Applications By Harvester
                              </Text>
                            </View>
                            {departmentData.generalHarvester.map(
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
                                Applications By Captador
                              </Text>
                            </View>
                            {departmentData.generalCaptador.map(
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
                            )}
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return null; // Si no coincide con el filtro, no se renderiza nada
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
