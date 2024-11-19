import { Client } from "@stomp/stompjs";
import React, { createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho giá trị Context
interface MyContextType {
  stompClient: Client|undefined;
  setStompClient: (value: Client) => void;
}

// Tạo Context và cung cấp kiểu dữ liệu
export const StompContext = createContext<MyContextType | undefined>(undefined);

interface StompContextProviderProps {
  children: ReactNode;
}

export const StompContextProvider: React.FC<StompContextProviderProps> = ({
  children,
}) => {
  const [stompClient, setStompClient] = useState<Client|undefined>(undefined);

  return (
    <StompContext.Provider value={{ stompClient, setStompClient }}>
      {children}
    </StompContext.Provider>
  );
};
