import Reminder from "../../pages/Reminder.jsx";

function ReminderModal({ onClose }) {
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
        <Reminder onClose={onClose} />
      </div>
    </div>
  );
}

export default ReminderModal;
