import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  age: number;
  education: string;
  occupation: string;
  maritalStatus: string;
  hoursPerWeek: number;
}

interface Props {
  onSubmit: (prediction: any) => void;
}

const PredictionForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    age: 30,
    education: 'Bachelors',
    occupation: 'Professional',
    maritalStatus: 'Single',
    hoursPerWeek: 40,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate ML prediction (in real app, this would call your ML model)
    const prediction = Math.random() > 0.5 ? '>50K' : '≤50K';
    const confidence = Math.random() * 0.5 + 0.5;
    
    onSubmit({
      ...formData,
      prediction,
      confidence,
      timestamp: new Date().toISOString(),
    });
  };

  const inputClasses = "w-full px-4 py-2 rounded-lg bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 backdrop-blur-sm border border-white/10";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white mb-2">Age</label>
        <input
          type="number"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
          className={inputClasses}
        />
      </div>

      <div>
        <label className="block text-white mb-2">Education</label>
        <select
          value={formData.education}
          onChange={(e) => setFormData({ ...formData, education: e.target.value })}
          className={inputClasses}
        >
          <option value="Bachelors">Bachelors</option>
          <option value="Masters">Masters</option>
          <option value="PhD">PhD</option>
          <option value="High School">High School</option>
        </select>
      </div>

      <div>
        <label className="block text-white mb-2">Occupation</label>
        <select
          value={formData.occupation}
          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
          className={inputClasses}
        >
          <option value="Professional">Professional</option>
          <option value="Technical">Technical</option>
          <option value="Sales">Sales</option>
          <option value="Administrative">Administrative</option>
        </select>
      </div>

      <div>
        <label className="block text-white mb-2">Marital Status</label>
        <select
          value={formData.maritalStatus}
          onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
          className={inputClasses}
        >
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>

      <div>
        <label className="block text-white mb-2">Hours per Week</label>
        <input
          type="number"
          value={formData.hoursPerWeek}
          onChange={(e) => setFormData({ ...formData, hoursPerWeek: parseInt(e.target.value) })}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        Predict Income
      </button>
    </form>
  );
};

export default PredictionForm;