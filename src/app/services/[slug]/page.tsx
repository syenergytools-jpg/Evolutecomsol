import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { services } from "@/lib/site-config";
import { servicePages } from "@/lib/service-pages";
import { ServicePageTemplate } from "@/components/sections/service-page-template";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return { title: "Service" };
  return {
    title: `${service.title} · Evolut`,
    description: service.detail,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  // 404 if there's no rich page data for this slug
  if (!servicePages[slug]) notFound();

  return (
    <>
      <Navbar />
      {/* Pass only the slug — the client template resolves the rich
          data itself so non-serializable LucideIcon refs don't cross
          the server→client boundary. */}
      <ServicePageTemplate slug={slug} />
      <Footer />
    </>
  );
}
