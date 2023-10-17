import { Duplicates } from "./App";

type DuplicateProps = { duplicate: Duplicates };

export function Duplicate({ duplicate }: DuplicateProps) {
  return (
    <tr>
      <td>{duplicate.members[0].firstName}</td>
      <td>{duplicate.members[0].lastName}</td>
      <td>{duplicate.members[0].postcode}</td>
      <td>{duplicate.members.length}</td>
    </tr>
  );
}
