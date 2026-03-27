// src/app/search/page.tsx
import Link from 'next/link';

// Mock база даних
const database = ['React Native Book', 'Next.js Guide', 'TypeScript Handbook', 'Server-Side Rendering Basics'];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  // Читаємо параметр ?q= з URL на сервері
  const query = searchParams.q || '';
  
  // Фільтруємо дані на сервері
  const results = query 
    ? database.filter(item => item.toLowerCase().includes(query.toLowerCase()))
    : database;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Results</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p>Try clicking these links to test server-side URL parameters:</p>
        <ul>
          <li><Link href="/search?q=React">Search for "React"</Link></li>
          <li><Link href="/search?q=Next">Search for "Next"</Link></li>
          <li><Link href="/search">Clear Search</Link></li>
        </ul>
      </div>

      <p><strong>Showing results for:</strong> "{query}"</p>
      
      <ul style={{ background: '#f5f5f5', padding: '20px' }}>
        {results.length > 0 ? (
          results.map(item => <li key={item}>{item}</li>)
        ) : (
          <li>No results found.</li>
        )}
      </ul>
      <p><em>Якщо ти оновиш цю сторінку (F5), результати залишаться незмінними, оскільки стан керується URL-адресою і рендериться на сервері.</em></p>
    </div>
  );
}