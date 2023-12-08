import HeaderForm from "./HeaderForm";
import HeaderMenu from "./HeaderMenu";
import HeaderTitle from "./HeaderTitle";

function HeaderView({ word, setWord, date, setDate }) {

  return (
    <div className="bg-color-primary">
      <HeaderMenu />
      <HeaderTitle />
      <HeaderForm word={word} setWord={setWord} date={date} setDate={setDate} />
    </div>
  );
}

export default HeaderView;
