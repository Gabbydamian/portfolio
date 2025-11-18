import {
  fetchBlogPosts,
  approveBlogPost,
  rejectBlogPost,
} from "@/actions/blogActions";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function PendingSubmissionsPage() {
  const pendingResult = await fetchBlogPosts("pending");
  const submissions = pendingResult.error ? [] : pendingResult.blogs ?? [];

  async function handleApprove(id: string) {
    "use server";
    await approveBlogPost(id);
  }
  async function handleReject(id: string) {
    "use server";
    await rejectBlogPost(id);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pending Submissions</h1>
      {submissions.length === 0 ? (
        <div className="text-muted-foreground">No pending submissions.</div>
      ) : (
        <div className="grid gap-4">
          {submissions.map((submission: any) => (
            <Card
              key={submission.id}
              className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
            >
              <div>
                <div className="font-semibold">{submission.title}</div>
                <div className="text-sm text-muted-foreground">
                  By {submission.author || "Anonymous"}
                </div>
              </div>
              <div className="flex gap-2">
                <form action={handleApprove.bind(null, submission.id)}>
                  <Button type="submit" variant="success">
                    Approve
                  </Button>
                </form>
                <form action={handleReject.bind(null, submission.id)}>
                  <Button type="submit" variant="destructive">
                    Reject
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
