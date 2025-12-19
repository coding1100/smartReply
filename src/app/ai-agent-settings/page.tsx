import { AdminLayout } from "@/components/admin/AdminLayout";
import { AIAgentSettingsPage } from "@/components/settings/AIAgentSettingsPage";

export default function AIAgentSettingsRoute() {
  return (
    <AdminLayout>
      <AIAgentSettingsPage />
    </AdminLayout>
  );
}


