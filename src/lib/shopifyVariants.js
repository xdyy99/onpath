/**
 * Resolve Storefront ProductVariant GID from line options (Color, Size, Gender, …).
 * @param {object} line - shape from cart: { variants?, color, size, gender, variantId? }
 * @returns {string|null}
 */
export function resolveVariantId(line) {
  if (line.variantId) return line.variantId
  const variants = line.variants || []
  if (!variants.length) return null
  if (variants.length === 1) return variants[0].id

  const { color, size, gender } = line

  const optionMatches = (opts, optionName, value) => {
    if (value == null || value === '') return true
    const entry = Object.entries(opts).find(
      ([k]) => k.toLowerCase() === optionName.toLowerCase()
    )
    return Boolean(entry && entry[1] === value)
  }

  const found = variants.find((v) => {
    const o = v.options || {}
    return (
      optionMatches(o, 'Color', color) &&
      optionMatches(o, 'Size', size) &&
      optionMatches(o, 'Gender', gender)
    )
  })

  const pick =
    found ||
    variants.find((v) => v.available !== false) ||
    variants[0]
  return pick?.id ?? null
}
