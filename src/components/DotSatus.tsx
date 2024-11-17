import React from "react";
import { View } from "react-native";

export default function DotStatus({ status }: { status: string }) {
  const style = {
    backgroundColor:
      status === "online"
        ? "#008000"
        : status === "offline"
        ? "#FF0000"
        : "#FFFF00",
    borderRadius: 50,
    width: 10,
    height: 10,
  };
  
  return <View style={style} />;
}
