"use client"

import type React from "react"

import { useState } from "react"
import { MainLayout } from "@/components/main-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlogPostEditor } from "@/components/blog-post-editor"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Edit, Trash, Plus } from "lucide-react"

// Mock authentication - would be replaced with Supabase auth
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const login = (email: string, password: string) => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any input will "authenticate"
      setIsAuthenticated(true)
      setIsLoading(false)
    }, 1000)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return { isAuthenticated, isLoading, login, logout }
}

// Sample pending submissions
const pendingSubmissions = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "Jane Smith",
    email: "jane@example.com",
    date: "2023-10-15",
    category: "development",
    excerpt: "A deep dive into React Hooks and how they can simplify your code...",
  },
  {
    id: 2,
    title: "The Future of Web Design",
    author: "Mike Johnson",
    email: "mike@example.com",
    date: "2023-10-12",
    category: "design",
    excerpt: "Exploring upcoming trends in web design and what to expect in 2024...",
  },
]

export default function AdminPage() {
  const { isAuthenticated, isLoading, login, logout } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { toast } = useToast()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(email, password)
  }

  const handleSavePost = () => {
    // This would save to Supabase in a real app
    toast({
      title: "Post saved",
      description: "Your blog post has been saved successfully.",
    })
  }

  const handleSaveProject = () => {
    // This would save to Supabase in a real app
    toast({
      title: "Project saved",
      description: "Your project has been saved successfully.",
    })
  }

  const handleApproveSubmission = (id: number) => {
    toast({
      title: "Submission approved",
      description: "The blog post has been approved and published.",
    })
  }

  const handleRejectSubmission = (id: number) => {
    toast({
      title: "Submission rejected",
      description: "The blog post has been rejected.",
    })
  }

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12 max-w-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-center text-gray-400 mt-4">Note: This is a demo. Any credentials will work.</p>
          </form>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="submissions">
          <TabsList className="mb-8">
            <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
            <TabsTrigger value="new-post">New Post</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="new-project">New Project</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="submissions">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Blog Submissions</h2>
              {pendingSubmissions.length > 0 ? (
                <div className="space-y-4">
                  {pendingSubmissions.map((submission) => (
                    <div key={submission.id} className="p-4 bg-gray-900 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold">{submission.title}</h3>
                          <div className="text-sm text-gray-400 mb-1">
                            By {submission.author} ({submission.email}) on{" "}
                            {new Date(submission.date).toLocaleDateString()}
                          </div>
                          <Badge variant="outline" className="mb-2">
                            {submission.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-green-900 hover:bg-green-800"
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
          </TabsContent>

          <TabsContent value="posts">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Blog Posts</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add New
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  "Getting Started with Next.js",
                  "The Power of Tailwind CSS",
                  "Building Interactive UIs with Framer Motion",
                  "Design Systems for Developers",
                  "Navigating Your Tech Career",
                ].map((title, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <span>{title}</span>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="new-post">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Post title" />
                </div>
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input id="slug" placeholder="post-slug" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select id="category" className="w-full rounded-md border border-input bg-background px-3 py-2">
                    <option value="">Select a category</option>
                    <option value="development">Development</option>
                    <option value="design">Design</option>
                    <option value="career">Career</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <Input id="coverImage" placeholder="https://example.com/image.jpg" />
                </div>
              </div>
              <div className="mb-4">
                <Label>Content</Label>
                <BlogPostEditor />
              </div>
              <Button onClick={handleSavePost}>Save Post</Button>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Projects</h2>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add New
                </Button>
              </div>
              <div className="space-y-4">
                {["Portfolio Website", "E-commerce Platform", "Weather App", "Task Management System"].map(
                  (title, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <span>{title}</span>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" /> Edit
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash className="w-4 h-4 mr-1" /> Delete
                        </Button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="new-project">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Project</h2>
              <div className="space-y-4 mb-4">
                <div>
                  <Label htmlFor="project-title">Title</Label>
                  <Input id="project-title" placeholder="Project title" />
                </div>
                <div>
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea id="project-description" placeholder="Project description" />
                </div>
                <div>
                  <Label htmlFor="project-image">Image URL</Label>
                  <Input id="project-image" placeholder="https://example.com/image.jpg" />
                </div>
                <div>
                  <Label htmlFor="project-link">Project Link</Label>
                  <Input id="project-link" placeholder="https://example.com/project" />
                </div>
                <div>
                  <Label htmlFor="project-tags">Tags (comma separated)</Label>
                  <Input id="project-tags" placeholder="React, Node.js, MongoDB" />
                </div>
              </div>
              <Button onClick={handleSaveProject}>Save Project</Button>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Damian" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    defaultValue="Full-stack developer specializing in modern web technologies and scalable applications."
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" defaultValue="Lagos, NG" />
                </div>
                <Button>Save Settings</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
