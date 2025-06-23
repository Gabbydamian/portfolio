import { fetchBlogPosts } from "@/actions/blogActions";
import { MetadataRoute } from "next";
import { unstable_cache } from 'next/cache';

// Cache the blog posts fetch for 1 hour
const getCachedBlogPosts = unstable_cache(
    async () => {
        try {
            const blogResult = await fetchBlogPosts("approved");
            return blogResult.blogs || [];
        } catch (error) {
            console.error('Error fetching blog posts for sitemap:', error);
            return [];
        }
    },
    ['sitemap-blog-posts'],
    {
        revalidate: 3600, // 1 hour in seconds
        tags: ['blog-posts', 'sitemap']
    }
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NODE_ENV === 'production'
        ? "https://astridamian.vercel.app"
        : "http://localhost:3000";

    const today = new Date().toISOString().split("T")[0];

    const staticRoutes = [
        {
            url: baseUrl + "/",
            changeFrequency: "monthly" as const,
            priority: 1.0,
            lastModified: "2024-06-01" // Update this when you make major homepage changes
        },
        {
            url: baseUrl + "/about",
            changeFrequency: "monthly" as const,
            priority: 0.8,
            lastModified: "2024-06-01" // Update when you modify about page
        },
        {
            url: baseUrl + "/projects",
            changeFrequency: "monthly" as const,
            priority: 0.8,
            lastModified: today // Projects listing might change when you add new ones
        },
        {
            url: baseUrl + "/blog",
            changeFrequency: "weekly" as const,
            priority: 0.9,
            lastModified: today // Blog listing changes when new posts are added
        },
        {
            url: baseUrl + "/blog/submit",
            changeFrequency: "monthly" as const,
            priority: 0.6,
            lastModified: "2024-06-01"
        },
        {
            url: baseUrl + "/privacy",
            changeFrequency: "yearly" as const,
            priority: 0.3,
            lastModified: "2024-01-01"
        },
    ];

    try {
        // Get cached blog posts
        const blogPosts = await getCachedBlogPosts();

        const blogUrls = blogPosts.map((post: any) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.date_created ? post.date_created.split("T")[0] : today,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        }));

        return [
            ...staticRoutes.map((route) => ({
                url: route.url,
                lastModified: route.lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
            })),
            ...blogUrls,
        ];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return static routes if everything fails
        return staticRoutes.map((route) => ({
            url: route.url,
            lastModified: route.lastModified,
            changeFrequency: route.changeFrequency,
            priority: route.priority,
        }));
    }
}

// Optional: Export revalidate for the entire sitemap
export const revalidate = 3600; // Revalidate sitemap every hour