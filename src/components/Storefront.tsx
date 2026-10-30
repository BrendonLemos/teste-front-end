import { useEffect, useRef, useState } from 'react'
import type { Product } from '../services/products'
import type { ProductsState } from '../hooks/useProducts'
import econverseLogo from '../assets/econverse-logo.svg'
import headerGroupIcon from '../assets/header-account-group.svg'
import heartIcon from '../assets/icon-heart.svg'
import userIcon from '../assets/icon-user.svg'
import cartIcon from '../assets/icon-cart.svg'
import searchIcon from '../assets/icon-search.svg'
import shieldIcon from '../assets/icon-shield.svg'
import truckIcon from '../assets/icon-truck.svg'
import creditCardIcon from '../assets/icon-credit-card.svg'
import crownIcon from '../assets/icon-crown.svg'
import supportBanner from '../assets/support-electronics.webp'
import brandMark from '../assets/brand-mark.svg'
import instagramIcon from '../assets/icon-instagram.svg'
import facebookIcon from '../assets/icon-facebook.svg'
import linkedinIcon from '../assets/icon-linkedin.svg'
import homeHero from '../assets/home-black-friday.webp'
import technologyIcon from '../assets/category-icons/technology.svg'
import marketIcon from '../assets/category-icons/market.svg'
import drinksIcon from '../assets/category-icons/drinks.svg'
import toolsIcon from '../assets/category-icons/tools.svg'
import healthIcon from '../assets/category-icons/health.svg'
import fitnessIcon from '../assets/category-icons/fitness.svg'
import fashionIcon from '../assets/category-icons/fashion.svg'

const categoryIcons = {
  technology: technologyIcon,
  market: marketIcon,
  drinks: drinksIcon,
  tools: toolsIcon,
  health: healthIcon,
  fitness: fitnessIcon,
  fashion: fashionIcon,
} as const

const navigation = [
  'Todas Categorias',
  'Supermercado',
  'Livros',
  'Moda',
  'Lançamentos',
  'Ofertas do dia',
  'Assinatura',
]

const categories = [
  { label: 'Tecnologia', icon: 'technology' },
  { label: 'Supermercado', icon: 'market' },
  { label: 'Bebidas', icon: 'drinks' },
  { label: 'Ferramentas', icon: 'tools' },
  { label: 'Saúde', icon: 'health' },
  { label: 'Esportes e Fitness', icon: 'fitness' },
  { label: 'Moda', icon: 'fashion' },
] as const

const productTabs = [
  'celular',
  'acessórios',
  'tablets',
  'NOTEBOOKS',
  'TVs',
  'Ver todos',
]

