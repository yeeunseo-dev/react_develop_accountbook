import React, { useState } from "react";
import Router from "./shared/Router";
import GlobalStyle from "./components/GlobalStyle";
// import { ItemProvider } from "./contexts/ItemContext";

const App = () => {
  return (
    <>
      {/* <ItemProvider> */}
      <div>
        <GlobalStyle />
        <Router />
      </div>
      {/* </ItemProvider> */}
    </>
  );
};

export default App;
