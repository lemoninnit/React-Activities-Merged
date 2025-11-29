import { useState } from "react";
import QuizMaker from "./QuizMaker.jsx";
import QuizTaker from "./QuizTaker.jsx";

export default function QuizApp() {
  const [view, setView] = useState("maker");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const handleSaveQuiz = (quiz) => {
    setQuestions(quiz);
    setAnswers([]);
    setView("taker");
  };

  const handleSubmitAnswers = (userAnswers) => {
    setAnswers(userAnswers);
    setView("summary");
  };

  const score = answers.reduce((acc, a, i) => (a === (questions[i]?.correct) ? acc + 1 : acc), 0);

  return (
    <div>
      <style>{`
        .header { text-align: center; margin-bottom: 1rem; }
        .header h1 { margin: 0 0 0.75rem; font-size: 2rem; color: var(--text); }
        .nav-tabs { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 1rem; }
        .tab { padding: 0.5rem 0.9rem; border-radius: 8px; border: 1px solid var(--border); background: var(--panel2); color: var(--text); }
        .tab:disabled { opacity: 0.5; cursor: not-allowed; }
        .header p { color: var(--muted); margin-top: 0.5rem; }
        .summary-list { list-style: none; padding: 0; }
        .summary-list li { margin: 0.5rem 0; padding: 1rem; background: var(--panel); border: 1px solid var(--border); border-radius: 8px; }
        .score-display { font-size: 1.8rem; font-weight: bold; color: var(--text); margin: 1rem 0; }
      `}</style>
      <header className="header">
        <h1>Collaborative Quiz Platform</h1>
        <nav className="nav-tabs">
          <button className={`tab ${view === "maker" ? "active" : ""}`} onClick={() => setView("maker")}>Create Quiz</button>
          <button className={`tab ${view === "taker" ? "active" : ""}`} onClick={() => setView("taker")} disabled={questions.length === 0}>Take Quiz</button>
          <button className={`tab ${view === "summary" ? "active" : ""}`} onClick={() => setView("summary")} disabled={answers.length === 0}>View Stats</button>
        </nav>
      </header>

      {view === "maker" && <QuizMaker onSaveQuiz={handleSaveQuiz} />}
      {view === "taker" && <QuizTaker questions={questions} onSubmitAnswers={handleSubmitAnswers} />}

      {view === "summary" && (
        <div className="panel">
          <h2>Quiz Summary</h2>
          {questions.length === 0 || answers.length === 0 ? (
            <p>No results yet. Submit answers first.</p>
          ) : (
            <div>
              <p className="score-display">Score: {score} / {questions.length}</p>
              <ul className="summary-list">
                {questions.map((q, i) => (
                  <li key={i}>
                    <strong>{q.text}</strong>
                    <div className="small">Your answer: {answers[i] !== null ? String.fromCharCode(65 + answers[i]) : "—"}</div>
                    <div className="small">Correct answer: {String.fromCharCode(65 + q.correct)}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
