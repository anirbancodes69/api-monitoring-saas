import { styles } from "./styles";
import { getSeverityStyle, formatTimeDiff } from "./utils";

interface AlertHistoryItem {
  id: number;
  endpoint_id: number;
  endpoint_name: string;
  severity: string;
  message: string;
  timestamp: Date;
  status_change: string;
}

interface AlertHistoryProps {
  alertHistory: AlertHistoryItem[];
}

export function AlertHistory({ alertHistory }: AlertHistoryProps) {
  return (
    <div style={styles.alertHistorySection}>
      <h2 style={styles.sectionTitle}>🚨 Alert History</h2>
      {alertHistory.length === 0 ? (
        <p style={styles.noAlerts}>No alerts yet. Your endpoints are looking good!</p>
      ) : (
        <div style={styles.alertHistoryGrid}>
          {alertHistory.slice(0, 10).map((alert) => {
            const severity = getSeverityStyle(alert.severity);
            return (
              <div key={alert.id} style={styles.alertHistoryItem}>
                <div style={styles.alertHistoryHeader}>
                  <div>
                    <h4 style={styles.alertEndpointName}>{alert.endpoint_name}</h4>
                    <p style={styles.alertMessage}>{alert.message}</p>
                  </div>
                  <span
                    style={{
                      ...styles.severityBadge,
                      background: severity.bg,
                      color: severity.color,
                    }}
                  >
                    {severity.icon} {alert.severity.toUpperCase()}
                  </span>
                </div>
                <p style={styles.alertTime}>{formatTimeDiff(alert.timestamp)}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
