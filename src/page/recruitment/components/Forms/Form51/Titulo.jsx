import logistic from "../../../../../assets/imagenes/LOGO-LOGISTIC.png";
import { Text, View, Image } from "@react-pdf/renderer";
export default function Titulo({ title }) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}
    >
      <Image
        src={logistic}
        style={{ width: 100, height: 45, marginLeft: 25, paddingBottom: 5 }}
      />
      <Text
        style={{
          fontSize: 12,
          marginLeft: 40,
          textAlign: "center",
          justifyContent: "center",
          paddingTop: 10,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
