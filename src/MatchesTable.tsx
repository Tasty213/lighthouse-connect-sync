import { CSVLink } from "react-csv";
import { MatchSet } from "./Types";
import { MatchRow } from "./MatchRow";

type MatchesTableProps = {
  matches: MatchSet[];
};

export function MatchesTable({ matches }: MatchesTableProps) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Postcode</th>
            <th>Occurences</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((item) => (
            <MatchRow match={item}></MatchRow>
          ))}
        </tbody>
      </table>
      <CSVLink
        data={matches
          .filter((match) => match.matches.length > 0)
          .map((match) => {
            return {
              firstName: match.person.firstName,
              lastName: match.person.lastName,
              postcode: match.person.postcode,
              van_ids: match.matches[0].van_ids.join(","),
            };
          })}
      >
        Download Results
      </CSVLink>
    </div>
  );
}
