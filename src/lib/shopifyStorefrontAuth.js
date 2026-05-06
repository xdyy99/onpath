/**
 * Legacy Storefront customer auth (email/password on your domain).
 * Requires storefront token scope: unauthenticated_write_customers
 * and classic / “legacy” customer accounts where these mutations are supported.
 */

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01'

async function storefrontGraphql({ query, variables }) {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error(
      'Missing VITE_SHOPIFY_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN'
    )
  }

  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    }
  )

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data
}

function userErrorsMessage(errors) {
  if (!errors?.length) return 'Request failed'
  return errors.map((e) => e.message).join(' ')
}

/**
 * @param {{ firstName: string, lastName: string, email: string, password: string, acceptsMarketing?: boolean }} input
 */
export async function storefrontCustomerCreate(input) {
  const data = await storefrontGraphql({
    query: `
      mutation customerCreate($input: CustomerCreateInput!) {
        customerCreate(input: $input) {
          customer {
            id
            firstName
            lastName
            email
          }
          customerUserErrors {
            field
            message
            code
          }
        }
      }
    `,
    variables: { input },
  })

  const payload = data.customerCreate
  if (payload.customerUserErrors?.length) {
    throw new Error(userErrorsMessage(payload.customerUserErrors))
  }
  return payload.customer
}

export async function storefrontCustomerAccessTokenCreate(email, password) {
  const data = await storefrontGraphql({
    query: `
      mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input: $input) {
          customerAccessToken {
            accessToken
            expiresAt
          }
          customerUserErrors {
            field
            message
            code
          }
        }
      }
    `,
    variables: { input: { email, password } },
  })

  const payload = data.customerAccessTokenCreate
  if (payload.customerUserErrors?.length) {
    throw new Error(userErrorsMessage(payload.customerUserErrors))
  }
  const cat = payload.customerAccessToken
  if (!cat?.accessToken) {
    throw new Error('Could not sign in.')
  }

  let tokenExpiresAt = null
  if (cat.expiresAt) {
    const t = new Date(cat.expiresAt).getTime()
    if (!Number.isNaN(t)) tokenExpiresAt = t
  }

  return { accessToken: cat.accessToken, tokenExpiresAt }
}

export async function storefrontCustomerByAccessToken(customerAccessToken) {
  const data = await storefrontGraphql({
    query: `
      query storefrontCustomer($token: String!) {
        customer(customerAccessToken: $token) {
          id
          email
          firstName
          lastName
        }
      }
    `,
    variables: { token: customerAccessToken },
  })

  return data.customer
}

const CUSTOMER_ACCOUNT_CORE = `
  id
  firstName
  lastName
  email
  phone
  createdAt
  acceptsMarketing
  defaultAddress {
    id
    address1
    address2
    city
    province
    country
    zip
    phone
    formatted
  }
  addresses(first: 20) {
    edges {
      node {
        id
        address1
        address2
        city
        province
        country
        zip
        phone
        formatted
      }
    }
  }
`

/**
 * Full account data for dashboard (requires token with customer + order read scopes).
 * Falls back without order history if the storefront token cannot query `orders`.
 */
export async function fetchCustomerAccountData(customerAccessToken) {
  const withOrders = `
    query customerAccount($token: String!) {
      customer(customerAccessToken: $token) {
        ${CUSTOMER_ACCOUNT_CORE}
        orders(first: 20, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              statusUrl
              totalPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `

  try {
    const data = await storefrontGraphql({
      query: withOrders,
      variables: { token: customerAccessToken },
    })
    return data.customer
  } catch (err) {
    const msg = err instanceof Error ? err.message : ''
    const noOrders = `
      query customerAccountNoOrders($token: String!) {
        customer(customerAccessToken: $token) {
          ${CUSTOMER_ACCOUNT_CORE}
        }
      }
    `
    if (/order|Order/i.test(msg)) {
      const data = await storefrontGraphql({
        query: noOrders,
        variables: { token: customerAccessToken },
      })
      const c = data.customer
      return c ? { ...c, orders: { edges: [] } } : null
    }
    throw err
  }
}
