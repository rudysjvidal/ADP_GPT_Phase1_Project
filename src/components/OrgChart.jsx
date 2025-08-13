import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

function OrgChart() {
  const { customers } = useOutletContext();
  const [orgLevels, setOrgLevels] = useState([]);

  useEffect(() => {
    if (!Array.isArray(customers)) return;

    // Group customers by level
    const levelsMap = {};
    customers.forEach(c => {
      if (!levelsMap[c.level]) levelsMap[c.level] = [];
      levelsMap[c.level].push(c);
    });

    // Convert to sorted array of levels
    const sortedLevels = Object.keys(levelsMap)
      .sort((a, b) => a - b)
      .map(level => ({ level, people: levelsMap[level] }));

    setOrgLevels(sortedLevels);
  }, [customers]);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
        Organization Chart
      </h1>

      <div className="space-y-12">
        {orgLevels.map(({ level, people }) => (
          <div key={level} className="flex justify-center space-x-8">
            {people.map(person => (
              <div
                key={person.id}
                className="bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-3 text-center w-40"
              >
                <p className="font-semibold text-gray-800">{person.name}</p>
                <p className="text-sm text-gray-500">Level {person.level}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrgChart;
