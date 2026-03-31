import { styles } from "./styles";
import { statusColor, getSeverityStyle, formatTimeDiff } from "./utils";

interface LastAlert {
  message: string;
  severity: string;
  timestamp: Date;
}

interface EndpointCardProps {
  endpoint: any;
  lastAlert: LastAlert | undefined;
  onEdit: (endpoint: any) => void;
  onDelete: (id: number) => void;
}

export function EndpointCard({ endpoint, lastAlert, onEdit, onDelete }: EndpointCardProps) {
  const s = statusColor(endpoint.status);

  return (
    <div
      style={styles.card}
      onMouseEnter={(ev) =>
        (ev.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.15)")
      }
      onMouseLeave={(ev) =>
        (ev.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.08)")
      }
    >
      <div style={styles.cardTop}>
        <div>
          <h3 style={styles.cardTitle}>{endpoint.name}</h3>
          <p style={styles.cardUrl}>{endpoint.url}</p>
        </div>

        <span
          style={{
            ...styles.badge,
            background: s.bg,
            color: s.color,
          }}
        >
          {s.icon} {endpoint.status}
        </span>
      </div>

      <div style={styles.metricsGrid}>
        <div style={styles.metric}>
          <p style={styles.metricLabel}>Uptime</p>
          <p style={styles.metricValue}>{endpoint.uptime_percentage || "0"}%</p>
        </div>

        <div style={styles.metric}>
          <p style={styles.metricLabel}>Avg Response</p>
          <p style={styles.metricValue}>{Math.round(endpoint.avg_response_time || 0)} ms</p>
        </div>
      </div>

      <p style={styles.time}>
        Last checked:{" "}
        {endpoint.last_checked ? new Date(endpoint.last_checked).toLocaleString() : "Never"}
      </p>

      {lastAlert && (
        <div style={styles.lastAlertInfo}>
          <span
            style={
              getSeverityStyle(lastAlert.severity).color === "#991b1b"
                ? styles.lastAlertBadgeCritical
                : styles.lastAlertBadge
            }
          >
            Last Alert: {lastAlert.message} ({formatTimeDiff(lastAlert.timestamp)})
          </span>
        </div>
      )}

      <div style={styles.actions}>
        <button style={styles.edit} onClick={() => onEdit(endpoint)}>
          ✎ Edit
        </button>
        <button style={styles.delete} onClick={() => onDelete(endpoint.endpoint_id)}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
}
