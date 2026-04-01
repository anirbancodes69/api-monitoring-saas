export function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="relative w-14 h-14">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-400 border-r-cyan-400 animate-spin"></div>
            
            {/* Middle rotating ring (slower) */}
            <div className="absolute inset-2 rounded-full border-3 border-transparent border-b-emerald-400 border-l-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
            
            {/* Center pulse */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 animate-pulse"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">Loading Dashboard</h2>
        <p className="text-slate-400 text-sm">Fetching your API endpoints...</p>
      </div>
    </div>
  );
}
