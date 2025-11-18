import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SubmissionsTabProps {
  pendingSubmissions: any[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function SubmissionsTab({
  pendingSubmissions,
  onApprove,
  onReject,
}: SubmissionsTabProps) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Pending Submissions</h1>
      {pendingSubmissions.length === 0 ? (
        <div className="text-muted-foreground">No pending submissions.</div>
      ) : (
        <div className="grid gap-4">
          {pendingSubmissions.map((submission: any) => (
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
                <Button
                  type="button"
                  variant="default"
                  onClick={() => onApprove(submission.id)}
                >
                  Approve
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onReject(submission.id)}
                >
                  Reject
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
