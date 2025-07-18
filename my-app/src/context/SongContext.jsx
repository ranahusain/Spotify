import { Children, createContext, useState } from "react";

//create context
export const SongContext = createContext();

//create provider
export const SongProvider = ({ children }) => {
  const [songDetails, setSongDetails] = useState({
    songURL: "",
    imageURL: "",
    artistName: "",
    songName: "",
  });

  return (
    <SongContext.Provider value={{ songDetails, setSongDetails }}>
      {children}
    </SongContext.Provider>
  );
};
