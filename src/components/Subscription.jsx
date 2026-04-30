import { useState } from 'react'
import { subscribeEmailViaCustomerCreate } from '../lib/shopifyCustomerSubscribe'

const Subscription = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [feedbackTone, setFeedbackTone] = useState('error')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFeedback(null)
    setLoading(true)
    try {
      await subscribeEmailViaCustomerCreate(email)
      setFeedbackTone('success')
      setFeedback('Thanks — you’re on the list.')
      setEmail('')
    } catch (err) {
      setFeedbackTone('error')
      setFeedback(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="subscription">
      <div className="subscription-wrapper">
        <h2 className="subscription-title">Letters from the studio.</h2>
        <form className="subscription-form" onSubmit={handleSubmit} noValidate>
          <div className="subscription-form__row">
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
              setEmail(e.target.value)
              setFeedback(null)
            }}
              disabled={loading}
              aria-invalid={feedbackTone === 'error' && Boolean(feedback)}
              aria-describedby={
                feedback ? 'subscription-form-feedback' : undefined
              }
            />
            <button
              type="submit"
              className={`subscription-form__submit${loading ? ' --loading' : ''}`}
              disabled={loading}
              aria-busy={loading}
              aria-label={loading ? 'Subscribing…' : 'Subscribe to newsletter'}
            >
              {loading ? (
                <span className="subscription-form__spinner" aria-hidden>
                  <img src="/icons/loading.svg" alt="" width={24} height={24} />
                </span>
              ) : (
                <img src="/icons/arr-upright.svg" alt="" />
              )}
            </button>
          </div>
          {feedback && (
            <p
              id="subscription-form-feedback"
              className={`subscription-form-feedback subscription-form-feedback--${feedbackTone}`}
              role="status"
            >
              {feedback}
            </p>
          )}
        </form>
      </div>
    </footer>
  )
}

export default Subscription
