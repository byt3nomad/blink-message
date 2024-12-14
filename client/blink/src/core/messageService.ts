import { getErrorMessage } from "@/core/util";
import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  timeout: 2000,
});

type SuccessResult = {
  success: true;
  data: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

export type MessageResult = SuccessResult | ErrorResult;

const messageService = {
  createMessage: async (message: string): Promise<MessageResult> => {
    try {
      const response = await client.post("messages", { content: message });
      if (response.data && response.data.id) {
        return { success: true, data: response.data.id };
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
