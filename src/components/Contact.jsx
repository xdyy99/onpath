import { useEffect, useRef, useState } from 'react'
import { submitShopifyContactForm } from '../lib/shopifyContactForm'

const CATEGORIES = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[\d+\-\s()]{6,}$/

const buildEmptyForm = () => ({
  name: '',
  phone: '',
  email: '',
  message: '',
})

const Contact = () => {
  const [formData, setFormData] = useState(buildEmptyForm)
  const [selected, setSelected] = useState(null)
  const [errors, setErrors] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formFeedback, setFormFeedback] = useState(null)
  const [formFeedbackTone, setFormFeedbackTone] = useState('success')

  const selectRef = useRef(null)

  const handleCloseContact = () => {
    const contact = document.getElementById('contact')
    contact.classList.remove('--active')
  }

  const toggleOpen = () => setIsOpen((prev) => !prev)

  const clearError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleChange = (key) => (event) => {
    const value = event.target.value
    setFormData((prev) => ({ ...prev, [key]: value }))
    clearError(key)
    setFormFeedback(null)
  }

  const handleSelect = (option) => {
    setSelected(option)
    setIsOpen(false)
    clearError('category')
    setFormFeedback(null)
  }

  const validate = () => {
    const next = {}
    if (!formData.name.trim()) {
      next.name = 'Please enter your name.'
    }
    if (!formData.phone.trim()) {
      next.phone = 'Please enter your phone number.'
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      next.phone = 'Please enter a valid phone number.'
    }
    if (!formData.email.trim()) {
      next.email = 'Please enter your email.'
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (!selected) {
      next.category = 'Please choose a category.'
    }
    if (!formData.message.trim()) {
      next.message = 'Please enter a message.'
    }
    return next
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormFeedback(null)
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    if (submitting) return

    setSubmitting(true)
    try {
      await submitShopifyContactForm({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        category: selected,
        message: formData.message,
      })
      setFormFeedbackTone('success')
      setFormFeedback('Message sent. We’ll get back to you as soon as we can.')
      setFormData(buildEmptyForm())
      setSelected(null)
      setErrors({})
    } catch (err) {
      setFormFeedbackTone('error')
      setFormFeedback(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const fieldClass = (key, base = '') =>
    `${base}${errors[key] ? ' --error' : ''}`.trim()

  return (
    <div id="contact" className="contact">
      <div className="contact-wrapper">
        <div className="contact-header">
          <div className="contact-title">Contact Us</div>
          <div className="contact-close" onClick={handleCloseContact}>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <form
              className="contact-form-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={fieldClass('name', 'contact-field')}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleChange('name')}
                  disabled={submitting}
                  autoComplete="name"
                />
                {errors.name && (
                  <div className="contact-field-error">{errors.name}</div>
                )}
              </div>
              <div className={fieldClass('phone', 'contact-field')}>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone*"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  disabled={submitting}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <div className="contact-field-error">{errors.phone}</div>
                )}
              </div>
              <div className={fieldClass('email', 'contact-field')}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange('email')}
                  disabled={submitting}
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="contact-field-error">{errors.email}</div>
                )}
              </div>
              <div className={fieldClass('category', 'contact-field')}>
                <div
                  ref={selectRef}
                  className={`contact-select${isOpen ? ' --open' : ''}`}
                >
                  <div
                    className="value"
                    onClick={() => !submitting && toggleOpen()}
                  >
                    {selected ?? 'Choose a category*'}
                  </div>
                  <div
                    className="icon"
                    onClick={() => !submitting && toggleOpen()}
                  >
                    <img src="/icons/down.svg" alt="" />
                  </div>
                  <ul className="options">
                    {CATEGORIES.map((option) => (
                      <li
                        key={option}
                        className={selected === option ? '--active' : ''}
                        onClick={() => !submitting && handleSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
                {errors.category && (
                  <div className="contact-field-error">{errors.category}</div>
                )}
              </div>
              <div className={fieldClass('message', 'contact-field')}>
                <textarea
                  name="message"
                  placeholder="Message*"
                  value={formData.message}
                  onChange={handleChange('message')}
                  disabled={submitting}
                />
                {errors.message && (
                  <div className="contact-field-error">{errors.message}</div>
                )}
              </div>
              {formFeedback && (
                <div
                  className={`contact-form-feedback contact-form-feedback--${formFeedbackTone}`}
                  role="status"
                >
                  {formFeedback}
                </div>
              )}
              <button
                className={`btn btn-primary${submitting ? ' --loading' : ''}`}
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? 'SENDING…' : 'SUBMIT'}
                {submitting ? (
                  <span className="contact-form__spinner" aria-hidden>
                    <img
                      src="/icons/loading.svg"
                      alt=""
                      width={40}
                      height={40}
                    />
                  </span>
                ) : (
                  <img src="/icons/arr-right-long.svg" alt="" />
                )}
              </button>
            </form>
          </div>
        </div>
        <div className="contact-footer">
          <div className="contact-footer-title">Follow us</div>
          <ul className="contact-social">
            <li>
              <a href="#">
                <img src="/icons/sc-tiktok.svg" alt="TikTok" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/icons/sc-ins.svg" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/icons/sc-yt.svg" alt="YouTube" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/icons/sc-x.svg" alt="YouTube" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/icons/sc-pin.svg" alt="Pinterest" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/icons/sc-thread.svg" alt="Threads" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="contact-background" onClick={handleCloseContact}></div>
    </div>
  )
}

export default Contact
