# My Portfolio

![Portfolio Preview](https://vkzysblijnkwykumefrg.supabase.co/storage/v1/object/public/portfolio-project-images//portfolio.webp)

## 📌 Overview

A modern, responsive portfolio website showcasing my journey from Quantity Surveyor to Frontend Developer. Built with Next.js and featuring interactive UI elements, this portfolio highlights my technical skills and projects while demonstrating my ability to create seamless web experiences.

Live site: [https://astrid-damian.vercel.app/](https://astrid-damian.vercel.app/)

## ✨ Features

- **Responsive Design:** Perfect viewing experience across all device sizes
- **Interactive UI:** Dynamic navigation and engaging user interface elements
- **Project Showcase:** Detailed portfolio of my development work
- **Blog Section:** Technical articles and professional insights
- **Dark Theme:** Modern dark interface with purple geometric accents
- **SEO Optimized:** Structured for maximum search engine visibility

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel
- **SEO:** Custom sitemap.xml and robots.txt
- **Analytics:** Vercel Analytics

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or later)
- pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Gabbydamian/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── about/            # About page
│   ├── admin/            # Admin area (protected)
│   ├── blog/             # Blog pages
│   │   ├── [slug]/       # Dynamic blog post routes
│   │   └── submit/       # Blog submission form
│   ├── projects/         # Projects showcase
│   └── sitemap.ts        # Dynamic sitemap generation
├── components/           # Reusable React components
├── public/               # Static assets
│   └── robots.txt        # Search engine instructions
└── styles/               # Global styles
```

## 📝 Usage

### Adding a New Project

1. Navigate to the appropriate directory structure
2. Create new project file using the established pattern
3. Add project details including:
   - Title and description
   - Technologies used
   - Screenshots/demo
   - Links to live site/repo

### Creating a Blog Post

1. Create a new markdown file in the blog directory
2. Add the required frontmatter:
   ```markdown
   ---
   title: "Your Blog Title"
   date: "2025-05-09"
   excerpt: "Brief description of the blog post"
   coverImage: "/path/to/image.jpg"
   ---
   ```
3. Write your blog content using markdown

## 🔍 SEO Optimization

This portfolio includes:
- Custom meta tags for each page
- Structured data for better search engine understanding
- Optimized robots.txt file
- Comprehensive sitemap.xml
- Semantic HTML structure

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile devices (< 640px)
- Tablets (640px - 1024px)
- Desktops (> 1024px)
- Wide screens (> 1280px)

## 🔄 Continuous Integration/Deployment

Deployment is handled through Vercel with:
- Automatic deployments on push to main branch
- Preview deployments for pull requests
- Custom domain configuration

## 🤝 Contributing

If you're interested in contributing to this project:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Damian - [gabbydamian92@gmail.com](mailto:gabbydamian92@gmail.com)

Project Link: [https://github.com/Gabbydamian/portfolio](https://github.com/Gabbydamian/portfolio)

---

<p align="center">
  Built with ❤️ by Damian Gabriel | Quantity Surveyor turned Frontend Developer
</p>
