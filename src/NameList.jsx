import { useState } from 'react';
import Nameplate from './Components/Nameplate.jsx';
import Natividad from './Natividad.jsx';
import Shopping from './Shopping.jsx';
import QuizApp from './Components/QuizApp.jsx';
import CashierQueue from './CashierQueue.jsx';

export default function NameList() {
  const [navOpen, setNavOpen] = useState(false);
  const [activeView, setActiveView] = useState('names');

  const list = [
    { id: 1, studentName: 'Lenon Lee Natividad', course: 'BSIT', year: '3', bgc: '#0f3460' },
    { id: 2, studentName: 'Sakai Moka', course: 'ILLIT', year: '2', bgc: '#5942dfff' },
    { id: 3, studentName: 'Park Minju', course: 'ILLIT', year: '2', bgc: '#16213e' },
    { id: 4, studentName: 'Kang Haerin', course: 'NewJeans', year: '3', bgc: '#3a71b4ff' },
  ];

  const listOfNames = list.map(item => (
    <Nameplate
      key={item.id}
      platename={item.studentName}
      course={item.course}
      year={item.year}
      bgc={item.bgc}
    />
  ));

  const [studentIndex, setStudent] = useState(0);

  const navItems = [
    { id: 'names', label: 'Names List' },
    { id: 'todo', label: 'Todo List' },
    { id: 'shopping', label: 'Shopping Catalog' },
    { id: 'quiz', label: 'Quiz Platform' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'cashier', label: 'Cashier' }
  ];

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '12px',
    padding: '16px 20px',
    background: 'var(--panel)',
    borderBottom: '1px solid var(--border)'
  };

  const titleStyle = { fontSize: '1.25rem', color: 'var(--text)', fontWeight: 600 };

  const menuButtonStyle = {
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--panel)',
    color: 'var(--text)',
    cursor: 'pointer'
  };

  const containerStyle = { padding: '20px', color: 'var(--text)' };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.4)',
    display: navOpen ? 'block' : 'none'
  };

  const sidenavStyle = {
    position: 'fixed',
    top: 0,
    left: navOpen ? 0 : '-280px',
    width: '280px',
    height: '100vh',
    background: 'var(--panel)',
    borderRight: '1px solid var(--border)',
    boxShadow: '4px 0 16px rgba(0,0,0,0.25)',
    transition: 'left 0.25s ease'
  };

  const sidenavHeaderStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid var(--border)',
    color: 'var(--text)',
    fontWeight: 600
  };

  const navListStyle = { listStyle: 'none', padding: 0, margin: 0 };

  const navItemStyle = (isActive) => ({
    padding: '12px 20px',
    cursor: 'pointer',
    color: 'var(--text)',
    background: isActive ? 'var(--panel2)' : 'transparent',
    borderBottom: '1px solid var(--border)'
  });

  const footerStyle = {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: '12px 20px',
    borderTop: '1px solid var(--border)',
    color: 'var(--muted)'
  };

  const headerTitleMap = {
    names: 'Names List',
    todo: 'Todo List',
    shopping: 'Shopping Catalog',
    quiz: 'Quiz Platform',
    calculator: 'Calculator',
    cashier: 'Cashier System'
  };

  const viewContainerStyle = {
    transition: 'opacity 0.25s ease, transform 0.25s ease',
    opacity: 1,
    transform: 'none'
  };

  function CalculatorView() {
    const [err, setErr] = useState(false);
    const frameStyle = {
      width: '100%',
      height: '560px',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      background: 'var(--panel)'
    };
    return (
      <div style={viewContainerStyle}>
        {err ? (
          <div style={{ padding: '16px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '12px' }}>
            Failed to load calculator. Please refresh or try again.
          </div>
        ) : (
          <iframe
            title="Calculator"
            src="/calculator.html"
            style={frameStyle}
            onError={() => setErr(true)}
          />
        )}
      </div>
    );
  }

  const namesWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start'
  };

  return (
    <div>
      <header style={headerStyle}>
        <button style={menuButtonStyle} onClick={() => setNavOpen(true)}>Open Menu</button>
        <div style={titleStyle}>{headerTitleMap[activeView]}</div>
      </header>

      <div style={containerStyle}>
        {activeView === 'names' && (
          <div>
            <h1 style={{ marginBottom: '12px', textAlign: 'center' }}>List of Students</h1>
            <div style={namesWrapperStyle}>{listOfNames[studentIndex]}</div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button
                disabled={studentIndex === 0}
                onClick={() => setStudent(studentIndex - 1)}
                style={menuButtonStyle}
              >Previous</button>
              <button
                disabled={studentIndex === list.length - 1}
                onClick={() => setStudent(studentIndex + 1)}
                style={menuButtonStyle}
              >Next</button>
            </div>
          </div>
        )}

        {activeView === 'todo' && <Natividad />}
        {activeView === 'shopping' && <Shopping />}
        {activeView === 'quiz' && <QuizApp />}
        {activeView === 'calculator' && <CalculatorView />}
        {activeView === 'cashier' && (
          <div style={viewContainerStyle}>
            <CashierQueue />
          </div>
        )}
        {!headerTitleMap[activeView] && (
          <div style={{ padding: '16px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: '12px' }}>
            Unknown view. Returning to Names List.
            <div style={{ marginTop: '8px' }}>
              <button style={menuButtonStyle} onClick={() => setActiveView('names')}>Go to Names</button>
            </div>
          </div>
        )}
      </div>

      <div style={overlayStyle} onClick={() => setNavOpen(false)} />
      <aside style={sidenavStyle}>
        <div style={sidenavHeaderStyle}>Navigation</div>
        <ul style={navListStyle}>
          {navItems.map((item) => (
            <li
              key={item.id}
              style={navItemStyle(activeView === item.id)}
              onClick={() => {
                setActiveView(item.id);
                setNavOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
        <div style={footerStyle}>Theme: Dark • Accent: Coral → Tangerine</div>
      </aside>
    </div>
  );
}
