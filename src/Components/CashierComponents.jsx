import React from "react";

// Shared button style
const buttonStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid var(--border)",
  background: "linear-gradient(135deg, var(--accent), var(--accent2))",
  color: "white",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
  transition: "transform 0.2s ease",
};

// Left Control Panel
export function ControlPanel({ onAddCustomer, onAssignCustomer, onAssignAll }) {
  return (
    <div
      style={{
        background: "var(--panel)",
        padding: "24px",
        borderRadius: "16px",
        width: "280px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        color: "var(--text)",
        border: "1px solid var(--border)",
      }}
    >
      <h2
        style={{
          fontSize: "22px",
          fontWeight: "700",
          marginBottom: "16px",
          textAlign: "center",
        }}
      >
        Cashier Queue
      </h2>

      <button
        style={{ ...buttonStyle, marginBottom: "14px" }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        onClick={onAddCustomer}
      >
        Add Customer
      </button>

      <button
        style={{ ...buttonStyle, marginBottom: "14px" }}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        onClick={onAssignCustomer}
      >
        Assign Customer
      </button>

      <button
        style={buttonStyle}
        onMouseEnter={(e) => (e.target.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
        onClick={onAssignAll}
      >
        Assign All Customer
      </button>
    </div>
  );
}

// Waiting Queue (middle)
export function WaitingQueue({ queue }) {
  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        padding: "20px",
        borderRadius: "14px",
        width: "280px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        color: "var(--text)",
      }}
    >
      <h3
        style={{
          fontSize: "18px",
          fontWeight: "700",
          marginBottom: "12px",
          textAlign: "center",
          color: "var(--text)",
        }}
      >
        Waiting Queue
      </h3>

      {queue.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--muted)" }}>
          No customers waiting.
        </p>
      ) : (
        queue.map((c) => (
          <div
            key={c.id}
            style={{
              backgroundColor:
                c.type === "Priority" ? "rgba(233,64,87,0.25)" : "rgba(50,150,250,0.2)",
              marginBottom: "8px",
              padding: "8px",
              borderRadius: "8px",
              borderLeft: `5px solid ${
                c.type === "Priority" ? "var(--accent)" : "var(--accent2)"
              }`,
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{c.name}</span>
            <span style={{ fontSize: "13px", color: "var(--muted)" }}>
              {c.serviceTime}s
            </span>
          </div>
        ))
      )}
    </div>
  );
}

// Cashier Card (right)
export function CashierCard({ title, serving, queue, remaining }) {
  return (
    <div
      style={{
        backgroundColor: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "18px",
        minWidth: "240px",
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
        color: "var(--text)",
      }}
    >
      <h4
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "var(--text)",
          marginBottom: "10px",
        }}
      >
        {title}
      </h4>

      {serving ? (
        <div
          style={{
            backgroundColor: "var(--panel2)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "12px",
          }}
        >
          <div style={{ fontWeight: "700" }}>{serving.name}</div>
          <div style={{ fontSize: "13px", color: "var(--muted)" }}>
            {serving.type} — {remaining}s left
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px dashed var(--border)",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "12px",
            color: "var(--muted)",
            fontWeight: "500",
          }}
        >
          Idle Cashier
        </div>
      )}

      <div style={{ textAlign: "left" }}>
        <strong style={{ fontSize: "15px" }}>In Queue:</strong>
        {queue.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--muted)", margin: "6px 0" }}>
            None
          </p>
        ) : (
          queue.map((c) => (
            <div
              key={c.id}
              style={{
                backgroundColor:
                  c.type === "Priority"
                    ? "rgba(233,64,87,0.25)"
                    : "rgba(50,150,250,0.2)",
                padding: "6px",
                borderRadius: "6px",
                margin: "5px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{c.name}</span>
              <span style={{ fontSize: "12px", color: "var(--muted)" }}>
                {c.serviceTime}s
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
