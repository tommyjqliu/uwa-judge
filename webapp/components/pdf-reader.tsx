export default function PdfReader({
  url,
  className,
}: {
  url: string;
  className?: string;
}) {
  return <iframe src={url} width="100%" height="100%" className={className} />;
}
