export function PrettyObject({ children }: { children: unknown }) {
  return (
    <div className="flex leading-tight flex-col gap-2 whitespace-pre-wrap p-2 h-[800px] text-primary text-[11px]">
      {/* <p className="border-b text-center">Object</p> */}
      {JSON.stringify(children, null, "\t")}
    </div>
  );
}
