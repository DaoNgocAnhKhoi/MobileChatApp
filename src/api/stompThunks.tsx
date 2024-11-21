// import { AppDispatch } from "../configuration/redux"; // Đường dẫn tới store của bạn
// import { Client } from "@stomp/stompjs";
// import {
//   setClient,
//   setConnected,
//   addMessage,
//   disconnect,
// } from "../features/stompSlice";
// import { BASE_URL_STOMP_CONNECT } from "./base_url";

// export const connectStomp = (path: string) => (dispatch: AppDispatch) => {
//   const client = new Client({
//     brokerURL: BASE_URL_STOMP_CONNECT + path,
//     reconnectDelay: 5000,
//     onConnect: () => {
//       console.log("Connected to STOMP server");
//       dispatch(setConnected(true));

//       client
//         ? client.subscribe("/user/queue/messages", (message) => {
//             console.log("Message received:", message.body);
//             dispatch(addMessage(message.body));
//           })
//         : "";
//     },
//     onStompError: (frame) => {
//       console.error("STOMP error:", frame);
//       dispatch(setConnected(false));
//     },
//   });

//   client.activate();
// //   dispatch(setClient(client));
// };

// export const disconnectStomp = () => (dispatch: AppDispatch) => {
//   dispatch(disconnect());
// };
