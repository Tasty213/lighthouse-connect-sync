import "./App.css";
import "react-csv-importer/dist/index.css";
import { useState } from "react";
import { Member, DuplicateSet, MatchSet, Match } from "./Types";
import { DuplicatesTable } from "./DuplicatesTable";
import { DataImporter } from "./DataImporter";
import { MatchesTable } from "./MatchesTable";

export function ConnectMatch() {
  const [myCampaign, setMyCampaign] = useState<Member[]>([]);
  const [myCampaignReady, setMyCapaignReady] = useState<boolean>(false);

  const [myVoters, setMyVoters] = useState<Member[]>([]);
  const [myVotersReady, setMyVotersReady] = useState<boolean>(false);

  const [matches, setMatches] = useState<MatchSet[]>([]);

  function match_people() {
    if (!(myCampaignReady || myVotersReady)) {
      return;
    }

    var allMatches = [] as MatchSet[];
    myCampaign.forEach((person) => {
      var matches = [] as Match[];
      var matching_van_ids = [] as string[];
      myVoters.forEach((voter) => {
        if (
          `${person.lastName}${person.postcode}` ===
          `${voter.lastName}${voter.postcode}`
        ) {
          matching_van_ids.push(voter.vanid);
        }
      });
      allMatches.push({
        matches: [
          { algorithim: "lastname+postcode", van_ids: matching_van_ids },
        ],
        person: person,
      });
    });
    setMatches(allMatches);
  }

  function render_process() {
    if (myCampaignReady && myVotersReady) {
      return <MatchesTable matches={matches}></MatchesTable>;
    } else {
      return (
        <div>
          <DataImporter
            label="MyCampaign file"
            setUploadComplete={setMyCapaignReady}
            setPeople={setMyCampaign}
            callback={match_people}
          ></DataImporter>
          <DataImporter
            label="MyVoters file"
            setUploadComplete={setMyVotersReady}
            setPeople={setMyVoters}
            callback={match_people}
          ></DataImporter>
        </div>
      );
    }
  }

  return <div className="Process">{render_process()}</div>;
}
