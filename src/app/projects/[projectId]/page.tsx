export default async function project({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const data = await params;
  return <h1>Here is project number {data.projectId}</h1>;
}
