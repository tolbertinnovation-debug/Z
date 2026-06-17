export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
      {/* Logo */}
      <div className="flex items-center gap-3 animate-pulse">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-200">
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l9-5-9-5-9 5 9 5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
            />
          </svg>
        </div>
        <div>
          <p className="font-bold text-slate-900 text-sm leading-tight">Tolbert Innovation Hub</p>
          <p className="text-xs text-blue-600">Study Abroad Portal</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-[loading_1.5s_ease-in-out_infinite]"
          style={{ width: "60%" }}
        />
      </div>
      <p className="text-xs text-slate-400">Loading...</p>
    </div>
  );
}
