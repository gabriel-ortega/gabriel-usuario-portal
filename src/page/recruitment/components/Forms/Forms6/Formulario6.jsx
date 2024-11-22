import { Text, Page, View, StyleSheet } from "@react-pdf/renderer";
import Encabezado from "../Encabezado";
import Position from "./Position";
import Firmas from "./Firmas";

export default function Formulario6({
  data = {},
  interview = {},
  interviewData = {},
}) {
  const styles = StyleSheet.create({
    header: {
      position: "fixed",
      top: 10,
      left: 0,
      right: 0,
      justifyContent: "center",
      alignItems: "center",
    },
    page: {
      padding: 20,
      backgroundColor: "#FFFFFF",
    },
    section: {
      margin: "0 40",
    },
  });

  const departmentsData1 = [
    {
      department: "Entertainment and cruise programs /n/n Department",
      positions: [
        "Activities staff",
        "Disc-jockey",
        "Youth Staff",
        "ITV specialist",
        "Dive Instructor",
        "Sound and Light Technician",
        "Stage Technician",
        "Sport Staff",
        "Zip Liner operator",
        "Vocalist",
      ],
    },
    {
      department: "Galley Cleaning Department",
      positions: ["Galley Steward", "Messman"],
    },
    {
      department: "Guest Relations Department",
      positions: [
        "Concierge",
        "Administrator purser-documentation",
        "International host",
        "Event coordinator",
        "Guest relations officer",
      ],
    },
    {
      department: "Human Resources Department",
      positions: [
        "H/R administrator Manager",
        "Crew Staff (Welfare) Administrator",
        "Crew Staff (Welfare) Assistant",
        "Training and Development Manager",
      ],
    },
    {
      department: "Shore Excursion Department",
      positions: ["Shore Excursion Staff"],
    },
    {
      department: "Final Operations Department",
      positions: ["2nd purser administrator", "2nd purser payroll"],
    },
    {
      department: "Information Technology Department",
      positions: [
        "Shipboard Systems Manager",
        "Assistant data system manager",
        "Computer Systems hardware Technician",
        "Desktop Publisher",
        "Printer",
      ],
    },
    {
      department: "Inventory Department",
      positions: [
        "Food storekeeper",
        "Utility storekeeper",
        "Utility bar storekeeper",
      ],
    },
    {
      department: "Medical Department",
      positions: [
        "Cruise Ship Doctor",
        "Nurse",
        "Paramedics",
        "Physiotherapist",
      ],
    },
  ];

  const departmentsData2 = [
    {
      department: "Beverage Department",
      positions: ["Bar server", "Bartender", "Bar utility", "Sommelier"],
    },
    {
      department: "Casino Department",
      positions: [
        "Cashier",
        "Slot technician",
        "Slot attendant",
        "Casino dealer / Croupier",
      ],
    },
    {
      department: "Deck Department",
      positions: [
        "Deck officers",
        "Dech cadet",
        "Bosun",
        "Able Seaman",
        "Ordinary Seaman",
        "Apprentice Ordinary Seaman",
      ],
    },
    {
      department: "Security Department",
      positions: [
        "Chief Security Officer",
        "Deputy Security Officer",
        "Security Guard",
      ],
    },
    {
      department: "Facilities Department",
      positions: [
        "Facilities cleaner",
        " Facilities pool attendant",
        "Facilities assistant carpenter",
        "Facilities upholsterer",
        "Facilities assitant repairmen",
        "Plumber",
      ],
    },
    {
      department: "Galley Department",
      positions: [
        "Ship Cook",
        "Assitant cook baker",
        "Assistant cook butcher",
        "Assitant Cook fish",
        "Assistant cook pantry",
        "Assitant cook pastry",
        "Assistant cook vegetable",
        "Utility Cook",
      ],
    },
    {
      department: "Food service Department",
      positions: ["Waiter / ress", "Assitant waiter / ress"],
    },
    {
      department: "Housekeeping Department",
      positions: ["Stateroom attendant", "Assistant stateroom attendant"],
    },
    {
      department: "Engine Department",
      positions: [
        "Engine Officers ",
        "Engine Cadet",
        "Motorman / Oiler",
        "Wiper",
        "Apprentice Wiper",
      ],
    },
  ];

  const departmentsData3 = [
    {
      department: "Marine technician Department",
      positions: [
        "Electro technical Officer III/6",
        "Electro-technical Rating III/7",
        "Electro-Technical Cadet",
        "Assistant a/c engineer",
        "Assistant electrician",
        "Fitter",
        "Mechanics",
        "Welder",
      ],
    },
    {
      department: "Other Services and Personal care departments",
      positions: [
        "Gift Shop Sales Staff",
        "Photographers",
        "Spa Attendant",
        "Beauty Therapist",
        "Fitness Instructor",
        "Hair Stylist",
        "Manicurist",
        "Massage Therapists",
      ],
    },
    {
      department: "Merchant Deck and Engine Department",
      positions: ["Messman", "Cook", "OS / AB", "Bosun", "Wiper / Oiler"],
    },
  ];
  const fullName =
    (data?.seafarerData?.seafarerProfile?.profile?.firstName || "") +
    " " +
    (data?.seafarerData?.seafarerProfile?.profile?.lastName || "");

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header} fixed>
        <Encabezado
          text1="LIST OF POSITIONS ON BOARD"
          text2=""
          code="F-PMSSA-06"
          revision="05"
          date="Apr. 17th, 2023"
        />
      </View>

      <View style={[styles.section, { paddingTop: 25, paddingBottom: 30 }]}>
        <Position title="JOB'S POSITION" departments={departmentsData1} />
      </View>
      <View style={[styles.section, { paddingTop: 60, paddingBottom: 10 }]}>
        <Position title="JOB'S POSITION" departments={departmentsData2} />
      </View>
      <View style={[styles.section, { paddingTop: 50 }]}>
        <Position title="JOB'S POSITION" departments={departmentsData3} />
      </View>
      <View
        style={[
          styles.section,
          {
            paddingTop: 10,
            paddingBottom: 0,
            textAlign: "justify",
            marginBottom: 0,
          },
        ]}
      >
        <Text style={[{ fontSize: "10px", paddingTop: 20, lineHeight: 1.0 }]}>
          I have received a copy of the positions offered on board the ships.
        </Text>
        <Text style={[{ fontSize: "10px", paddingTop: 10, lineHeight: 1.5 }]}>
          I have read and understood that the information contained in the
          Brochure helps me determine if my job skills and experience qualify me
          to apply and so continue with the recruitment process.
        </Text>
      </View>
      <View style={[styles.section, { paddingTop: 5 }]}>
        <Firmas
          fullName={fullName}
          interview={interview}
          interviewData={interviewData}
          profile={data}
        />
      </View>
    </Page>
  );
}
