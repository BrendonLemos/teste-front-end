import { useEffect, useState } from 'react'
import {
  fetchProducts,
  type Product,
  ProductsApiError,
} from '../services/products'

export type ProductsState =
  | { status: 'loading'; products: []; error: null }
  | { status: 'error'; products: []; error: Error }
  | { status: 'empty'; products: []; error: null }
  | { status: 'success'; products: Product[]; error: null }

export function useProducts(): ProductsState {
  const [state, setState] = useState<ProductsState>({
    status: 'loading',
    products: [],
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    fetchProducts(controller.signal)
      .then((products) => {
        if (controller.signal.aborted) return

        setState(
          products.length === 0
            ? { status: 'empty', products: [], error: null }
            : { status: 'success', products, error: null },
        )
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return

        const requestError =
          error instanceof ProductsApiError || error instanceof Error
            ? error
            : new Error('Ocorreu um erro inesperado ao buscar os produtos.')

        setState({ status: 'error', products: [], error: requestError })
      })

    return () => controller.abort()
  }, [])

  return state
}
