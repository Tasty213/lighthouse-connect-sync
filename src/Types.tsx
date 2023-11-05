export type Member = {
  firstName: string;
  lastName: string;
  postcode: string;
  guid: string;
  concatenated: string;
  vanid: string;
};

export type DuplicateSet = {
  members: Member[];
  concated: string;
};

export type MatchSet = {
  person: Member;
  matches: Match[];
};

export type Match = {
  algorithim: string;
  van_ids: string[];
};
