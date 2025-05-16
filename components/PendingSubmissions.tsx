"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { PendingSubmissionsProps } from "@/app/types/blog";
import { approveBlogPost, rejectBlogPost } from "@/actions/blogActions";
import { useRouter } from "next/navigation";

export function PendingSubmissions({ submissions }: PendingSubmissionsProps) {
  const router = useRouter();

  // console.log("Pending Submissions: ", submissions);

  const handleApproveSubmission = async (id: string) => {
    const { error } = await approveBlogPost(id);

    if (error) {
      toast.error("an error occured", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Approval failed");
      return;
    }
    toast.success("Something went wrong...", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.refresh();
  };

  const handleRejectSubmission = async (id: string) => {
    // This would be a server action in production

    const { error } = await rejectBlogPost(id);

    if (error) {
      toast.error("Something went wrong...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Rejection failed");
      return;
    }
    toast.success("Approval rejected successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    router.refresh();
  };

  return (
    <div className="bg-background/60 backdrop-blur border border-border shadow rounded-lg p-6">
      <ToastContainer />
      <h2 className="text-xl font-semibold mb-4">Pending Blog Submissions</h2>
      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 bg-background/80 backdrop-blur border border-border rounded-lg"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{submission.title}</h3>
                  <div className="text-sm text-muted-foreground mb-1">
                    By {submission.author} ({submission.email}) on{" "}
                    {new Date(submission.date_created).toLocaleDateString()}
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {submission.category}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-green-700 hover:bg-green-600 text-white"
                    onClick={() => handleApproveSubmission(submission.id)}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-900 hover:bg-red-800 text-white"
                    onClick={() => handleRejectSubmission(submission.id)}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground">{submission.excerpt}</p>
              <Button variant="link" className="p-0 h-auto text-primary">
                View Full Submission
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No pending submissions to review.
        </p>
      )}
    </div>
  );
}
