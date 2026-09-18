import { type FormEvent, useState } from 'react'

type FormValues = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = { name: '', email: '', message: '' }
const contactEmail = 'cobyshelton17@gmail.com'

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

  const isValid = Object.keys(validate(values)).length === 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) return

    const { name, message } = values
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}`)
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
  }

  const setField = (field: keyof FormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }))
    }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto mt-10 flex max-w-md flex-col gap-4 text-left"
    >
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
        disabled={!isValid}
        className="btn btn-primary px-6 py-3 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactForm