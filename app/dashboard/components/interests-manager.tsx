"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Heart,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Clapperboard,
  Headphones,
  Crown,
  Rocket,
  Coffee,
  Camera,
  Book,
  Gamepad2,
  Music,
  Palette,
  Plane,
  Code,
  Star,
} from "lucide-react";
import {
  addInterest,
  updateInterest,
  deleteInterest,
} from "@/actions/profileActions";
import type { Interest, InterestInsert } from "@/app/types/profile";
import * as LucideIcons from "lucide-react";

interface InterestsManagerProps {
  interests: Interest[];
}

const INTEREST_ICONS = [
  { value: "Star", label: "Star", Icon: Star },
  { value: "Heart", label: "Heart", Icon: Heart },
  { value: "Clapperboard", label: "Film", Icon: Clapperboard },
  { value: "Headphones", label: "Music", Icon: Headphones },
  { value: "Crown", label: "Crown", Icon: Crown },
  { value: "Rocket", label: "Rocket", Icon: Rocket },
  { value: "Coffee", label: "Coffee", Icon: Coffee },
  { value: "Camera", label: "Camera", Icon: Camera },
  { value: "Book", label: "Book", Icon: Book },
  { value: "Gamepad2", label: "Gaming", Icon: Gamepad2 },
  { value: "Music", label: "Music Note", Icon: Music },
  { value: "Palette", label: "Art", Icon: Palette },
  { value: "Plane", label: "Travel", Icon: Plane },
  { value: "Code", label: "Code", Icon: Code },
];

export function InterestsManager({
  interests: initialInterests,
}: InterestsManagerProps) {
  const [interests, setInterests] = useState(initialInterests);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingInterest, setEditingInterest] = useState<Interest | null>(null);
  const [deletingInterestId, setDeletingInterestId] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIcon, setSelectedIcon] = useState(INTEREST_ICONS[0].value);

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || Star;
    return IconComponent;
  };

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const newInterest: InterestInsert = {
      text: formData.get("text") as string,
      icon_name: selectedIcon,
    };

    const result = await addInterest(newInterest);

    if (result.error) {
      setError(result.error);
    } else if (result.interest) {
      setInterests([...interests, result.interest]);
      setIsAddDialogOpen(false);
      setSelectedIcon(INTEREST_ICONS[0].value);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const updates = {
      text: formData.get("text") as string,
      icon_name: selectedIcon,
    };

    const result = await updateInterest(id, updates);

    if (result.error) {
      setError(result.error);
    } else if (result.interest) {
      setInterests(
        interests.map((interest) =>
          interest.id === id ? result.interest! : interest
        )
      );
      setEditingInterest(null);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteInterest(id);

    if (result.error) {
      setError(result.error);
    } else {
      setInterests(interests.filter((interest) => interest.id !== id));
      setDeletingInterestId(null);
    }

    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Interests & Hobbies</h3>
          <p className="text-sm text-muted-foreground">
            Share your personal interests and hobbies
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Interest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Interest</DialogTitle>
              <DialogDescription>
                Add a new interest or hobby to your profile
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdd(new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="add-text">Interest Description</Label>
                <Input
                  id="add-text"
                  name="text"
                  placeholder="e.g., Classic film analysis and theory"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-icon">Icon</Label>
                <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                  <SelectTrigger id="add-icon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_ICONS.map((icon) => {
                      const IconComp = icon.Icon;
                      return (
                        <SelectItem key={icon.value} value={icon.value}>
                          <div className="flex items-center gap-2">
                            <IconComp className="h-4 w-4" />
                            <span>{icon.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 pt-2">
                  {(() => {
                    const PreviewIcon = getIconComponent(selectedIcon);
                    return (
                      <>
                        <PreviewIcon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Preview
                        </span>
                      </>
                    );
                  })()}
                </div>
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
                    "Add Interest"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {interests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Heart className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No interests added yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Your First Interest
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {interests.map((interest) => {
            const IconComponent = getIconComponent(interest.icon_name);
            return (
              <Card key={interest.id} className="group relative">
                <CardContent className="flex items-start gap-3 pt-6">
                  <div className="flex-shrink-0 mt-0.5">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm flex-1">{interest.text}</p>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setEditingInterest(interest);
                        setSelectedIcon(interest.icon_name);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setDeletingInterestId(interest.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editingInterest}
        onOpenChange={() => {
          setEditingInterest(null);
          setSelectedIcon(INTEREST_ICONS[0].value);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Interest</DialogTitle>
            <DialogDescription>Update your interest details</DialogDescription>
          </DialogHeader>
          {editingInterest && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingInterest.id, new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="edit-text">Interest Description</Label>
                <Input
                  id="edit-text"
                  name="text"
                  defaultValue={editingInterest.text}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-icon">Icon</Label>
                <Select value={selectedIcon} onValueChange={setSelectedIcon}>
                  <SelectTrigger id="edit-icon">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTEREST_ICONS.map((icon) => {
                      const IconComp = icon.Icon;
                      return (
                        <SelectItem key={icon.value} value={icon.value}>
                          <div className="flex items-center gap-2">
                            <IconComp className="h-4 w-4" />
                            <span>{icon.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex items-center gap-2 pt-2">
                  {(() => {
                    const PreviewIcon = getIconComponent(selectedIcon);
                    return (
                      <>
                        <PreviewIcon className="h-5 w-5 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          Preview
                        </span>
                      </>
                    );
                  })()}
                </div>
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
                  onClick={() => setEditingInterest(null)}
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
        open={!!deletingInterestId}
        onOpenChange={() => setDeletingInterestId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this interest. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                deletingInterestId && handleDelete(deletingInterestId)
              }
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
