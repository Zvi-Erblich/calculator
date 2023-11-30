import "./ButtonBox.css";
import Button from "./Button";
import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const ButtonBox = (props) => {
  
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(props.calc.num).length < 16) {
      props.setCalc({
        ...props.calc,
        num:
          props.calc.num === 0 && value === "0"//Checks if only 0 appears on the screen
            ? "0" //otherwise 0 cannot be added
            :props.calc.num.toString().includes(".") 
            ? toLocaleString(props.calc.num + value)
            : removeSpaces(props.calc.num) % 1 === 0//Checks if the number is intiger
            ? toLocaleString(Number(removeSpaces(props.calc.num + value)))//Adds it to the number and rearranges the spaces
            : toLocaleString(props.calc.num + value),
        res: !props.calc.sign ? 0 : props.calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    props.setCalc({
      ...props.calc,
      num: !props.calc.num.toString().includes(".") ? props.calc.num + value : props.calc.num,//Adds a decimal point only if no point already exists in the number
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

    props.setCalc({
      ...props.calc,
      
      res: !props.calc.res && props.calc.num 
      ? props.calc.num 
      : !props.calc.num 
      ? props.calc.res 
      :toLocaleString(
        math(
          Number(removeSpaces(props.calc.res)),
          Number(removeSpaces(props.calc.num)),
          props.calc.sign
        )
      ),
      num: 0,
      sign: value,
    });
  };

  const equalsClickHandler = () => {
    if (props.calc.sign && props.calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      props.setCalc({
        ...props.calc,
        res:
          props.calc.num === "0" && props.calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(props.calc.res)),
                  Number(removeSpaces(props.calc.num)),
                  props.calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    props.setCalc({
      ...props.calc,
      num: props.calc.num ? toLocaleString(removeSpaces(props.calc.num) * -1) : 0,
      res: props.calc.res ? toLocaleString(removeSpaces(props.calc.res) * -1) : 0,
      //sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = props.calc.num ? parseFloat(removeSpaces(props.calc.num)) : 0;
    let res = props.calc.res ? parseFloat(removeSpaces(props.calc.res)) : 0;

    props.setCalc({
      ...props.calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    props.setCalc({
      ...props.calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };
  return <div className="buttonBox">
    {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
                                }
              />
            );
          })
        }
  </div>;
};

export default ButtonBox;