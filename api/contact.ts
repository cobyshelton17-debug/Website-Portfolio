import { Resend } from 'resend'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const resend = new Resend(process.env.RESEND_API_KEY)

const CONTACT_EMAIL = 'cobyshelton17@gmail.com'
const SENDER_EMAIL = 'onboarding@resend.dev'

type ContactBody = {
  name?: string
  email?: string
  message?: string
  website?: string
}

function validate(body: ContactBody): string[] {
  const errors: string[] = []

  if (!body.name || !body.name.trim()) {
    errors.push('Name is required.')
  }

  if (!body.email || !body.email.trim()) {
    errors.push('Email is required.')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    errors.push('Enter a valid email address.')
  }

  if (!body.message || !body.message.trim()) {
    errors.push('Message is required.')
  } else if (body.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters.')
  }

  return errors
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, message: 'Method not allowed.' })
    return
  }

  const body = (req.body ?? {}) as ContactBody

  if (body.website && body.website.length > 0) {
    res.status(200).json({ ok: true })
    return
  }

  const errors = validate(body)
  if (errors.length > 0) {
    res.status(400).json({ ok: false, errors })
    return
  }

  const name = body.name!.trim()
  const email = body.email!.trim()
  const message = body.message!.trim()

  try {
    await resend.emails.send({
      from: SENDER_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `${message}\n\n— ${name}\n${email}`,
    })
    res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    res.status(500).json({ ok: false, message: 'Failed to send message.' })
  }
}