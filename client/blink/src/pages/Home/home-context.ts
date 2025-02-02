import { createContext } from "react";
import { CreatedMessage } from "./CreateMessage";

interface HomeContextObject {
  createdMessage: CreatedMessage | null;
  setCreatedMessage: React.Dispatch<
    React.SetStateAction<CreatedMessage | null>
  >;
}

const defaultHomeContext: HomeContextObject = {
  createdMessage: null,
  setCreatedMessage: () => {},
};

const HomeContext = createContext<HomeContextObject>(defaultHomeContext);
