import { MatchSet } from "./Types";

type MatchProps = { match: MatchSet };

export function MatchRow({ match }: MatchProps) {
  return (
    <tr>
      <td>{match.person.firstName}</td>
      <td>{match.person.lastName}</td>
      <td>{match.person.postcode}</td>
      {match.matches.map((matcher) => (
        <td>{matcher.van_ids.join(",")}</td>
      ))}
    </tr>
  );
}
