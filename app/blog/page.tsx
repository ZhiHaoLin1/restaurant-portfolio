import supabase from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .order("timestamp", { ascending: false });

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-[#e8e0d6]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0a0a0a]/80 border-b border-[#2a2725]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-semibold tracking-tight">
            Zhi<span className="text-[#c9a85c]">.</span>
          </Link>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c9a85c]">
            Instagram Feed · Test
          </span>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[#c9a85c] text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Instagram Feed
            </p>
            <h1 className="font-display text-5xl md:text-6xl font-bold">
              Latest Posts
            </h1>
            <p className="text-[#e8e0d6]/50 mt-4 text-lg max-w-xl mx-auto">
              Automatically pulled from Instagram. Every post becomes an article.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#c9a85c] to-transparent mb-16" />

          {/* Grid */}
          {!posts || posts.length === 0 ? (
            <p className="text-center text-[#e8e0d6]/40">No posts found.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const isVideo = post.media_url?.includes(".mp4");
                const imageSrc = isVideo ? post.thumbnail_url : post.media_url;

                return (
                  <Link
                    key={post.instagram_post_id}
                    href={`/blog/${post.instagram_post_id}`}
                    className="group portfolio-card"
                  >
                    {/* Image */}
                    {imageSrc && (
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={post.caption?.slice(0, 60) || "Instagram post"}
                          className="card-image w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs font-medium text-[#c9a85c] mb-3">
                        {new Date(post.timestamp).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-[#e8e0d6]/70 leading-relaxed line-clamp-3">
                        {post.caption || "No caption"}
                      </p>
                      <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[#c9a85c] opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
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
