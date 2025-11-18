import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Clock,
  FileText,
  FilePlus,
  BookOpen,
  BookPlus,
  FolderKanban,
  FolderPlus,
  Sparkles,
  User,
} from "lucide-react";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navGroups = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
      { label: "Pending Submissions", key: "submissions", icon: Clock },
      { label: "About Settings", key: "about-settings", icon: User },
    ],
  },
  {
    label: "Blog",
    items: [
      { label: "All Posts", key: "posts", icon: FileText },
      { label: "New Post", key: "new-post", icon: FilePlus },
    ],
  },
  {
    label: "Learning",
    items: [
      { label: "All Learning Posts", key: "learning", icon: BookOpen },
      { label: "New Learning Post", key: "new-learning", icon: BookPlus },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "All Projects", key: "projects", icon: FolderKanban },
      { label: "New Project", key: "new-project", icon: FolderPlus },
    ],
  },
];

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-2 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Admin Panel</span>
            <span className="text-xs text-muted-foreground">
              Content Management
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-2">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-1">
              {group.label}
            </SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild={false}
                      isActive={activeTab === item.key}
                      aria-current={activeTab === item.key ? "page" : undefined}
                      onClick={() => setActiveTab(item.key)}
                      className={
                        `rounded-md transition-all duration-200 h-10 ` +
                        `hover:bg-accent hover:text-accent-foreground ` +
                        (activeTab === item.key
                          ? "bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90"
                          : "text-muted-foreground hover:text-foreground")
                      }
                      tooltip={item.label}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-border p-2">
        <div className="text-xs text-muted-foreground px-2 group-data-[collapsible=icon]:hidden">
          Portfolio v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
