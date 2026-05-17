import type { Product } from '../data/dummyData';

interface OrderItemData {
  id: number;
  product: Product | null;
  width: string;
  length: string;
  quantity: string;
  delivery: string;
}

interface Props {
  item: OrderItemData;
  index: number;
  onChange: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
}

const WIDTH_OPTIONS = ['1000', '1600'];
const LENGTH_OPTIONS = ['500', '1000'];
const QTY_OPTIONS = ['1', '2', '3', '4', '5'];

function SelectOrInput({
  options,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  suffix: string;
}) {
  const isCustom = value !== '' && !options.includes(value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <select
        value={isCustom ? '__custom__' : value}
        onChange={e => {
          if (e.target.value !== '__custom__') onChange(e.target.value);
          else onChange('');
        }}
        style={selectStyle}
      >
        <option value="">선택</option>
        {options.map(o => (
          <option key={o} value={o}>{o}{suffix}</option>
        ))}
        <option value="__custom__">직접입력</option>
      </select>
      {(isCustom || (!options.includes(value) && value === '')) && (
        <input
          type="number"
          placeholder={placeholder}
          value={isCustom ? value : ''}
          onChange={e => onChange(e.target.value)}
          style={inputStyle}
        />
      )}
    </div>
  );
}

export type { OrderItemData };

export default function OrderItem({ item, index, onChange, onRemove }: Props) {
  return (
    <div style={{
      border: '1px solid #c8e6c9',
      borderRadius: '10px',
      padding: '16px',
      marginBottom: '12px',
      backgroundColor: '#f9fbe7',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <strong style={{ color: '#2e7d32' }}>
          {item.product ? item.product.name : '제품을 선택하세요'}
        </strong>
        <button
          onClick={() => onRemove(index)}
          style={{ background: 'none', border: 'none', color: '#e53935', cursor: 'pointer', fontSize: '16px' }}
        >✕</button>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div>
          <label style={labelStyle}>폭 (mm)</label>
          <SelectOrInput
            options={WIDTH_OPTIONS}
            value={item.width}
            onChange={v => onChange(index, 'width', v)}
            placeholder="직접입력 (mm)"
            suffix="mm"
          />
        </div>
        <div>
          <label style={labelStyle}>길이 (m)</label>
          <SelectOrInput
            options={LENGTH_OPTIONS}
            value={item.length}
            onChange={v => onChange(index, 'length', v)}
            placeholder="직접입력 (m)"
            suffix="m"
          />
        </div>
        <div>
          <label style={labelStyle}>개수 (ea)</label>
          <SelectOrInput
            options={QTY_OPTIONS}
            value={item.quantity}
            onChange={v => onChange(index, 'quantity', v)}
            placeholder="직접입력"
            suffix="ea"
          />
        </div>
        <div style={{ flex: 1, minWidth: '140px' }}>
          <label style={labelStyle}>납품처</label>
          <input
            type="text"
            placeholder="미입력시 주문처와 동일"
            value={item.delivery}
            onChange={e => onChange(index, 'delivery', e.target.value)}
            style={{ ...inputStyle, width: '100%', boxSizing: 'border-box' }}
          />
        </div>
      </div>
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #a5d6a7',
  borderRadius: '6px',
  width: '120px',
  outline: 'none',
  backgroundColor: 'white',
};

const inputStyle: React.CSSProperties = {
  padding: '8px',
  border: '1px solid #a5d6a7',
  borderRadius: '6px',
  width: '120px',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#666',
  display: 'block',
  marginBottom: '4px',
};