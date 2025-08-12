import React from "react";
import type { Donor } from "../types/donor";

interface Props {
  donor: Donor;
}

const DonorCard: React.FC<Props> = ({ donor }) => {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <h3 className="text-lg font-bold">{donor.name}</h3>
      <p>Organ: {donor.organ}</p>
      <p>Blood Group: {donor.bloodGroup}</p>
      <p>Location: {donor.location}</p>
    </div>
  );
};

export default DonorCard;
