import Router from "./shared/Router";
import GlobalStyle from "../src/components/GlobalStyle";

const App = () => {
  return (
    <>
      <div>
        <GlobalStyle />
        <Router />
      </div>
    </>
  );
};

export default App;
