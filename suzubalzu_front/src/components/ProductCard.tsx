import type { Product } from '../data/dummyData';

interface Props {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected: boolean;
}

export default function ProductCard({ product, onSelect, isSelected }: Props) {
  return (
    <div
      onClick={() => onSelect(product)}
      style={{
        border: isSelected ? '2px solid #2e7d32' : '2px solid #c8e6c9',
        borderRadius: '10px',
        padding: '12px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#e8f5e9' : '#fff',
        minWidth: '120px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
        {product.aliases.join(' / ')}
      </div>
      <div style={{ fontWeight: 'bold', color: '#2e7d32' }}>
        {product.name}
      </div>
      <div style={{ fontSize: '12px', color: '#555' }}>{product.code}</div>
    </div>
  );
}