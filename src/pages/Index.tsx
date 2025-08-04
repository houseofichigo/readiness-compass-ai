import { useState } from "react";

const Index = () => {
  const [appState, setAppState] = useState<"welcome" | "assessment" | "results">("welcome");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          {appState === "welcome" && (
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold text-gray-800">
                AI Readiness Assessment Platform
              </h1>
              <p className="text-xl text-gray-600">
                Comprehensive assessment platform that evaluates your organization's AI maturity.
              </p>
              <button 
                onClick={() => setAppState("assessment")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                Start Your AI Assessment
              </button>
            </div>
          )}
          
          {appState === "assessment" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Assessment in Progress</h2>
              <div className="bg-gray-100 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">Sample Question: What is your role?</p>
                <input 
                  type="text" 
                  placeholder="Enter your role"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setAppState("welcome")}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg"
                >
                  Back
                </button>
                <button 
                  onClick={() => setAppState("results")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                >
                  Complete Assessment
                </button>
              </div>
            </div>
          )}
          
          {appState === "results" && (
            <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Assessment Complete!</h2>
              <div className="bg-green-100 p-6 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-2">85</div>
                <p className="text-green-700">Your AI Readiness Score</p>
              </div>
              <button 
                onClick={() => setAppState("welcome")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Start New Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;