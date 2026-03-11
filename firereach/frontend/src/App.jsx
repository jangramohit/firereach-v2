import { useState } from 'react'
import axios from 'axios'
import { Rocket, Target, Zap, Mail, Loader2, Signal, ShieldCheck, Activity, Send } from 'lucide-react'

function App() {
  const [icp, setIcp] = useState('We sell high-end cybersecurity training to Series B startups')
  const [targetCompany, setTargetCompany] = useState('')
  const [targetEmail, setTargetEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  const runEngine = async () => {
    if (!icp.trim() || !targetCompany.trim()) {
       setError('Both ICP and Target Company are required.')
       return
    }
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const payload = { 
          icp: icp.trim(),
          target_company: targetCompany.trim()
      }
      if (targetEmail.trim()) {
        payload.target_email = targetEmail.trim()
      }
      const response = await axios.post('http://localhost:8000/run-outreach', payload)
      setResult(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to run the outreach engine')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden relative">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen animate-pulse duration-10000"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] mix-blend-screen animate-pulse duration-7000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl border border-white/10 shrink-0 group hover:border-indigo-500/50 transition-colors">
              <Rocket className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-indigo-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-tight">FireReach</h1>
              <p className="text-xs text-indigo-400/80 font-semibold tracking-widest uppercase">Autonomous Engine V2</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-slate-400">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> System Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Input Config */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
              Hyper-targeted <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
                outreach at scale.
              </span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">
              Define your ICP and target. FireReach agents autonomously harvest live signals, synthesize research briefs, and dispatch highly personalized emails.
            </p>
          </div>

          <div className="bg-white/[0.02] rounded-3xl p-8 border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="space-y-6 relative z-10">
              {/* ICP Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Target className="w-4 h-4 text-indigo-400" />
                  Ideal Customer Profile (ICP)
                </label>
                <textarea 
                  className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all resize-none shadow-inner text-sm leading-relaxed"
                  rows={3}
                  value={icp}
                  onChange={(e) => setIcp(e.target.value)}
                  placeholder="e.g. We sell compliance tracking software to FinTech startups in Europe..."
                ></textarea>
              </div>
              
              {/* Target Company */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Activity className="w-4 h-4 text-purple-400" />
                  Target Company <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all shadow-inner text-sm"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. SecureStack or Acme Corp"
                />
              </div>

              {/* Target Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <Mail className="w-4 h-4 text-pink-400" />
                  Test recipient (Optional)
                </label>
                <input 
                  type="email"
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all shadow-inner text-sm"
                  value={targetEmail}
                  onChange={(e) => setTargetEmail(e.target.value)}
                  placeholder="e.g. founder@startup.com"
                />
              </div>
              
              <button 
                onClick={runEngine}
                disabled={loading}
                className="w-full relative group/btn overflow-hidden rounded-2xl p-[1px] mt-4"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-70 group-hover/btn:opacity-100 blur transition-opacity duration-300"></span>
                <div className="relative bg-black/80 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center justify-center gap-3 hover:bg-black/60 transition-colors">
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                      <span className="font-bold text-white tracking-wide">Agents Deploying...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 text-white group-hover/btn:text-indigo-300 transition-colors" />
                      <span className="font-bold text-white tracking-wide">Ignite Engine</span>
                    </>
                  )}
                </div>
              </button>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3 backdrop-blur-md">
                  <div className="shrink-0 mt-0.5 font-bold">Error:</div>
                  <div className="whitespace-pre-wrap">{error}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Dashboard Feedback */}
        <div className="lg:col-span-7">
          <div className="bg-white/[0.01] rounded-3xl border border-white/5 p-2 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden backdrop-blur-sm">
            
            {/* Inner Content Area */}
            <div className="bg-black/40 rounded-[1.25rem] w-full h-full p-8 flex flex-col border border-white/[0.02]">
              
              {!result && !loading && (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-50">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border border-dashed border-slate-600 rounded-full animate-[spin_10s_linear_infinite]"></div>
                    <div className="absolute inset-2 border border-slate-700 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Signal className="w-8 h-8 text-slate-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-300 mb-2">Awaiting Parameters</h3>
                    <p className="text-slate-500 max-w-sm text-sm">Configure your target profile on the left to initiate the agentic workflow.</p>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-32 h-32 border border-indigo-500/20 rounded-full animate-ping"></div>
                    <div className="absolute w-24 h-24 border border-purple-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                    <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="text-center space-y-3">
                    <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse">Running Agent Swarm</p>
                    <div className="flex flex-col gap-2 text-sm text-slate-500">
                      <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div> Harvesting live signals</span>
                      <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse delay-75"></div> Synthesizing research</span>
                      <span className="flex items-center justify-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse delay-150"></div> Drafting personalization</span>
                    </div>
                  </div>
                </div>
              )}

              {result && result.companies_processed && !loading && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <div className="flex items-center justify-between border-b border-white/5 pb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">Mission Report</h3>
                      <p className="text-sm text-slate-400 mt-1">Autonomous targeting sequence complete.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                      <ShieldCheck className="w-4 h-4" />
                      Success
                    </div>
                  </div>

                  {result.companies_processed.map((processed, index) => (
                    <div key={index} className="space-y-8 relative group/card">
                      
                      {/* Step 1: Signals */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-blue-500/50 to-purple-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <div className="absolute left-[-0.35rem] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#030712] shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-1">Phase 1</h4>
                          <h3 className="text-xl font-bold text-white">Signal Harvest: {processed.company}</h3>
                        </div>
                        
                        <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-colors shadow-lg">
                          <ul className="space-y-3">
                            {processed.signals.map((sig, idx) => (
                              <li key={idx} className="flex gap-4 text-sm text-slate-300">
                                <span className="shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                                  <Signal className="w-3 h-3" />
                                </span>
                                <span className="leading-relaxed pt-0.5">{sig}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Step 2: Brief */}
                      <div className="relative pl-8">
                        <div className="absolute left-0 top-0 bottom-[-2rem] w-px bg-gradient-to-b from-purple-500/50 to-pink-500/50 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                        <div className="absolute left-[-0.35rem] top-1 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#030712] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-1">Phase 2</h4>
                          <h3 className="text-xl font-bold text-white">AI Analyst Brief</h3>
                        </div>
                        
                        <div className="bg-white/[0.02] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line relative z-10">
                            {processed.research_brief}
                          </p>
                        </div>
                      </div>

                      {/* Step 3: Outreach Status */}
                      <div className="relative pl-8">
                        <div className="absolute left-[-0.35rem] top-1 w-3 h-3 rounded-full bg-pink-500 border-2 border-[#030712] shadow-[0_0_10px_rgba(236,72,153,0.8)]"></div>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-pink-400 uppercase tracking-widest mb-1">Phase 3</h4>
                          <h3 className="text-xl font-bold text-white">Execution</h3>
                        </div>

                        <div className="bg-gradient-to-r from-pink-500/10 to-orange-500/10 border border-pink-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative overflow-hidden group/status">
                          <div className="absolute right-0 bottom-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl transform translate-x-10 translate-y-10 group-hover/status:bg-pink-500/20 transition-colors"></div>
                          
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center border border-pink-500/30 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                              <Send className="w-5 h-5 text-pink-400 ml-0.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Delivery Status</p>
                              <div className="flex items-center gap-3">
                                <p className="text-2xl font-black text-white capitalize">
                                  {processed.email_status}
                                </p>
                                {processed.email_status === 'sent' && (
                                  <div className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
