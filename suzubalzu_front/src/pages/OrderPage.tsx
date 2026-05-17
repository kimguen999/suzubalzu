import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { products, customers } from '../data/dummyData';
import type { Product } from '../data/dummyData';
import ProductCard from '../components/ProductCard';
import OrderItem from '../components/OrderItem';
import type { OrderItemData } from '../components/OrderItem';

export default function OrderPage() {
  const { customerId } = useParams<{ customerId: string }>();
  const customer = customers.find(c => c.id === customerId);

  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [orderItems, setOrderItems] = useState<OrderItemData[]>([]);

  const favoriteProducts = products
  .filter(p => customer?.favoriteProductIds.includes(p.id))
  .sort((a, b) => a.id - b.id);

  const otherProducts = [...products].sort((a, b) => a.id - b.id);

  const filteredProducts = useMemo(() => {
    if (!search) return [];
    const keyword = search.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.code.toLowerCase().includes(keyword) ||
      p.aliases.some(a => a.toLowerCase().includes(keyword))
    );
  }, [search]);

  const handleSelectProduct = (product: Product) => {
    setOrderItems(prev => [...prev, {
      id: Date.now(),
      product,
      width: '',
      length: '',
      quantity: '',
      delivery: '',
    }]);
  };

  const handleChange = (index: number, field: string, value: string) => {
    setOrderItems(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleRemove = (index: number) => {
    setOrderItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log('주문 데이터:', orderItems);
    alert('주문이 접수되었습니다!');
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    width: '100%',
  };

  return (
    <div style={{ width: '720px', margin: '0 auto', padding: '24px', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>

      {/* 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#2e7d32', margin: 0 }}>🌿 드림컴퍼니 주문</h2>
        <p style={{ color: '#888', margin: '4px 0 0' }}>{customer?.name ?? '고객사'}</p>
      </div>

      {/* 검색창 */}
      <input
        type="text"
        placeholder="🔍 원단 검색 (이름, 코드, 은어 모두 가능)"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          border: '2px solid #a5d6a7',
          borderRadius: '10px',
          fontSize: '15px',
          marginBottom: '20px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
      />

      {/* 자주 검색되는 키워드 */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          onClick={() => setSearch('')}
          style={{
            padding: '6px 14px',
            border: '1px solid #e0e0e0',
            borderRadius: '20px',
            background: search === '' ? '#e0e0e0' : 'white',
            color: '#888',
            cursor: 'pointer',
            fontSize: '13px',
          }}
        >
          검색초기화
        </button>
        {['나일론', 'PET', 'PP', 'OPP', 'CPP'].map(keyword => (
          <button
            key={keyword}
            onClick={() => setSearch(keyword)}
            style={{
              padding: '6px 14px',
              border: '1px solid #a5d6a7',
              borderRadius: '20px',
              background: search === keyword ? '#2e7d32' : 'white',
              color: search === keyword ? 'white' : '#388e3c',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            {keyword}
          </button>
        ))}
      </div>

      {/* 검색 결과 */}
      {search && (
        <div style={{ marginBottom: '20px' }}>
          <div style={sectionTitleStyle}>🔎 검색 결과</div>
          <div style={gridStyle}>
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={handleSelectProduct}
                isSelected={orderItems.some(o => o.product?.id === p.id)}
              />
            ))}
            {filteredProducts.length === 0 && (
              <p style={{ color: '#aaa', gridColumn: '1/-1' }}>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      )}

      {/* 자주 쓰는 원단 */}
      {!search && (
        <div style={{ marginBottom: '8px' }}>
          <div style={sectionTitleStyle}>⭐ 자주 쓰는 원단</div>
          <div style={gridStyle}>
            {favoriteProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={handleSelectProduct}
                isSelected={orderItems.some(o => o.product?.id === p.id)}
              />
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div style={{ textAlign: 'center', margin: '14px 0' }}>
            <button
              onClick={() => setShowAll(prev => !prev)}
              style={{
                padding: '8px 24px',
                border: '1px solid #a5d6a7',
                borderRadius: '20px',
                background: 'white',
                color: '#388e3c',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {showAll ? '접기 ▲' : '더보기 ▼'}
            </button>
          </div>

          {/* 전체 원단 */}
          {showAll && (
            <div style={{ marginTop: '4px' }}>
              <div style={sectionTitleStyle}>📦 전체 원단</div>
              <div style={gridStyle}>
                {otherProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={handleSelectProduct}
                    isSelected={orderItems.some(o => o.product?.id === p.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 주문 목록 */}
      {orderItems.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={sectionTitleStyle}>📋 주문 목록</div>
          {orderItems.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              index={index}
              onChange={handleChange}
              onRemove={handleRemove}
            />
          ))}
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#2e7d32',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            주문 접수 ✅
          </button>
        </div>
      )}
    </div>
  );
}

const sectionTitleStyle: React.CSSProperties = {
  fontWeight: 'bold',
  color: '#388e3c',
  marginBottom: '10px',
  fontSize: '15px',
};