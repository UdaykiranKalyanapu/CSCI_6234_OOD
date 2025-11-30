import PlaylistTab from "@/components/PlaylistTab";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { useMusicStore } from "@/stores/MusicStore";
import { useUser } from "@clerk/clerk-react";
import {
  Music2,
  Library,
  MessageSquare,
  LockKeyholeOpen,
  LockKeyhole,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/AuthStore";

/**
 * LeftSidebar.tsx
 * - Logs `albums` to the console whenever it changes
 * - Renders a small debug panel in the UI with the raw albums object/array
 * - Guards .map with an Array.isArray check to avoid runtime crashes
 */

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const { isAdmin } = useAuthStore();
  const { user } = useUser();
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  // Log the raw albums value so you can see the exact shape in the browser console
  useEffect(() => {
    console.log("LeftSidebar albums (raw):", albums);
    console.log("LeftSidebar albums type:", typeof albums, "isArray:", Array.isArray(albums));
  }, [albums]);

  // Normalize for rendering
  const albumsArr = Array.isArray(albums) ? albums : [];

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation Menu */}
      <div className="h-full bg-purple-950 rounded-lg flex flex-col p-4">
        <div className="space-y-2">
          {/* Home */}
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-500",
              })
            )}
          >
            <Music2 className="mr-2 size-6" />
            <span className="hidden md:inline">Home</span>
          </Link>

          {/* Chat (clickable only if logged in) */}
          {user ? (
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg-zinc-500",
                })
              )}
            >
              <MessageSquare className="mr-2 size-6 text-emerald-500" />
              <span className="hidden md:inline">Chat</span>
            </Link>
          ) : (
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white opacity-70 cursor-not-allowed",
                })
              )}
            >
              <MessageSquare className="mr-2 size-6 text-red-500" />
              <span className="hidden md:inline">Chat (Login Required)</span>
            </div>
          )}

          {/* Admin Dashboard */}
          {isAdmin && user ? (
            <Link
              to={"/admin"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg-zinc-500",
                })
              )}
            >
              <LockKeyholeOpen className="mr-2 size-6 text-emerald-500" />
              <span className="hidden md:inline">Admin Dashboard</span>
            </Link>
          ) : (
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white opacity-70 cursor-not-allowed",
                })
              )}
            >
              <LockKeyhole className="mr-2 size-6 text-red-500" />
              <span className="hidden md:inline">Admin (Restricted)</span>
            </div>
          )}
        </div>
      </div>

      {/* Library Section */}
      <div className="h-full bg-purple-950 rounded-lg flex flex-col p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Albums</span>
          </div>

          {/* Debug toggle */}
          <button
            onClick={() => setShowDebug((s) => !s)}
            className="text-xs text-zinc-300 hover:text-white"
            aria-expanded={showDebug}
          >
            {showDebug ? "Hide debug" : "Show debug"}
          </button>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistTab />
            ) : albumsArr.length > 0 ? (
              albumsArr.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-500 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album by {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-sm text-zinc-400 p-2">No albums to show.</div>
            )}
          </div>

          {/* Debug panel - prints the raw albums object/array for inspection */}
          {showDebug && (
            <div className="mt-4 bg-zinc-900 text-zinc-200 p-3 rounded-md text-xs">
              <div className="mb-2 text-sm font-medium">Albums debug</div>
              <div className="mb-2">
                <strong>Type:</strong> {typeof albums} • <strong>isArray:</strong>{" "}
                {Array.isArray(albums) ? "true" : "false"}
              </div>
              <pre className="whitespace-pre-wrap break-words text-[11px]">
                {JSON.stringify(albums, null, 2)}
              </pre>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
