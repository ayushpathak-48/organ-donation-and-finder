import React, { useEffect, useState } from "react";
import { getDonors } from "../services/api";
import type { Donor } from "../types/donor";

const DistributorDashboard: React.FC = () => {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const donors: Donor[] = await getDonors();
    setDonors(donors);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Distributor Dashboard</h2>
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Organ</th>
            <th className="border p-2">Blood Group</th>
            <th className="border p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((d, i) => (
            <tr key={i}>
              <td className="border p-2">{d.name}</td>
              <td className="border p-2">{d.organ}</td>
              <td className="border p-2">{d.bloodGroup}</td>
              <td className="border p-2">{d.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DistributorDashboard;
