import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_LOGIN,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const data = await request.json();

  try {
    transporter.sendMail({
      from: 'Michalina <bugs@notatkanek.com>',
      to: process.env.BUG_MAIL,
      subject: 'New bug report',
      text: data,
    });
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json({ message: 'Bug report sent' });
}
