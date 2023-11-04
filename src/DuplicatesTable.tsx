import { CSVLink } from "react-csv";
import { Duplicate } from "./Duplicate";
import { DuplicateSet } from "./Types";

type DuplicatesTableProps = {
  duplicates: DuplicateSet[];
};

export function DuplicatesTable({ duplicates }: DuplicatesTableProps) {
  return (
    <div>
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Postcode</th>
          <th>Occurences</th>
        </thead>
        <tbody>
          {duplicates.map((item) => (
            <Duplicate duplicateSet={item}></Duplicate>
          ))}
        </tbody>
      </table>
    </div>
  );
}
