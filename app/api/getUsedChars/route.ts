import { NextResponse } from 'next/server';

export async function GET() {
  const chars = await fetch(`https://api-free.deepl.com/v2/usage`, {
    method: 'GET',
    headers: {
      Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH!}`,
    },
  }).then((resp) => {
    return resp.json();
  });

  return NextResponse.json({ chars });
}
