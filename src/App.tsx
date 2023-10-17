import { Importer, ImporterField } from "react-csv-importer";
import "./App.css";
import "react-csv-importer/dist/index.css";
import { useState } from "react";
import { Duplicate } from "./Duplicate";
import { CSVDownload, CSVLink } from "react-csv";

type Member = {
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

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [dupes, setDupedMembers] = useState<Duplicates[]>([]);
  const [complete, setComplete] = useState(false);

  return (
    <div className="App">
      <table>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Postcode</th>
          <th>Occurences</th>
        </tr>
        {dupes.map((item) => (
          <Duplicate duplicate={item}></Duplicate>
        ))}
      </table>
      <CSVLink
        data={dupes.map((dupe) => {
          return {
            firstName: dupe.members[0].firstName,
            lastName: dupe.members[0].lastName,
            postcode: dupe.members[0].postcode,
            occurences: dupe.members.length,
          };
        })}
      >
        Download Results
      </CSVLink>
      <Importer
        dataHandler={async (rows, { startIndex }) => {
          setMembers((members) => [
            ...members,
            ...rows.map((row) => {
              return {
                firstName: row.firstName,
                lastName: row.lastName,
                postcode: row.postcode,
                guid: crypto.randomUUID(),
                concatenated: `${row.firstName}${row.lastName}${row.postcode}`,
              } as Member;
            }),
          ]);
          console.log(rows);
        }}
        onComplete={(info) => {
          setComplete(true);
          find_duped_members(members, setDupedMembers);
        }}
      >
        <ImporterField name="firstName" label="firstname"></ImporterField>
        <ImporterField name="lastName" label="lastname"></ImporterField>
        <ImporterField name="postcode" label="primary_postcode"></ImporterField>
      </Importer>
    </div>
  );
}

function find_duped_members(
  members: Member[],
  setDupedMembers: React.Dispatch<Duplicates[]>
) {
  var dupes = [] as Duplicates[];
  var all_concatenated = new Set(members.map((member) => member.concatenated));

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

export default App;
