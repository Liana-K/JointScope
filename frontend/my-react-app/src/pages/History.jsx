export default function History({ goTo }) {
  return (
    <div className="page">
      <h2>History</h2>
      <p>Progress chart will appear here.</p>

      <button onClick={() => goTo("dashboard")}>
        Back
      </button>
    </div>
  );
}
