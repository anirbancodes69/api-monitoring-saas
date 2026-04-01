export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 bg-slate-800/20 border border-slate-700/30 rounded-xl">
      <p className="text-5xl mb-4">📡</p>
      <h3 className="text-lg font-semibold text-white mb-2">No Endpoints Yet</h3>
      <p className="text-slate-400 text-center text-sm max-w-sm">
        Add your first API endpoint using the form above to start monitoring.
      </p>
    </div>
  );
}
