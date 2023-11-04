import { Dispatch, SetStateAction } from "react";
import { Importer, ImporterField } from "react-csv-importer";
import { Member } from "./Types";

type LighthouseImporterProps = {
  setUploadComplete: Dispatch<SetStateAction<boolean>>;
  setMembers: Dispatch<SetStateAction<Member[]>>;
  callback: Function;
};

export function LighthouseImporter({
  setUploadComplete,
  setMembers,
  callback,
}: LighthouseImporterProps) {
  return (
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
        setUploadComplete(true);
        callback();
      }}
    >
      <ImporterField name="firstName" label="firstname"></ImporterField>
      <ImporterField name="lastName" label="lastname"></ImporterField>
      <ImporterField name="postcode" label="primary_postcode"></ImporterField>
    </Importer>
  );
}
