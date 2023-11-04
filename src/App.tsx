import "./App.css";
import "react-csv-importer/dist/index.css";
import { useState } from "react";
import { LighthouseDedupe } from "./LighthouseDedupe";
import { ProcessSelector } from "./ProcessSelector";

export enum Process {
  initial,
  lighthouse_dedupe,
  connect_match,
}

function App() {
  const [current_process, setCurrentProcess] = useState<Process>(
    Process.initial
  );

  function render_states() {
    switch (current_process) {
      case Process.initial:
        return (
          <ProcessSelector
            setCurrentProcess={setCurrentProcess}
          ></ProcessSelector>
        );

      case Process.lighthouse_dedupe:
        return <LighthouseDedupe></LighthouseDedupe>;

      default:
        return <p>Something went wrong please hit resset</p>;
    }
  }

  function reset_state() {
    setCurrentProcess(Process.initial);
  }

  return (
    <div className="App">
      <label>Reset connect syncer</label>
      <button onClick={() => reset_state()}>Reset</button>
      {render_states()}
    </div>
  );
}

export default App;
