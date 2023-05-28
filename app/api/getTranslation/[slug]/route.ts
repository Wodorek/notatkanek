import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const translated = await fetch(
    `https://api-free.deepl.com/v2/translate?text=${params.slug}&target_lang=PL`,
    {
      method: 'POST',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH!}`,
      },
    }
  ).then((res) => {
    return res.json();
  });

  return NextResponse.json({ translated });
}
