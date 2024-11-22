import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import Encabezado from "./Encabezado";
import ImgFirma from "../../../../assets/imagenes/FIRMA_LETICIA_ALVARADO.png";
export default function Formulario23({ data = {}, hiring = {} }) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 5,
      left: 0,
      right: 0,
      paddingBottom: 10,

      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      paddingTop: 0,
      marginTop: 0,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "10 20 20 20",
      flexGrow: 1,
    },

    container: {
      paddingTop: 90,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    column: {
      width: "30%",
      // Ajusta este valor según tus necesidades
    },
    container1: {
      paddingTop: 60,
      flexDirection: "row",
      alignItems: "flex-start",
    },
    text: {
      fontSize: "9px",
    },
    text1: {
      fontSize: "12px",
    },
    bulletContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginVertical: 2,
      fontSize: "9px",
    },
    bulletPoint: {
      width: 10,
      fontSize: 12,
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

  const formattedDate = hiring?.contractDate
    ? formatDate(hiring.contractDate)
    : " ";

  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  const firma = data?.signature?.url || null;

  const items = [
    "Each employee on board is required to understand this policy and is expected to adhere to it while this employee is on board by The Shipping Agency.",
    "No employee on board shall use, possess or sell illegal drugs. Such on-board employees are subject to criminal prosecution by local authorities and/or the State Council of the ship's flag.",
    "No employee in charge of the guard, or any employee who occupies a position as described in the Certificate of Safety Endowment, while on duty or eight (8) hours before the start of work, may consume alcohol, illegal drugs, toxic substances or anesthetizing.",
    "Off-duty employees on board will not have a blood alcohol content (BAC) above 0.08 percent.",
    "Employees on board duty will not have a blood alcohol content (BAC) above 0.04 percent.",
    "An employee on board found with a blood alcohol concentration above the limits described above is considered a violation of this policy and will be relieved of his or her position immediately and subject to disciplinary action including until termination of the contract.",
    "Employees may enjoy alcoholic beverages including beer, wine, and alcoholic beverages in designated employee lounges. Employees who are authorized to socialize in designated areas may also enjoy alcoholic beverages in public halls.",
  ];

  const items1 = [
    "Testing of on-board employees requires the approval of the captain. This test will be performed by one of the doctors, the ship's nurses, or officially recognized testing laboratory.",
    "The on-board employee subjected to this test has the right to choose a witness from among the other employees on board who will accompany him during the on-board test procedure. If a team administers the evidence, the appointment of a witness may not be necessary.",
    "The potential test for alcohol abuse on board will normally be carried out using measures, but other means may be used.",
    "The potential drug abuse test will normally be done using the urine test, but a blood test can also be used. onboard employees are required to provide blood samples when required to do so by the Company or a regulatory enforcement officer.",
    "All tests and medical records will be kept strictly confidential.",
  ];

  const items2 = [
    "Each employee on board is required to understand this policy and is expected to adhere to it, while working on board a shipping company vessel.",
    "No employee on board shall use, possess, or sell illegal drugs. Such onboard employees will be subject to criminal prosecution by local and/or flag state government authorities.",
    "No employee in charge of the watch, or any employee occupying a position as described in the Safety Manning Certificate, during duty or eight (8) hours prior to the commencement of duty, may consume alcohol, illegal drugs, intoxicants, or anesthetics.",
    "Off-duty the onboard employee shall not have a blood alcohol content (BAC) above 0.08 percent.",
    "On duty the onboard employee shall not have a blood alcohol content (BAC) above 0.04 percent.",
    "An onboard employee found to have a blood alcohol concentration above the limits described above is considered a violation of this policy and will be relieved of duty immediately and subject to disciplinary action up to and including termination of employment.",
    "Employees may enjoy alcoholic beverages including beer, wine, and spirits in designated employee lounges. Employees who are authorized to socialize in designated areas may also enjoy alcoholic beverages in these public lounges.",
  ];
  return (
    <>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header} fixed>
          <Encabezado
            text1="DRUG AND ALCOHOL POLICY"
            text2=" "
            code="F-PMSSA-23"
            revision="01"
            date="Dec 28th, 2022"
          />
        </View>
        <View style={styles.section}>
          <Text style={[styles.text]}>Drug and Alcohol Policy on board.</Text>
          <Text style={[styles.text]}>
            Illegal drug use and alcohol abuse is a major problem in today's
            society. The effect of illegal drugs and alcohol abuse can pose
            serious safety concerns to the company and the industry as a whole.
            Personal injury, accidents, property damage, low morale, and safety
            risks can potentially be a result of drug and alcohol abuse. Keeping
            our ships free from drug and alcohol abuse is an important part of
            the safe operation of our ships.
          </Text>
          <Text style={[styles.text, { paddingTop: 15 }]}>Politics:</Text>
          <Text style={[styles.text]}>
            The purpose of this policy is to provide candidates for employment
            on board and onboard employees with a fundamental knowledge of what
            shipping agencies expect of their employees in relation to illegal
            drug use and alcohol abuse. Shipping Agencies support the efforts of
            the various government agencies of the United States, Norway, the
            Bahamas, Liberia and other nations in their efforts to reduce drug
            and alcohol abuse. The company helps regulate Customs, U.S. Coast
            Guard, the Federal Bureau of Investigation (FBI), and other local
            authorities to investigate suspicious drug smuggling operations,
            possession of controlled substances, and all illegal drug use on
            ships that regularly dock at U.S. ports. The company also supports
            the efforts of other nations, international organizations, and
            maritime regulations that combat drug and alcohol abuse.
          </Text>
          <Text style={[styles.text, { paddingTop: 15, paddingBottom: 15 }]}>
            The captain may, at any time, request a review of the cabin of the
            employee on board and his personal effects. Employees on board are
            also subject to checks when entering or leaving the ship and at any
            time by various local authorities.
          </Text>
          {items.map((item, index) => (
            <View key={index} style={styles.bulletContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}
          <Text style={[styles.text, { paddingTop: 15 }]}>
            Selection of employees:
          </Text>
          <Text style={[styles.text, {}]}>
            The Shipping Agency may ask any candidate for employment on board to
            be screened for drugs and/or alcohol in the employment process. All
            job offers are contingent upon passing the company's pre-employment
            medical examination (PEME), which may include drug and/or alcohol
            testing. Candidates who refuse to take the test or who test positive
            based on the company's established guidelines will not be considered
            for employment.
          </Text>
          <Text style={[styles.text, { paddingTop: 15 }]}>
            Post-employment tests:
          </Text>
          <Text style={[styles.text, {}]}>
            The Company may require random evidence of any employee on board.
            Such testing shall be carried out in accordance with internationally
            accepted procedures in relation to the procedure for collection and
            verification, the integrity and identity of samples, laboratory
            requirements, chain of custody, and review of results. Random
            testing of on-board employees will be done at the discretion of
            Human Resources. All other tests on board require the approval of
            the captain.
          </Text>
          <Text style={[styles.text, { paddingTop: 15 }]}>
            In the event of an accident or near-accident, the company or
            regulatory agency may require the application of each employee on
            board who was directly involved in the accident or near miss to be
            tested as evidence of drug or alcohol use. The Captain, with
            reasonable cause, may also require any employee on board to be
            tested for drugs or alcohol. on-board employees who refuse to be
            tested or who test positive based on the company's established
            guidelines will be relieved of their position immediately and are
            subject to disciplinary action, including termination of the
            contract.
          </Text>
          {items1.map((item, index) => (
            <View key={index} style={styles.bulletContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.bulletText}>{item}</Text>
            </View>
          ))}

          <Text style={[styles.text, { paddingTop: 15 }]}>
            Disciplinary action:
          </Text>
          <Text style={[styles.text, {}]}>
            Violation of this policy may result in disciplinary action including
            until termination of the contract.
          </Text>
          <Text style={[styles.text, { paddingTop: 12, fontSize: 16 }]}>
            Acknowledgment of Policy and Consent for Drug Urine Testing
          </Text>
          <Text style={[styles.text, { paddingTop: 15, fontSize: 11 }]}>
            Policy:
          </Text>
          {items2.map((item, index) => (
            <View key={index} style={styles.bulletContainer}>
              <Text style={[styles.bulletPoint, { fontSize: 11 }]}>•</Text>
              <Text style={[styles.bulletText, { fontSize: 11 }]}>{item}</Text>
            </View>
          ))}

          <View style={[{ paddingTop: 10 }]}>
            <Text style={[styles.text, { fontSize: 11 }]}>
              Consent and Acknowledgement:
            </Text>
            <Text style={[styles.text, { paddingTop: 15, fontSize: 11 }]}>
              I am an applicant for employment with ____________________ (the
              "Company"). I am providing a urine sample voluntarily with the
              understanding that it will be tested for illegal drugs and other
              drugs used in a manner other than as prescribed. I further
              understand that failure to consent to urine drug testing will be
              considered a withdrawal of my application for employment.
            </Text>
            <Text style={[styles.text, { paddingTop: 15, fontSize: 11 }]}>
              I understand the results of my urine drug test will be kept
              confidential and will be used solely for the purpose of
              determining suitability for my employment with the Company. I
              further understand that the determination of such suitability is
              within the sole discretion of the Company, that a positive result
              of my urine test will result in the rejection of my application
              for employment or termination of my employment with the Company if
              I begin work before the test results are available. I agree to
              release the Company and the placement agency from any liability
              arising as part of the decision made on my urine test or the
              rejection of my application for employment or termination of my
              contract because of a positive urine test result, even if such
              results prove to be inaccurate.
            </Text>
            <Text style={[styles.text, { paddingTop: 15, fontSize: 11 }]}>
              I have read and understand the Acknowledgement of Policy and
              Consent for Urine Drug Testing and hereby consent to a urine test
              as described above.
            </Text>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            {firma ? (
              <Image
                source={firma ? { uri: firma } : null}
                style={[
                  {
                    width: 130,
                    height: 90,
                    position: "absolute",
                    marginLeft: 50,
                    marginTop: 25,
                  },
                ]}
              ></Image>
            ) : (
              <View style={{}} /> // Espacio vacío
            )}

            <View style={[styles.container1, {}]}>
              <View style={[{ paddingTop: 20, width: "50%" }]}>
                <Text style={[{ borderBottom: 1 }]}></Text>
                <Text
                  style={[
                    { fontSize: "11px", paddingLeft: 100, paddingTop: 5 },
                  ]}
                >
                  {" "}
                  Sign
                </Text>
                <Text
                  style={[
                    {
                      borderBottom: 1,
                      paddingTop: 40,
                      fontSize: 11,
                      textAlign: "center",
                      color: "#00008B",
                    },
                  ]}
                >
                  {fullName || "\u00A0"}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: "11px",
                      paddingLeft: 50,
                      paddingTop: 3,
                      textAlign: "left",
                    },
                  ]}
                >
                  {" "}
                  Full Name (block Letter)
                </Text>
              </View>

              <View style={[{ paddingTop: 8, width: "50%", marginLeft: 50 }]}>
                <Text
                  style={[
                    {
                      borderBottom: 1,
                      fontSize: 11,
                      textAlign: "center",
                      color: "#00008B",
                    },
                  ]}
                >
                  {formattedDate ? formattedDate : "\u00A0"}
                </Text>
                <Text
                  style={[
                    {
                      fontSize: "11px",
                      paddingLeft: 100,
                      paddingTop: 5,
                      textAlign: "left",
                    },
                  ]}
                >
                  {" "}
                  Date of Issue
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </>
  );
}
