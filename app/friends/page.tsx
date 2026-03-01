import { FriendsPageContent } from "@/components/friends-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import friendsData from "@/data/friends.json"
import { resolveAllAvatars, type FriendRaw } from "@/lib/resolve-avatar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Friends",
  description: "The people who actually matter to me. Wouldn't trade any of them.",
  openGraph: {
    title: "Friends | RejectModders",
    description: "The people who actually matter to me. Wouldn't trade any of them.",
    url: "https://rejectmodders.is-a.dev/friends",
  },
  twitter: {
    title: "Friends | RejectModders",
    description: "The people who actually matter to me.",
  },
}

// Revalidate every 24 hours so avatars stay fresh without rebuilding
export const revalidate = 86400

export default async function FriendsPage() {
  const resolved = await resolveAllAvatars(friendsData as FriendRaw[])

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <FriendsPageContent friends={resolved} />
      <FooterSection />
    </main>
  )
}
