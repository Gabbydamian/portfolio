import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";

export const metadata: Metadata = {
  title: "Privacy Policy | Damian Gabriel Portfolio",
  description:
    "Learn how Damian Gabriel Portfolio collects, uses, and protects your personal information. We value your privacy and are committed to transparency.",
  openGraph: {
    title: "Privacy Policy | Damian Gabriel Portfolio",
    description:
      "Learn how Damian Gabriel Portfolio collects, uses, and protects your personal information. We value your privacy and are committed to transparency.",
    url: "https://astridamian.vercel.app/privacy",
    siteName: "Damian Gabriel Portfolio",
    images: [
      {
        url: "https://astridamian.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damian Gabriel Portfolio Privacy Policy",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  alternates: {
    canonical: "https://astridamian.vercel.app/privacy",
  },
  category: "Legal",
};

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      <main className="container mx-auto max-w-2xl px-4 py-16 mt-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use this website.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>Optional Information:</strong> When you submit a blog post,
            you may choose to provide your name and email address. This
            information is entirely optional and is only used for the purposes
            described below.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Your name (if provided) may be displayed as the author of your blog
            post.
          </li>
          <li>
            Your email (if provided) may be used to contact you about your
            submission or for follow-up questions.
          </li>
          <li>
            We do not use your information for marketing or share it with third
            parties.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Data Security</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            We take reasonable measures to protect your information from
            unauthorized access or disclosure.
          </li>
          <li>
            Your data is stored securely and only accessible to authorized
            personnel.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Your Rights</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>
            You may request deletion of your personal information at any time by
            contacting us.
          </li>
          <li>
            We will promptly remove your data upon request, unless required by
            law to retain it.
          </li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2">Contact</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or
          your data, please contact us at{" "}
          <a
            href="mailto:gabbydamian92@gmail.com"
            className="text-primary underline"
          >
            gabbydamian92@gmail.com
          </a>
          .
        </p>
        <p className="text-sm text-muted-foreground mt-8">
          This policy may be updated from time to time. Please review it
          periodically for changes.
        </p>
      </main>
    </MainLayout>
  );
}
