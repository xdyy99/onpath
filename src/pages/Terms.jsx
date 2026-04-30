import { motion } from 'framer-motion'

const Terms = () => {
  const scrollToId = (e, id) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    if (window.lenis) {
      window.lenis.scrollTo(target, { offset: -110 })
    } else {
      const y = target.getBoundingClientRect().top + window.scrollY - 110
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div className="article">
      <div className="article-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          Terms &amp; Conditions
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="article-legal"
        >
          <div className="cmsContent">
            <h3 className="legend strong">Contents</h3>
            <ul>
              <li>
                <a
                  href="#terms-of-service"
                  onClick={(e) => scrollToId(e, 'terms-of-service')}
                >
                  Part I — Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#privacy-policy"
                  onClick={(e) => scrollToId(e, 'privacy-policy')}
                >
                  Part II — Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#cookie-policy"
                  onClick={(e) => scrollToId(e, 'cookie-policy')}
                >
                  Part III — Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#accessibility-statement"
                  onClick={(e) => scrollToId(e, 'accessibility-statement')}
                >
                  Part IV — Accessibility Statement
                </a>
              </li>
            </ul>

            <p>&nbsp;</p>
            <h3 className="legend strong" id="terms-of-service">
              Part I — Terms of Service
            </h3>
            <p>
              These Terms of Service (the "Terms") govern your access to and use
              of the website located at [onpath.studio] (the "Site") and any
              products or services offered by Onpath Studio, LLC ("Onpath,"
              "we," "us," or "our"). By accessing the Site, creating an account,
              or placing an order, you agree to be bound by these Terms. If you
              do not agree, do not use the Site.
            </p>
            <p>
              These Terms include important provisions on dispute resolution,
              governing law, and limitation of liability. Please read them
              carefully.
            </p>

            <h4 className="legend strong">1. Eligibility</h4>
            <p>
              You must be at least 18 years of age and legally capable of
              entering into a binding contract to use the Site or purchase from
              us. By using the Site, you represent that you meet these
              requirements.
            </p>

            <h4 className="legend strong">2. Account registration</h4>
            <p>
              You may browse the Site without an account. To place an order, you
              may be required to provide an email address and certain other
              information. You are responsible for maintaining the
              confidentiality of your account credentials and for all activity
              conducted through your account. Notify us promptly at
              support@onpath.studio if you suspect unauthorized use of your
              account.
            </p>

            <h4 className="legend strong">3. Products</h4>
            <p>
              We take reasonable care to describe our products accurately,
              including fabric composition, dimensions, country of origin, and
              care requirements. Colors shown on the Site may vary slightly from
              the actual product due to differences in screen calibration,
              lighting, and photography conditions. Slight variations in
              handmade or hand-finished elements are a characteristic of our
              production process and are not defects.
            </p>
            <p>
              Availability of products is not guaranteed. Most items are offered
              on a made-to-order or pre-order basis; see Section 8 below for
              details.
            </p>

            <h4 className="legend strong">4. Pricing and payment</h4>
            <p>
              Prices are displayed in U.S. dollars (USD) unless otherwise
              specified and are inclusive of all applicable sales taxes only
              where required by law to be shown inclusive. Prices may change at
              any time without notice. The price applicable to your order is the
              price shown at the time your order is placed and accepted.
            </p>
            <p>
              We accept the payment methods listed at checkout. For pre-order
              and made-to-order items, payment is charged in full at the time of
              order. See Section 8 below.
            </p>
            <p>
              We reserve the right to refuse or cancel any order for reasons
              including but not limited to pricing or product information
              errors, suspected fraud, unauthorized transactions, and
              limitations on available quantities. If we cancel an order for
              which payment has been taken, we will issue a full refund to the
              original payment method.
            </p>

            <h4 className="legend strong">5. Order acceptance</h4>
            <p>
              Your submission of an order constitutes an offer to purchase, not
              a binding contract. A contract is formed only when we confirm
              acceptance of your order by email. We may decline to accept an
              order in our reasonable discretion.
            </p>

            <h4 className="legend strong">6. Shipping and delivery</h4>
            <p>
              Shipping terms, timeframes, carriers, and treatment of
              international duties and taxes are set out in our Shipping Policy,
              which is incorporated into these Terms by reference. Risk of loss
              passes to you upon delivery.
            </p>

            <h4 className="legend strong">7. Returns and refunds</h4>
            <p>
              Returns, exchanges, and refunds are governed by our Returns and
              Refunds Policy, which is incorporated into these Terms by
              reference. Nothing in these Terms or in that policy limits any
              non-waivable statutory rights you may have as a consumer under
              applicable law, including the 14-day right of withdrawal under
              Directive 2011/83/EU for consumers in the European Union.
            </p>

            <h4 className="legend strong">
              8. Pre-orders and made-to-order production
            </h4>
            <p>
              Most items offered on the Site are produced on a pre-order or
              made-to-order basis. Production is initiated based on confirmed
              orders, which allows us to operate without excess inventory and to
              work closely with our production partners in Italy on quality.
            </p>
            <p>
              A pre-order is marked as such on the product page and at checkout.
            </p>
            <p>
              <strong>Payment.</strong> Payment is collected in full at the time
              of order, not at the time of shipment. This funds the production
              of your item and secures your place in the production schedule.
            </p>
            <p>
              <strong>Fulfillment timeline.</strong> Our standard fulfillment
              window is up to eight weeks from the date of order confirmation to
              the date of shipment. This is an estimate, not a guarantee. Most
              orders ship within this window; some may ship sooner. You will
              receive two email updates during the production process: one
              confirming that production has begun, and one with tracking
              information when the completed item ships.
            </p>
            <p>
              <strong>Cancellation and changes within 48 hours.</strong> You may
              cancel a pre-order or change the size or color of a pre-ordered
              item within 48 hours of placing your order, subject to
              availability, by emailing support@onpath.studio with your order
              number. After 48 hours, production planning will have begun and
              cancellations or changes are no longer available.
            </p>
            <p>
              <strong>Cancellation after 48 hours.</strong> Once the initial
              48-hour window has passed, cancellations and modifications are not
              available. If you have a significant change in circumstances,
              contact support@onpath.studio and we will review your request in
              good faith, but we cannot commit in advance to accommodating it.
            </p>
            <p>
              <strong>Significant delay.</strong> If we determine that your
              order will not ship within the standard eight-week window, we will
              notify you by email with the reason for the delay, a revised
              estimated ship date, and your option to either wait for the
              revised date or cancel the order for a full refund. If you choose
              to cancel, we will refund the full purchase price to your original
              payment method within 10 business days. If we are unable to
              fulfill your order at all, we will notify you promptly and issue a
              full refund.
            </p>
            <p>
              <strong>Force majeure.</strong> Onpath is not liable for delays or
              failures in fulfillment caused by events beyond our reasonable
              control, including natural disasters, public health emergencies,
              acts of government, labor disputes affecting our production
              partners or shipping carriers, or disruption in the supply of
              materials. In such cases, we will communicate promptly and offer
              the options described above.
            </p>
            <p>
              <strong>After delivery.</strong> Once your pre-order ships, the
              terms of our Shipping Policy apply. Once delivered, the terms of
              our Returns and Refunds Policy apply, including the 14-day return
              window for items that are unworn and in original condition.
            </p>

            <h4 className="legend strong">9. Intellectual property</h4>
            <p>
              All content on the Site, including but not limited to the Onpath
              Studio name and logo, product designs, photography, videography,
              written copy, graphics, and the selection and arrangement thereof,
              is the property of Onpath Studio, LLC or its licensors and is
              protected by copyright, trademark, and other intellectual property
              laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works
              of, publicly display, publicly perform, republish, download,
              store, or transmit any material from the Site without our prior
              written permission, except as strictly necessary for personal,
              non-commercial viewing.
            </p>
            <p>
              <strong>User-submitted content.</strong> If you submit
              photographs, reviews, social media posts tagging Onpath, or other
              content involving our products, you grant Onpath a non-exclusive,
              worldwide, royalty-free, transferable, sublicensable license to
              use, reproduce, modify, adapt, publish, and display that content
              in connection with our business and marketing, with attribution
              where practical. You represent that you own or have the rights to
              grant this license and that the content does not violate the
              rights of any third party.
            </p>

            <h4 className="legend strong">10. Acceptable use</h4>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Site in any way that violates applicable law;</li>
              <li>
                Attempt to gain unauthorized access to any part of the Site, the
                servers on which it is hosted, or any database connected to it;
              </li>
              <li>
                Interfere with the proper working of the Site, including through
                the introduction of malware, denial-of-service activity, or
                automated scraping at a scale that places undue load on our
                systems;
              </li>
              <li>
                Impersonate any person or entity, or misrepresent your
                affiliation with any person or entity;
              </li>
              <li>
                Use the Site to transmit unsolicited commercial communications,
                collect personal information about other users, or engage in
                fraudulent activity.
              </li>
            </ul>
            <p>
              We may suspend or terminate your access to the Site at any time
              for conduct we reasonably believe violates these Terms.
            </p>

            <h4 className="legend strong">11. Disclaimer of warranties</h4>
            <p>
              Except as expressly required by applicable law that cannot be
              disclaimed, the Site and all products are provided on an "as is"
              and "as available" basis. To the fullest extent permitted by law,
              Onpath disclaims all warranties, express or implied, including
              warranties of merchantability, fitness for a particular purpose,
              and non-infringement. We do not warrant that the Site will be
              uninterrupted, error-free, or secure.
            </p>
            <p>
              This section does not exclude or limit any warranty, remedy, or
              right that cannot be excluded or limited under applicable consumer
              protection law.
            </p>

            <h4 className="legend strong">12. Limitation of liability</h4>
            <p>
              To the fullest extent permitted by law, Onpath Studio, LLC,
              together with its members, managers, officers, employees, agents,
              and contractors, shall not be liable for any indirect, incidental,
              special, consequential, exemplary, or punitive damages arising out
              of or related to your use of the Site or purchase of any product,
              including but not limited to lost profits, lost data, or business
              interruption, whether based in contract, tort, strict liability,
              or otherwise, and whether or not we have been advised of the
              possibility of such damages.
            </p>
            <p>
              Our total aggregate liability to you for any claim arising out of
              or related to these Terms or the Site shall not exceed the greater
              of the amount you paid to Onpath in the twelve months preceding
              the event giving rise to the claim, or one hundred U.S. dollars
              (USD $100).
            </p>
            <p>
              The limitations in this section do not apply to liability that
              cannot be limited under applicable law, including liability for
              death or personal injury caused by negligence, fraud, or other
              non-waivable categories. Nothing in these Terms limits the
              statutory rights of consumers in jurisdictions where such
              limitations are not permitted, including EU consumer protection
              law.
            </p>

            <h4 className="legend strong">13. Indemnification</h4>
            <p>
              You agree to indemnify, defend, and hold harmless Onpath Studio,
              LLC and its members, managers, officers, employees, agents, and
              contractors from and against any claims, damages, losses,
              liabilities, and expenses (including reasonable attorneys' fees)
              arising out of or related to your breach of these Terms, your
              violation of applicable law, or your violation of any third-party
              right in connection with your use of the Site.
            </p>

            <h4 className="legend strong">
              14. Governing law and dispute resolution
            </h4>
            <p>
              These Terms and any dispute arising out of or related to them or
              the Site are governed by the laws of the Commonwealth of
              Massachusetts, United States, without regard to its
              conflict-of-laws principles. This choice of law does not deprive
              consumers resident in the European Union of the protection
              afforded by mandatory consumer protection law of their country of
              residence.
            </p>
            <p>
              <strong>Informal resolution.</strong> Before initiating any formal
              dispute, you agree to contact us at support@onpath.studio and
              attempt in good faith to resolve the dispute through informal
              negotiation for a period of at least 30 days.
            </p>
            <p>
              <strong>Arbitration.</strong> If informal resolution does not
              succeed, you and Onpath agree that any dispute arising out of or
              related to these Terms or your use of the Site shall be resolved
              by binding arbitration administered by the American Arbitration
              Association under its Consumer Arbitration Rules, rather than in
              court. The arbitration shall take place in Suffolk County,
              Massachusetts, or by video or telephone if the claimed amount is
              less than USD $10,000. The arbitrator's decision shall be final
              and binding.
            </p>
            <p>
              <strong>Carve-out for small claims.</strong> Either party may
              bring an individual action in a small claims court of competent
              jurisdiction in lieu of arbitration, provided the claim remains
              within the jurisdictional limits of that court.
            </p>
            <p>
              <strong>Class action waiver.</strong> You and Onpath agree that
              any dispute resolution proceeding shall be conducted only on an
              individual basis and not in a class, consolidated, or
              representative action. If this waiver is found unenforceable, the
              entire arbitration agreement shall be void.
            </p>
            <p>
              <strong>EU consumer carve-out.</strong> The arbitration and
              class-action-waiver provisions above do not apply to consumers
              resident in the European Union to the extent they conflict with
              mandatory consumer protection law. Such consumers retain the right
              to bring proceedings in the courts of their country of residence.
            </p>

            <h4 className="legend strong">15. Severability</h4>
            <p>
              If any provision of these Terms is held invalid or unenforceable,
              that provision shall be enforced to the maximum extent
              permissible, and the remaining provisions shall remain in full
              force and effect.
            </p>

            <h4 className="legend strong">16. Entire agreement</h4>
            <p>
              These Terms, together with the Privacy Policy, Cookie Policy,
              Returns and Refunds Policy, Shipping Policy, and any other
              policies posted on the Site, constitute the entire agreement
              between you and Onpath regarding your use of the Site and
              supersede any prior agreements.
            </p>

            <h4 className="legend strong">17. Changes to these Terms</h4>
            <p>
              We may update these Terms from time to time. If we make material
              changes, we will notify you by posting the updated Terms on the
              Site and updating the effective date. Your continued use of the
              Site after changes take effect constitutes your acceptance of the
              revised Terms.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong" id="privacy-policy">
              Part II — Privacy Policy
            </h3>
            <p>
              This Privacy Policy describes how Onpath Studio, LLC collects,
              uses, discloses, and protects personal information in connection
              with your use of the Site and your purchases from us.
            </p>
            <p>
              By using the Site or purchasing from us, you consent to the
              practices described below. If you do not agree, please do not use
              the Site.
            </p>

            <h4 className="legend strong">1. Who we are</h4>
            <p>
              Onpath Studio, LLC is a single-member limited liability company
              formed under the laws of the Commonwealth of Massachusetts, United
              States.
            </p>

            <h4 className="legend strong">2. Information we collect</h4>
            <p>We collect the following categories of personal information:</p>
            <p>
              <strong>Information you provide to us.</strong> Name, shipping and
              billing address, email address, telephone number, payment
              information (processed by our payment provider — we do not store
              full card numbers ourselves), order history, product preferences,
              sizing information, and any other information you choose to
              provide when you create an account, place an order, contact
              customer service, or subscribe to our communications.
            </p>
            <p>
              <strong>Information collected automatically.</strong> IP address,
              browser type and version, device identifiers, operating system,
              pages visited, referring URL, search terms used on the Site, time
              and date of visits, and other usage data collected through cookies
              and similar technologies. See Part III below.
            </p>
            <p>
              <strong>Information from third parties.</strong> If you interact
              with us through social media platforms, we may receive information
              from those platforms as permitted by their terms and your privacy
              settings. If you pay through a third-party payment service, we
              receive transaction confirmation and limited billing information
              from that service.
            </p>
            <p>
              We do not knowingly collect information from individuals under the
              age of 18. If you believe we have collected information from a
              minor, contact us at support@onpath.studio and we will delete it.
            </p>

            <h4 className="legend strong">3. How we use your information</h4>
            <p>We use personal information to:</p>
            <ul>
              <li>
                Process and fulfill your orders, including production scheduling
                for made-to-order items, shipping, customs documentation, and
                delivery.
              </li>
              <li>
                Communicate with you about your orders, respond to customer
                service inquiries, and notify you of production and shipping
                updates.
              </li>
              <li>
                Send you marketing communications, where you have consented or
                where permitted by law, including product launches, editorial
                content, and showroom invitations. You may unsubscribe at any
                time.
              </li>
              <li>Operate, maintain, and improve the Site.</li>
              <li>
                Detect, prevent, and respond to fraud, security incidents, and
                other unlawful activity.
              </li>
              <li>
                Comply with legal obligations, including tax, customs, and
                regulatory reporting.
              </li>
              <li>Enforce our Terms of Service and other agreements.</li>
            </ul>

            <h4 className="legend strong">
              4. Legal basis for processing (for customers in the EEA and UK)
            </h4>
            <p>
              If you are in the European Economic Area or the United Kingdom, we
              rely on the following legal bases under the General Data
              Protection Regulation and UK GDPR:
            </p>
            <ul>
              <li>
                <strong>Performance of a contract</strong> — to process your
                orders and provide the products you purchase.
              </li>
              <li>
                <strong>Legitimate interests</strong> — to operate our business,
                prevent fraud, improve our services, and communicate with
                existing customers about similar products, subject to your right
                to object.
              </li>
              <li>
                <strong>Consent</strong> — for marketing communications to
                non-customers, for non-essential cookies, and for certain
                processing activities where consent is the appropriate basis.
                You may withdraw consent at any time.
              </li>
              <li>
                <strong>Legal obligation</strong> — to comply with tax, customs,
                anti-money-laundering, and other applicable law.
              </li>
            </ul>

            <h4 className="legend strong">5. How we share your information</h4>
            <p>
              We do not sell your personal information. We share personal
              information only with the following categories of recipients:
            </p>
            <p>
              <strong>Service providers.</strong> We work with third parties who
              process personal information on our behalf to operate the
              business. These include:
            </p>
            <ul>
              <li>
                Shopify Inc. — e-commerce platform, Site hosting, and order
                management.
              </li>
              <li>
                Klaviyo, Inc. — email marketing and customer relationship
                management.
              </li>
              <li>
                Shipping carriers — to deliver orders and provide tracking
                information.
              </li>
              <li>
                Customs brokers — for international shipments, as required by
                law.
              </li>
              <li>Production partners — to fulfill made-to-order items.</li>
              <li>
                Analytics and advertising providers — to measure Site
                performance and, where you have consented, to deliver relevant
                advertising.
              </li>
            </ul>
            <p>
              Each of these providers is contractually required to use personal
              information only as necessary to provide their services and in
              accordance with applicable privacy law.
            </p>
            <p>
              <strong>Legal recipients.</strong> We may disclose personal
              information when required by law, in response to a valid legal
              request, or to protect our rights, property, or safety, or that of
              our customers or others.
            </p>
            <p>
              <strong>Business transfers.</strong> If Onpath is involved in a
              merger, acquisition, sale of assets, or similar transaction,
              personal information may be transferred as part of that
              transaction, subject to the terms of this Privacy Policy.
            </p>

            <h4 className="legend strong">6. International transfers</h4>
            <p>
              Onpath is based in the United States. Personal information we
              collect may be transferred to, stored in, and processed in the
              United States and in other countries where our service providers
              operate. These countries may have data protection laws different
              from those in your jurisdiction.
            </p>
            <p>
              When we transfer personal information of individuals in the EEA or
              UK outside of those regions, we rely on appropriate safeguards,
              including the European Commission's Standard Contractual Clauses
              and equivalent UK mechanisms, to ensure your information remains
              protected.
            </p>

            <h4 className="legend strong">
              7. How long we keep your information
            </h4>
            <p>
              We retain personal information for as long as necessary to fulfill
              the purposes for which it was collected, including to provide our
              products and services, comply with legal and tax obligations,
              resolve disputes, and enforce our agreements.
            </p>
            <p>As a general rule:</p>
            <ul>
              <li>
                Customer account and order information — retained for seven
                years after your last interaction, to comply with tax and
                accounting record-keeping requirements.
              </li>
              <li>
                Marketing preferences and unsubscribe records — retained
                indefinitely, to ensure we honor your preferences.
              </li>
              <li>Website analytics — retained for up to 26 months.</li>
            </ul>
            <p>
              When personal information is no longer needed, we securely delete
              or anonymize it.
            </p>

            <h4 className="legend strong">8. Your rights</h4>
            <p>
              Depending on where you live, you may have the following rights in
              relation to your personal information:
            </p>
            <ul>
              <li>
                The right to access the personal information we hold about you.
              </li>
              <li>
                The right to correct inaccurate or incomplete personal
                information.
              </li>
              <li>
                The right to delete personal information, subject to certain
                legal exceptions.
              </li>
              <li>
                The right to restrict or object to certain types of processing.
              </li>
              <li>
                The right to data portability — to receive your personal
                information in a structured, machine-readable format.
              </li>
              <li>
                The right to withdraw consent at any time, where processing is
                based on consent.
              </li>
              <li>
                The right to lodge a complaint with a supervisory authority.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at
              support@onpath.studio. We will respond within the timeframes
              required by applicable law — typically within 30 days.
            </p>

            <h4 className="legend strong">For residents of California</h4>
            <p>
              Under the California Consumer Privacy Act (CCPA) as amended by the
              California Privacy Rights Act (CPRA), California residents have
              additional rights, including:
            </p>
            <ul>
              <li>
                The right to know what categories of personal information we
                collect, the sources of that information, the purposes for
                collecting it, and the third parties with whom we share it.
              </li>
              <li>
                The right to delete personal information we have collected,
                subject to exceptions.
              </li>
              <li>The right to correct inaccurate personal information.</li>
              <li>
                The right to opt out of the sale or sharing of personal
                information. Onpath does not sell personal information and does
                not share personal information for cross-context behavioral
                advertising without consent.
              </li>
              <li>
                The right to limit the use of sensitive personal information.
              </li>
              <li>
                The right to non-discrimination for exercising your privacy
                rights.
              </li>
            </ul>
            <p>
              To exercise these rights, contact us at support@onpath.studio. We
              may need to verify your identity before responding to your
              request.
            </p>

            <h4 className="legend strong">
              9. Cookies and similar technologies
            </h4>
            <p>
              The Site uses cookies and similar technologies. For detailed
              information on the cookies we use and how to manage them, please
              see Part III below.
            </p>

            <h4 className="legend strong">10. Security</h4>
            <p>
              We implement reasonable technical, administrative, and physical
              safeguards designed to protect personal information against loss,
              theft, misuse, and unauthorized access. No system is perfectly
              secure, and we cannot guarantee the absolute security of
              information transmitted to or from the Site.
            </p>
            <p>
              Payment information is processed by Stripe and is protected under
              PCI DSS standards. We do not store full payment card numbers on
              our systems.
            </p>

            <h4 className="legend strong">11. Third-party links</h4>
            <p>
              The Site may contain links to third-party websites and services.
              This Privacy Policy applies only to the Site and to Onpath's
              processing of personal information. We are not responsible for the
              privacy practices of third parties, and we encourage you to review
              the privacy policies of any third-party sites you visit.
            </p>

            <h4 className="legend strong">
              12. Changes to this Privacy Policy
            </h4>
            <p>
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you by posting the updated policy
              on the Site and, where appropriate, by email. The effective date
              at the top of this page indicates when the policy was last
              revised. Your continued use of the Site after an update indicates
              your acceptance of the revised policy.
            </p>
            <p>
              If Onpath has appointed a representative in the European Union or
              United Kingdom under Article 27 of the GDPR or UK GDPR, that
              representative's details will be provided here once designated.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong" id="cookie-policy">
              Part III — Cookie Policy
            </h3>
            <p>
              This Cookie Policy explains how Onpath uses cookies and similar
              technologies on the Site. It should be read together with the
              Privacy Policy in Part II above.
            </p>

            <h4 className="legend strong">1. What are cookies</h4>
            <p>
              Cookies are small text files that a website places on your device
              when you visit. They are widely used to make websites work, to
              improve user experience, and to provide information to the website
              operator. Similar technologies such as web beacons, pixels, and
              local storage are used for the same purposes and are covered by
              this Policy.
            </p>

            <h4 className="legend strong">2. Categories of cookies we use</h4>
            <p>
              <strong>Strictly necessary cookies.</strong> These cookies are
              essential for the Site to function and cannot be switched off.
              They support basic functions such as page navigation, shopping
              cart operation, checkout, and maintaining your session while you
              browse. The Site cannot be used without them.
            </p>
            <p>
              <strong>Performance and analytics cookies.</strong> These cookies
              help us understand how visitors interact with the Site — which
              pages are most visited, how long visitors spend on each page, and
              whether error messages are shown. The information is aggregated
              and used to improve the Site. We use analytics tools provided by
              Shopify and may use Google Analytics or similar services.
            </p>
            <p>
              <strong>Functional cookies.</strong> These cookies enable enhanced
              functionality and personalization, such as remembering your
              language or region preferences. They may be set by us or by
              third-party providers whose services we have added to the Site.
            </p>
            <p>
              <strong>Marketing and advertising cookies.</strong> These cookies
              are used to deliver advertising more relevant to you and your
              interests, to measure the effectiveness of advertising campaigns,
              and to limit the number of times you see an advertisement. They
              are typically set by advertising partners, including Meta
              (Facebook and Instagram), with our permission. They work by
              uniquely identifying your browser and device.
            </p>

            <h4 className="legend strong">3. Third parties</h4>
            <p>
              The Site includes cookies and similar technologies from the
              following third parties:
            </p>
            <ul>
              <li>
                Shopify — e-commerce platform functionality, cart, checkout, and
                performance analytics.
              </li>
              <li>Klaviyo — email marketing personalization and analytics.</li>
              <li>
                Meta — advertising measurement and retargeting, where consent is
                provided.
              </li>
              <li>Google — analytics, where consent is provided.</li>
            </ul>
            <p>
              Each of these third parties has its own privacy policy governing
              their use of cookies.
            </p>

            <h4 className="legend strong">4. How to manage cookies</h4>
            <p>You can manage cookies in several ways:</p>
            <p>
              <strong>Cookie consent banner.</strong> The first time you visit
              the Site, we present a cookie banner that allows you to accept or
              reject non-essential cookies. You can change your preferences at
              any time by clicking the cookie preferences link in the Site
              footer.
            </p>
            <p>
              <strong>Browser settings.</strong> Most browsers allow you to see
              what cookies are set on your device, to delete them, and to block
              some or all of them. The process varies by browser — consult your
              browser's help documentation.
            </p>
            <p>
              <strong>Opt-out tools.</strong> For advertising cookies, you can
              opt out through industry tools such as youronlinechoices.eu (EU),
              optout.aboutads.info (US), or youradchoices.ca (Canada).
            </p>
            <p>
              Blocking all cookies, including strictly necessary ones, will
              prevent parts of the Site from working. Blocking only
              non-essential cookies will not affect your ability to browse or
              purchase.
            </p>

            <h4 className="legend strong">5. Changes to this Cookie Policy</h4>
            <p>
              We may update this Cookie Policy from time to time to reflect
              changes in the cookies we use or for legal or operational reasons.
              The effective date at the top of this page indicates when the
              policy was last revised.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong" id="accessibility-statement">
              Part IV — Accessibility Statement
            </h3>
            <p>
              Onpath Studio is committed to making the Site accessible to as
              wide an audience as possible, including people with disabilities.
              Accessibility is an ongoing effort, not a state we consider
              finished.
            </p>

            <h4 className="legend strong">1. Our standard</h4>
            <p>
              We aim to conform to the Web Content Accessibility Guidelines
              (WCAG) 2.1, Level AA published by the World Wide Web Consortium.
              These guidelines set out requirements that make web content more
              accessible to people with a range of disabilities, including
              visual, auditory, motor, and cognitive impairments.
            </p>

            <h4 className="legend strong">2. Current status</h4>
            <p>
              We review the Site regularly against the WCAG 2.1 AA criteria and
              work with our developers and platform providers to address issues
              as they are identified. Areas of ongoing attention include:
            </p>
            <ul>
              <li>Sufficient color contrast between text and background.</li>
              <li>Alternative text for meaningful images.</li>
              <li>Keyboard accessibility for all interactive elements.</li>
              <li>Screen reader compatibility.</li>
              <li>Form labels and error messaging.</li>
              <li>Video captions and transcripts, where video is used.</li>
            </ul>
            <p>
              We acknowledge that no website is fully accessible to every user
              at every moment, and that some third-party embedded content on the
              Site may not fully conform to our accessibility goals. Where this
              is the case, we work with those third parties to improve the
              experience.
            </p>

            <h4 className="legend strong">3. Reporting an issue</h4>
            <p>
              If you encounter an accessibility barrier on the Site — a page
              that does not read properly with a screen reader, a form you
              cannot complete, an image without alternative text, or anything
              else — please contact us.
            </p>
            <p>Email: support@onpath.studio</p>
            <p>Please include:</p>
            <ul>
              <li>The URL of the page where you encountered the issue;</li>
              <li>A description of the issue;</li>
              <li>
                The assistive technology you were using (if any), including
                browser and version.
              </li>
            </ul>
            <p>
              We aim to respond to accessibility inquiries within five business
              days.
            </p>

            <h4 className="legend strong">4. Alternative means of access</h4>
            <p>
              If you are unable to complete a purchase or obtain information
              through the Site due to an accessibility barrier, we are glad to
              assist you directly. Contact us at support@onpath.studio and we
              will help you complete your order or answer your question.
            </p>

            <h4 className="legend strong">5. Continuous improvement</h4>
            <p>
              Accessibility considerations are part of the design and
              development process for any new feature on the Site. We train team
              members involved in content and development on accessibility
              principles, and we evaluate the Site's accessibility as part of
              our periodic reviews.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms
