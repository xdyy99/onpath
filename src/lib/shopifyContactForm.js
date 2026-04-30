/**
 * Submits to the Online Store /contact endpoint (theme form handler), not Storefront API.
 * POST runs in a hidden iframe so the SPA does not navigate away.
 *
 * @see https://shopify.dev/docs/storefronts/themes/customer-engagement/add-contact-form
 */
function buildContactBody({ message, category }) {
  const lines = []
  if (category) lines.push(`Category: ${category}`)
  if (message?.trim()) lines.push(message.trim())
  return lines.join('\n\n') || '(No message provided)'
}

/**
 * @param {object} data
 * @param {string} data.name
 * @param {string} data.phone
 * @param {string} data.email
 * @param {string|null} data.category
 * @param {string} data.message
 * @returns {Promise<void>}
 */
export function submitShopifyContactForm(data) {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN
  if (!domain) {
    return Promise.reject(new Error('Shopify store domain is not configured.'))
  }

  const action = `https://${domain}/contact`
  const nameParts = data.name.trim().split(/\s+/)
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ')

  return new Promise((resolve, reject) => {
    const iframeName = `shopify-contact-${Date.now()}`
    const iframe = document.createElement('iframe')
    iframe.setAttribute('name', iframeName)
    iframe.setAttribute('title', 'Contact form submission')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.tabIndex = -1
    iframe.style.cssText =
      'position:absolute;width:0;height:0;border:0;clip:rect(0,0,0,0)'

    const form = document.createElement('form')
    form.method = 'POST'
    form.action = action
    form.target = iframeName
    form.acceptCharset = 'UTF-8'

    const add = (name, value) => {
      const el = document.createElement('input')
      el.type = 'hidden'
      el.name = name
      el.value = value ?? ''
      form.appendChild(el)
    }

    add('form_type', 'contact')
    add('utf8', '\u2713')
    add('contact[email]', data.email.trim())
    add('contact[phone]', data.phone.trim())
    add('contact[first_name]', firstName)
    add('contact[last_name]', lastName)
    add('contact[body]', buildContactBody(data))
    if (data.category) {
      add('contact[category]', data.category)
    }

    document.body.appendChild(iframe)
    document.body.appendChild(form)

    let done = false
    const cleanup = () => {
      form.remove()
      iframe.remove()
    }

    const finishOk = () => {
      if (done) return
      done = true
      clearTimeout(timer)
      cleanup()
      resolve()
    }

    const finishErr = (err) => {
      if (done) return
      done = true
      clearTimeout(timer)
      cleanup()
      reject(err)
    }

    const timer = setTimeout(finishOk, 3500)

    try {
      form.submit()
    } catch (e) {
      finishErr(
        e instanceof Error
          ? e
          : new Error('Could not send your message. Please try again.')
      )
    }
  })
}
