import React, { useState } from 'react';
import { PieChart as PieChartIcon, BarChart as BarChartIcon, LineChart as LineChartIcon, Activity } from 'lucide-react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, 
  LineChart, Line,
  XAxis, YAxis, Tooltip, 
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from 'recharts';
import { PredictionHistory } from '../types';

interface Props {
  predictions: PredictionHistory[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6C5CE7'];

const VisualizationPanel: React.FC<Props> = ({ predictions }) => {
  const [activeChart, setActiveChart] = useState<'pie' | 'bar' | 'line' | 'scatter'>('pie');

  const pieData = [
    { name: '>50K', value: predictions.filter(p => p.prediction === '>50K').length },
    { name: '≤50K', value: predictions.filter(p => p.prediction === '≤50K').length },
  ];

  const timeSeriesData = predictions.map(p => ({
    timestamp: new Date(p.timestamp).toLocaleTimeString(),
    confidence: Math.round(p.confidence * 100),
    age: p.age,
  })).slice(-10);

  const educationData = Object.entries(
    predictions.reduce((acc, curr) => {
      acc[curr.education] = (acc[curr.education] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          onClick={() => setActiveChart('pie')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'pie'
              ? 'bg-pink-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <PieChartIcon className="w-4 h-4" />
          Income Distribution
        </button>
        <button
          onClick={() => setActiveChart('bar')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'bar'
              ? 'bg-pink-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <BarChartIcon className="w-4 h-4" />
          Education Distribution
        </button>
        <button
          onClick={() => setActiveChart('line')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'line'
              ? 'bg-pink-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <LineChartIcon className="w-4 h-4" />
          Confidence Trend
        </button>
        <button
          onClick={() => setActiveChart('scatter')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeChart === 'scatter'
              ? 'bg-pink-500 text-white'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
        >
          <Activity className="w-4 h-4" />
          Age vs Confidence
        </button>
      </div>

      <div className="h-[400px] bg-white/5 rounded-lg p-4">
        {activeChart === 'pie' && (
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'bar' && (
          <ResponsiveContainer>
            <BarChart data={educationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" fill="#4ECDC4">
                {educationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'line' && (
          <ResponsiveContainer>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
              <XAxis dataKey="timestamp" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="confidence" 
                stroke="#FF6B6B" 
                strokeWidth={2}
                dot={{ fill: '#FF6B6B' }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'scatter' && (
          <ResponsiveContainer>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff22" />
              <XAxis dataKey="age" stroke="#fff" />
              <YAxis dataKey="confidence" stroke="#fff" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Line 
                type="scatter" 
                dataKey="confidence" 
                stroke="none"
                dot={{ fill: '#6C5CE7', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default VisualizationPanel;