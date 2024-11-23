import { Image, Text, View } from "react-native";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/redux";
import { useTheme } from "react-native-paper";
import { timeDifference } from "../utils/format";
import { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

interface ItemMessageProps {
  message: MessageEntity;
  pathAvt: string;
  dateSend: Date;
  setDateSend: any;
}
interface CreatedAtInterface {
  createdAt: Date | null;
}

export default function ItemMessage({
  message,
  pathAvt,
  dateSend,
  setDateSend,
}: ItemMessageProps) {
  const theme = useTheme();
  const { colors } = theme;
  const user = useSelector((state: RootState) => state.authentication.user);
  const [useStatePosition, setUseStatePosition] = useState("left");
  const [isShowDay, setIsShowDay] = useState(true);
  const [isShowTime, setIsShowTime] = useState(false);
  const [date, setDate] = useState<CreatedAtInterface>();
  useEffect(() => {
    const dayCurrent = new Date();
    const formattedDateCurrent = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dayCurrent);
    const formattedDateSend = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateSend);
    if (formattedDateCurrent === formattedDateSend) {
      setIsShowDay(false);
      setIsShowTime(false);
    } else {
      setDateSend(message.createdAt);
      setIsShowDay(true);
      setIsShowTime(true);
    }
    setDate({
      createdAt:
        typeof message.createdAt === "string"
          ? new Date(message.createdAt)
          : message.createdAt,
    });

    if (date && date.createdAt) {
      const formattedDateSendOfTheMessage = new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date.createdAt);
      if (formattedDateCurrent === formattedDateSendOfTheMessage) {
        setIsShowTime(false);
      } else {
        setIsShowTime(true);
      }
    }
  }, []);
  useEffect(() => {
    if (message.senderId === user?.id) {
      setUseStatePosition("right");
    } else {
      setUseStatePosition("left");
    }
  }, [useStatePosition]);

  return (
    <View>
      {isShowDay ? (
        <View>
          <Text
            style={{
              marginTop: 20,
              marginBottom: 15,
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            {message && message.createdAt
              ? new Date(message.createdAt).toLocaleDateString()
              : ""}
          </Text>
        </View>
      ) : (
        ""
      )}
      <View
        style={{
          width: "auto",
          height: "auto",
          maxWidth: useStatePosition === "left" ? "60%" : "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent:
            useStatePosition === "right" ? "flex-end" : "flex-start",
          marginTop: 20,
        }}
      >
        {useStatePosition === "right" ? (
          message.isRead ? (
            <Ionicons
              name="checkmark-done"
              size={15}
              style={{ textAlignVertical: "bottom" }}
            />
          ) : (
            <Ionicons
              name="checkmark"
              size={15}
              style={{ textAlignVertical: "bottom" }}
            />
          )
        ) : (
          ""
        )}
        <Text
          style={{
            textAlign: useStatePosition === "right" ? "right" : "left",
            marginRight: useStatePosition === "right" ? 10 : 0,
            marginLeft: useStatePosition === "left" ? 10 : 0,
            textAlignVertical: "center",
            width: "auto",
            maxWidth: "100%",
            backgroundColor: "white",
            fontSize: 16,
            fontWeight: 400,
            borderRadius: 12,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 20,
            paddingEnd: 20,
          }}
        >
          {message.content}
        </Text>
        {useStatePosition === "left" ? (
          message.isRead ? (
            <Ionicons
              name="checkmark-done"
              size={15}
              style={{ textAlignVertical: "bottom" }}
            />
          ) : (
            <Ionicons
              name="checkmark"
              size={15}
              style={{ textAlignVertical: "bottom" }}
            />
          )
        ) : (
          ""
        )}
      </View>
      <Text
        style={{
          textAlign: useStatePosition === "right" ? "right" : "left",
          marginRight: useStatePosition === "right" ? 15 : 0,
          marginLeft: useStatePosition === "left" ? 15 : 0,
          marginTop: 5,
        }}
      >
        {message && message.createdAt
          ? isShowTime
            ? new Date(message.createdAt).toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : timeDifference(new Date(message.createdAt))
          : ""}
      </Text>
    </View>
  );
}
