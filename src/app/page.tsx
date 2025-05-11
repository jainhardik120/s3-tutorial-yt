import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Welcome to S3 Image Upload</h1>
      <Link href="/public-files">Public Files</Link>
      <Link href="/user-files/1">User 1 Files</Link>
      <Link href="/user-files/2">User 2 Files</Link>
    </div>
  );
}
