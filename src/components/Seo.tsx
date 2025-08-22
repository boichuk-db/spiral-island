export function getSeo({
  title,
  description,
  image,
  url,
}: {
  title: string
  description: string
  image?: string
  url: string
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [image] : ['/spiral-logo.svg'],
      url,
    },
    icons: {
      icon: '/spiral-logo.svg',
    },
  }
}
