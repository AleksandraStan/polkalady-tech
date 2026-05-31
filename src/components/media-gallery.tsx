import type { ArticleMedia } from "../content/articles";

interface MediaGalleryProps {
  media?: ArticleMedia[];
}

function mediaUrl(src: string) {
  return src.startsWith("http") ? src : `${import.meta.env.BASE_URL}${src}`;
}

export default function MediaGallery({ media = [] }: MediaGalleryProps) {
  if (media.length === 0) {
    return null;
  }

  return (
    <div className="media-gallery">
      {media.map((item, index) => (
        <figure key={`${item.src}-${index}`}>
          {item.type === "video" ? (
            <video controls playsInline poster={item.poster ? mediaUrl(item.poster) : undefined}>
              <source src={mediaUrl(item.src)} />
            </video>
          ) : (
            <img src={mediaUrl(item.src)} alt={item.alt ?? ""} />
          )}
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
