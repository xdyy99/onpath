import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN
const API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01'

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          createdAt
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
          }
          images(first: 10) {
            edges { node { url altText } }
          }
          options { name values }
          collections(first: 20) {
            edges { node { title handle } }
          }
          variants(first: 100) {
            edges {
              node {
                id
                availableForSale
                price { amount currencyCode }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }
`

const pickOptionValues = (node, optionName) => {
  const opt = node.options?.find(
    (o) => o.name.toLowerCase() === optionName.toLowerCase()
  )
  return opt ? opt.values : []
}

const normalizeProduct = (node) => {
  const images = node.images.edges.map((e) => e.node.url)
  return {
    id: node.id,
    shopifyId: node.id,
    name: node.title,
    slug: node.handle,
    createdAt: node.createdAt,
    price: Number(node.priceRange.minVariantPrice.amount),
    currency: node.priceRange.minVariantPrice.currencyCode,
    image: images,
    imagepaint: images,
    color: pickOptionValues(node, 'Color'),
    size: pickOptionValues(node, 'Size'),
    gender: pickOptionValues(node, 'Gender'),
    collection: node.collections.edges.map((e) => e.node.title),
    collectionHandles: node.collections.edges.map((e) => e.node.handle),
    tags: node.tags || [],
    description: node.descriptionHtml || node.description || '',
    variants: node.variants.edges.map((e) => ({
      id: e.node.id,
      available: e.node.availableForSale,
      price: Number(e.node.price.amount),
      currency: e.node.price.currencyCode,
      options: Object.fromEntries(
        e.node.selectedOptions.map((o) => [o.name, o.value])
      ),
    })),
  }
}

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async (_, { rejectWithValue }) => {
    if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
      return rejectWithValue(
        'Missing VITE_SHOPIFY_DOMAIN or VITE_SHOPIFY_STOREFRONT_TOKEN env vars'
      )
    }
    try {
      const res = await fetch(
        `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
          },
          body: JSON.stringify({
            query: PRODUCTS_QUERY,
            variables: { first: 50 },
          }),
        }
      )
      const json = await res.json()
      if (json.errors?.length) {
        return rejectWithValue(json.errors[0].message)
      }
      return json.data.products.edges.map((e) => normalizeProduct(e.node))
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch products')
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error?.message || 'Unknown error'
      })
  },
})

export default productSlice.reducer
