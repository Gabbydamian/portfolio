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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import {
  addEducation,
  updateEducation,
  deleteEducation,
} from "@/actions/profileActions";
import type { Education, EducationInsert } from "@/app/types/profile";

interface EducationManagerProps {
  education: Education[];
}

export function EducationManager({
  education: initialEducation,
}: EducationManagerProps) {
  const [education, setEducation] = useState(initialEducation);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const [deletingEduId, setDeletingEduId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const newEdu: EducationInsert = {
      degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    };

    const result = await addEducation(newEdu);

    if (result.error) {
      setError(result.error);
    } else if (result.education) {
      setEducation([...education, result.education]);
      setIsAddDialogOpen(false);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const updates = {
      degree: formData.get("degree") as string,
      institution: formData.get("institution") as string,
      period: formData.get("period") as string,
      description: formData.get("description") as string,
    };

    const result = await updateEducation(id, updates);

    if (result.error) {
      setError(result.error);
    } else if (result.education) {
      setEducation(
        education.map((edu) => (edu.id === id ? result.education! : edu))
      );
      setEditingEdu(null);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteEducation(id);

    if (result.error) {
      setError(result.error);
    } else {
      setEducation(education.filter((edu) => edu.id !== id));
      setDeletingEduId(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Education</h3>
          <p className="text-sm text-muted-foreground">
            Manage your educational background
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Education</DialogTitle>
              <DialogDescription>
                Add a new education entry to your profile
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
                  <Label htmlFor="add-degree">Degree/Certification</Label>
                  <Input id="add-degree" name="degree" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="add-institution">Institution</Label>
                  <Input id="add-institution" name="institution" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-period">Period</Label>
                <Input
                  id="add-period"
                  name="period"
                  placeholder="e.g., 2017 - 2024"
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
                    "Add Education"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {education.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No education entries yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Your First Education
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {education.map((edu) => (
            <Card key={edu.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle>{edu.degree}</CardTitle>
                    <p className="text-sm font-medium text-muted-foreground">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.period}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingEdu(edu)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingEduId(edu.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {edu.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingEdu} onOpenChange={() => setEditingEdu(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
            <DialogDescription>Update your education details</DialogDescription>
          </DialogHeader>
          {editingEdu && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingEdu.id, new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-degree">Degree/Certification</Label>
                  <Input
                    id="edit-degree"
                    name="degree"
                    defaultValue={editingEdu.degree}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-institution">Institution</Label>
                  <Input
                    id="edit-institution"
                    name="institution"
                    defaultValue={editingEdu.institution}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-period">Period</Label>
                <Input
                  id="edit-period"
                  name="period"
                  defaultValue={editingEdu.period}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingEdu.description}
                  rows={4}
                  required
                />
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
                  onClick={() => setEditingEdu(null)}
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
        open={!!deletingEduId}
        onOpenChange={() => setDeletingEduId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this education entry. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingEduId && handleDelete(deletingEduId)}
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
