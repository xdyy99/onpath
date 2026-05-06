import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { SOCIAL_LINKS } from '../constants/socialLinks'
import AccountDashboard from '../components/AccountDashboard'
import {
  clearAuthError,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
} from '../store/slices/authSlice'
import {
  storefrontCustomerCreate,
  storefrontCustomerAccessTokenCreate,
  storefrontCustomerByAccessToken,
} from '../lib/shopifyStorefrontAuth'

const emptyRegister = () => ({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptsMarketing: false,
})

const emptyLogin = () => ({
  email: '',
  password: '',
})

const Account = () => {
  const dispatch = useDispatch()
  const {
    loading,
    error: authError,
    isAuthenticated,
    user,
    customerAccessToken,
  } = useSelector((state) => state.auth)

  const [isRegister, setIsRegister] = useState(false)
  const [registerForm, setRegisterForm] = useState(emptyRegister)
  const [loginForm, setLoginForm] = useState(emptyLogin)
  const [registerSuccess, setRegisterSuccess] = useState(null)

  const switchMode = (register) => {
    dispatch(clearAuthError())
    setRegisterSuccess(null)
    setIsRegister(register)
    if (register) {
      setLoginForm(emptyLogin())
    } else {
      setRegisterForm(emptyRegister())
    }
  }

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target
    dispatch(clearAuthError())
    setRegisterSuccess(null)
    setRegisterForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    dispatch(clearAuthError())
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearAuthError())
    setRegisterSuccess(null)

    if (registerForm.password !== registerForm.confirmPassword) {
      dispatch(loginFailure('Passwords do not match.'))
      return
    }
    if (registerForm.password.length < 5) {
      dispatch(
        loginFailure(
          'Password must be at least 5 characters (Shopify minimum).'
        )
      )
      return
    }

    dispatch(loginStart())
    try {
      await storefrontCustomerCreate({
        firstName: registerForm.firstName.trim(),
        lastName: registerForm.lastName.trim(),
        email: registerForm.email.trim(),
        password: registerForm.password,
        acceptsMarketing: registerForm.acceptsMarketing,
      })
      dispatch(loginFailure(null))
      setRegisterSuccess(
        'Account created. Check your email for a link to activate your account, then sign in below.'
      )
      setRegisterForm(emptyRegister())
      setIsRegister(false)
    } catch (err) {
      dispatch(
        loginFailure(
          err instanceof Error ? err.message : 'Could not create account.'
        )
      )
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearAuthError())

    dispatch(loginStart())
    try {
      const { accessToken, tokenExpiresAt } =
        await storefrontCustomerAccessTokenCreate(
          loginForm.email.trim(),
          loginForm.password
        )
      const customer = await storefrontCustomerByAccessToken(accessToken)
      dispatch(
        loginSuccess({
          user: {
            id: customer?.id ?? 'customer',
            email: customer?.email ?? loginForm.email.trim(),
            firstName: customer?.firstName,
            lastName: customer?.lastName,
          },
          customerAccessToken: accessToken,
          idToken: null,
          tokenExpiresAt,
        })
      )
      setLoginForm(emptyLogin())
    } catch (err) {
      dispatch(
        loginFailure(
          err instanceof Error
            ? err.message
            : 'Sign-in failed. If you just registered, activate your account from the email first.'
        )
      )
    }
  }

  const handleSignOut = () => {
    dispatch(logout())
  }

  return (
    <div className="account">
      <div className="account-wrapper">
        {!isAuthenticated && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="account-title"
          >
            {isRegister ? 'Register' : 'Sign in'}
          </motion.h1>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: isAuthenticated ? 0.2 : 0.8 }}
          className={`account-login${isAuthenticated ? ' account-login--dashboard' : ''}`}
        >
          <div
            className={`contact-content${isAuthenticated ? ' contact-content--flush' : ''}`}
          >
            {isAuthenticated && customerAccessToken ? (
              <AccountDashboard
                accessToken={customerAccessToken}
                user={user}
                onSignOut={handleSignOut}
              />
            ) : isAuthenticated ? (
              <div className="contact-form">
                <p className="account-signed-in-email">
                  Session is missing a customer token. Please sign in again.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSignOut}
                >
                  Sign out
                  <img src="/icons/arr-right-long.svg" alt="" />
                </button>
              </div>
            ) : (
              <div className="contact-form">
                {/* <p className="account-oauth-copy">
                  {isRegister
                    ? 'Create an account. Shopify will email you to activate it when classic customer accounts and notifications are enabled.'
                    : 'Sign in with your email and password after your account is active.'}
                </p> */}

                {registerSuccess && (
                  <div
                    className="contact-form-feedback contact-form-feedback--success"
                    role="status"
                  >
                    {registerSuccess}
                  </div>
                )}

                {authError && (
                  <div
                    className="contact-form-feedback contact-form-feedback--error"
                    role="alert"
                  >
                    {authError}
                  </div>
                )}

                {isRegister ? (
                  <form
                    className="contact-form-form"
                    onSubmit={handleRegisterSubmit}
                    noValidate
                  >
                    <div className="contact-field">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name*"
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name*"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        autoComplete="family-name"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password*"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        disabled={loading}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    <label
                      htmlFor="acceptsMarketing"
                      className="contact-field-checkbox"
                    >
                      <input
                        type="checkbox"
                        name="acceptsMarketing"
                        id="acceptsMarketing"
                        checked={registerForm.acceptsMarketing}
                        onChange={handleRegisterChange}
                        disabled={loading}
                      />
                      <span className="icon"></span>
                      <span className="text">Receive news and offers</span>
                    </label>
                    <div className="contact-field-buttons">
                      <button
                        className="account-toggle"
                        type="button"
                        onClick={() => switchMode(false)}
                        disabled={loading}
                      >
                        Already have an account? Sign in
                      </button>
                      <button
                        className={`btn btn-primary${loading ? ' --loading' : ''}`}
                        type="submit"
                        disabled={loading}
                        aria-busy={loading}
                      >
                        {loading ? 'PLEASE WAIT…' : 'SIGN UP'}
                        {loading ? (
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
                    </div>
                  </form>
                ) : (
                  <form
                    className="contact-form-form"
                    onSubmit={handleLoginSubmit}
                    noValidate
                  >
                    <div className="contact-field">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        disabled={loading}
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password*"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        disabled={loading}
                        autoComplete="current-password"
                        required
                      />
                    </div>
                    <div className="contact-field-buttons">
                      <button
                        type="button"
                        className="account-toggle"
                        onClick={() => switchMode(true)}
                        disabled={loading}
                      >
                        Need an account? Register
                      </button>
                      <button
                        className={`btn btn-primary${loading ? ' --loading' : ''}`}
                        type="submit"
                        disabled={loading}
                        aria-busy={loading}
                      >
                        {loading ? 'PLEASE WAIT…' : 'SIGN IN'}
                        {loading ? (
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
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
          <div className="contact-footer">
            <div className="contact-footer-title">Follow us</div>
            <ul className="contact-social">
              {SOCIAL_LINKS.map(({ href, icon, label }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <img src={icon} alt={label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Account
