import "./App.css";
import "react-csv-importer/dist/index.css";
import { useState } from "react";
import { Member, DuplicateSet } from "./Types";
import { DuplicatesTable } from "./DuplicatesTable";
import { LighthouseImporter } from "./LighthouseImporter";

export function LighthouseDedupe() {
  const [members, setMembers] = useState<Member[]>([]);
  const [dupes, setDupedMembers] = useState<DuplicateSet[]>([]);
  const [complete, setComplete] = useState<boolean>(false);

  function find_duped_members() {
    var dupes = [] as DuplicateSet[];
    var all_concatenated = new Set(
      members.map((member) => member.concatenated)
    );

    all_concatenated.forEach((concated) => {
      var duplicates = members.filter(
        (member) => member.concatenated === concated
      );
      if (duplicates.length > 1) {
        dupes.push({ members: duplicates, concated: concated });
      }
    });
    setDupedMembers(dupes);
  }

  function render_process() {
    if (complete) {
      return <DuplicatesTable duplicates={dupes}></DuplicatesTable>;
    } else {
      return (
        <LighthouseImporter
          setUploadComplete={setComplete}
          setMembers={setMembers}
          callback={find_duped_members}
        ></LighthouseImporter>
      );
    }
  }

  return <div className="Process">{render_process()}</div>;
}
