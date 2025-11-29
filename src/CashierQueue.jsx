import React, { useState, useEffect, useRef } from "react";
import { ControlPanel, WaitingQueue, CashierCard } from "./Components/CashierComponents";

export default function CashierQueue() {
  const [queue, setQueue] = useState([]);
  const [priorityServing, setPriorityServing] = useState(null);
  const [regular1Serving, setRegular1Serving] = useState(null);
  const [regular2Serving, setRegular2Serving] = useState(null);
  const [priorityTime, setPriorityTime] = useState(0);
  const [regular1Time, setRegular1Time] = useState(0);
  const [regular2Time, setRegular2Time] = useState(0);
  const [priorityQueue, setPriorityQueue] = useState([]);
  const [regular1Queue, setRegular1Queue] = useState([]);
  const [regular2Queue, setRegular2Queue] = useState([]);

  const counter = useRef(1);

  // Add Customer
  const addCustomer = () => {
    const id = counter.current++;
    const type = Math.random() < 0.4 ? "Priority" : "Normal";
    const serviceTime = Math.floor(Math.random() * 96) + 5;
    setQueue((prev) => [...prev, { id, name: `Customer #${id}`, type, serviceTime }]);
  };

  // Assign a single customer safely
  const assignCustomer = () => {
    setQueue((prevQueue) => {
      if (prevQueue.length === 0) return prevQueue;
      const [first, ...rest] = prevQueue;

      if (first.type === "Priority") {
        if (!priorityServing) {
          setPriorityServing(first);
          setPriorityTime(first.serviceTime);
        } else {
          setPriorityQueue((prev) => [...prev, first]);
        }
      } else {
        if (!regular1Serving) {
          setRegular1Serving(first);
          setRegular1Time(first.serviceTime);
        } else if (!regular2Serving) {
          setRegular2Serving(first);
          setRegular2Time(first.serviceTime);
        } else if (!priorityServing) {
          setPriorityServing(first);
          setPriorityTime(first.serviceTime);
        } else {
          const shortest =
            regular1Queue.length <= regular2Queue.length ? "r1" : "r2";
          if (shortest === "r1") setRegular1Queue((prev) => [...prev, first]);
          else setRegular2Queue((prev) => [...prev, first]);
        }
      }
      return rest;
    });
  };

  // Assign all safely
  const assignAll = () => {
    const copy = [...queue];
    copy.forEach(() => assignCustomer());
  };

  // Timer function helper
  const useCashierTimer = (
    serving,
    setServing,
    remaining,
    setRemaining,
    cashierQueue,
    setCashierQueue
  ) => {
    useEffect(() => {
      if (!serving) return;
      if (remaining <= 0) {
        setServing(null);
        if (cashierQueue.length > 0) {
          const [next, ...rest] = cashierQueue;
          setCashierQueue(rest);
          setServing(next);
          setRemaining(next.serviceTime);
        }
        return;
      }
      const t = setTimeout(() => setRemaining(remaining - 1), 1000);
      return () => clearTimeout(t);
    }, [serving, remaining, cashierQueue]);
  };

  useCashierTimer(
    priorityServing,
    setPriorityServing,
    priorityTime,
    setPriorityTime,
    priorityQueue,
    setPriorityQueue
  );
  useCashierTimer(
    regular1Serving,
    setRegular1Serving,
    regular1Time,
    setRegular1Time,
    regular1Queue,
    setRegular1Queue
  );
  useCashierTimer(
    regular2Serving,
    setRegular2Serving,
    regular2Time,
    setRegular2Time,
    regular2Queue,
    setRegular2Queue
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "20px",
        backgroundColor: "var(--bg)",
        padding: "20px",
        minHeight: "100vh",
        flexWrap: "wrap",
        color: "var(--text)",
      }}
    >
      <ControlPanel
        onAddCustomer={addCustomer}
        onAssignCustomer={assignCustomer}
        onAssignAll={assignAll}
      />
      <WaitingQueue queue={queue} />

      <div
        style={{
          flex: 1,
          background: "var(--panel)",
          padding: "24px",
          borderRadius: "16px",
          boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          border: "1px solid var(--border)",
        }}
      >
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Cashiers
        </h3>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <CashierCard
            title="Priority Cashier"
            serving={priorityServing}
            queue={priorityQueue}
            remaining={priorityTime}
          />
          <CashierCard
            title="Regular Cashier 1"
            serving={regular1Serving}
            queue={regular1Queue}
            remaining={regular1Time}
          />
          <CashierCard
            title="Regular Cashier 2"
            serving={regular2Serving}
            queue={regular2Queue}
            remaining={regular2Time}
          />
        </div>
      </div>
    </div>
  );
}
