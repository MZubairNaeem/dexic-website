import type { APIRoute } from 'astro'
import nodemailer from 'nodemailer'
import { getPool } from '../../lib/db'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()
  const { name, email, company, product, date, message } = body

  if (!name || !email) {
    return new Response(JSON.stringify({ message: 'Name and email are required.' }), { status: 400 })
  }

  await getPool().query(
    `insert into demo_requests (product, name, email, company, preferred_date, message) values ($1, $2, $3, $4, $5, $6)`,
    [product || 'Dexic product', name, email, company || null, date || null, message || null]
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
        subject: `Demo request: ${product || 'Dexic product'}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'n/a'}\nPreferred date: ${date || 'n/a'}\n\n${message || ''}`
      })
    } catch (err) {
      console.error('Failed to send demo notification email', err)
    }
  }

  return new Response(JSON.stringify({ message: 'Demo request received!' }), { status: 200 })
}
