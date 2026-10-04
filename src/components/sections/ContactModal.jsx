import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from '../common/Icons';
import { submitToGoogleSheet } from '../../utils/submitToGoogleSheet';
import { GOOGLE_SHEETS_URL } from '../../config/sheetConfig';

const ContactModal = ({ isOpen, onClose }) => {
  const [topic, setTopic] = useState('Business Automation');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Status: 'idle' | 'success' | 'unconfigured' | 'error'
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [lastSubmission, setLastSubmission] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleModalClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitStatus]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // 1. Name validation (Required)
    if (!trimmedName) {
      errs.name = 'Please provide your name or company.';
    } else if (trimmedName.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    // 2. Email validation (Required & must contain '@' and domain)
    if (!trimmedEmail) {
      errs.email = 'Please provide your work email.';
    } else if (!trimmedEmail.includes('@')) {
      errs.email = 'Email address must contain "@" (e.g. name@company.com).';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      errs.email = 'Please enter a valid work email (e.g. name@company.com).';
    }

    // 3. Topic validation (Required)
    if (!topic || !topic.trim()) {
      errs.topic = 'Please select your primary interest.';
    }

    // 4. Bottleneck / Message validation (All fields required)
    if (!trimmedMessage) {
      errs.message = 'Please describe your current bottleneck or requirements.';
    } else if (trimmedMessage.length < 5) {
      errs.message = 'Please provide at least 5 characters describing your bottleneck.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };


  const handleEmailFallback = () => {
    const mailtoUrl = `mailto:grovixoffical@gmail.com?subject=${encodeURIComponent(
      `Grovix Inquiry: ${topic}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nProject Details:\n${message}`
    )}`;
    window.location.href = mailtoUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check if Google Sheet URL is configured
    const isConfigured = Boolean(GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL.trim() !== '');

    if (!isConfigured) {
      setSubmitStatus('unconfigured');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      const response = await submitToGoogleSheet({
        name,
        email,
        topic,
        message,
      });

      setIsSubmitting(false);

      if (response.success) {
        setLastSubmission({
          name,
          email,
          topic,
          message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setStatusMessage(
          response.message || 'Unable to sync with Google Sheet. Please check connection or use email fallback.'
        );
      }
    } catch (err) {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setStatusMessage('Unexpected error submitting form. You can send your brief via direct email.');
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setTopic('Business Automation');
    setErrors({});
    setSubmitStatus('idle');
    setStatusMessage('');
  };

  const handleModalClose = () => {
    if (submitStatus === 'success') {
      handleReset();
    }
    onClose();
  };

  return (
    <div
      onClick={handleModalClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#111418]/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E5E1D8] p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        <button
          onClick={handleModalClose}
          className="absolute top-5 right-5 p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitStatus === 'idle' || submitStatus === 'error' ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#2F4FD2]">
                / LET'S TALK
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Google Sheet Synced
              </span>
            </div>

            <h3 className="text-2xl font-bold text-[#111418] tracking-tight font-heading mb-2">
              Automate your business workflows.
            </h3>
            <p className="text-sm text-slate-500 font-body mb-6">
              Fill in your project brief. Submissions are instantly stored in our operations sheet and reviewed within one business day.
            </p>

            {submitStatus === 'error' && (
              <div className="mb-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-body flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{statusMessage || 'Could not connect to Google Sheet.'}</p>
                  <p className="mt-1 text-amber-700">
                    You can retry or{' '}
                    <button
                      type="button"
                      onClick={handleEmailFallback}
                      className="underline font-semibold hover:text-amber-950 cursor-pointer"
                    >
                      send directly via email
                    </button>
                    .
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>
                    Primary Interest <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    if (errors.topic) setErrors((prev) => ({ ...prev, topic: null }));
                  }}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-[#111418] focus:outline-none focus:border-[#2F4FD2] focus:ring-1 focus:ring-[#2F4FD2]/20 disabled:opacity-60"
                >
                  <option value="Business Automation">Business Automation</option>
                  <option value="WhatsApp Automation">WhatsApp Automation</option>
                  <option value="AI Automation & OCR">AI Automation &amp; Document OCR</option>
                  <option value="ERP & CRM Software">Custom ERP &amp; CRM Software</option>
                  <option value="SAP & API Integrations">SAP &amp; API Integrations</option>
                  <option value="Custom Web / Mobile Application">Custom Web or Mobile Application</option>
                </select>
                {errors.topic && (
                  <p className="text-xs text-red-500 font-mono mt-1">{errors.topic}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>
                    Your Name / Company <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma • Apex Engineering"
                  value={name}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  } text-sm text-[#111418] focus:outline-none focus:border-[#2F4FD2] focus:ring-1 focus:ring-[#2F4FD2]/20 disabled:opacity-60`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 font-mono mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>
                    Work Email <span className="text-red-500">*</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 lowercase">must include @</span>
                </label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((prev) => ({ ...prev, email: null }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  } text-sm text-[#111418] focus:outline-none focus:border-[#2F4FD2] focus:ring-1 focus:ring-[#2F4FD2]/20 disabled:opacity-60`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 font-mono mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>
                    Describe Your Current Bottleneck <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Describe what takes the most manual effort in your day-to-day operations..."
                  value={message}
                  disabled={isSubmitting}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: null }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border ${
                    errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                  } text-sm text-[#111418] focus:outline-none focus:border-[#2F4FD2] focus:ring-1 focus:ring-[#2F4FD2]/20 resize-none disabled:opacity-60`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 font-mono mt-1">{errors.message}</p>
                )}
              </div>


              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#111418] hover:bg-[#1C2026] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-[0.98] cursor-pointer mt-2 disabled:opacity-85"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 text-[#2F4FD2]" />
                    <span>Recording to Google Sheets...</span>
                  </>
                ) : (
                  <>
                    <span>Send to Engineering</span>
                    <Send className="w-4 h-4 text-[#2F4FD2]" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : submitStatus === 'unconfigured' ? (
          /* Notice shown if user clicks submit before providing their Google Sheets Web App URL */
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-amber-600 block">
              / GOOGLE SHEETS SETUP PENDING
            </span>

            <h4 className="text-xl font-bold text-[#111418] font-heading">
              Ready to connect your spreadsheet
            </h4>

            <p className="text-sm text-slate-600 font-body max-w-sm mx-auto leading-relaxed">
              The Google Sheets integration is built in! To start recording responses directly, add your Apps Script URL to <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-[#2F4FD2]">.env</code> or <code className="px-1.5 py-0.5 rounded bg-slate-100 font-mono text-xs text-[#2F4FD2]">sheetConfig.js</code>.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs font-mono text-slate-600 space-y-1">
              <p className="font-semibold text-slate-800">Quick Guide:</p>
              <p>1. Open Google Sheet &gt; Extensions &gt; Apps Script</p>
              <p>2. Paste code from <span className="text-[#2F4FD2]">GOOGLE_SHEETS_SETUP.md</span></p>
              <p>3. Deploy as Web App &amp; paste URL in <span className="text-[#2F4FD2]">.env</span></p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                onClick={handleEmailFallback}
                className="flex-1 py-3 px-4 rounded-xl bg-[#2F4FD2] hover:bg-[#233FA8] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send via Email Now</span>
              </button>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-semibold text-slate-700 uppercase cursor-pointer"
              >
                Back to Form
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#EEF2FF] border border-[#D1DDFF] flex items-center justify-center text-[#2F4FD2] mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#2F4FD2] block">
              / INQUIRY LOGGED TO SHEET
            </span>

            <h4 className="text-2xl font-bold text-[#111418] font-heading">
              Inquiry recorded successfully
            </h4>

            <p className="text-sm text-slate-600 font-body max-w-sm mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-[#111418]">{lastSubmission?.name || name}</span>. Your brief has been synced with our operations spreadsheet. Our engineering team reviews all briefs within one business day.
            </p>

            {lastSubmission && (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs font-mono space-y-1.5 max-w-sm mx-auto">
                <div className="flex justify-between text-slate-500">
                  <span>Topic:</span>
                  <span className="font-semibold text-slate-800">{lastSubmission.topic}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Contact:</span>
                  <span className="font-semibold text-slate-800">{lastSubmission.email}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Time Logged:</span>
                  <span className="text-emerald-700 font-semibold">{lastSubmission.timestamp}</span>
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row gap-2.5 justify-center">
              <button
                onClick={handleModalClose}
                className="px-6 py-3 rounded-xl bg-[#111418] hover:bg-[#1C2026] text-xs font-mono font-bold text-white uppercase active:scale-[0.98] cursor-pointer"
              >
                Done &amp; Close
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-semibold text-slate-700 uppercase active:scale-[0.98] cursor-pointer"
              >
                Send Another Brief
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={handleEmailFallback}
                className="text-[11px] font-mono text-slate-400 hover:text-slate-600 underline cursor-pointer"
              >
                Want to open an email draft too?
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
