import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import React, { useState } from "react";
import Outline from "./components/Outline";

const App = () => {
  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  return (
    <Outline>
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <ButtonBox calc={calc} setCalc={setCalc}>
          
        </ButtonBox>
      </Wrapper>
    </Outline>
  );
};

export default App;