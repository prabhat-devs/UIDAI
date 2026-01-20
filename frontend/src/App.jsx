import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend 
} from 'recharts';
import { 
  TrendingUp, ShieldAlert, Users, Activity 
} from 'lucide-react';

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000"; 

  useEffect(() => {
    fetch(`${API_URL}/api/insights`)
      .then(res => res.json())
      .then(fetchedData => {
        setData(fetchedData);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const handleFreeze = (district) => {
    alert(`🚨 ACTION TAKEN:\nOperator IDs in ${district} have been frozen for audit.`);
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-blue-900 font-bold text-2xl animate-pulse">
      🚀 Analyzing Data...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-4 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-extrabold text-blue-900 flex items-center gap-2">
          <Activity className="text-blue-600" /> Aadhaar-Sanket
        </h1>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
          LIVE SYSTEM
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">

        {/* --- INSIGHT 1: ADMIN MIGRATION --- */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full"><TrendingUp className="text-blue-600 h-6 w-6"/></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">1. Administrative Migration Discovery</h2>
              <p className="text-slate-500">Detecting mass updates caused by District Renaming.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
                <h3 className="font-bold text-slate-700">The Finding</h3>
                <p className="text-sm text-slate-600 mt-1">
                  <span className="text-blue-600 font-bold">Khairthal-Tijara</span> shows massive demographic updates vs population.
                </p>
              </div>
              <div className="bg-blue-600 text-white p-3 rounded text-center font-bold shadow-md">
                ✅ Verdict: Valid Administrative Event
              </div>
            </div>
            <div className="w-full md:w-2/3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.insight1 || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="district" type="category" width={140} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="admin_pulse" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} name="Update Velocity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* --- INSIGHT 2: GHOST FRAUD --- */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-full"><ShieldAlert className="text-red-600 h-6 w-6"/></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">2. Ghost Update Anomalies</h2>
              <p className="text-slate-500">Identifying Operator Fraud via impossible update rates.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
             <div className="w-full md:w-1/3 space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <h3 className="font-bold text-red-800">The Anomaly</h3>
                <p className="text-sm text-red-700 mt-1">
                  District <span className="font-bold">Thoubal</span> shows suspiciously high biometric updates compared to population.
                </p>
              </div>
              <button 
                onClick={() => handleFreeze("Thoubal")}
                className="bg-red-600 text-white px-4 py-3 rounded-lg shadow hover:bg-red-700 text-sm font-bold w-full transition-all"
              >
                ❄️ FREEZE OPERATOR IDs
              </button>
            </div>
            <div className="w-full md:w-2/3 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.insight2 || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="district" tick={{fontSize: 12}} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="fraud_score" fill="#ef4444" name="Updates Per Person" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* --- INSIGHT 3: CHILD GAP --- */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-amber-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-full"><Users className="text-amber-600 h-6 w-6"/></div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">3. Child Service Gap</h2>
              <p className="text-slate-500">Enrolment vs. Mandatory Biometric Updates.</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3">
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 h-full">
                <h3 className="font-bold text-amber-800 mb-2">Impact Analysis</h3>
                <p className="text-sm text-amber-900 mb-4">
                  In <span className="font-bold">Bahraich</span>, thousands of children (Blue) are enrolled but have NOT updated biometrics (Yellow).
                </p>
                <div className="text-xs font-bold text-amber-700 bg-amber-100 p-2 rounded">
                  ⚠️ Risk: 99% Scholarship Failure
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.insight3 || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="district" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="age_5_17" name="Children Enrolled" fill="#3b82f6" />
                  <Bar dataKey="bio_age_5_17" name="Biometrics Updated" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;