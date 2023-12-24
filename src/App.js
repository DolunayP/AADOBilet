import "./App.css";
import HeaderView from "./components/Header/HeaderView";
import React, { useState } from "react";
import SliderComp from "./components/slidercomp/SliderComp";
import TimelineComp from "./components/TimelineComp/TimelineComp";
import Categories from "./components/CategoriesComp/Categories";
import Statistics from "./components/Statistics";
import SearchComp from "./components/SearchComp/SearchComp";
import Footer from "./components/FooterComp/Footer";

function App() {
  const [word, setWord] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  return (
    <div className="App">
      <HeaderView
        word={word}
        setWord={setWord}
        date={date}
        setDate={setDate}
        place={place}
        setPlace={setPlace}
      />
      {!word && !date && !place ? (
        <>
          <SliderComp />
          <TimelineComp />
          <Categories />
          <Statistics />
          <Footer />
        </>
      ) : (
        <>
          <SearchComp word={word} date={date} place={place} />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
