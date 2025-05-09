"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Blog } from "@/app/types/blog";
import { PendingSubmissionsProps } from "@/app/types/blog";

export function PendingSubmissions({ submissions }: PendingSubmissionsProps) {
  const { toast } = useToast();

  console.log("Pending Submissions: ", submissions);

  const handleApproveSubmission = (id: string) => {
    // This would be a server action in production
    toast({
      title: "Submission approved",
      description: "The blog post has been approved and published.",
    });
  };

  const handleRejectSubmission = (id: string) => {
    // This would be a server action in production
    toast({
      title: "Submission rejected",
      description: "The blog post has been rejected.",
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Blog Submissions</h2>
      {submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="p-4 bg-gray-900 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold">{submission.title}</h3>
                  <div className="text-sm text-gray-400 mb-1">
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
                    className="bg-green-700 hover:bg-green-600"
                    onClick={() => handleApproveSubmission(submission.id)}
                  >
                    <Check className="w-4 h-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-red-900 hover:bg-red-800"
                    onClick={() => handleRejectSubmission(submission.id)}
                  >
                    <X className="w-4 h-4 mr-1" /> Reject
                  </Button>
                </div>
              </div>
              <p className="text-gray-300">{submission.excerpt}</p>
              <Button variant="link" className="p-0 h-auto text-primary">
                View Full Submission
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No pending submissions to review.</p>
      )}
    </div>
  );
}
