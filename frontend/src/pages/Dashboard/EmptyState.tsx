import { styles } from "./styles";

export function EmptyState() {
  return (
    <div style={styles.emptyState}>
      <p style={styles.emptyIcon}>📡</p>
      <h3>No Endpoints Yet</h3>
      <p>Add your first API endpoint using the form above to start monitoring.</p>
    </div>
  );
}
