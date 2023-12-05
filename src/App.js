import "./App.css";
import HeaderView from "./components/Header/HeaderView";
import React, { useState } from 'react';
import SliderComp from './components/slidercomp/SliderComp';
import TimelineComp from "./components/TimelineComp/TimelineComp";
import Categories from "./components/Categories";
import Statistics from "./components/Statistics";
import SearchComp from "./components/SearchComp/SearchComp";


function App() {
  const [word, setWord] = useState('');
  const [date, setDate] = useState('');

  return (
    <div className="App">

      <HeaderView word={word} setWord={setWord} date={date} setDate={setDate} />
      {(!word && !date) ?
        <>
          <SliderComp />
          <TimelineComp />
          <Categories />
          <Statistics /></> :
        <>
          <SearchComp word={word} date={date} />
        </>}


    </div>
  );
}

export default App;
