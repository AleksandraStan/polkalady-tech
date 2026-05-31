# Adding a Blog Article

Articles live in `src/content/articles.ts`.

To publish a new article:

1. Open `src/content/articles.ts`.
2. Copy one complete article object.
3. Change its `number`, `slug`, title, metadata, introduction, and sections.
4. Keep the `slug` lowercase and separate words with hyphens.
5. Add optional photos or videos in `media`.
6. Commit the change to `main`.

GitHub Pages deploys the update automatically.

Example:

```ts
{
  number: "04",
  slug: "my-new-article",
  title: "My New Article",
  category: "Ideas",
  readTime: "5 min",
  published: "June 2026",
  intro: "A short introduction shown at the beginning of the article.",
  media: [
    {
      type: "image",
      src: "my-photo.jpg",
      alt: "Describe the photo",
      caption: "Optional caption.",
    },
    {
      type: "video",
      src: "my-video.mp4",
      poster: "video-cover.jpg",
      caption: "Optional caption.",
    },
  ],
  sections: [
    {
      heading: "First section",
      paragraphs: [
        "Your first paragraph.",
        "Your second paragraph.",
      ],
    },
  ],
},
```

Put image and video files in the `public` folder, then use only the filename in
`src`, as shown above. You can also use a complete URL beginning with `https://`.

Portfolio projects work in the same way. Add them in `src/content/projects.ts`.
