import { AdminLayout } from "@/components/admin/AdminLayout";
import { ContentLibraryPage } from "@/components/content-library/ContentLibraryPage";

export default function ContentLibraryRoute() {
  return (
    <AdminLayout>
      <ContentLibraryPage />
    </AdminLayout>
  );
}


