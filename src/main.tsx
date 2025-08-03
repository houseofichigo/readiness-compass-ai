import React from 'react';
import { createRoot } from 'react-dom/client';
import yaml from 'js-yaml';
import schemaText from './ai-readiness-assessment.yaml?raw';
import AssessmentForm from './AssessmentForm';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import './index.css';

// Parse the YAML schema at build time
const schema = yaml.load(schemaText);

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-accent">
        <div className="p-4">
          <h1 className="text-4xl font-bold text-center mb-4">AI Readiness Assessment v2.0</h1>
          <AssessmentForm schema={schema} />
        </div>
      </div>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  );
}

export function init() {
  const container = document.getElementById('root');
  if (!container) {
    throw new Error('Root element not found');
  }
  createRoot(container).render(<App />);
}

// Initialize the app
init();
