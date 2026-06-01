// src/components/home/FAQSkeleton.tsx
export function FAQSkeleton() {
  return (
    <section aria-hidden="true" className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto mb-12 h-10 w-72 animate-pulse rounded-full bg-surface-muted" />
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-elevated/50">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <div className="flex h-14 items-center gap-4 px-6">
                <div className="h-7 w-7 animate-pulse rounded-full bg-surface-muted" />
                <div className="h-4 flex-1 animate-pulse rounded-full bg-surface-muted" />
                <div className="h-8 w-8 animate-pulse rounded-full bg-surface-muted" />
              </div>
              {index < 5 ? <div className="h-px bg-border" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
