export interface Product {
  productName: string
  descriptionShort: string
  photo: string
  price: number
}

export interface ProductsResponse {
  success: boolean
  products: Product[]
}

export type ProductsApiErrorKind =
  | 'network'
  | 'http'
  | 'invalid-response'
  | 'api'

export class ProductsApiError extends Error {
  public readonly kind: ProductsApiErrorKind
  public readonly status?: number

  constructor(
    message: string,
    kind: ProductsApiErrorKind,
    status?: number,
  ) {
    super(message)
    this.name = 'ProductsApiError'
    this.kind = kind
    this.status = status
  }
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false

  const product = value as Record<string, unknown>

  return (
    typeof product.productName === 'string' &&
    typeof product.descriptionShort === 'string' &&
    typeof product.photo === 'string' &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price)
  )
}

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== 'object' || value === null) return false

  const response = value as Record<string, unknown>

  return (
    typeof response.success === 'boolean' &&
    Array.isArray(response.products) &&
    response.products.every(isProduct)
  )
}

/** Fetches and validates the official product data through Vite's dev proxy. */
export async function fetchProducts(
  signal?: AbortSignal,
): Promise<Product[]> {
  let response: Response

  try {
    response = await fetch('/api/produtos', {
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (signal?.aborted) throw error

    throw new ProductsApiError(
      'Não foi possível conectar ao serviço de produtos.',
      'network',
    )
  }

  if (!response.ok) {
    throw new ProductsApiError(
      `A API de produtos respondeu com HTTP ${response.status}.`,
      'http',
      response.status,
    )
  }

  let payload: unknown

  try {
    payload = await response.json()
  } catch {
    throw new ProductsApiError(
      'A API de produtos retornou um JSON inválido.',
      'invalid-response',
    )
  }

  if (!isProductsResponse(payload)) {
    throw new ProductsApiError(
      'A resposta da API de produtos não corresponde ao formato esperado.',
      'invalid-response',
    )
  }

  if (!payload.success) {
    throw new ProductsApiError(
      'A API de produtos informou que a solicitação não foi bem-sucedida.',
      'api',
    )
  }

  return payload.products
}
