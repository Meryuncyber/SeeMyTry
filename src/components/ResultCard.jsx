import React from 'react';

const ResultCard = ({ children }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default ResultCard;
