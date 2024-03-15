import React from "react";

const TokenContext = React.createContext({
    tokenBalance: 0,
    setTokenBalance: () => {},
});

export default TokenContext;
