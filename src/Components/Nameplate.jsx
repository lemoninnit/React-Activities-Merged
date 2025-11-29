import * as React from 'react';
import { useState } from 'react';

function Nameplate(props) {
  const plateStyle = {
    backgroundColor: 'var(--panel)',
    border: '1px solid var(--border)',
    borderRadius: '12px',
    padding: '16px',
    width: '320px',
    margin: '8px',
    color: 'var(--text)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.25)'
  };

  const accentStyle = {
    height: '6px',
    borderRadius: '8px',
    backgroundColor: props.bgc || 'var(--panel2)',
    marginBottom: '12px'
  };

  const nameStyle = {
    margin: 0,
    fontSize: '1.2rem',
    fontWeight: 700,
    textAlign: 'center'
  };

  const metaStyle = {
    margin: '8px 0 0',
    color: 'var(--muted)',
    textAlign: 'center',
    fontSize: '0.95rem'
  };

  const counterBtnStyle = {
    marginTop: '12px',
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    backgroundImage: 'linear-gradient(135deg, var(--accent), var(--accent2))',
    color: '#fff',
    fontWeight: 600,
    cursor: 'pointer'
  };

  const [count, setCount] = useState(0);
  return (
    <div style={plateStyle}>
      <div style={accentStyle} />
      <h3 style={nameStyle}>{props.platename}</h3>
      <p style={metaStyle}>{props.course}{props.year ? ` • Year ${props.year}` : ''}</p>
      <button
        style={counterBtnStyle}
        onClick={() => setCount(count + 1)}
      >
        {count}
      </button>
    </div>
  );
}

export default Nameplate;
