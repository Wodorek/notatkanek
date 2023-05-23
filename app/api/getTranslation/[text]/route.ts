import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { text: string };
  }
) {
  const translated = await fetch(
    `https://api-free.deepl.com/v2/translate?text=${params.text}&target_lang=PL`,
    {
      method: 'GET',
      headers: {
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH!}`,
        ContentType: 'application/x-www-form-urlencoded',
      },
    }
  ).then((resp) => {
    return resp.json();
  });

  return NextResponse.json({ translated });
}
