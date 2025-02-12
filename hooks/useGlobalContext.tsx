// GlobalContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import debounce from "lodash.debounce";

// Define the shape of your global data
interface GlobalData {
  [key: string]: string;
}

// Define the context type with the data and updater function
interface GlobalContextType {
  globalData: GlobalData;
  setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>;
}

// Set default values for your global state
const defaultGlobalData: GlobalData = {
  text: "",
};

// Create the context with an initial undefined value
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create the provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalData, setGlobalData] = useState<GlobalData>(defaultGlobalData);

  // Load persisted global data when the provider mounts
  useEffect(() => {
    const loadGlobalData = async () => {
      try {
        const savedData = await AsyncStorage.getItem("globalData");
        if (savedData) {
          setGlobalData(JSON.parse(savedData));
        }
      } catch (error) {
        console.error("Error loading global data:", error);
      }
    };

    loadGlobalData();
  }, []);

  // Debounce saving global data to AsyncStorage to avoid excessive writes
  useEffect(() => {
    const saveData = debounce(async (data: GlobalData) => {
      try {
        await AsyncStorage.setItem("globalData", JSON.stringify(data));
        console.log("Global data saved");
      } catch (error) {
        console.error("Error saving global data:", error);
      }
    }, 500); // Delay of 500ms

    saveData(globalData);

    // Clean up the debounce timer on unmount or before the next effect run
    return () => {
      saveData.cancel();
    };
  }, [globalData]);

  return <GlobalContext.Provider value={{ globalData, setGlobalData }}>{children}</GlobalContext.Provider>;
};

// Create a custom hook to access the global context easily
export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
