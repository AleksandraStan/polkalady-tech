# Adding a Blog Article

Articles live in `src/content/articles.ts`.

To publish a new article:

1. Open `src/content/articles.ts`.
2. 2. Copy one complete article object.
   3. 3. Change its `number`, `slug`, title, metadata, introduction, and sections.
      4. 4. Keep the `slug` lowercase and separate words with hyphens.
         5. 5. Commit the change to `main`.
           
            6. GitHub Pages deploys the update automatically.
           
            7. Example:
           
            8. ```ts
               {
                 number: "04",
                 slug: "my-new-article",
                 title: "My New Article",
                 category: "Ideas",
                 readTime: "5 min",
                 published: "June 2026",
                 intro: "A short introduction shown at the beginning of the article.",
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
               
