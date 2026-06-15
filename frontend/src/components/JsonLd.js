// Server component that renders a JSON-LD <script> directly into the SSR HTML.
// Rendering it server-side (rather than via next/script in a client component)
// guarantees Google sees the structured data on first crawl, without JS.
export default function JsonLd({ data }) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
