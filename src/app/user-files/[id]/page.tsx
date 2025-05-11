import { listUserFiles } from "@/app/actions/S3Actions";
import UploadFile from "@/components/upload-file";
import FilesTable from "@/components/files-table";

export default async function UserFilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const userFiles = await listUserFiles(userId);
  return (
    <div>
      <h1>User Files</h1>
      <UploadFile userId={userId} />
      <FilesTable files={userFiles} isPublic={false} />
    </div>
  );
}
