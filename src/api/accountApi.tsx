import { BASE_URL } from "./base_url";

// Define types for the function parameters and return values
export interface FriendEntity {
  id: string;
  userId1: string;
  userId2: string;
  message: MessageEntity | null;
  fullNameUser1: string;
  fullNameUser2: string;
  active:boolean;
  updateAt: Date;
}
export interface MessageEntity {
  id:string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string | null;
  isRead: boolean;
}
export interface Credentials {
  username: string;
  password: string;
}

export interface UserInformations {
  firstName: string;  // Tên
  lastName: string;   // Họ
  email: string;      // Địa chỉ email
  gender: "male" | "female"; // Giới tính
  birthDate: string;  // Ngày sinh (định dạng YYYY-MM-DD)
}

interface LoginResponse {
  access_token: string;
  user: UserInformations;
  // Add other fields returned by the login API
}

interface RegisterResponse {
  message: string;
  // Add other fields returned by the register API
}

interface LogoutResponse {
  message: string;
  // Add other fields returned by the logout API
}

const accountApi = {
  // Define the function type with parameters and return type
  async fetchLogin(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response = await fetch(BASE_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      // Kiểm tra nội dung phản hồi
      const text = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Nếu phản hồi là JSON, parse nó
      return JSON.parse(text);
    } catch (error: any) {
      throw new Error(`Error fetching login: ${error.message}`);
    }
  },

  async fetchRegister(
    credentials: Credentials,
    userInformations: UserInformations
  ): Promise<RegisterResponse> {
    console.log("Request payload:", JSON.stringify({ account: credentials, user: userInformations }));
    try {
      const response = await fetch(BASE_URL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account: credentials, user: userInformations }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(`Error fetching register: ${error.message}`);
    }
  },

  async fetchLogout(): Promise<LogoutResponse> {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error: any) {
      throw new Error(`Error fetching logout: ${error.message}`);
    }
  },
};


export default accountApi;
