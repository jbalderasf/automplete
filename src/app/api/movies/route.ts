import { getData } from '@/data';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get('filter');
  const movies = await getData(filter);
  return Response.json({ movies })
}
