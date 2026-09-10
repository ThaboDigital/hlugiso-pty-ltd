import React, { useState } from 'react';
import { Lock, ShieldAlert, ArrowLeft, KeyRound, CheckCircle2 } from 'lucide-react';
import { usePortal } from './PortalContext';

interface PortalAuthModalProps {
  onBackToSite: () => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({ onBackToSite }) => {
  const { login } = usePortal();
  const [pin, setPin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pin) {
      setError('Please enter your Director PIN');
      return;
    }

    const success = login(pin);
    if (!success) {
      setError('Incorrect Director PIN. Please try again.');
      setPin('');
    } else {
      setError('');
    }
  };

  const handleKeyClick = (num: string) => {
    if (pin.length < 8) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError('');
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-[#064E3B]/40 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Brand Banner */}
        <div className="bg-[#064E3B] px-8 py-8 text-white text-center relative">
          <button
            onClick={onBackToSite}
            className="absolute left-5 top-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Return to Public Website"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 mx-auto mb-3 bg-white rounded-2xl p-2.5 shadow-lg flex items-center justify-center">
            <img 
              src="/branding/hlugiso-emblem.png" 
              alt="HLUGISO Emblem" 
              className="w-full h-full object-contain"
            />
          </div>

          <h2 className="text-xl font-black tracking-tight text-white">HLUGISO (PTY) LTD</h2>
          <p className="text-xs text-emerald-200 font-medium tracking-wider uppercase mt-0.5">
            Executive Director Operations Portal
          </p>
          <div className="mt-3 inline-flex items-center space-x-1.5 bg-black/25 px-3 py-1 rounded-full text-[11px] text-emerald-300 font-semibold border border-white/10">
            <Lock className="w-3 h-3 text-emerald-400" />
            <span>Authorized Access &bull; Thabo Makola</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                Enter Security PIN
              </label>
              
              {/* PIN Display Dots / Digits */}
              <div className="flex justify-center items-center space-x-3 py-2">
                {[0, 1, 2, 3].map(idx => (
                  <div
                    key={idx}
                    className={`w-11 h-12 rounded-xl border-2 flex items-center justify-center text-xl font-bold transition-all ${
                      pin.length > idx
                        ? 'border-[#064E3B] bg-emerald-50 text-[#064E3B]'
                        : 'border-gray-200 bg-gray-50 text-gray-400'
                    }`}
                  >
                    {pin.length > idx ? '●' : ''}
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700 flex items-center justify-center space-x-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2.5 pt-2">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handleKeyClick(num)}
                  className="py-3 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 text-lg font-bold text-gray-800 transition-all active:scale-95 shadow-sm"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={handleBackspace}
                className="py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border border-gray-200 text-xs font-bold text-gray-700 transition-all active:scale-95"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleKeyClick('0')}
                className="py-3 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:border-emerald-300 border border-gray-200 text-lg font-bold text-gray-800 transition-all active:scale-95 shadow-sm"
              >
                0
              </button>
              <button
                type="submit"
                className="py-3 rounded-xl bg-[#064E3B] hover:bg-[#075E54] text-white text-xs font-bold transition-all active:scale-95 shadow-md flex items-center justify-center"
              >
                Unlock
              </button>
            </div>
          </form>

          {/* Quick Helper Note */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <button
              onClick={() => setShowHint(!showHint)}
              className="inline-flex items-center space-x-1 text-[#064E3B] hover:underline font-semibold text-[11px]"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Default PIN' : 'Need Default PIN?'}</span>
            </button>

            <button
              onClick={onBackToSite}
              className="hover:text-gray-900 transition-colors text-[11px]"
            >
              Exit to Main Site
            </button>
          </div>

          {showHint && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#064E3B]" />
                <span>Default Director PIN: <strong className="text-base text-[#064E3B]">2019</strong></span>
              </div>
              <p className="text-[11px] text-emerald-700">
                (Company incorporation year: 2019. You can change this anytime inside the portal settings.)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
