import { useEffect, useRef, useState } from 'react'
import { useProducts } from './hooks/useProducts'
import {
  BrandSection,
  CategoryStrip,
  Footer,
  HeroBanner,
  Newsletter,
  ProductShowcase,
  PromoBanner,
  SiteHeader,
} from './components/Storefront'
import './App.scss'
import type { Product } from './services/products'

function App() {
  const productsState = useProducts()
  const products =
    productsState.status === 'success' ? productsState.products : []
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="storefront" id="home">
      <SiteHeader />

      <main>
        <HeroBanner />
        <CategoryStrip />

        <div className="product-shelves" id="produtos">
          <ProductShowcase
            id="vitrine-1"
            title="Produtos relacionados"
            products={products.slice(0, 4)}
            state={productsState}
            showTabs
            onProductSelect={setSelectedProduct}
          />

          <PromoBanner variant="first" />

          <ProductShowcase
            id="vitrine-2"
            title="Produtos relacionados"
            products={products.slice(4, 8)}
            state={productsState}
            onProductSelect={setSelectedProduct}
          />

          <PromoBanner variant="second" />

          <BrandSection />

          <ProductShowcase
            id="vitrine-3"
            title="Produtos relacionados"
            products={products.slice(8, 10)}
            state={productsState}
            onProductSelect={setSelectedProduct}
          />
        </div>

        <Newsletter />
      </main>

      <Footer />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  )
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.showModal()
    return () => {
      if (dialog.open) dialog.close()
    }
  }, [])

  return (
    <dialog
      className="product-modal"
      ref={dialogRef}
      aria-label={`Detalhes do produto: ${product.productName}`}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <button className="product-modal__close" type="button" onClick={onClose} aria-label="Fechar detalhes do produto">×</button>
      <img className="product-modal__image" src={product.photo} alt={product.productName} />
      <div className="product-modal__content">
        <div className="product-modal__info">
          <h2>{product.productName}</h2>
          <p className="product-modal__price">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <div className="product-modal__description-block">
            <p className="product-modal__description">{product.descriptionShort}</p>
            <a className="product-modal__details-link" href="#produtos">
              Veja mais detalhes do produto &gt;
            </a>
          </div>
        </div>
        <div className="product-modal__actions">
          <div className="product-modal__quantity" aria-label="Quantidade">
            <button type="button" aria-label="Diminuir quantidade" disabled={quantity === 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))}>−</button>
            <span aria-live="polite">{String(quantity).padStart(2, '0')}</span>
            <button type="button" aria-label="Aumentar quantidade" onClick={() => setQuantity((value) => value + 1)}>+</button>
          </div>
          <button className="product-modal__buy" type="button">COMPRAR</button>
        </div>
      </div>
    </dialog>
  )
}

export default App