const supportMessages = [
  {
    icon: shieldIcon,
    before: 'Compra ',
    highlight: '100% segura',
    after: '',
  },
  {
    icon: truckIcon,
    before: '',
    highlight: 'Frete grátis',
    after: ' acima de R$ 200',
  },
  {
    icon: creditCardIcon,
    before: '',
    highlight: 'Parcele',
    after: ' suas compras',
  },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="benefits-bar">
        <ul className="benefits-bar__inner">
          {supportMessages.map(({ icon, before, highlight, after }) => (
            <li className="benefit" key={highlight}>
              <img src={icon} alt="" aria-hidden="true" />
              <span className="benefit__copy">
                {before}
                <span className="benefit__highlight">{highlight}</span>
                {after}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="header-main">
        <div className="header-main__inner">
          <a className="brand" href="#home" aria-label="Econverse, início">
            <img src={econverseLogo} alt="Econverse" />
          </a>

          <div className="search-box" role="search" aria-label="Busca">
            <span>O que você está buscando?</span>
            <img src={searchIcon} alt="" aria-hidden="true" />
          </div>

          <div className="header-actions" aria-label="Atalhos da loja">
            <span className="header-action" aria-label="Atalho da loja">
              <img src={headerGroupIcon} alt="" aria-hidden="true" />
            </span>
            <span className="header-action" aria-label="Favoritos">
              <img src={heartIcon} alt="" aria-hidden="true" />
            </span>
            <span className="header-action" aria-label="Minha conta">
              <img src={userIcon} alt="" aria-hidden="true" />
            </span>
            <span className="header-action" aria-label="Carrinho">
              <img src={cartIcon} alt="" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      <nav className="category-nav" aria-label="Navegação principal">
        <div className="category-nav__inner">
          {navigation.map((item) => (
            <a
              href={item === 'Assinatura' ? '#newsletter' : '#categorias'}
              key={item}
            >
              {item === 'Assinatura' && (
                <img src={crownIcon} alt="" aria-hidden="true" />
              )}
              {item}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}

export function HeroBanner() {
  return (
    <section className="hero-banner" aria-labelledby="hero-title">
      <img className="hero-banner__image" src={homeHero} alt="" />
      <div className="hero-banner__inner">
        <div className="hero-banner__copy">
          <h1 id="hero-title">Venha conhecer nossas promoções</h1>
          <p>
            <span className="hero-banner__discount">50% Off</span> nos produtos
          </p>
          <a className="button button--hero" href="#vitrine-1">
            Ver produto
          </a>
        </div>
      </div>
    </section>
  )
}

function CategoryGlyph({ kind }: { kind: (typeof categories)[number]['icon'] }) {
  return <img src={categoryIcons[kind]} alt="" aria-hidden="true" />
}

export function CategoryStrip() {
  return (
    <section
      className="category-strip"
      id="categorias"
      aria-label="Compre por categoria"
    >
      {categories.map(({ label, icon }) => (
        <article className="category-tile" key={label}>
          <div className="category-tile__art">
            <CategoryGlyph kind={icon} />
          </div>
          <h2>{label}</h2>
        </article>
      ))}
    </section>
  )
}

function ProductCard({ product, onSelect }: { product: Product; onSelect?: (product: Product) => void }) {
  const formatPrice = (price: number) =>
    price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <article
      className="product-card"
      data-product-name={product.productName}
      onClick={() => onSelect?.(product)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          onSelect?.(product)
        }
      }}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-haspopup={onSelect ? 'dialog' : undefined}
    >
      <div className="product-card__image">
        <img src={product.photo} alt={product.productName} loading="lazy" />
      </div>
      <div className="product-card__details">
        <h3>{product.productName}</h3>
        <p>{product.descriptionShort}</p>
        <strong className="product-card__price">{formatPrice(product.price)}</strong>
        <span className="product-card__installments">
          ou 2x de {formatPrice(product.price / 2)} sem juros
        </span>
        <span className="product-card__shipping">Frete grátis</span>
        <button
          className="button button--buy"
          type="button"
          disabled
          title="A interação de compra será adicionada em outra etapa."
        >
          Comprar
        </button>
      </div>
    </article>
  )
}

interface ProductShowcaseProps {
  id: string
  title: string
  products: Product[]
  state?: ProductsState
  showTabs?: boolean
  onProductSelect?: (product: Product) => void
}

export function ProductShowcase({
  id,
  title,
  products,
  state,
  showTabs = false,
  onProductSelect,
}: ProductShowcaseProps) {
  const isWaitingForData = state && state.status !== 'success'
  const carouselRef = useRef<HTMLDivElement>(null)
  const [carouselState, setCarouselState] = useState({
    hasOverflow: false,
    canScrollPrevious: false,
    canScrollNext: false,
  })

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const updateCarouselState = () => {
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth
      setCarouselState({
        hasOverflow: maxScrollLeft > 1,
        canScrollPrevious: carousel.scrollLeft > 8.5,
        canScrollNext: carousel.scrollLeft < maxScrollLeft - 8.5,
      })
    }

    updateCarouselState()
    carousel.addEventListener('scroll', updateCarouselState, { passive: true })
    const resizeObserver = new ResizeObserver(updateCarouselState)
    resizeObserver.observe(carousel)

    return () => {
      carousel.removeEventListener('scroll', updateCarouselState)
      resizeObserver.disconnect()
    }
  }, [products.length, isWaitingForData])

  const scrollCarousel = (direction: -1 | 1) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth
    let nextScrollLeft = Math.min(
      maxScrollLeft,
      Math.max(0, carousel.scrollLeft + direction * 322),
    )

    if (direction > 0 && maxScrollLeft - nextScrollLeft <= 16) {
      nextScrollLeft = maxScrollLeft
    } else if (direction < 0 && nextScrollLeft <= 16) {
      nextScrollLeft = 0
    }

    carousel.scrollTo({ left: nextScrollLeft, behavior: 'smooth' })
  }

  return (
    <section
      className={`product-showcase product-showcase--carousel${showTabs ? ' product-showcase--tabs' : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <span aria-hidden="true" />
        <h2 id={`${id}-title`}>{title}</h2>
        <span aria-hidden="true" />
      </div>
      <a className="product-showcase__all-link" href="#produtos">
        Ver todos
      </a>

      {showTabs && (
        <nav className="product-tabs" aria-label="Categorias de produtos">
          {productTabs.map((tab, index) => (
            <span
              className={index === 0 ? 'product-tabs__tab is-active' : 'product-tabs__tab'}
              key={tab}
              aria-current={index === 0 ? 'page' : undefined}
            >
              {tab}
            </span>
          ))}
        </nav>
      )}

      {isWaitingForData ? (
        <p className={`products-message products-message--${state.status}`} role="status">
          {state.status === 'loading' && 'Carregando produtos…'}
          {state.status === 'empty' && 'Nenhum produto encontrado.'}
          {state.status === 'error' && state.error.message}
        </p>
      ) : (
        <div
          className="product-grid product-grid--carousel"
          id={`${id}-products`}
          ref={carouselRef}
        >
          {products.map((product, index) => (
            <ProductCard
              key={`${product.productName}-${index}`}
              product={product}
              onSelect={onProductSelect}
            />
          ))}
        </div>
      )}
      <>
        <button
          className="product-showcase__arrow product-showcase__arrow--previous"
          type="button"
          aria-label="Ver produtos anteriores"
          disabled={!carouselState.hasOverflow || !carouselState.canScrollPrevious}
          onClick={() => scrollCarousel(-1)}
        >
          ‹
        </button>
        <button
          className="product-showcase__arrow product-showcase__arrow--next"
          type="button"
          aria-label="Ver próximos produtos"
          disabled={!carouselState.hasOverflow || !carouselState.canScrollNext}
          onClick={() => scrollCarousel(1)}
        >
          ›
        </button>
      </>
    </section>
  )
}

function PartnerBanner({ id }: { id: string }) {
  return (
    <article className="promo-banner__tile" aria-labelledby={`${id}-title`}>
      <img src={supportBanner} alt="" loading="lazy" />
      <div className="promo-banner__scrim" aria-hidden="true" />
      <div className="promo-banner__content">
        <h2 id={`${id}-title`}>Parceiros</h2>
        <p>Lorem ipsum dolor sit amet, consectetur</p>
        <button
          className="promo-banner__button"
          type="button"
          disabled
          title="A ação deste banner ainda não está conectada."
        >
          CONFIRA
        </button>
      </div>
    </article>
  )
}

export function PromoBanner({ variant }: { variant: 'first' | 'second' }) {
  return (
    <section
      className={`promo-banner promo-banner--${variant}`}
      aria-label="Banner promocional"
    >
      <PartnerBanner id={`partner-banner-${variant}-one`} />
      <PartnerBanner id={`partner-banner-${variant}-two`} />
    </section>
  )
}

export function BrandSection() {
  return (
    <section className="brand-section" aria-labelledby="brands-title">
      <h2 id="brands-title">Navegue por marcas</h2>
      <div className="brand-list">
        {[1, 2, 3, 4, 5].map((brand) => (
          <div className="brand-card" key={brand}>
            <img src={brandMark} alt="Econverse" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function Newsletter() {
  return (
    <section className="newsletter" id="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <div className="newsletter__copy">
          <h2 id="newsletter-title">Inscreva-se na nossa newsletter</h2>
          <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
        </div>
        <form className="newsletter-form" aria-label="Cadastro da newsletter">
          <div className="newsletter-form__fields">
            <label className="sr-only" htmlFor="newsletter-name">Digite seu nome</label>
            <input id="newsletter-name" type="text" placeholder="Digite seu nome" disabled />
            <label className="sr-only" htmlFor="newsletter-email">Digite seu e-mail</label>
            <input id="newsletter-email" type="email" placeholder="Digite seu e-mail" disabled />
            <button type="button" disabled>INSCREVER</button>
          </div>
          <label className="newsletter-form__terms">
            <input type="checkbox" disabled />
            <span>Aceito os termos e condições</span>
          </label>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__content">
          <div className="site-footer__brand">
            <a href="#home" aria-label="Econverse, voltar ao início">
              <img className="site-footer__logo" src={econverseLogo} alt="Econverse" />
            </a>
          </div>
          <p className="site-footer__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="social-icons" aria-label="Redes sociais">
            <img src={instagramIcon} alt="Instagram" />
            <img src={facebookIcon} alt="Facebook" />
            <img src={linkedinIcon} alt="LinkedIn" />
          </div>
        </div>
        <span className="site-footer__divider" aria-hidden="true" />
        <nav className="footer-nav" aria-label="Links da loja">
          <div className="footer-nav__group">
            <h2>Institucional</h2>
            <a href="#home">Sobre Nós</a>
            <a href="#home">Movimento</a>
            <a href="#home">Trabalhe conosco</a>
          </div>
          <div className="footer-nav__group">
            <h2>Ajuda</h2>
            <a href="#home">Suporte</a>
            <a href="#home">Fale Conosco</a>
            <a href="#home">Perguntas Frequentes</a>
          </div>
          <div className="footer-nav__group">
            <h2>Termos</h2>
            <a href="#home">Termos e Condições</a>
            <a href="#home">Política de Privacidade</a>
            <a href="#home">Troca e Devolução</a>
          </div>
        </nav>
      </div>
      <div className="site-footer__bottom">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </footer>
  )
}
