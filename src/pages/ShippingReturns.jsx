import { motion } from 'framer-motion'

const ShippingReturns = () => {
  return (
    <div className="article">
      <div className="article-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          Shipping &amp; Returns
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="article-legal"
        >
          <div className="cmsContent">
            <p>
              Our shipping and returns policy reflects how we would want to be
              treated ourselves: clear timing, careful handling, honest cost
              disclosure, and generous room to change your mind. Everything
              below is written in plain English. If anything is unclear, write
              to us.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Shipping</h3>

            <h4 className="legend strong">Order Processing</h4>
            <p>
              Every Onpath Studio piece is made to order. Production begins once
              your order is confirmed.
            </p>
            <p>
              Please allow 2–4 weeks for production, quality inspection, and
              shipment preparation from the date your order is placed. Each
              piece is individually inspected before it leaves us. As the brand
              grows, processing times may be adjusted by collection; the current
              window will always be shown on the product page.
            </p>

            <h4 className="legend strong">Shipping Rates</h4>
            <p>We ship worldwide.</p>
            <ul>
              <li>Free standard shipping on all orders over USD $500</li>
              <li>Free express shipping on all orders over USD $1,000</li>
              <li>
                Orders under $500: shipping rates are calculated at checkout
                based on destination and weight
              </li>
            </ul>
            <p>
              All orders ship tracked and insured. A confirmation email with
              tracking information is sent when your order leaves us.
            </p>

            <h4 className="legend strong">Delivery Estimates</h4>
            <p>Once shipped, typical delivery times are:</p>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>Destination</th>
                    <th>Standard</th>
                    <th>Express</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>United States</td>
                    <td>3–5 business days</td>
                    <td>1–2 business days</td>
                  </tr>
                  <tr>
                    <td>European Union &amp; United Kingdom</td>
                    <td>4–7 business days</td>
                    <td>2–3 business days</td>
                  </tr>
                  <tr>
                    <td>Rest of world</td>
                    <td>5–10 business days</td>
                    <td>3–5 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              These are carrier estimates and exclude delays caused by customs
              clearance, weather, or circumstances outside our or the carrier's
              control.
            </p>

            <h4 className="legend strong">
              International Orders — Duties and Taxes
            </h4>
            <p>
              <strong>Important:</strong> International orders may be subject to
              customs duties, import taxes, and handling fees imposed by the
              destination country. These charges are the responsibility of the
              customer and are collected by the carrier on delivery — they are
              not included in the price shown at checkout.
            </p>
            <p>Duty and tax rates vary by country and product category.</p>
            <p>
              We ship all international orders with accurate customs
              documentation. We do not undervalue shipments or mark orders as
              gifts.
            </p>

            <h4 className="legend strong">Address Accuracy</h4>
            <p>
              Please check your shipping address carefully before placing your
              order. We are not responsible for orders delivered to an incorrect
              address entered at checkout. If a package is returned to us due to
              an address error, we will contact you to arrange reshipment at
              your cost.
            </p>
            <p>
              If you need to change a shipping address after placing your order,
              email us at support@onpath.studio as soon as possible. Address
              changes can only be made before the order ships.
            </p>

            <h4 className="legend strong">Risk of Loss</h4>
            <p>
              Title and risk of loss pass to the customer upon delivery of the
              package. If a package is lost, damaged, or stolen in transit,
              please see Lost or Stolen Packages and Damaged, Defective, or
              Incorrect Items below. We assist with carrier claims and offer
              replacements or refunds in these cases.
            </p>

            <h4 className="legend strong">Order Tracking</h4>
            <p>
              Once your order ships, you will receive a confirmation email with
              tracking information. Orders can be tracked via the carrier's
              website or through your Onpath Studio account.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Returns</h3>

            <h4 className="legend strong">Return Window</h4>
            <p>
              We accept returns within 30 days of delivery for all eligible
              items across Essence, Opposite Day, and Art of Life.
            </p>
            <p>
              For customers in the European Union: our 30-day policy meets and
              exceeds the 14-day statutory right of withdrawal provided under
              Directive 2011/83/EU. You retain all rights under that directive.
            </p>

            <h4 className="legend strong">Eligibility</h4>
            <p>Returned items must be:</p>
            <ul>
              <li>Unworn, unwashed, and unused</li>
              <li>Returned with all original tags attached and intact</li>
              <li>
                Accompanied by all original packaging and accessories — dust
                bag, garment bag, cards, and anything else included in the box
              </li>
              <li>
                Free of any signs of wear, alteration, staining, or odor
                (including perfume and smoke)
              </li>
            </ul>
            <p>
              Items returned in a condition inconsistent with the above may be
              refused or returned to you, and we reserve the right to apply a
              reduction to the refund reflecting diminished value.
            </p>

            <h4 className="legend strong">How to Initiate a Return</h4>
            <p>
              Return shipping is complimentary for all eligible returns within
              the 30-day window.
            </p>
            <ul>
              <li>
                Request authorization. Email support@onpath.studio with your
                order number, the item(s) you wish to return, and a brief
                reason. The feedback shapes our next collections.
              </li>
              <li>
                Receive your label. We send a Return Authorization and a prepaid
                return shipping label within 1–2 business days.
              </li>
              <li>
                Pack and ship. Return the item in its original packaging with
                all tags and accessories included.
              </li>
            </ul>
            <p>
              Please do not ship items back without a Return Authorization —
              unauthorized returns may not be accepted.
            </p>

            <h4 className="legend strong">Inspection</h4>
            <p>
              All returns are inspected on receipt by our quality team.
              Inspection covers the condition of the garment, the presence and
              integrity of tags, packaging, and accessories, and the overall
              completeness of the return.
            </p>
            <p>
              Approved returns are processed within 5 business days of receipt.
            </p>

            <h4 className="legend strong">Refunds</h4>
            <ul>
              <li>Refunds are issued to the original payment method</li>
              <li>
                Processing takes 5–7 business days after inspection is approved;
                your bank or card issuer may require additional time to post
                funds
              </li>
              <li>
                Original shipping fees are non-refundable except where the
                return is due to our error
              </li>
              <li>
                If your original order qualified for free shipping, that benefit
                is not retroactively removed if a partial return brings the
                remaining order below the threshold
              </li>
            </ul>

            <h4 className="legend strong">Exchanges</h4>
            <p>We want you to love what you wear.</p>
            <p>
              <strong>Window and eligibility.</strong> Exchanges follow the same
              30-day window and eligibility requirements as returns. Items must
              be unworn, unwashed, and returned with all original tags and
              packaging.
            </p>
            <p>
              <strong>What can be exchanged.</strong> The same item in a
              different size, or the same item in a different color, subject to
              availability.
            </p>
            <p>
              <strong>Complimentary both ways.</strong> We provide a prepaid
              return label and ship the replacement with complimentary delivery.
            </p>
            <p>
              <strong>How to initiate.</strong>
            </p>
            <ul>
              <li>
                Email support@onpath.studio with your order number, the item
                you'd like to exchange, and your preferred replacement (size,
                color, or both).
              </li>
              <li>
                We confirm availability and send an Exchange Authorization with
                a prepaid return label within 1–2 business days.
              </li>
              <li>
                Ship the original item back. Once received and inspected (within
                5 business days), the replacement ships within 2–3 business
                days.
              </li>
            </ul>
            <p>
              If your preferred replacement is unavailable, we will notify you
              and offer a full refund or store credit.
            </p>

            <h4 className="legend strong">Order Changes and Cancellation</h4>
            <p>
              Because every piece is made to order, changes and cancellations
              depend on whether production has begun.
            </p>
            <p>
              <strong>Within 48 hours of placing your order:</strong> you may
              cancel, or change the size or color, subject to availability.
              Email support@onpath.studio with your order number. Cancellations
              are refunded in full within 10 business days.
            </p>
            <p>
              <strong>After 48 hours:</strong> production planning will have
              begun and changes or cancellations are no longer available as of
              right. Contact us and we will review your request in good faith.
            </p>
            <p>
              If we cause a significant delay beyond the 2–4 week window, we
              will notify you with a revised ship date and the option to wait or
              cancel for a full refund.
            </p>

            <h4 className="legend strong">
              Damaged, Defective, or Incorrect Items
            </h4>
            <p>
              Quality is central to what we do, and a piece that arrives
              compromised is our failure, not yours.
            </p>
            <p>
              If your item arrives damaged or defective, contact
              support@onpath.studio immediately with photographs. Defective item
              claims receive priority review. When confirmed, we will offer a
              replacement or full refund — whichever you prefer.
            </p>
            <p>
              If you receive an incorrect item, we will ship the correct piece
              immediately at our cost and provide a prepaid return label for the
              original.
            </p>
            <p>
              Minor variations characteristic of hand-finished production —
              slight differences in the placement of embroidery, subtle
              variations in natural materials like horn or wool — are not
              defects.
            </p>

            <h4 className="legend strong">Lost or Stolen Packages</h4>
            <p>
              If your tracking shows your package as delivered, but you have not
              received it:
            </p>
            <ul>
              <li>
                Check with neighbors, household members, and the front desk of
                your building.
              </li>
              <li>
                Wait 24 hours — packages are sometimes marked delivered before
                they actually arrive.
              </li>
              <li>
                If the package has not appeared, report it to
                support@onpath.studio within 5 days of the expected delivery
                date.
              </li>
            </ul>
            <p>
              We file a carrier claim on your behalf and, during review, offer a
              replacement or refund. Onpath absorbs the cost in these cases —
              customers are never penalized for carrier error.
            </p>

            <h4 className="legend strong">Gift Orders</h4>
            <p>
              If you received an Onpath piece as a gift and wish to return or
              exchange it, contact support@onpath.studio within the 30-day
              window with the gift order number or gift receipt. Returns are
              refunded to the original purchaser in the original method of
              payment. Exchanges follow the standard process above.
            </p>
            <p>
              If you are purchasing a gift and wish to have the order shipped
              directly to the recipient with a discreet, price-free packing
              slip, note this at checkout or email us before placing the order.
            </p>

            <h4 className="legend strong">Special Circumstances</h4>
            <p>
              Our standard 30-day window is firm, but we review exceptional
              situations with care — illness, emergencies, shipping disruptions,
              and other circumstances beyond your control. In these cases, store
              credit may be offered at our discretion. Write to us. We'd rather
              hear from you than not.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Contact</h3>
            <p>
              Customer Support, Returns, and General Inquiries —
              support@onpath.studio
            </p>
            <p>
              <strong>Business Hours:</strong> Monday–Friday, 9:00 AM – 5:00 PM
              EST. We respond to all inquiries within one business day.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Policy Updates</h3>
            <p>
              This policy is subject to change. Any updates will be posted here
              with a revised effective date. Your continued use of the Site
              after an update constitutes your acceptance of the revised policy.
            </p>
            <p>
              Thank you for being part of the Onpath Studio story. Every order
              supports our work to create thoughtful, lasting pieces.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ShippingReturns
