import { Dispatch, SetStateAction } from "react";
import { Importer, ImporterField } from "react-csv-importer";
import { Member } from "./Types";

type DataImporterProps = {
  setUploadComplete: Dispatch<SetStateAction<boolean>>;
  setPeople: Dispatch<SetStateAction<Member[]>>;
  callback: Function;
  label: string;
  first_name_settings?: ImportField;
  last_name_settings?: ImportField;
  postcode_settings?: ImportField;
  email_settings?: ImportField;
  van_id_settings?: ImportField;
};

type ImportField = {
  name: string;
  label: string;
};

export function DataImporter({
  setUploadComplete,
  setPeople,
  callback,
  label,
  first_name_settings = { name: "firstname", label: "firstname" },
  last_name_settings = { name: "lastname", label: "lastname" },
  postcode_settings = { name: "primary_postcode", label: "primary_postcode" },
  email_settings = { name: "email", label: "email" },
  van_id_settings = { name: "VANID", label: "VANID" },
}: DataImporterProps) {
  return (
    <div>
      <label>{label}</label>
      <Importer
        dataHandler={async (rows, { startIndex }) => {
          setPeople((members) => [
            ...members,
            ...rows.map((row) => {
              return {
                firstName: row.firstname,
                lastName: row.lastname,
                postcode: row.primary_postcode,
                guid: crypto.randomUUID(),
                concatenated: `${row.firstname}${row.lastname}${row.primary_postcode}`,
                vanid: row.VANID,
              } as Member;
            }),
          ]);
        }}
        onComplete={(info) => {
          setUploadComplete(true);
          callback();
        }}
      >
        <ImporterField
          name={first_name_settings.name}
          label={first_name_settings.label}
        ></ImporterField>
        <ImporterField
          name={last_name_settings.name}
          label={last_name_settings.label}
        ></ImporterField>
        <ImporterField
          name={postcode_settings.name}
          label={postcode_settings.label}
        ></ImporterField>
        <ImporterField
          name={email_settings.name}
          label={email_settings.label}
        ></ImporterField>
        <ImporterField
          name={van_id_settings.name}
          label={van_id_settings.label}
        ></ImporterField>
      </Importer>
    </div>
  );
}
