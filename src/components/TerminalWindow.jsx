function TerminalWindow(props) {
  return (
    <div className="mx-2 rounded-lg border-2 border-white/20 overflow-hidden">
      <div className="flex gap-2 p-3 bg-white/10 items-center">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
        <div className="ml-2 font-mono text-sm text-white/60">{props.title}</div>
      </div>
      <div className="p-6 font-mono text-white">{props.children}</div>
    </div>
  );
}

export default TerminalWindow;
