import { createContext, useContext } from "react";

export const BoardsContext = createContext();

export const useBoards = () => useContext(BoardsContext);
