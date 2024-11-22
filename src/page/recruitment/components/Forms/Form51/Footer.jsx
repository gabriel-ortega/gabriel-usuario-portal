import { Text, View } from "@react-pdf/renderer";
export default function Footer({ text1, text2, text3, text4 }) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        right: 30,
        textAlign: "right",
        fontSize: 8,
        justifyContent: "flex-end",
      }}
    >
      <Text
        style={{
          textAlign: "right",
        }}
      >
        {text1}
      </Text>
      <Text
        style={{
          textAlign: "right",
        }}
      >
        {text2}
      </Text>
      <Text
        style={{
          textAlign: "right",
        }}
      >
        {text3}
      </Text>
      <Text
        style={{
          textAlign: "left",
        }}
      >
        {text4}
      </Text>
    </View>
  );
}
