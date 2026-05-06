import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { fetchCustomerAccountData } from '../lib/shopifyStorefrontAuth'

const formatMoney = (amount, currencyCode) => {
  if (amount == null || !currencyCode) return '—'
  const n = Number(amount)
  if (Number.isNaN(n)) return `${amount} ${currencyCode}`
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
    }).format(n)
  } catch {
    return `${n} ${currencyCode}`
  }
}

const addressLines = (a) => {
  if (!a) return []
  if (Array.isArray(a.formatted) && a.formatted.length) {
    return a.formatted.filter(Boolean)
  }
  if (typeof a.formatted === 'string' && a.formatted.trim()) {
    return [a.formatted.trim()]
  }
  const parts = [
    [a.address1, a.address2].filter(Boolean).join(', '),
    [a.city, a.province, a.zip].filter(Boolean).join(', '),
    a.country,
  ].filter(Boolean)
  return parts.length ? parts : []
}

const isSameAddress = (a, b) => {
  if (!a || !b) return false
  return a.id === b.id
}

const AccountDashboard = ({ accessToken, user: initialUser, onSignOut }) => {
  const [activeTab, setActiveTab] = useState('account')
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)

  const load = useCallback(async () => {
    if (!accessToken) return
    setLoading(true)
    setFetchError(null)
    try {
      const data = await fetchCustomerAccountData(accessToken)
      setCustomer(data)
    } catch (err) {
      setFetchError(
        err instanceof Error ? err.message : 'Could not load account data.'
      )
      setCustomer(null)
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    load()
  }, [load])

  const displayName =
    [customer?.firstName, customer?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim() ||
    [initialUser?.firstName, initialUser?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim() ||
    customer?.email ||
    initialUser?.email ||
    'Member'

  const email = customer?.email || initialUser?.email || ''
  const phone = customer?.phone || '—'
  const joinDate = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '—'

  const addresses =
    customer?.addresses?.edges?.map((e) => e.node).filter(Boolean) ?? []
  const defaultAddr = customer?.defaultAddress ?? addresses[0] ?? null
  const defaultCountry = defaultAddr?.country || '—'

  const orders =
    customer?.orders?.edges?.map((e) => e.node).filter(Boolean) ?? []

  return (
    <div className="account-profile">
      <div className="profile-head">
        <motion.h1
          className="article-title profile-title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hi, {displayName}
        </motion.h1>
        {email && <p className="profile-email">{email}</p>}
      </div>

      {fetchError && (
        <div className="account-profile-alert account-profile-alert--error">
          {fetchError}
          <button
            type="button"
            className="account-profile-retry"
            onClick={load}
          >
            Retry
          </button>
        </div>
      )}

      <div className="profile-main">
        <aside className="profile-sidebar">
          <nav className="profile-tabs" aria-label="Account sections">
            <button
              type="button"
              className={`profile-tab${activeTab === 'account' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              My account
            </button>

            <button
              type="button"
              className={`profile-tab${activeTab === 'orders' ? ' is-active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              My orders
            </button>
          </nav>
          <button type="button" className="profile-logout" onClick={onSignOut}>
            Sign out
          </button>
        </aside>

        <div className="profile-panels">
          {loading && (
            <p className="account-profile-loading">Loading your account…</p>
          )}

          {!loading && (
            <>
              <section
                className={`profile-panel${activeTab === 'account' ? ' is-active' : ''}`}
                hidden={activeTab !== 'account'}
              >
                <h2 className="profile-panel-title">Personal information</h2>
                <div className="profile-grid">
                  <article className="profile-card">
                    <h3 className="profile-card-title">Profile</h3>
                    <dl className="profile-dl">
                      <div>
                        <dt>Name</dt>
                        <dd>{displayName}</dd>
                      </div>
                      <div>
                        <dt>Email</dt>
                        <dd>{email || '—'}</dd>
                      </div>
                      <div>
                        <dt>Phone</dt>
                        <dd>{phone}</dd>
                      </div>
                      <div>
                        <dt>Marketing</dt>
                        <dd>
                          {customer?.acceptsMarketing === true
                            ? 'Subscribed'
                            : customer?.acceptsMarketing === false
                              ? 'Not subscribed'
                              : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt>Member since</dt>
                        <dd>{joinDate}</dd>
                      </div>
                      <div>
                        <dt>Country</dt>
                        <dd>{defaultCountry}</dd>
                      </div>
                    </dl>
                  </article>

                  {defaultAddr && (
                    <>
                      <article className="profile-card">
                        <h3 className="profile-card-title">Default address</h3>
                        <div className="profile-address-block">
                          {addressLines(defaultAddr).map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                          {defaultAddr.phone && (
                            <p className="profile-address-meta">
                              {defaultAddr.phone}
                            </p>
                          )}
                        </div>
                      </article>
                      <article className="profile-card">
                        <h3 className="profile-card-title">Shipping</h3>
                        <div className="profile-address-block">
                          {addressLines(defaultAddr).map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      </article>
                    </>
                  )}

                  {!defaultAddr && (
                    <article className="profile-card profile-card--wide">
                      <h3 className="profile-card-title">Addresses</h3>
                      <p className="profile-muted">
                        No saved address yet. Add one at checkout or in the
                        Shopify account portal linked from your order emails.
                      </p>
                    </article>
                  )}
                </div>
              </section>

              <section
                className={`profile-panel${activeTab === 'orders' ? ' is-active' : ''}`}
                hidden={activeTab !== 'orders'}
              >
                <h2 className="profile-panel-title">My orders</h2>
                {orders.length === 0 ? (
                  <p className="profile-muted">No orders yet.</p>
                ) : (
                  <div className="profile-orders">
                    <div className="profile-orders-head">
                      <span>Order</span>
                      <span>Date</span>
                      <span>Status</span>
                      <span>Total</span>
                      <span></span>
                    </div>
                    <ul className="profile-orders-list">
                      {orders.map((order) => (
                        <li key={order.id} className="profile-orders-row">
                          <span className="profile-orders-num">
                            #{order.orderNumber}
                          </span>
                          <span>
                            {order.processedAt
                              ? new Date(order.processedAt).toLocaleDateString()
                              : '—'}
                          </span>
                          <span>
                            {order.financialStatus
                              ? String(order.financialStatus).replace(/_/g, ' ')
                              : '—'}
                          </span>
                          <span>
                            {formatMoney(
                              order.totalPrice?.amount,
                              order.totalPrice?.currencyCode
                            )}
                          </span>
                          <span className="profile-orders-action">
                            {order.statusUrl ? (
                              <a
                                href={order.statusUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="profile-orders-link"
                              >
                                Details
                              </a>
                            ) : (
                              '—'
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AccountDashboard
