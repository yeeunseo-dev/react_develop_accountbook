import Router from "./shared/Router";
import GlobalStyle from "./style/GlobalStyle";

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
