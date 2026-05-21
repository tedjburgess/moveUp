import { useEffect } from "react";
import ReminderContent from "./ReminderContent.jsx";
import reminderSound from "../../assets/reminder-sound.mp3";

function ReminderModal({ onClose, onMovementSaved }) {
  useEffect(() => {
    const audio = new Audio(reminderSound);
    audio.volume = 0.8;

    audio.play().catch(() => {
      // Some browsers block autoplay, so we do not crash if sound is blocked.
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
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
