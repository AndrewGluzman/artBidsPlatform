import logo from "./logo.svg";
import "./App.css";
import AppMarket from "./marketComps/appMarket";
import PhpComp from "./test/phpComp";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = "http://localhost/ort/l55_12_5/test_query.php?cat=food";
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
  };

  return (
    <div className="App">
      <AppMarket />
      {/* <PhpComp /> */}
    </div>
  );
}
// 10:50
export default App;
