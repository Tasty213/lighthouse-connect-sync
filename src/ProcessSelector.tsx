import { Dispatch, SetStateAction } from "react";
import { Process } from "./App";

type ProcessSelectorProps = {
  setCurrentProcess: Dispatch<SetStateAction<Process>>;
};

export function ProcessSelector({ setCurrentProcess }: ProcessSelectorProps) {
  function handle_submit(event: React.SyntheticEvent) {
    event.preventDefault();
    const form_data = event.target as typeof event.target & {
      process_selector: { value: string };
    };
    setCurrentProcess(
      Process[form_data.process_selector.value as keyof typeof Process]
    );
  }

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
}
