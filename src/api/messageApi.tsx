import { MessageEntity } from "../pages/ItemPageOfTabHome/Chat";
import { BASE_URL } from "./base_url";

const messageApi = {
    // Define the function type with parameters and return type
    async fethGetMessages(friendId: string, userId:string, access_token:string, createdAt: Date): Promise<MessageEntity[]> {
      try {
        const response = await fetch(BASE_URL + "api/find-message-by-20-document-by-next-createdAt-where-friendId-and-userId-and-createdAt?friendId="+friendId+"&&userId="+userId+"&&createdAt="+createdAt.toISOString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token, 
          },
        });
        // Kiểm tra nội dung phản hồi
        const message = await response.text();
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        // Nếu phản hồi là JSON, parse nó
        return JSON.parse(message);
      } catch (error: any) {
        console.error(error.message)
        throw new Error(`Error fetching login: ${error.message}`);
      }
    },
    async fethSetIsReadMessageStartDate(friendId: string,access_token:string, createdAt: Date) {
      try {
        const response = await fetch(BASE_URL + "api/change-readed-message-by-friendId-and-createdAt?friendId="+friendId+"&&createdAt="+createdAt.toISOString(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token, 
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
      } catch (error: any) {
        throw new Error(`Error fetching login: ${error.message}`);
      }
    },
}  

export default messageApi;