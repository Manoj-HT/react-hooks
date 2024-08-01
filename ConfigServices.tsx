import { createContext, ReactNode, useEffect, useState } from "react";

export const configContext = createContext({
  config: null as unknown as ConfigType,
  isLoading: true,
  configError: null as unknown as string,
} as ConfigContextType);
export const ConfigServices = ({ children }: ConfigServicePropsType) => {
  const [config, setConfig] = useState({
    config: null as unknown as ConfigType,
    isLoading: true,
    configError: null as unknown as string,
  } as ConfigContextType);
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/config.json");
        const data = await response.json();
        setConfig({
          config: data,
          isLoading: false,
          configError: null as unknown as string,
        });
      } catch (error) {
        setConfig({
          config: null as unknown as ConfigType,
          isLoading: false,
          configError: `error : ${error}`,
        });
      }
    };
    fetchConfig();
  }, []);
  return (
    <configContext.Provider value={config}>
      {!config.isLoading ? children : <div>Something Went Wrong <br /> {config.configError}</div>}
    </configContext.Provider>
  );
};

type ConfigServicePropsType = {
  children: ReactNode;
};

export type ConfigType = {
  api: "";
  hello : string;
};
export type ConfigContextType = {
  config: ConfigType;
  isLoading: boolean;
  configError: string;
};
