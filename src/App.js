import "./App.css";
import HeaderView from "./components/Header/HeaderView";
import React, { useState } from 'react';
import SliderComp from './components/slidercomp/SliderComp';
import TimelineComp from "./components/TimelineComp/TimelineComp";
import Categories from "./components/Categories";
import Statistics from "./components/Statistics";


function App() {
  return (
    <div className="App">

      <HeaderView />
      <SliderComp />
      <TimelineComp />
      <Categories />
      <Statistics />

    </div>
  );
}

export default App;
