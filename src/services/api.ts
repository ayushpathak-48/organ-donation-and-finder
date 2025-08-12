import type { Donor } from "../types/donor";

const donors: Donor[] = [
  { name: "John Doe", organ: "Kidney", bloodGroup: "O+", location: "Delhi" },
  { name: "Jane Smith", organ: "Liver", bloodGroup: "A-", location: "Mumbai" },
];

export const getDonors = (): Donor[] => donors;

export const addDonor = (donor: Donor): void => {
  donors.push(donor);
};
