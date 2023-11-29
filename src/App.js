import wrapper from "./components/wrapper/wrapper";
import screen from "./components/screen/screen";
import buttonBox from "./components/buttonBox/buttonBox";
import button from "./components/button/button";

const App = () => {
  return (
    <Wrapper>
      <Screen value="0" />
      <ButtonBox>
        <Button
          className=""
          value="0"
          onClick={() => {
            console.log("Button clicked!");
          }}
        />
      </ButtonBox>
    </Wrapper>
  );
};

export default App;