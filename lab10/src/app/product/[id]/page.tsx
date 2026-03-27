// src/app/product/[id]/page.tsx
import { notFound } from 'next/navigation';
import StockCounter from '../../components/StockCounter';
// Імітація запиту до зовнішнього API
async function fetchProductData(id: string) {
  // Штучна затримка для симуляції мережі
  await new Promise(res => setTimeout(res, 500));
  
  if (id === '404') return null; // Симуляція відсутності товару
  
  return {
    id,
    title: `Product ${id} - Super Gadget`,
    description: 'This description is fully rendered on the server for SEO purposes.',
    stock: 5
  };
}

// Обов'язково вказуємо, що params - це Promise
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Розпаковуємо params за допомогою await
  const resolvedParams = await params;
  const product = await fetchProductData(resolvedParams.id);

  if (!product) {
    notFound(); 
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <StockCounter initialStock={product.stock} />
    </div>
  );
}