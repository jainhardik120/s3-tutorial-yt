import FilesTable from "@/components/files-table";
import UploadFile from "../../components/upload-file";
import { listPublicFiles } from "../actions/S3Actions";

export default async function PublicFilesPage() {
  const files = await listPublicFiles();
  return (
    <div>
      <h1>Public Files</h1>
      <UploadFile userId={undefined} />
      <FilesTable files={files} isPublic={true} />
    </div>
  );
}
