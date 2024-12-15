import { getErrorMessage } from "@/core/util";
import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  timeout: 2000,
});

type SuccessResult = {
  success: true;
  messageId: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

export type MessageResult = SuccessResult | ErrorResult;

const messageService = {
  createMessage: async (
    encryptedMessage: string,
    iv: string
  ): Promise<MessageResult> => {
    try {
      const response = await client.post("messages", { encryptedMessage, iv });
      if (response.data && response.data.id) {
        return { success: true, messageId: response.data.id };
      }
      throw new Error("No message id");
    } catch (e) {
      return {
        success: false,
        error: getErrorMessage(e),
      };
    }
  },
};

export default messageService;
