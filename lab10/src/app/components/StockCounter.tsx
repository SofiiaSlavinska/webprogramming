// src/components/StockCounter.tsx
'use client'; // Ця директива каже Next.js відправити JS в браузер для гідратації

import { useState, useEffect } from 'react';

export default function StockCounter({ initialStock }: { initialStock: number }) {
  const [stock, setStock] = useState(initialStock);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Цей код виконається ТІЛЬКИ після того, як React завантажиться в браузері
    setIsHydrated(true);
    
    // Observation (Task 3): Якщо спробувати викликати window.localStorage 
    // поза useEffect (під час SSR рендерингу), сервер видасть помилку "window is not defined".
  }, []);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <p><strong>Live Stock Level:</strong> {stock}</p>
      <button 
        // Кнопка неактивна, поки не пройде гідратація (JS не завантажиться)
        disabled={!isHydrated || stock === 0} 
        onClick={() => setStock(s => s - 1)}
      >
        {isHydrated ? 'Add to Cart' : 'Loading interactive features...'}
      </button>
    </div>
  );
}