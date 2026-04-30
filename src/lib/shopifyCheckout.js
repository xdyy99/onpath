const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`

/**
 * @param {Array<{ merchandiseId: string, quantity: number }>} lines
 * @returns {Promise<string>} checkoutUrl
 */
export async function createShopifyCartCheckout(lines) {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
  const apiVersion = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01'

  if (!domain || !token) {
    throw new Error('Shopify domain or Storefront token is not configured')
  }

  const filtered = lines.filter((l) => l.merchandiseId && l.quantity > 0)
  if (!filtered.length) {
    throw new Error('No valid line items to checkout')
  }

  const res = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({
      query: CART_CREATE,
      variables: {
        input: {
          lines: filtered.map(({ merchandiseId, quantity }) => ({
            merchandiseId,
            quantity,
          })),
        },
      },
    }),
  })

  const json = await res.json()
  if (json.errors?.length) {
    throw new Error(json.errors[0].message || 'Checkout request failed')
  }

  const payload = json.data?.cartCreate
  const userErrors = payload?.userErrors
  if (userErrors?.length) {
    throw new Error(
      userErrors.map((e) => e.message).join('; ') || 'Cart could not be created'
    )
  }

  const url = payload?.cart?.checkoutUrl
  if (!url) {
    throw new Error('No checkout URL returned')
  }
  return url
}
