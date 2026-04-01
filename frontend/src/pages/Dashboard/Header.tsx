import { styles } from "./styles";

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>🚀 APILENS</h1>
        <p style={styles.subtitle}>Real-time endpoint monitoring</p>
      </div>

      <div style={styles.headerRight}>
        <p style={styles.sub}>↻ Auto-refresh: 60s</p>
        <button style={styles.logout} onClick={onLogout}>
          ← Logout
        </button>
      </div>
    </div>
  );
}
