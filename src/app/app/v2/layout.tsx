export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-md mx-auto">
      {children}
    </section>
  );
} 