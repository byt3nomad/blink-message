import { getErrorMessage } from "@/core/util";
import axios from "axios";

const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/`,
  timeout: 2000,
});

type MessageCreateSuccess = {
  success: true;
  messageId: string;
};

type ErrorResult = {
  success: false;
  error: string;
};

export type MessageCreateResult = MessageCreateSuccess | ErrorResult;

type MessageInfoSuccess = {
  success: true;
  opened: boolean;
  createdAt: number;
  openedAt: number | null;
};

export type MessageInfoResult = MessageInfoSuccess | ErrorResult;

type MessageOpenSuccess = {
  success: true;
  encryptedMessage: string;
};

type MessageOpenResult = MessageOpenSuccess | ErrorResult;
const messageService = {
  createMessage: async (
    encryptedMessage: string,
    encryptedWithPassword: boolean
  ): Promise<MessageCreateResult> => {
    try {
      const response = await client.post("messages", {
        encryptedMessage,
        encryptedWithPassword,
      });
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
  getMessageInfo: async (messageId: string): Promise<MessageInfoResult> => {
    try {
      const response = await client.get(`messages/${messageId}/info`);

      return {
        success: true,
        opened: response.data.opened,
        createdAt: response.data.createdAt,
        openedAt: response.data.openedAt,
      };
    } catch (e: any) {
      if (e.response && e.response.data?.message) {
        return {
          success: false,
          error: `Message with id ${messageId} was not found!`,
        };
      }
      return {
        success: false,
        error: getErrorMessage(e),
      };
    }
  },
  getMessageContent: async (messageId: string): Promise<MessageOpenResult> => {
    try {
      const response = await client.post(`messages/${messageId}/open`);

      return {
        success: true,
        encryptedMessage: response.data.encryptedMessage,
      };
    } catch (e: any) {
      const defaultError = getErrorMessage(e);
      let error = defaultError;
      if (e.response?.data?.code) {
        let errorMessages: Record<number, string> = {
          400: "Message already opened!",
          404: `Message with id ${messageId} was not found!`,
        };

        error = errorMessages[e.response.data.code];
      }
      return {
        success: false,
        error,
      };
    }
  },
};

export default messageService;
