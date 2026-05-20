import ReminderContent from "./ReminderContent.jsx";

function ReminderModal({ onClose, onMovementSaved }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        <ReminderContent onClose={onClose} onMovementSaved={onMovementSaved} />
      </div>
    </div>
  );
}

export default ReminderModal;
