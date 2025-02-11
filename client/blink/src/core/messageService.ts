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

export type MessageInfoSuccess = {
  success: true;
  createdAt: number;
  destroyed: boolean;
  destroyedAt: number | null;
  viewTimestamps: number[];
  configuration: {
    encryptedWithPassword: boolean;
    viewCount: number;
    destroyAt: number | null;
  };
};

export type MessageInfoResult = MessageInfoSuccess | ErrorResult;

type MessageViewSuccess = {
  success: true;
  encryptedMessage: string;
  encryptedWithPassword: boolean;
};

export type MessageViewResult = MessageViewSuccess | ErrorResult;
const messageService = {
  createMessage: async (
    encryptedMessage: string,
    encryptedWithPassword: boolean,
    viewCount: number,
    destroyAt: number | null
  ): Promise<MessageCreateResult> => {
    try {
      const response = await client.post("messages", {
        encryptedMessage,
        configuration: {
          encryptedWithPassword,
          viewCount,
          destroyAt,
        },
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
        createdAt: response.data.createdAt,
        destroyed: response.data.destroyed,
        destroyedAt: response.data.destroyedAt,
        viewTimestamps: response.data.viewTimestamps,
        configuration: response.data.configuration,
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
  viewMessage: async (messageId: string): Promise<MessageViewResult> => {
    try {
      const response = await client.post(`messages/${messageId}/view`);

      return {
        success: true,
        encryptedMessage: response.data.encryptedMessage,
        encryptedWithPassword: response.data.encryptedWithPassword,
      };
    } catch (e: any) {
      const defaultError = getErrorMessage(e);
      let error = defaultError;
      if (e.response?.data?.code) {
        let errorMessages: Record<number, string> = {
          400: "Message destroyed!",
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
