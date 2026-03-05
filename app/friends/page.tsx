import type { Metadata } from "next"
import { FriendsPageContent } from "@/components/friends-page-content"
import { Navbar } from "@/components/navbar"
import { FooterSection } from "@/components/footer-section"
import friendsData from "@/data/friends.json"
import { resolveAllAvatars, type FriendRaw } from "@/lib/resolve-avatar"
import { CACHE_DURATION_PAGE, SITE_NAME, SITE_URL } from "@/config/constants"

export const metadata: Metadata = {
  title: "Friends",
  description: `Meet the friends and collaborators of ${SITE_NAME}. The people who matter most.`,
  alternates: {
    canonical: `${SITE_URL}/friends`,
  },
}

// Revalidate every 2 hours via ISR — avatars are resolved server-side and
// baked into the RSC payload, so /api/avatar is never called from the browser.
export const revalidate = CACHE_DURATION_PAGE

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

