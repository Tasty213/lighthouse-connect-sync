import { DuplicateSet } from "./Types";

type DuplicateProps = { duplicateSet: DuplicateSet };

export function Duplicate({ duplicateSet }: DuplicateProps) {
  return (
    <tr>
      <td>{duplicateSet.members[0].firstName}</td>
      <td>{duplicateSet.members[0].lastName}</td>
      <td>{duplicateSet.members[0].postcode}</td>
      <td>{duplicateSet.members.length}</td>
    </tr>
  );
}
