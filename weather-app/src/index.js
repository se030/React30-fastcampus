/*
  recharts module의 리액트 버전 호환성 문제로 React17로 다운그레이드
  React17에서는 index.js도 아래와 같이 바꿔주어야!
*/

import React from "react";
import { render } from "react-dom";
import App from "./App";
import reportWebVitals from './reportWebVitals';

const root = document.getElementById("root");
render(<App />, root);

reportWebVitals();
