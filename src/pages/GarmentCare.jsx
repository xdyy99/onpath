import { motion } from 'framer-motion'

const GarmentCare = () => {
  return (
    <div className="article">
      <div className="article-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          Garment Care Guide
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="article-legal"
        >
          <div className="cmsContent">
            <p>&nbsp;</p>
            <h3 className="legend strong">Cashmere</h3>
            <p>
              <em>Jacquard Sweater — 100% cashmere, 160–200 gsm</em>
            </p>
            <p>
              Cashmere is a fiber of quiet strength. It insulates at a fraction
              of the weight of wool and softens with time — but only if given
              the rest, space, and gentleness it asks for.
            </p>

            <h4 className="legend strong">Washing</h4>
            <p>
              Hand wash in cool water, below 30°C / 86°F, with a pH-neutral
              cashmere or wool detergent. Submerge the sweater, press gently,
              and let it soak for ten to fifteen minutes. Do not rub, twist, or
              agitate — friction is where felting begins.
            </p>
            <p>
              If using a machine, select the wool cycle: cold, minimal spin
              (≤600 rpm), inside a mesh laundry bag.
            </p>

            <h4 className="legend strong">Drying</h4>
            <p>
              Press the garment between two clean towels to draw out excess
              water. Never wring. Reshape flat on a fresh towel and dry away
              from direct sunlight, radiators, and any heated surface.
            </p>
            <p>
              Never hang cashmere to dry. The weight of the water will pull the
              shoulders and lengthen the body permanently.
            </p>

            <h4 className="legend strong">Finishing</h4>
            <p>
              Steam rather than iron. If iron is required, use the lowest wool
              setting through a pressing cloth — press and lift, do not slide.
            </p>

            <h4 className="legend strong">Between Wears</h4>
            <p>
              Rest the sweater for at least forty-eight hours between wears. The
              fibers need time to recover their loft; consecutive wear
              accelerates thinning at the elbows, cuffs, and underarms.
            </p>

            <h4 className="legend strong">Pilling</h4>
            <p>
              Light pilling is natural — the sign of loose fibers releasing, not
              a flaw. Remove gently with a cashmere comb, working in one
              direction. If using a fabric shaver, use it on its lowest setting
              and do not pull.
            </p>

            <h4 className="legend strong">Storage</h4>
            <p>
              Fold flat. Never hang. Store inside the cotton dust bag with a
              cedar block or sachet of dried lavender. Clean the sweater before
              long-term storage at the end of the season — moths are drawn to
              the invisible residue of skin and food, not to the wool itself.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Pima Cotton</h3>
            <p>
              <em>Unisex T-Shirt — Premium Pima cotton jersey, 160–180 gsm</em>
            </p>
            <p>
              Pima is the longest-staple cotton in commercial production. The
              extended fiber length produces a softer hand, a stronger yarn, and
              a surface less prone to pilling. Treated well, it will outlast the
              seasons it was never part of.
            </p>

            <h4 className="legend strong">Washing</h4>
            <p>
              Machine wash cold, at a maximum of 30°C, inside out, with similar
              colors. Use a mild liquid detergent. Avoid three things in
              particular:
            </p>
            <ul>
              <li>
                Optical brighteners — they dull the natural depth of the dye
                over repeated cycles.
              </li>
              <li>
                Fabric softeners — they coat the cotton fibers and reduce
                breathability.
              </li>
              <li>
                Bleach — it weakens the yarn and shortens the garment's life.
              </li>
            </ul>

            <h4 className="legend strong">Drying</h4>
            <p>
              Tumble dry on low, or — preferably — dry flat or hang to dry.
              Air-drying preserves the neckline and the original fit at the
              shoulders, where jersey is most prone to stretch.
            </p>
            <p>
              Remove from the dryer while still slightly damp. Residual heat
              after the cycle ends is what sets deeper creases.
            </p>

            <h4 className="legend strong">Finishing</h4>
            <p>
              Warm iron if desired, inside out, while slightly damp. Pima takes
              a crisp press without losing its drape.
            </p>

            <h4 className="legend strong">Storage</h4>
            <p>
              Fold and stack. Hanging is unnecessary for jersey and distorts the
              shoulder line over time.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Wool Gabardine</h3>
            <p>
              <em>
                Trousers — 100% wool gabardine, 250–330 gsm · genuine horn
                buttons · antique brass hardware
              </em>
            </p>
            <p>
              Gabardine is a tightly woven worsted wool — denser, smoother, and
              more structured than twill, engineered to hold a crease. The
              trouser's character lives in that crease. Lose it, and you've lost
              the line of the garment.
            </p>

            <h4 className="legend strong">Cleaning</h4>
            <p>
              Dry clean only, with a specialist in tailored garments.
              Gabardine's weave is what gives the trouser its line; machine
              washing relaxes the twist in the yarn, and the trouser softens
              permanently. Two to three professional cleanings per season is
              sufficient for regular wear.
            </p>
            <p>
              Ask the cleaner to press the front and back creases as part of the
              service — gabardine holds a sharp crease well, but the crease
              needs to be reset after each clean.
            </p>

            <h4 className="legend strong">Spot Treatment</h4>
            <p>
              Address marks immediately. Blot — do not rub — with a clean, damp
              white cloth. For wine, oil, or anything pigmented, leave the work
              to the dry cleaner. Home solvents strip the wool's natural oils
              and can leave water rings on gabardine that are harder to remove
              than the original stain.
            </p>

            <h4 className="legend strong">Refreshing</h4>
            <p>
              Steam — do not iron directly on the surface. Hold the steamer
              eight to ten centimeters from the wool and move evenly, following
              the grain. For the creases, press through a pressing cloth with a
              cool-to-warm iron, aligning the iron along the existing fold.
              Never create a new crease over an old one.
            </p>

            <h4 className="legend strong">Brushing</h4>
            <p>
              A soft natural-bristle garment brush after each wear lifts surface
              dust and revives the finish. Gabardine picks up lint readily on
              darker colors — a dedicated brush is worth more than any lint
              roller.
            </p>

            <h4 className="legend strong">Hardware</h4>
            <p>
              Horn buttons (back pocket and front closure) are natural material.
              Do not submerge them, do not press an iron directly over them, and
              never machine-wash the trouser. Horn warps with heat and water,
              and cracks if dried too quickly.
            </p>
            <p>
              Antique brass zipper and hook closure. A soft dry cloth is all
              they need. The matte patina is part of the finish — do not polish
              it out.
            </p>

            <h4 className="legend strong">Between Wears</h4>
            <p>
              Rest for at least twenty-four hours between wears. The fibers need
              time to recover, and the crease needs time to reset under its own
              weight.
            </p>

            <h4 className="legend strong">Storage</h4>
            <p>
              Hang from the cuff on a clamp-style trouser hanger — the trouser's
              own weight will keep the crease true under gravity. If a clamp
              hanger is not available, fold carefully along the existing center
              crease and drape over the bar of a broad wooden hanger.
            </p>
            <p>
              Store beneath a breathable cotton garment bag. Add cedar or
              lavender for seasonal storage, and always clean the trouser before
              putting it away for summer.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">Wool Twill</h3>
            <p>
              <em>
                Nuvé Coat — 100% wool twill outer, 450 gsm · Cupro/Bemberg
                lining
              </em>
            </p>
            <p>
              A wool coat is not a garment to be laundered. It is a garment to
              be lived with — brushed, aired, steamed, rested. The twill's
              density, the lining's fluidity, and the metal hardware each ask
              for a different kind of attention.
            </p>

            <h4 className="legend strong">Cleaning</h4>
            <p>
              Dry clean only, with a specialist in tailored outerwear. Do not
              machine wash under any circumstances: the wool twill will felt and
              contract, and the Cupro/Bemberg lining — cellulose-based and
              water-sensitive — will watermark and shift in relation to the
              shell.
            </p>
            <p>
              One to two professional cleanings per season is sufficient for
              regular wear. Overcleaning ages a coat faster than underwearing
              it.
            </p>

            <h4 className="legend strong">Spot Treatment</h4>
            <p>
              Address marks immediately. Blot — do not rub — with a clean, damp
              white cloth. For anything beyond water, leave the work to the dry
              cleaner rather than attempting a home remedy; wool's natural oils
              give the twill its depth, and most household cleansers strip them.
            </p>

            <h4 className="legend strong">Brushing</h4>
            <p>
              Brush with a soft horsehair garment brush after each wear, moving
              with the grain of the weave. This lifts surface dust before it
              settles and revives the nap.
            </p>

            <h4 className="legend strong">Refreshing</h4>
            <p>
              Steam — never iron — to release creases and odor. Hold the steamer
              eight to ten centimeters from the surface. A well-made wool coat
              recovers most wrinkles overnight on the right hanger; steaming is
              for the ones that don't.
            </p>

            <h4 className="legend strong">Rain and Weather</h4>
            <p>
              Wool is naturally water-resistant. If the coat becomes wet, shake
              off excess moisture and hang to dry slowly at room temperature —
              away from radiators, direct sun, and forced heat. Accelerated
              drying strips the wool's lanolin and leaves the fiber brittle.
            </p>

            <h4 className="legend strong">Hardware</h4>
            <p>
              The brushed silver star buttons are solid cast metal. A soft dry
              cloth is all they require. Avoid silver polish, abrasive cleaners,
              and ammonia-based products — these strip the brushed finish and
              flatten the engraved signature.
            </p>

            <h4 className="legend strong">Hood Zipper</h4>
            <p>
              If the metal zipper resists, do not force it. A light pass of
              beeswax or a graphite pencil along the teeth restores the action
              without residue.
            </p>

            <h4 className="legend strong">Between Wears</h4>
            <p>
              Rest the coat for at least forty-eight hours between wears. Wool
              releases absorbed moisture slowly, and a single wear holds more
              humidity in the fiber than most people expect.
            </p>

            <h4 className="legend strong">Storage</h4>
            <p>
              Hang on a broad, shaped wooden hanger that matches the shoulder
              width of the coat. Wire and plastic hangers distort the shoulder
              line within weeks.
            </p>
            <p>
              Store beneath a breathable cotton garment bag. Never store wool in
              plastic — the fiber needs to breathe, and plastic traps the
              residual moisture that attracts moths and fosters mildew. Add
              cedar or lavender for seasonal storage, and always clean the coat
              before putting it away for summer.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GarmentCare
