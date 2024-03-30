import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface Profile {
  id: number;
  name: string;
  email: string;
}

export interface ActiveFastingSession {
  id: number;
  start: string;
  end: string;
  status: string;
}

interface Stats {
  totalHours: number;
  completedFasts: number;
}

interface ProfileContextType {
  user: Profile | null;
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
  activeFasting: ActiveFastingSession | null;
  setActiveFasting: React.Dispatch<
    React.SetStateAction<ActiveFastingSession | null>
  >;
  stats: Stats | null;
  setStats: React.Dispatch<React.SetStateAction<Stats | null>>;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setProfile] = useState<Profile | null>(null);
  const [activeFasting, setActiveFasting] =
    useState<ActiveFastingSession | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/json/user-info.json", { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProfile(data.user);
        setActiveFasting(data.activeFasting);
        setStats(data.stats);
      });
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        user,
        setProfile,
        activeFasting,
        setActiveFasting,
        stats,
        setStats,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
