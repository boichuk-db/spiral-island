export type Chapter = {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image: string
  chapterNumber: number
  readingTime: number
}

export type Character = {
  id: number
  slug: string
  name: string
  role: string
  bio: string
  avatar: string
  tags: string[]
  firstAppearanceChapter: number
}
