export type Member = {
  firstName: string;
  lastName: string;
  postcode: string;
  guid: string;
  concatenated: string;
};

export type DuplicateSet = {
  members: Member[];
  concated: string;
};
