import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'
import { getPool } from '../../lib/db'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { name, email, company, subject, message } = body

  if (!name || !email || !subject || !message) {
    return new Response(JSON.stringify({ message: 'All fields are required.' }), { status: 400 })
  }

  await getPool().query(
    `insert into contact_submissions (name, email, company, subject, message) values ($1, $2, $3, $4, $5)`,
    [name, email, company || null, subject, message]
  )

  if (import.meta.env.CONTACT_EMAIL && import.meta.env.CONTACT_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: import.meta.env.CONTACT_EMAIL,
          pass: import.meta.env.CONTACT_PASS
        }
      })
      await transporter.sendMail({
        from: email,
        to: import.meta.env.CONTACT_EMAIL,
        subject: `New contact form message: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'n/a'}\n\n${message}`
      })
    } catch (err) {
      console.error('Failed to send contact notification email', err)
    }
  }

  return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 })
}
