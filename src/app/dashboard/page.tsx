import { AdminLayout } from "@/components/admin/AdminLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SourceAnalysisCard } from "@/components/dashboard/SourceAnalysisCard";
import { SmallStatCard } from "@/components/dashboard/SmallStatCard";
import { AdSpendCard } from "@/components/dashboard/AdSpendCard";
import { CreditsCard } from "@/components/dashboard/CreditsCard";
import { InboxCard } from "@/components/dashboard/InboxCard";
import { ActionsTableCard } from "@/components/dashboard/ActionsTableCard";
import { DashboardToolbar } from "@/components/dashboard/DashboardToolbar";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-base font-semibold text-zinc-900">
          Your SmartReply Overview
        </div>
        <DashboardToolbar />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Total Comments" value="3" deltaLabel="100% ↑" />
        <MetricCard label="Hidden Comment %" value="0.00%" deltaLabel="0% ↑" />
        <MetricCard label="Moderation Volume" value="4" deltaLabel="100% ↑" />
        <MetricCard label="Moderation Hours Saved" value="0" deltaLabel="100% ↑" />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <SourceAnalysisCard />
        <div className="col-span-12 grid grid-cols-1 gap-4 lg:col-span-4">
          <SmallStatCard
            title="Visible Sentiment"
            value="1.00"
            deltaLabel="+100%"
            chart="bars"
          />
          <SmallStatCard title="Comments liked" value="0" deltaLabel="+0%" />
          <SmallStatCard
            title="Facebook user comments"
            value="2"
            deltaLabel="+100%"
            chart="miniBars"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <AdSpendCard />
        <CreditsCard />
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <InboxCard />
        <ActionsTableCard />
      </div>
    </AdminLayout>
  );
}


