// friends
export const friendsHeadLine = "My closest friends!"
export const friendsIntro = "Meet some interesting friends."


// friends
export type FriendItemType = {
  name: string
  description?: string
  link: { href: string, label?: string }
  logo?: string
}

export const friends: Array<FriendItemType> = [
  {
    name: 'FeralHS',
    link: { href: 'https://discord.com/users/935404512691224586' },
    logo: 'https://cdn.is-it.pink/u/FeralHS.png' 
  },
  {
    name: 'weebUHD',
    link: { href: 'https://discord.com/users/402921518515879937' },
    logo: 'https://cdn.is-it.pink/u/weebUHD.jpg'
  },
  {
    name: 'Jiggly Balls',
    link: { href: 'https://discord.com/users/1022085572719808542' },
    logo: 'https://cdn.is-it.pink/u/jiggly-balls.jpg'
  },
]


