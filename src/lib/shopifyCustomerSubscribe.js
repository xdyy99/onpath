const CUSTOMER_CREATE = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
      }
      customerUserErrors {
        field
        message
        code
      }
      userErrors {
        field
        message
      }
    }
  }
`

/** Meets typical Shopify password length; not shown to the user (newsletter-only signup). */
function generateAccountPlaceholderPassword() {
  const bytes = new Uint8Array(18)
  crypto.getRandomValues(bytes)
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
  return `Nw${hex}!9`
}

/**
 * Storefront API: creates a customer with marketing consent.
 * Requires scope: unauthenticated_write_customers and customer accounts enabled in Admin.
 * Password is auto-generated because CustomerCreateInput requires it; the user can use “Forgot password” if they ever want to sign in.
 */
export async function subscribeEmailViaCustomerCreate(email) {
  const trimmed = email.trim()
  if (!trimmed) {
    throw new Error('Please enter your email.')
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    throw new Error('Please enter a valid email address.')
  }

  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01'

  if (!domain || !token) {
    throw new Error('Shopify is not configured.')
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: CUSTOMER_CREATE,
      variables: {
        input: {
          email: trimmed,
          password: generateAccountPlaceholderPassword(),
          acceptsMarketing: true,
        },
      },
    }),
  })

  const json = await res.json()

  if (json.errors?.length) {
    throw new Error(json.errors[0].message || 'Something went wrong.')
  }

  const payload = json.data?.customerCreate
  const customerUserErrors = payload?.customerUserErrors || []
  const userErrors = payload?.userErrors || []
  const allErrors = [...customerUserErrors, ...userErrors].filter(Boolean)

  if (allErrors.length) {
    const msg = allErrors.map((e) => e.message).join(' ')
    throw new Error(msg || 'Could not subscribe.')
  }

  if (!payload?.customer) {
    throw new Error('Could not subscribe.')
  }

  return payload.customer
}
