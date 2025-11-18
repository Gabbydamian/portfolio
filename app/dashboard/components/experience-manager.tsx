"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Briefcase, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  addExperience,
  updateExperience,
  deleteExperience,
} from "@/actions/profileActions";
import type { Experience, ExperienceInsert } from "@/app/types/profile";

interface ExperienceManagerProps {
  experience: Experience[];
}

export function ExperienceManager({
  experience: initialExperience,
}: ExperienceManagerProps) {
  const [experience, setExperience] = useState(initialExperience);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [deletingExpId, setDeletingExpId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const newExp: ExperienceInsert = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      is_current: formData.get("is_current") === "on",
    };

    const result = await addExperience(newExp);

    if (result.error) {
      setError(result.error);
    } else if (result.experience) {
      setExperience([...experience, result.experience]);
      setIsAddDialogOpen(false);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const updates = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
      is_current: formData.get("is_current") === "on",
    };

    const result = await updateExperience(id, updates);

    if (result.error) {
      setError(result.error);
    } else if (result.experience) {
      setExperience(
        experience.map((exp) => (exp.id === id ? result.experience! : exp))
      );
      setEditingExp(null);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteExperience(id);

    if (result.error) {
      setError(result.error);
    } else {
      setExperience(experience.filter((exp) => exp.id !== id));
      setDeletingExpId(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <p className="text-sm text-muted-foreground">
            Manage your professional experience
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Work Experience</DialogTitle>
              <DialogDescription>
                Add a new work experience entry to your profile
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd(new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="add-title">Job Title</Label>
                  <Input id="add-title" name="title" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-company">Company</Label>
                  <Input id="add-company" name="company" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-period">Period</Label>
                <Input
                  id="add-period"
                  name="period"
                  placeholder="e.g., Jan 2023 - Present"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-description">Description</Label>
                <Textarea
                  id="add-description"
                  name="description"
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="add-is-current" name="is_current" />
                <Label htmlFor="add-is-current" className="cursor-pointer">
                  I currently work here
                </Label>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Experience"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {experience.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No experience entries yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {experience.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {exp.title}
                      {exp.is_current && (
                        <Badge variant="secondary">Current</Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">
                      {exp.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {exp.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingExp(exp)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingExpId(exp.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {exp.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingExp} onOpenChange={() => setEditingExp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Work Experience</DialogTitle>
            <DialogDescription>
              Update your work experience details
            </DialogDescription>
          </DialogHeader>
          {editingExp && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingExp.id, new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Job Title</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    defaultValue={editingExp.title}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    name="company"
                    defaultValue={editingExp.company}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-period">Period</Label>
                <Input
                  id="edit-period"
                  name="period"
                  defaultValue={editingExp.period}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingExp.description}
                  rows={4}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="edit-is-current"
                  name="is_current"
                  defaultChecked={editingExp.is_current}
                />
                <Label htmlFor="edit-is-current" className="cursor-pointer">
                  I currently work here
                </Label>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingExp(null)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deletingExpId}
        onOpenChange={() => setDeletingExpId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this experience entry. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingExpId && handleDelete(deletingExpId)}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
