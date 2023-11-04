import "./App.css";
import "react-csv-importer/dist/index.css";
import { useState } from "react";
import LighthouseDedupe from "./LighthouseDedupe";

export type Member = {
  firstName: string;
  lastName: string;
  postcode: string;
  guid: string;
  concatenated: string;
};

export type Duplicates = {
  members: Member[];
  concated: string;
};

enum Process {
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
          <form onSubmit={(e) => handle_submit(e)}>
            <label>
              Select the process you want to do:
              <select name="process_selector">
                <option
                  value={Process[Process.lighthouse_dedupe]}
                  key={Process.lighthouse_dedupe}
                >
                  Lighthouse deduplicate
                </option>
                <option
                  value={Process[Process.connect_match]}
                  key={Process.connect_match}
                >
                  Connect Match
                </option>
              </select>
            </label>
            <label>
              <button>Submit</button>
            </label>
          </form>
        );

      case Process.lighthouse_dedupe:
        return <LighthouseDedupe></LighthouseDedupe>;

      default:
        return <p>Something went wrong please hit resset</p>;
    }
  }

  function handle_submit(event: React.SyntheticEvent) {
    event.preventDefault();
    const form_data = event.target as typeof event.target & {
      process_selector: { value: string };
    };
    setCurrentProcess(
      Process[form_data.process_selector.value as keyof typeof Process]
    );
  }

  return <div className="App">{render_states()}</div>;
}

export default App;
