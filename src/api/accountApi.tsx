import { UserInformations } from "../features/authenticationSlice";
import { BASE_URL } from "./base_url";

// Define types for the function parameters and return values
export interface Credentials {
  username: string;
  password: string;
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
  async fetchCheckLogin(access_token: string){
    try {
      const response = await fetch(BASE_URL + "api/get-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      });
      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Kiểm tra nội dung phản hồi
      const text = await response.text();
      // Nếu phản hồi là JSON, parse nó
      return JSON.parse(text);
    } catch (error: any) {
      throw new Error(`Error fetching check login: ${error.message}`);
    }
  },
  async fetchLogin(credentials: Credentials): Promise<LoginResponse> {
    try {
      const response = await fetch(BASE_URL + "api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); 
        // throw new Error(`${response.message}`);
      }
      // Kiểm tra nội dung phản hồi
      const text = await response.text();
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
      const response = await fetch(BASE_URL + "api/register", {
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

  async fetchLogout(access_token: string): Promise<string> {
    try {
      const response = await fetch(BASE_URL + "api/logout", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return "logout success";
    } catch (error: any) {
      throw new Error(`Error fetching logout: ${error.message}`);
    }
  },
  async fetchChangeUserInformations(
    access_token: string,
    user: UserInformations
  ): Promise<UserInformations> {
    try {
      const response = await fetch(BASE_URL + "api/update-user-information", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      return JSON.parse(text);
    } catch (error: any) {
      throw new Error(`Error fetching logout: ${error.message}`);
    }
  },
  async fetchChangePassword(access_token: string,passwordCurrent:string, passwordNew:string): Promise<string> {
    try {
      const response = await fetch(BASE_URL + "api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
        body: JSON.stringify({passwordCurrent, passwordNew})
      });
      console.log(response.ok)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return "Change Password Success!";
    } catch (error: any) {
      throw new Error(`Error fetching logout: ${error.message}`);
    }
  },
};

export default accountApi;
