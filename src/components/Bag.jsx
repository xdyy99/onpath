import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  removeItem,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice'
import { createShopifyCartCheckout } from '../lib/shopifyCheckout'
import { resolveVariantId } from '../lib/shopifyVariants'

const Bag = () => {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)
  const [checkoutError, setCheckoutError] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const handleCloseBag = () => {
    const bag = document.getElementById('bag')
    bag.classList.remove('--active')
  }

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({ lineId: item.lineId, quantity: item.quantity + 1 })
    )
  }

  const handleDecrement = (item) => {
    if (item.quantity <= 1) return
    dispatch(
      updateQuantity({ lineId: item.lineId, quantity: item.quantity - 1 })
    )
  }

  const handleRemove = (item) => {
    dispatch(removeItem(item.lineId))
  }

  const handleProceedToCheckout = async (e) => {
    e.preventDefault()
    setCheckoutError(null)
    if (!items.length || checkoutLoading) return

    const lines = items.map((item) => ({
      merchandiseId: resolveVariantId(item),
      quantity: item.quantity,
    }))

    const missing = lines.filter((l) => !l.merchandiseId)
    if (missing.length) {
      setCheckoutError(
        'Some items can’t be checked out. Remove them and add the product again from the shop.'
      )
      return
    }

    setCheckoutLoading(true)
    try {
      const checkoutUrl = await createShopifyCartCheckout(lines)
      handleCloseBag()
      dispatch(clearCart())
      window.location.assign(checkoutUrl)
    } catch (err) {
      setCheckoutError(
        err instanceof Error ? err.message : 'Checkout failed. Try again.'
      )
    } finally {
      setCheckoutLoading(false)
    }
  }

  const formatPrice = (value) =>
    Number(value || 0).toLocaleString('en-US', { maximumFractionDigits: 0 })

  return (
    <div id="bag" className="bag" data-lenis-prevent>
      <div className="bag-wrapper">
        <div className="bag-header">
          <div className="bag-title">YOUR BAG</div>
          <div className="bag-close" onClick={handleCloseBag}>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bag-empty">
            <div className="bag-empty-text">Your bag is empty.</div>
            <Link
              to="/shop"
              className="btn btn-primary"
              onClick={handleCloseBag}
            >
              Continue Shopping
              <img src="/icons/arr-right-long.svg" alt="Arrow Right" />
            </Link>
          </div>
        ) : (
          <>
            <div className="bag-list" data-scroll="true">
              {items.map((item) => (
                <div className="bag-item" key={item.lineId}>
                  <div className="image">
                    <img
                      src={
                        Array.isArray(item.image) ? item.image[0] : item.image
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="info">
                    <div className="row">
                      <Link
                        to={`/shop/${item.slug}`}
                        className="name"
                        onClick={handleCloseBag}
                      >
                        {item.name}
                      </Link>
                      <div className="price">
                        {formatPrice(item.price * item.quantity)} USD
                      </div>
                    </div>
                    {(item.color || item.size || item.gender) && (
                      <div className="row">
                        {item.color && (
                          <div className="color">{item.color}</div>
                        )}
                        {item.size && <div className="size">{item.size}</div>}
                        {item.gender && (
                          <div className="size">{item.gender}</div>
                        )}
                      </div>
                    )}
                    <div className="row quantity">
                      <div className="title">Quantity</div>

                      <div className="controls">
                        <div
                          className="minus"
                          onClick={() => handleDecrement(item)}
                        >
                          <div className="line"></div>
                        </div>
                        <div className="value">{item.quantity}</div>
                        <div
                          className="plus"
                          onClick={() => handleIncrement(item)}
                        >
                          <div className="line"></div>
                          <div className="line"></div>
                        </div>
                      </div>
                      <div
                        className="remove"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bag-footer">
              <div className="total">
                <div className="title">Total</div>
                <div className="price">{formatPrice(total)} USD</div>
              </div>
              {checkoutError && (
                <div className="bag-checkout-error" role="alert">
                  {checkoutError}
                </div>
              )}
              <button
                type="button"
                className={`btn btn-primary${checkoutLoading ? ' --loading' : ''}`}
                disabled={checkoutLoading}
                onClick={handleProceedToCheckout}
                aria-busy={checkoutLoading}
              >
                {checkoutLoading ? 'OPENING CHECKOUT…' : 'PROCEED TO CHECKOUT'}
                {checkoutLoading ? (
                  <span className="bag-checkout-spinner" aria-hidden>
                    <img
                      src="/icons/loading.svg"
                      alt=""
                      width={26}
                      height={26}
                    />
                  </span>
                ) : (
                  <img src="/icons/arr-right-long.svg" alt="" />
                )}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="bag-background" onClick={handleCloseBag}></div>
    </div>
  )
}

export default Bag
