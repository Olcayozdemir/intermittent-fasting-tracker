import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export interface FastingSession {
  id: number;
  start: string;
  end: string;
  completedAt?: string;
}

interface FastingContextType {
  fastingHistory: FastingSession[];
  setFastingHistory: React.Dispatch<React.SetStateAction<FastingSession[]>>;
  deleteFasting: (id: number) => void;
}

const FastingContext = createContext<FastingContextType | null>(null);

export const FastingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fastingHistory, setFastingHistory] = useState<FastingSession[]>([]);

  useEffect(() => {
    fetch("/json/history.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFastingHistory(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }, []);

  const deleteFasting = (id: number) => {
    const updatedHistory = fastingHistory.filter(
      (session) => session.id !== id
    );
    setFastingHistory(updatedHistory);
  };

  return (
    <FastingContext.Provider
      value={{
        fastingHistory,
        setFastingHistory,
        deleteFasting,
      }}
    >
      {children}
    </FastingContext.Provider>
  );
};

export const useFasting = () => {
  const context = useContext(FastingContext);
  if (!context) {
    throw new Error("useFasting must be used within a FastingProvider");
  }
  return context;
};
