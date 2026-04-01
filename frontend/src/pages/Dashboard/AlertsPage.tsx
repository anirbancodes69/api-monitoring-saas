import { AlertHistory } from "./AlertHistory";

interface AlertsPageProps {
  alertHistory: any[];
}

export function AlertsPage({ alertHistory }: AlertsPageProps) {
  return (
    <div>
      <AlertHistory alertHistory={alertHistory} />
    </div>
  );
}
