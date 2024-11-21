import React from "react";
import { View } from "react-native";

export default function DotStatus({ status }: { status: "online"|"offline" }) {
  const style = {
    backgroundColor:
      status === "online"
        ? "#008000"
        : status === "offline"
        ? "#4c4c4c"
        : "#FFFF00",
    borderRadius: 50,
    width: 10,
    height: 10,
  };
  
  return <View style={style} />;
}
