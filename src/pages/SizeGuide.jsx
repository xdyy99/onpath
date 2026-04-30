import { motion } from 'framer-motion'

const SizeGuide = () => {
  return (
    <div className="article">
      <div className="article-wrapper">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="article-title"
        >
          Garment Size Guide
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="article-legal"
        >
          <div className="cmsContent">
            <p>
              Our sizes are graded on Italian standards and translated for
              international reference. If you are between sizes, the fit notes
              for each garment below will tell you which way to err.
            </p>

            <p>&nbsp;</p>
            <h3 className="legend strong">How to Measure</h3>
            <p>
              Take measurements over light undergarments, standing relaxed with
              arms at your sides. Use a soft tape — a metal ruler will read
              tight against the body. Have someone measure for you if possible;
              self-measurement at the back and across the shoulders is rarely
              accurate.
            </p>
            <ul>
              <li>
                <strong>Chest / bust</strong> — around the fullest part, tape
                level under the arms.
              </li>
              <li>
                <strong>Waist</strong> — around the natural waistline, the
                narrowest point of the torso, above the hip bone. Not at the
                belt line.
              </li>
              <li>
                <strong>Hip</strong> — around the fullest part of the seat,
                roughly 20 cm below the waist.
              </li>
              <li>
                <strong>Inseam</strong> — from the crotch seam of a trouser that
                fits you well, down the inside leg to the hem.
              </li>
              <li>
                <strong>Shoulder</strong> — from the outer edge of one shoulder
                to the other, measured across the back.
              </li>
              <li>
                <strong>Sleeve</strong> — from the shoulder seam, along the
                outside of the arm, to the wrist bone.
              </li>
            </ul>

            <p>&nbsp;</p>
            <h3 className="legend strong">Size Reference</h3>

            <h4 className="legend strong">Women</h4>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>Onpath</th>
                    <th>IT</th>
                    <th>FR</th>
                    <th>UK</th>
                    <th>US</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>38</td>
                    <td>34</td>
                    <td>6</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>40</td>
                    <td>36</td>
                    <td>8</td>
                    <td>4</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>42</td>
                    <td>38</td>
                    <td>10</td>
                    <td>6</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>44</td>
                    <td>40</td>
                    <td>12</td>
                    <td>8</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>46</td>
                    <td>42</td>
                    <td>14</td>
                    <td>10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="legend strong">Men</h4>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>Onpath</th>
                    <th>IT / EU</th>
                    <th>UK</th>
                    <th>US</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>44</td>
                    <td>34</td>
                    <td>34</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>46</td>
                    <td>36</td>
                    <td>36</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>48</td>
                    <td>38</td>
                    <td>38</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>50</td>
                    <td>40</td>
                    <td>40</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>52</td>
                    <td>42</td>
                    <td>42</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="legend strong">Body measurements — women (cm)</h4>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust</th>
                    <th>Waist</th>
                    <th>Hip</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>80–84</td>
                    <td>62–66</td>
                    <td>88–92</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>84–88</td>
                    <td>66–70</td>
                    <td>92–96</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>88–92</td>
                    <td>70–74</td>
                    <td>96–100</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>92–98</td>
                    <td>74–80</td>
                    <td>100–106</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>98–104</td>
                    <td>80–86</td>
                    <td>106–112</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 className="legend strong">Body measurements — men (cm)</h4>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest</th>
                    <th>Waist</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XS</td>
                    <td>86–89</td>
                    <td>72–76</td>
                  </tr>
                  <tr>
                    <td>S</td>
                    <td>90–94</td>
                    <td>76–80</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>94–98</td>
                    <td>80–84</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>98–102</td>
                    <td>84–88</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>102–106</td>
                    <td>88–92</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>&nbsp;</p>
            <h3 className="legend strong">Turtleneck Sweater</h3>
            <p>
              <em>Cashmere knit · close-fit silhouette</em>
            </p>
            <p>
              The Turtleneck is cut to sit close to the body without
              constriction. The line reads fitted through the torso, with a
              slightly high-set armhole and a sleeve that tapers cleanly to the
              wrist. The wrap-up collar and V-neckline are structural to the
              design; the piece is not meant to be worn loose.
            </p>
            <p>
              <strong>If you are between sizes:</strong> take the smaller.
              Cashmere relaxes with wear and will settle into the body over the
              first few uses.
            </p>
            <p>
              <em>Flat measurements — cm · to be finalized post-grading</em>
            </p>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Bust, half (pit to pit)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hem, half</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Shoulder, seam to seam</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Sleeve length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Cuff opening</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Collar width</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Neck drop</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Back width</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Center back length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Center front length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>&nbsp;</p>
            <h3 className="legend strong">Unisex T-Shirt</h3>
            <p>
              <em>Premium Pima cotton jersey · regular fit</em>
            </p>
            <p>
              The T-Shirt is cut unisex with a regular fit — neither slim nor
              oversized. The silhouette is clean through the body, with a
              conventional shoulder point and a set-in sleeve that ends just
              past the shoulder bone. The length sits at the hip, breaking
              fractionally at the waistband of a trouser.
            </p>
            <p>
              <strong>If you are between sizes:</strong> take your usual. The
              Pima has no stretch beyond what the fiber naturally provides, and
              the regular fit accommodates a half-size on either side without
              distortion.
            </p>
            <p>
              <strong>For women:</strong> your usual women's size will translate
              directly. For a closer fit through the torso, size down one.
            </p>
            <p>
              <em>Flat measurements — cm · to be finalized post-grading</em>
            </p>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chest, half (pit to pit)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hem, half</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Body length, center front</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Body length, side</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Shoulder, seam to seam</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Sleeve length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Sleeve opening</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Armhole, straight</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Neck width</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Neck drop</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>&nbsp;</p>
            <h3 className="legend strong">Nuvé Coat</h3>
            <p>
              <em>
                Wool twill · convertible hooded silhouette ·
                relaxed-through-body fit
              </em>
            </p>
            <p>
              The Nuvé is cut with a deliberately relaxed line through the torso
              — enough room to carry the weight of the 450 gsm wool twill
              without pulling at the shoulder, and enough ease to transition
              between the hooded coat and cloak forms without strain. The fit is
              intended to accommodate a mid-winter layering stack underneath: a
              shirt and a knit.
            </p>
            <p>
              <strong>If you are between sizes:</strong> take your usual. If you
              expect to wear the coat over tailored jackets or heavier knitwear,
              size up.
            </p>
            <p>
              <em>Flat measurements — cm · to be finalized post-grading</em>
            </p>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chest, half (pit to pit)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hem, half</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Shoulder, seam to seam</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Sleeve length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Cuff opening</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hood height</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hood depth</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Center back length</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Pocket opening</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>&nbsp;</p>
            <h3 className="legend strong">Wool Trousers</h3>
            <p>
              <em>Wool gabardine · pleated tailored silhouette · mid-rise</em>
            </p>
            <p>
              The Wool Trouser follows the classic pleated tailored tradition: a
              mid-rise waistband, a single forward-facing pleat that releases
              into a clean line through the thigh, and a tapered break just
              above the shoe. The pleat is structural — it is where the ease in
              the upper leg lives. The trouser is not intended to read slim
              through the thigh, and should not be sized down to produce that
              effect.
            </p>
            <p>
              <strong>If you are between sizes:</strong> take the larger at the
              waist. A trouser that binds at the waist will never sit correctly,
              regardless of how the rest of the leg measures. If the waist is
              slightly generous once the larger size arrives, a tailor can
              reduce the seat seam without affecting the line of the pleat.
            </p>
            <p>
              <em>Flat measurements — cm · to be finalized post-grading</em>
            </p>
            <div className="article-table">
              <table>
                <thead>
                  <tr>
                    <th>&nbsp;</th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Waist, relaxed (half)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hip, half (at crotch point)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Front rise</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Back rise</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Thigh, half (at crotch)</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Knee, half</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Hem opening, half</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Inseam</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                  <tr>
                    <td>Outseam</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>&nbsp;</p>
            <h3 className="legend strong">A Note on Italian Sizing</h3>
            <p>
              Italian ready-to-wear is graded slightly trimmer than American or
              British ready-to-wear, particularly through the shoulder and
              sleeve. If you are used to US sizing, you may find our equivalent
              IT size closer to your expectations than the numeric conversion
              suggests.
            </p>
            <p>
              When in doubt, measure a garment already in your wardrobe — one
              that fits you as you wish ours to — and match those flat
              measurements against the chart. The number on a label has always
              mattered less than the line on the body.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SizeGuide
