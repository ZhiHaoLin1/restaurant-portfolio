import supabase from "@/lib/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("instagram_post_id", slug)
    .single();

  if (!post) notFound();

  const isVideo = post.media_url?.includes(".mp4");
  const imageSrc = isVideo ? post.thumbnail_url : post.media_url;

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#e8e0d6]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2725]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            Zhi<span className="text-[#c9a85c]">.</span>
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-[#e8e0d6]/60 hover:text-[#c9a85c] transition-colors flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            All Posts
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Date */}
          <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-6">
            {new Date(post.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Image */}
          {imageSrc && (
            <div className="rounded-lg overflow-hidden border border-[#2a2725] mb-10">
              <img
                src={imageSrc}
                alt={post.caption?.slice(0, 60) || "Instagram post"}
                className="w-full object-cover"
              />
            </div>
          )}

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a85c] to-transparent mb-10" />

          {/* Caption */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-[#e8e0d6]/80 leading-relaxed whitespace-pre-wrap">
              {post.caption || "No caption"}
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#2a2725] to-transparent mt-12 mb-8" />

          {/* View on Instagram */}
          {post.permalink && (
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#c9a85c] hover:text-[#dfc88a] transition-colors"
            >
              View on Instagram
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#2a2725] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#e8e0d6]/40">
          <p className="font-display">
            Zhi Lin <span className="text-[#c9a85c]">·</span> Restaurant Web Design
          </p>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
