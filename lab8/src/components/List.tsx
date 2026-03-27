import type { ReactNode } from 'react';

// Дженерік T гарантує, що будь-який переданий об'єкт матиме поле id
interface ListProps<T extends { id: string }> {
  items: T[];
  renderItem: (item: T) => ReactNode;
}

export const List = <T extends { id: string }>({ items, renderItem }: ListProps<T>) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item) => (
        <div key={item.id}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};