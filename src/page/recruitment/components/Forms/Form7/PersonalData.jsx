import { Text, View, StyleSheet } from "@react-pdf/renderer";

export default function PersonalData({ profile, interviewDate, seafarerData }) {
  const styles = StyleSheet.create({
    text: {
      fontSize: "11px",
      fontWeight: "bold",
    },
    text_subrayado: {
      borderBottom: 0.5,
      marginLeft: 2,
      paddingLeft: 5,
      fontSize: "10px",
      color: "#00008B",
    },
  });

  // Función para convertir la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return " ";
    }

    // Ajustar la fecha sumando un día (24 horas)
    date.setUTCDate(date.getUTCDate() + 1);

    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formattedDate = interviewDate ? formatDate(interviewDate) : " ";

  // Función para calcular la edad
  const calcularEdad = (fechaNacimiento) => {
    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mesDiff = hoy.getMonth() - fecha.getMonth();

    // Verificar si aún no ha cumplido años este año
    if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }

    return edad;
  };
  //FUNCION PARA CALCULAR LA EDAD
  const edad = profile?.dateBirth ? calcularEdad(profile.dateBirth) : " ";
  const fullName =
    profile?.firstName && profile?.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : " ";
  return (
    <>
      <View style={[{ paddingTop: 20, display: "flex", flexDirection: "row" }]}>
        <Text style={[styles.text, {}]}>Name:</Text>
        <Text style={[styles.text_subrayado, { width: "200px" }]}>
          {fullName}
        </Text>
        <Text style={[styles.text, { paddingLeft: 20 }]}>Age:</Text>
        <Text style={[styles.text_subrayado, { width: "30px" }]}>
          {edad ? edad : ""}
        </Text>
        <Text style={[styles.text, { paddingLeft: 30 }]}>Date:</Text>
        <Text style={[styles.text_subrayado, { width: "100px" }]}>
          {formattedDate ? formattedDate : ""}
        </Text>
      </View>
      <View style={[{ paddingTop: 20, display: "flex", flexDirection: "row" }]}>
        <Text style={[styles.text, {}]}>Position to which It Applies:</Text>
        <Text style={[styles.text_subrayado, { width: "200px" }]}>
          {seafarerData?.position[0].name ? seafarerData.position[0].name : ""}
        </Text>

        <Text style={[styles.text, { paddingLeft: 34 }]}>Sex:</Text>
        <Text style={[styles.text_subrayado, { width: "100px" }]}>
          {profile?.gender && profile.gender.name ? profile.gender.name : " "}
        </Text>
      </View>
    </>
  );
}
