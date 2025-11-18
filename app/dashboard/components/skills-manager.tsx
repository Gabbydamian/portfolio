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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { addSkill, updateSkill, deleteSkill } from "@/actions/profileActions";
import type { Skill, SkillInsert } from "@/app/types/profile";

interface SkillsManagerProps {
  skills: Skill[];
}

const SKILL_COLORS = [
  {
    value: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    label: "Blue",
  },
  {
    value:
      "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    label: "Green",
  },
  {
    value:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
    label: "Yellow",
  },
  {
    value: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    label: "Red",
  },
  {
    value:
      "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    label: "Purple",
  },
  {
    value: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    label: "Pink",
  },
  {
    value:
      "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    label: "Indigo",
  },
  {
    value: "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    label: "Cyan",
  },
  {
    value: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
    label: "Teal",
  },
  {
    value:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    label: "Emerald",
  },
  {
    value:
      "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    label: "Amber",
  },
  {
    value:
      "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
    label: "Orange",
  },
  {
    value: "bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
    label: "Rose",
  },
  {
    value:
      "bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
    label: "Violet",
  },
  {
    value:
      "bg-slate-50 text-slate-800 dark:bg-slate-800/30 dark:text-slate-300",
    label: "Slate",
  },
];

const SKILL_CATEGORIES = ["Frontend", "Backend", "Tools", "Design", "General"];

export function SkillsManager({ skills: initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [deletingSkillId, setDeletingSkillId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(SKILL_COLORS[0].value);
  const [selectedCategory, setSelectedCategory] = useState(SKILL_CATEGORIES[0]);

  const handleAdd = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const newSkill: SkillInsert = {
      name: formData.get("name") as string,
      color: selectedColor,
      category: selectedCategory,
    };

    const result = await addSkill(newSkill);

    if (result.error) {
      setError(result.error);
    } else if (result.skill) {
      setSkills([...skills, result.skill]);
      setIsAddDialogOpen(false);
      setSelectedColor(SKILL_COLORS[0].value);
      setSelectedCategory(SKILL_CATEGORIES[0]);
    }

    setIsLoading(false);
  };

  const handleUpdate = async (id: string, formData: FormData) => {
    setIsLoading(true);
    setError(null);

    const updates = {
      name: formData.get("name") as string,
      color: selectedColor,
      category: selectedCategory,
    };

    const result = await updateSkill(id, updates);

    if (result.error) {
      setError(result.error);
    } else if (result.skill) {
      setSkills(
        skills.map((skill) => (skill.id === id ? result.skill! : skill))
      );
      setEditingSkill(null);
    }

    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setError(null);

    const result = await deleteSkill(id);

    if (result.error) {
      setError(result.error);
    } else {
      setSkills(skills.filter((skill) => skill.id !== id));
      setDeletingSkillId(null);
    }

    setIsLoading(false);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Skills & Technologies</h3>
          <p className="text-sm text-muted-foreground">
            Manage your technical skills and expertise
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Skill</DialogTitle>
              <DialogDescription>
                Add a new skill or technology to your profile
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
                <Label htmlFor="add-name">Skill Name</Label>
                <Input id="add-name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="add-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-color">Color</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="add-color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_COLORS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={color.value}>{color.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="pt-2">
                  <Badge className={selectedColor}>Preview</Badge>
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
                    "Add Skill"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {skills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No skills added yet</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => setIsAddDialogOpen(true)}
            >
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardContent className="pt-6">
                <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group relative">
                      <Badge className={skill.color}>{skill.name}</Badge>
                      <div className="absolute -top-8 right-0 hidden group-hover:flex items-center gap-1 bg-popover border border-border rounded-md shadow-md p-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            setEditingSkill(skill);
                            setSelectedColor(skill.color);
                            setSelectedCategory(skill.category || "General");
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setDeletingSkillId(skill.id)}
                        >
                          <Trash2 className="h-3 w-3 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog
        open={!!editingSkill}
        onOpenChange={() => {
          setEditingSkill(null);
          setSelectedColor(SKILL_COLORS[0].value);
          setSelectedCategory(SKILL_CATEGORIES[0]);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>Update skill details</DialogDescription>
          </DialogHeader>
          {editingSkill && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingSkill.id, new FormData(e.currentTarget));
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="edit-name">Skill Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  defaultValue={editingSkill.name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-color">Color</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="edit-color">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SKILL_COLORS.map((color) => (
                      <SelectItem key={color.value} value={color.value}>
                        <div className="flex items-center gap-2">
                          <Badge className={color.value}>{color.label}</Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="pt-2">
                  <Badge className={selectedColor}>Preview</Badge>
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
                  onClick={() => setEditingSkill(null)}
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
        open={!!deletingSkillId}
        onOpenChange={() => setDeletingSkillId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this skill. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingSkillId && handleDelete(deletingSkillId)}
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
