import { Image, Text, View } from "react-native";
import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { useSelector } from "react-redux";
import { RootState } from "../configuration/redux";
import { useTheme } from "react-native-paper";
import { timeDifference } from "../utils/format";
import { useEffect, useState } from "react";
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
            {date&& date.createdAt ? date.createdAt.toLocaleDateString() : ""}
          </Text>
        </View>
      ) : (
        ""
      )}
      <View
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          flexDirection: "row",
          justifyContent:
            useStatePosition === "right" ? "flex-end" : "flex-start",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: useStatePosition === "right" ? "right" : "left",
            marginRight: useStatePosition === "right" ? 10 : 0,
            marginLeft: useStatePosition === "left" ? 10 : 0,
            textAlignVertical: "center",
            width: "auto",
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
      </View>
      <Text
        style={{
          textAlign: useStatePosition === "right" ? "right" : "left",
          marginRight: useStatePosition === "right" ? 15 : 0,
          marginLeft: useStatePosition === "left" ? 15 : 0,
          marginTop: 5,
        }}
      >
        {date && date.createdAt
          ? isShowTime
            ? date.createdAt.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
              })
            : timeDifference(date.createdAt)
          : ""}
      </Text>
    </View>
  );
}
