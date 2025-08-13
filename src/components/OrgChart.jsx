import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

function buildLevelStructure(customers) {
  const levels = {};
  
  customers.forEach(customer => {
    if (!levels[customer.level]) {
      levels[customer.level] = [];
    }
    levels[customer.level].push(customer);
  });
  
  Object.keys(levels).forEach(level => {
    levels[level].sort((a, b) => a.name.localeCompare(b.name));
  });
  
  return levels;
}

function OrgChart() {
  const { customers } = useOutletContext();
  const [levels, setLevels] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [collapsedLevels, setCollapsedLevels] = useState(new Set());

  const toggleLevel = (level) => {
    setCollapsedLevels(prev => {
      const newSet = new Set(prev);
      if (newSet.has(level)) {
        newSet.delete(level);
      } else {
        newSet.add(level);
      }
      return newSet;
    });
  };

  const collapseAll = () => {
    const allLevels = Object.keys(levels).map(Number).filter(level => level > 1);
    setCollapsedLevels(new Set(allLevels));
  };

  const expandAll = () => {
    setCollapsedLevels(new Set());
  };

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);
      
      try {
        let data = customers;
        if (typeof customers?.then === 'function') {
          data = await customers;
        }

        if (Array.isArray(data) && data.length > 0) {
          const levelsData = buildLevelStructure(data);
          setLevels(levelsData);
        } else {
          setError('No valid data available');
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError(err.message);
      }
      
      setLoading(false);
    }
    
    loadData();
  }, [customers]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <div>Loading organizational chart...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-50 border border-red-200 rounded p-4 max-w-md mx-auto">
          <div className="text-red-800 font-medium">Error: {error}</div>
        </div>
      </div>
    );
  }

  const sortedLevels = Object.keys(levels).map(Number).sort((a, b) => a - b);
  const totalEmployees = Object.values(levels).reduce((sum, level) => sum + level.length, 0);

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Organizational Chart</h2>
          <p className="text-gray-600 mb-4">{totalEmployees} employees across {sortedLevels.length} levels</p>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={expandAll}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-medium"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Levels */}
        {sortedLevels.map((levelNum) => {
          const levelPeople = levels[levelNum] || [];
          const isCollapsed = collapsedLevels.has(levelNum);
          
          return (
            <div key={levelNum} className="mb-6">
              {/* Level Header */}
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => toggleLevel(levelNum)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                >
                  {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                  Level {levelNum} ({levelPeople.length})
                </button>
              </div>
              
              {/* Level Content */}
              {!isCollapsed && (
                <div className="flex flex-wrap justify-center gap-4">
                  {levelPeople.map((person) => (
                    <div
                      key={person.id}
                      className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center min-w-[250px] max-w-[300px]"
                    >
                      <img
                        src={person.profile_picture || '/api/placeholder/48/48'}
                        alt={person.name || 'Unknown'}
                        className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/48/48';
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">
                          {person.name || 'Unknown'}
                        </div>
                        <div className="text-sm text-gray-600">
                          {person.job_title || 'No title'}
                        </div>
                        <div className="text-xs text-blue-600 font-medium">
                          Level {person.level}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Collapsed indicator */}
              {isCollapsed && (
                <div className="text-center">
                  <div className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded">
                    {levelPeople.length} people hidden
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrgChart;