import Link from "next/link";

const RelatedPosts = ({ slug, image, category, title, categorySlug }) => (
  <div id={`item-2`} className={`post column-post`}>
    <Link href={"/" + slug} className="media">
      <div
        className="media"
        style={{
          backgroundImage: image?.includes("http")
            ? `url(${image})`
            : `url(/posts/${image})`,
        }}
      ></div>
    </Link>
    <div className="main-post-inner caption">
      <Link
        href={"/" + categorySlug}
        alt={category}
        className="post-category author"
      >
        {category}
      </Link>
      <Link href={"/" + slug} className="post-link">
        <h2 className="title">{title}</h2>
      </Link>
    </div>
  </div>
);

export default RelatedPosts;
