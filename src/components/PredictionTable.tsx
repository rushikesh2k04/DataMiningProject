import React from 'react';
import { PredictionHistory } from '../types';

interface Props {
  predictions: PredictionHistory[];
}

const PredictionTable: React.FC<Props> = ({ predictions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Age</th>
            <th className="px-4 py-2 text-left">Education</th>
            <th className="px-4 py-2 text-left">Occupation</th>
            <th className="px-4 py-2 text-left">Marital Status</th>
            <th className="px-4 py-2 text-left">Hours/Week</th>
            <th className="px-4 py-2 text-left">Prediction</th>
            <th className="px-4 py-2 text-left">Confidence</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {predictions.slice().reverse().map((pred) => (
            <tr key={pred.id} className="border-b border-white/5 hover:bg-white/5">
              <td className="px-4 py-2">{pred.id}</td>
              <td className="px-4 py-2">{pred.age}</td>
              <td className="px-4 py-2">{pred.education}</td>
              <td className="px-4 py-2">{pred.occupation}</td>
              <td className="px-4 py-2">{pred.maritalStatus}</td>
              <td className="px-4 py-2">{pred.hoursPerWeek}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  pred.prediction === '>50K' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {pred.prediction}
                </span>
              </td>
              <td className="px-4 py-2">{Math.round(pred.confidence * 100)}%</td>
              <td className="px-4 py-2">{new Date(pred.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionTable;