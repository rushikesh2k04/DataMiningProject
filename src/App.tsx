import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import PredictionForm from './components/PredictionForm';
import VisualizationPanel from './components/VisualizationPanel';
import PredictionTable from './components/PredictionTable';
import { PredictionHistory } from './types';

function App() {
  const [predictions, setPredictions] = useState<PredictionHistory[]>([]);

  const handleNewPrediction = (prediction: PredictionHistory) => {
    const newPrediction = {
      ...prediction,
      id: predictions.length + 1,
    };
    setPredictions([...predictions, newPrediction]);
    localStorage.setItem('predictions', JSON.stringify([...predictions, newPrediction]));
  };

  React.useEffect(() => {
    const storedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    setPredictions(storedPredictions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&q=80")' }}
      />
      
      <div className="container mx-auto px-4 py-8 relative">
        <header className="flex items-center justify-center mb-12">
          <Brain className="w-12 h-12 text-pink-400 mr-4" />
          <h1 className="text-4xl font-bold text-white">Income Prediction Model</h1>
        </header>

        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <PredictionForm onSubmit={handleNewPrediction} />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Prediction Analytics</h2>
            <VisualizationPanel predictions={predictions} />
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6">Prediction History</h2>
            <PredictionTable predictions={predictions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;