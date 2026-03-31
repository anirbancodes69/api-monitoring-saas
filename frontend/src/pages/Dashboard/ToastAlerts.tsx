import { styles } from "./styles";

interface Alert {
  id: number;
  text: string;
  type: "success" | "error";
}

interface ToastAlertsProps {
  alerts: Alert[];
}

export function ToastAlerts({ alerts }: ToastAlertsProps) {
  return (
    <div style={styles.toastWrap}>
      {alerts.map((a) => (
        <div
          key={a.id}
          style={{
            ...styles.toast,
            background: a.type === "error" ? "#fee2e2" : "#d1fae5",
            color: a.type === "error" ? "#991b1b" : "#047857",
            borderColor: a.type === "error" ? "#fecaca" : "#a7f3d0",
          }}
        >
          {a.type === "error" ? "❌" : "✓"} {a.text}
        </div>
      ))}
    </div>
  );
}
