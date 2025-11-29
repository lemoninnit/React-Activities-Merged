import * as React from 'react';
import { useState } from 'react';


export default function QuizTaker({ questions = [], onSubmitAnswers }) {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectAnswer = (choiceIdx) => {
    if (isSubmitted) return;
    setAnswers((prev) => prev.map((a, i) => (i === currentIndex ? choiceIdx : a)));
  };

  const prev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const next = () => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));

  const handleSubmit = () => {
    setIsSubmitted(true);
    onSubmitAnswers(answers);
  };

  const score = answers.reduce((acc, a, i) => (a === questions[i].correct ? acc + 1 : acc), 0);

  if (!questions || questions.length === 0) {
    return <div className="panel"><p>No quiz available. Please create one.</p></div>;
  }

  const q = questions[currentIndex];

  return (
    <div className="panel">
      <style>{`
        .panel { 
          max-width: 720px; 
          margin: 0 auto; 
          text-align: left; 
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          border: 1px solid #444; 
          border-radius: 16px; 
          padding: 1.5rem; 
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .btn { 
          padding: 0.6rem 1rem; 
          border-radius: 12px; 
          border: 1px solid #444; 
          background: #0f3460; 
          color: white;
          transition: all 0.3s ease;
        }
        .btn.primary { 
          background: linear-gradient(135deg, #e94057, #f27121); 
          border-color: #f27121;
          font-weight: 600;
        }
        .btn:hover:not(:disabled) { 
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(233,64,87,0.4);
        }
        .btn:disabled { 
          opacity: 0.5; 
          cursor: not-allowed; 
        }
        .choices { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 0.75rem; 
          margin: 1rem 0; 
        }
        .choice { 
          text-align: left; 
          padding: 0.8rem; 
          border-radius: 12px; 
          border: 2px solid #444;
          background: #1a1a2e;
          transition: all 0.2s;
          color: #ffffff;
          font-size: 1.1rem;
        }
        .choice:hover { 
          background: #16213e; 
          border-color: #f27121;
        }
        .choice.selected { 
          outline: 3px solid #e94057; 
          background: rgba(233,64,87,0.2);
        }
        .nav { 
          display: flex; 
          gap: 0.75rem; 
          margin: 1rem 0;
        }
        .summary-list { 
          list-style: none; 
          padding: 0; 
        }
        .summary-list li { 
          margin: 0.75rem 0; 
          padding: 0.75rem; 
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
        }
        .small { 
          color: #bbb; 
          font-size: 0.9rem; 
        }
        .muted { 
          color: #777; 
        }
      `}</style>   
      <h2>Quiz Taker</h2>

      {!isSubmitted && (
        <div>
          <p className="muted">Question {currentIndex + 1} of {questions.length}</p>
          <h3>{q.text}</h3>
          <div className="choices">
            {q.options.map((opt, idx) => {
              const isSel = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  className={`choice ${isSel ? "selected" : ""}`}
                  onClick={() => selectAnswer(idx)}
                >
                  {String.fromCharCode(65 + idx)} — {opt}
                </button>
              );
            })}
          </div>
          <div className="nav">
            <button className="btn" onClick={prev} disabled={currentIndex === 0}>Previous</button>
            <button className="btn" onClick={next} disabled={currentIndex === questions.length - 1}>Next</button>
          </div>
          <div className="actions">
            <button className="btn primary" onClick={handleSubmit} disabled={answers.some((a) => a === null)}>Submit</button>
          </div>
        </div>
      )}

      {isSubmitted && (
        <div>
          <h3>Summary</h3>
          <p>Score: {score} / {questions.length}</p>
          <ul className="summary-list">
            {questions.map((qq, i) => (
              <li key={i}>
                <strong>{qq.text}</strong>
                <div className="small">Your answer: {answers[i] !== null ? String.fromCharCode(65 + answers[i]) : "—"}</div>
                <div className="small">Correct answer: {String.fromCharCode(65 + qq.correct)}</div>
              </li>
            ))}
          </ul>
          <p className="muted">Answers submitted. Use "View Stats" to review.</p>
        </div>
      )}
    </div>
  );
}

// Test usage
// <QuizTaker questions={dummyQuestions} onSubmitAnswers={console.log} />   