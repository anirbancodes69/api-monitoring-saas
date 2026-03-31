import { styles } from "./styles";

export function Loader() {
  return (
    <div style={styles.loader}>
      <div style={styles.spinner}></div>
      <p>Loading your dashboard...</p>
    </div>
  );
}
