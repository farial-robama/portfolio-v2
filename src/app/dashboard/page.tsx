import Link from "next/link";
import StatsCards from "@/components/dashboard/StatsCards";
import PostsTable from "@/components/dashboard/PostsTable";
import NewPostForm from "@/components/dashboard/NewPostForm";
import { getPosts, getProjects } from "@/lib/data";

// Always fetch the latest data — this is an admin view
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="font-serif text-[26px]">Overview</h2>
        <Link href="/" className="font-mono text-xs uppercase text-teal underline">
          ← View public site
        </Link>
      </div>

      <StatsCards posts={posts} projects={projects} />
      <PostsTable posts={posts} />
      <NewPostForm />
    </>
  );
}
