import { notFound } from "next/navigation";
import TemplatePreviewClient from "@/components/TemplatePreviewClient";
import { getTemplate, isTemplateId } from "@/lib/templates";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TemplatePage({ params }: Props) {
  const { id } = await params;
  if (!isTemplateId(id)) notFound();

  return <TemplatePreviewClient template={getTemplate(id)} />;
}
