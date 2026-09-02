import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Mail, Phone, MapPin, User, FileText, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitHireRequest } from '../lib/supabase';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    why_hire: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when modal is active
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const targetEmail = 'mecreation2026@gmail.com';
    const web3formsKey = (import.meta as any).env?.VITE_WEB3FORMS_ACCESS_KEY || '';

    try {
      // 1. Submit to Supabase Database
      await submitHireRequest({
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address,
        why_hire: formData.why_hire,
      });

      // 2. Dispatch Email via Web3Forms with MEKPO Technologies Template
      try {
        const emailPayload = {
          access_key: (web3formsKey && web3formsKey !== 'your-web3forms-access-key-here') ? web3formsKey : 'c761cbc1-3ad8-4954-9513-b64f9234c049',
          subject: `MEKPO Technologies - New Inquiry from ${formData.name}`,
          from_name: `MEKPO Technologies - ${formData.name}`,
          to_email: targetEmail,
          replyto: formData.email,
          message: `
========================================
MEKPO TECHNOLOGIES - CLIENT PROJECT INQUIRY
========================================

Client / Candidate Details:
----------------------------------------
• Full Name: ${formData.name}
• Email: ${formData.email}
• Mobile / Phone: ${formData.mobile}
• Address / Location: ${formData.address || 'Not Provided'}

Why Hire / Project Scope & Requirements:
----------------------------------------
${formData.why_hire}

----------------------------------------
Submitted via MEKPO Technologies Portal: ${new Date().toLocaleString()}
Destination Notification: ${targetEmail}
========================================
          `,
          "Client Name": formData.name,
          "Contact Email": formData.email,
          "Contact Phone": formData.mobile,
          "Location / Address": formData.address || 'N/A',
          "Project Scope / Why Hire": formData.why_hire,
          "Platform": "MEKPO Technologies Web Portal",
        };

        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(emailPayload),
        });
      } catch (emailErr) {
        console.warn('Web3Forms dispatch notice:', emailErr);
      }

      setStatus('success');

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#cccccc', '#999999', '#444444'],
      });

    } catch (err: any) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(err?.message || 'An unexpected error occurred while processing your request.');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      mobile: '',
      email: '',
      address: '',
      why_hire: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-xl liquid-glass border border-white/20 rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl my-auto max-h-[92vh] flex flex-col overflow-hidden"
      >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="text-center py-6 space-y-5 animate-fadeIn overflow-y-auto">
            <div className="w-14 h-14 rounded-full bg-white text-black mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-normal text-white">
                Inquiry Received by MEKPO Technologies
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm mt-1.5 max-w-md mx-auto font-light leading-relaxed">
                Thank you, <strong className="text-white">{formData.name}</strong>. Your project details have been dispatched to <span className="text-white font-mono">mecreation2026@gmail.com</span>.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => { resetForm(); onClose(); }}
                className="bg-white text-black px-6 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Modal Header */}
            <div className="mb-4 pr-6 shrink-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full liquid-glass border border-white/15 text-[10px] tracking-widest uppercase text-gray-300 mb-1.5 shadow-sm">
                <Sparkles size={11} className="text-white" />
                Start a Chat / Hire MEKPO Technologies
              </div>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight leading-tight">
                Let's engineer your <span className="font-medium">next milestone.</span>
              </h3>
              <p className="text-gray-400 text-[11px] sm:text-xs mt-0.5 font-light">
                Direct inquiry routed to <span className="text-white font-mono">mecreation2026@gmail.com</span> with Supabase DB archiving.
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-3 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center gap-2 shrink-0">
                <AlertCircle size={15} className="shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Scrollable Form Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 space-y-3 overscroll-contain">
              
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <User size={12} className="text-white" /> Full Name <span className="text-white">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <Mail size={12} className="text-white" /> Email Address <span className="text-white">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Mobile / Phone & Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <Phone size={12} className="text-white" /> Mobile / Phone <span className="text-white">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                    <MapPin size={12} className="text-white" /> Address / Location
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="City, State / Country"
                    className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
                  />
                </div>
              </div>

              {/* Why Hire & Project Details */}
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1 flex items-center gap-1">
                  <FileText size={12} className="text-white" /> Why Hire & Project Requirements <span className="text-white">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  name="why_hire"
                  value={formData.why_hire}
                  onChange={handleChange}
                  placeholder="Describe your project vision, timeline, technical requirements, or why you'd like to hire..."
                  className="w-full bg-black/50 border border-white/15 rounded-lg p-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end shrink-0">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-white text-black px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-lg active:scale-95"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={14} /> Submit Project Details
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};