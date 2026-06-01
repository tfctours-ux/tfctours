// src/components/home/TrustBarSkeleton.tsx
export function TrustBarSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-accent px-6 py-14 text-accent-foreground md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 h-8 w-64 animate-pulse rounded-full bg-white/15 md:mb-12" />
        <div className="grid gap-px overflow-hidden md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse bg-white/[0.08] p-8 md:h-36"
            >
              <div className="mx-auto h-10 w-24 rounded-lg bg-white/15" />
              <div className="mx-auto mt-5 h-4 w-32 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
