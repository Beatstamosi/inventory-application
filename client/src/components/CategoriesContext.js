import { createContext, useContext } from "react";

export const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);
