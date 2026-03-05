import { FriendsPageContent } from "@/components/friends-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import friendsData from "@/data/friends.json"
import { resolveAllAvatars, type FriendRaw } from "@/lib/resolve-avatar"

// Revalidate every 2 hours via ISR — avatars are resolved server-side and
// baked into the RSC payload, so /api/avatar is never called from the browser.
export const revalidate = 7200

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

