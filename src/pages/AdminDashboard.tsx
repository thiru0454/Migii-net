
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AdminDashboardHeader } from "@/components/admin/AdminDashboardHeader";
import { WorkersTab } from "@/components/admin/WorkersTab";
import { BusinessesTab } from "@/components/admin/BusinessesTab";
import { HelpRequestsTab } from "@/components/admin/HelpRequestsTab";
import { WorkersMap } from "@/components/admin/WorkersMap";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState("workers");
  return (
    <DashboardLayout>
      <div className="mb-6">
        <AdminDashboardHeader onLogout={logout} />
      </div>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="businesses">Businesses</TabsTrigger>
          <TabsTrigger value="help">Help Requests</TabsTrigger>
          <TabsTrigger value="locations">Live Map</TabsTrigger>
        </TabsList>
        <TabsContent value="workers">
          <div className="mt-4">
            <WorkersTab />
          </div>
        </TabsContent>
        <TabsContent value="businesses">
          <div className="mt-4">
            <BusinessesTab />
          </div>
        </TabsContent>
        <TabsContent value="help">
          <div className="mt-4">
            <HelpRequestsTab />
          </div>
        </TabsContent>
        <TabsContent value="locations">
          <div className="mt-6">
            <WorkersMap />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
