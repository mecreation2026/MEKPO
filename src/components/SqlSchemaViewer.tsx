import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Database, Terminal } from 'lucide-react';

interface SqlSchemaViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SqlSchemaViewer: React.FC<SqlSchemaViewerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sqlCode = `-- =============================================================================
-- MEKPO Technologies - Production Supabase Database Schema
-- Table: hire_requests (Client Inquiries, Hiring & Project Scopes)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create table for hire requests & contact submissions
CREATE TABLE IF NOT EXISTS hire_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address TEXT,
    why_hire TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE hire_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web form (Frontend submissions)
CREATE POLICY "Allow public insert to hire_requests" 
ON hire_requests FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users / admin to view records
CREATE POLICY "Allow authenticated read to hire_requests" 
ON hire_requests FOR SELECT 
TO authenticated 
USING (true);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-3xl liquid-glass border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl my-auto max-h-[90vh] flex flex-col overflow-y-auto overscroll-contain"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4 pr-6">
          <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
            <Database size={20} />
          </div>
          <div>
            <h3 className="text-xl font-medium text-white">Supabase SQL Schema</h3>
            <p className="text-xs text-gray-400">Run this SQL in your Supabase SQL Editor to initialize the database table</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 mb-4 text-xs text-gray-300 space-y-1.5 shrink-0">
          <div className="flex items-center gap-2 text-white font-medium">
            <Terminal size={14} /> Quick Setup Steps:
          </div>
          <ol className="list-decimal list-inside space-y-1 text-gray-400 pl-1">
            <li>Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="text-white underline">Supabase Dashboard</a> and select your project.</li>
            <li>Navigate to the <strong>SQL Editor</strong> tab on the left sidebar.</li>
            <li>Paste the SQL script below and click <strong>Run</strong>.</li>
            <li>Add your project URL & Anon Key to your <code className="text-white font-mono bg-white/10 px-1 py-0.5 rounded">.env</code> file.</li>
          </ol>
        </div>

        {/* Code Snippet Box */}
        <div
          data-lenis-prevent
          className="relative flex-1 bg-black/80 rounded-xl border border-white/15 p-4 overflow-auto font-mono text-xs text-gray-300 min-h-[160px] max-h-[300px]"
        >
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors text-xs cursor-pointer shadow-sm"
          >
            {copied ? (
              <>
                <Check size={14} className="text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy size={14} /> Copy SQL
              </>
            )}
          </button>
          <pre className="pr-24 leading-relaxed whitespace-pre-wrap">{sqlCode}</pre>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="liquid-glass border border-white/20 text-white px-5 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />} {copied ? 'Copied' : 'Copy Script'}
          </button>
          <button
            onClick={onClose}
            className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};