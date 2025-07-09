import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navGroups = [
  {
    label: "Content",
    items: [
      { label: "Dashboard", key: "dashboard" },
      { label: "Pending Submissions", key: "submissions" },
      { label: "Blog Posts", key: "posts" },
      { label: "New Post", key: "new-post" },
    ],
  },
  {
    label: "Projects",
    items: [
      { label: "Projects", key: "projects" },
      { label: "New Project", key: "new-project" },
    ],
  },
];

export function AppSidebar({ activeTab, setActiveTab }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" variant="sidebar">
      <SidebarHeader>
        <h2 className="text-lg font-bold">Admin</h2>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild={false}
                    isActive={activeTab === item.key}
                    aria-current={activeTab === item.key ? "page" : undefined}
                    onClick={() => setActiveTab(item.key)}
                    className={
                      `transition-colors duration-150 ` +
                      `hover:bg-accent hover:text-accent-foreground ` +
                      (activeTab === item.key
                        ? " font-bold bg-accent text-accent-foreground"
                        : "")
                    }
                  >
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
