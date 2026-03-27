// src/app/status/page.tsx
import { headers } from 'next/headers';

// Це Server Component. Він виконується ТІЛЬКИ на сервері.
export default async function StatusPage() {
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || 'Unknown';
  
  // Час генерується на сервері під час запиту
  const serverTime = new Date().toISOString();

  return (
    <div style={{ padding: '20px' }}>
      <h1>System Status (SSR)</h1>
      <p><strong>Server Time:</strong> {serverTime}</p>
      <p><strong>User Agent:</strong> {userAgent}</p>
      <hr />
      <p><em>Theory Application:</em> Оскільки це Server Component в App Router, ці дані генеруються на сервері при кожному запиті. Якщо ти натиснеш "View Source" у браузері, ти побачиш цей час прямо в HTML коді.</p>
    </div>
  );
}