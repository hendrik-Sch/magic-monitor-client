import React from 'react';

const TitleContext = React.createContext({
    setTitle: () => { }
});

export const TitleProvider = TitleContext.Provider;
export const TitleConsumer = TitleContext.Consumer;

export default TitleContext; 