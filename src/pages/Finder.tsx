import React, { useEffect, useState } from "react";
import { getDonors } from "../services/api";
import DonorCard from "../components/DonorCard";
import type { Donor } from "../types/donor";

const Finder: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    setDonors(getDonors());
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Available Donors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {donors.map((donor, idx) => (
          <DonorCard key={idx} donor={donor} />
        ))}
      </div>
    </div>
  );
};

export default Finder;
