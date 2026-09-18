import { type FormEvent, useState } from 'react'

type FormValues = {
  name: string
  email: string
  message: string
  website: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: FormValues = {
  name: '',
  email: '',
  message: '',
  website: '',
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.'
  }

  return errors
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-lg border bg-transparent px-3 py-2 text-ink transition focus:outline-none ${
    hasError
      ? 'border-red-500 focus:border-red-500'
      : 'border-line focus:border-accent'
  }`

function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isValid = Object.keys(validate(values)).length === 0

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = (await response.json()) as {
        ok: boolean
        message?: string
      }

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? 'Something went wrong.')
      }

      setStatus('success')
      setValues(initialValues)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong.',
      )
    }
  }

  const setField = (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const isDisabled = !isValid || status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
    >
      {status === 'success' && (
        <p className="rounded-lg border border-green-600 bg-green-600/10 px-4 py-3 text-sm text-green-700">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-lg border border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <input
        type="text"
        name="website"
        value={values.website}
        onChange={setField('website')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={setField('name')}
          aria-invalid={Boolean(errors.name)}
          className={inputClass(Boolean(errors.name))}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={setField('email')}
          aria-invalid={Boolean(errors.email)}
          className={inputClass(Boolean(errors.email))}
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={setField('message')}
          aria-invalid={Boolean(errors.message)}
          className={inputClass(Boolean(errors.message))}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="btn btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}

export default ContactForm