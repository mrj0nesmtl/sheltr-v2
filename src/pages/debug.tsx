export function DebugPage() {
  return (
    <div>
      <h1>Debug Meta Tags</h1>
      <pre>
        {JSON.stringify({
          image: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
          description: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
          title: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
        }, null, 2)}
      </pre>
    </div>
  );
} 