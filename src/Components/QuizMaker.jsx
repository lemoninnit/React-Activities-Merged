import { useState } from "react";

export default function QuizMaker({ onSaveQuiz }) {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(null);
  const [error, setError] = useState("");

  const resetForm = () => {
    setText("");
    setOptions(["", "", "", ""]);
    setCorrect(null);
    setError("");
  };

  const addQuestion = () => {
    if (!text.trim()) {
      setError("Enter a question.");
      return;
    }
    if (options.some((o) => !o.trim())) {
      setError("Fill all 4 options.");
      return;
    }
    if (correct === null) {
      setError("Select the correct option.");
      return;
    }
    const q = { text: text.trim(), options: options.map((o) => o.trim()), correct };
    setQuestions((prev) => [...prev, q]);
    resetForm();
  };

  const handleSave = () => {
    if (questions.length === 0) {
      setError("Add at least one question before saving.");
      return;
    }
    onSaveQuiz(questions);
  };

  const updateOption = (idx, value) => {
    setOptions((prev) => prev.map((o, i) => (i === idx ? value : o)));
  };

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
        .panel h2 {
          color: #fff;
          margin-bottom: 1rem;
          font-size: 1.8rem;
          font-weight: 600;
        }
        .form-group {
          margin-bottom: 1.25rem;
        }
        .form-group .text-input {
          width: 100%;
          box-sizing: border-box;
        }
        .form-group label {
          display: block;
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .text-input {
          width: 100%;
          padding: 0.8rem;
          border-radius: 12px;
          border: 2px solid #444;
          background: #1a1a2e;
          color: #ffffff;
          transition: all 0.2s ease;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .text-input::placeholder {
          color: #888;
        }
        .text-input:focus {
          outline: none;
          border-color: #f27121;
          background: #16213e;
        }
        .options {
          margin-bottom: 1rem;
        }
        .options > label {
          display: block;
          color: #ffffff;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .option-row { 
          display: flex; 
          align-items: center; 
          gap: 0.75rem; 
          margin-bottom: 0.75rem;
          background: #1a1a2e;
          border-radius: 12px;
          border: 2px solid #444;
          padding: 0.5rem;
          transition: all 0.2s;
          position: relative;
        }
        .option-row:hover {
          background: #16213e; 
          border-color: #f27121;
        }
        .option-row .text-input {
          flex: 1;
          padding-left: 2.5rem;
          background: transparent;
          border: none;
        }
        .option-row .text-input:focus {
          background: transparent;
          border: none;
        }
        .option-letter {
          position: absolute;
          left: 1rem;
          width: 28px;
          height: 28px;
          background: transparent;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          pointer-events: none;
          z-index: 1;
        }
        .radio {
          cursor: pointer;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          background: #0f3460;
          border: 1px solid #444;
          transition: all 0.3s ease;
          white-space: nowrap;
          color: white;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .radio:hover {
          background: #16213e;
          border-color: #f27121;
        }
        .radio input[type="radio"] {
          display: none;
        }
        .radio:has(input[type="radio"]:checked) {
          background: linear-gradient(135deg, #e94057, #f27121);
          border-color: #f27121;
          color: white;
          font-weight: 600;
        }
        .btn { 
          padding: 0.6rem 1rem; 
          border-radius: 12px; 
          border: 1px solid #444; 
          background: #0f3460; 
          color: white;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
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
        .actions { 
          display: flex; 
          gap: 0.75rem; 
          margin-top: 1.5rem; 
        }
        .error {
          color: #fff;
          background: rgba(233, 64, 87, 0.2);
          padding: 0.75rem 1rem;
          border-radius: 12px;
          border: 2px solid rgba(233, 64, 87, 0.4);
          margin: 1rem 0;
          font-size: 0.9rem;
        }
        .question-list { 
          list-style: none; 
          padding: 0;
          margin-top: 1.5rem;
        }
        .question-list li { 
          margin: 0.75rem 0; 
          padding: 0.75rem; 
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .question-list li:hover {
          background: rgba(255,255,255,0.1);
        }
        .question-list li strong {
          color: #fff;
          display: block;
          margin-bottom: 0.25rem;
        }
        .small { 
          color: #bbb; 
          font-size: 0.9rem; 
        }
        .muted {
          padding: 0.75rem 1rem;
          background: rgba(255,255,255,0.05);
          border-radius: 8px;
          margin-top: 1.5rem;
          color: #ffffff;
          font-size: 0.9rem;
        }
      `}</style>
      <h2>Quiz Maker</h2>

      <div className="form-group">
        <label>Question</label>
        <input
          type="text"
          placeholder="Enter question"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
        />
      </div>

      <div className="options">
        <label>Answer Options</label>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="option-row">
            <span className="option-letter">{String.fromCharCode(65 + i)}</span>
            <input
              type="text"
              placeholder={`Option ${i + 1}`}
              value={options[i]}
              onChange={(e) => updateOption(i, e.target.value)}
              className="text-input"
            />
            <label className="radio">
              <input
                type="radio"
                name="correct"
                checked={correct === i}
                onChange={() => setCorrect(i)}
              />
              Correct
            </label>
          </div>
        ))}
      </div>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button className="btn" onClick={addQuestion}>Add Question</button>
        <button className="btn primary" onClick={handleSave}>Save Quiz</button>
      </div>

      <p className="muted">Questions added: {questions.length}</p>

      {questions.length > 0 && (
        <ul className="question-list">
          {questions.map((q, idx) => (
            <li key={idx}>
              <strong>{idx + 1}. {q.text}</strong>
              <div className="small">Correct: {String.fromCharCode(65 + q.correct)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}