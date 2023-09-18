import React from 'react';

const ConfigContext = React.createContext({
    serverUrl: "",
    websocketUrl: ""
});

export const ConfigProvider = ConfigContext.Provider;
export const ConfigConsumer = ConfigContext.Consumer;

export default ConfigContext; 