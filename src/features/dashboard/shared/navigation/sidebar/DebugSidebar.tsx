export function DebugSidebar() {
  return (
    <div 
      className="fixed left-0 top-0 h-full w-64 bg-red-500 text-white p-4 z-[9999]" 
      style={{ border: '5px solid yellow' }}
    >
      <h2 className="text-2xl font-bold">Debug Sidebar</h2>
      <p className="mt-4">If you can see this, the sidebar is rendering</p>
    </div>
  );
} 