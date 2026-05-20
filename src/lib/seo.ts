import type { Metadata } from "next";

export const siteUrl = "https://aixco-energy.vercel.app";
export const siteName = "AIXCO Energy";
export const siteTitle = "AIXCO Energy | Renewable Energy Investment Platform";
export const siteDescription =
  "AIXCO Energy focuses on scalable renewable infrastructure including solar, wind, hydrogen, battery storage and intelligent grid-connected projects.";

const defaultImage = "/aixco-energy/images/misc/p1.webp";

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description = siteDescription,
  path = "/",
  image = defaultImage,
  type = "website",
}: PageMetadataInput): Metadata {
  const absoluteTitle = title === siteTitle ? title : `${title} | ${siteName}`;
  const url = new URL(path, siteUrl).toString();
  const imageUrl = new URL(image, siteUrl).toString();

  return {
    title: absoluteTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: absoluteTitle,
      description,
      url,
      siteName,
      type,
      images: [
        {
          url: imageUrl,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle,
      description,
      images: [imageUrl],
    },
  };
}
