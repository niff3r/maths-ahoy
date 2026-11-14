/* Maths Ahoy activity illustrations.
   Hand-drawn style: charcoal pencil outline (grainy, with the faintest wobble), an off-register colour wash behind each shape,
   Caveat handwriting and coral motion ticks. Any element with data-illo="<name>" gets that drawing.
   Colour rule: plan colour across the whole Activities grid, not drawing by drawing. Each drawing has one lead colour
   (seafoam, butter, powder blue or the site's soft coral), spread so no colour clumps; all four sit at the same soft lightness. */
(() => {
  const K = '#2B2B2B', SF = '#B5E2DB', CO = '#F7CDBF', BU = '#FBE4A6', PB = '#C9D9F5', PK = '#F3C6DD', GR = '#D2EBBF', LI = '#DCD3F2', TK = '#D9674A';
  const WOB = 'filter="url(#illo-wob)"';

  const out = (d, w = 2.4, c = K) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${WOB}/>`;
  const wash = (d, c, dx = 5, dy = 5) => `<path d="${d}" fill="${c}" transform="translate(${dx} ${dy})"/>`;
  const shape = (d, c, w = 2.4, dx, dy) => wash(d, c, dx, dy) + out(d, w);
  const rr = (x, y, w, h, r) => `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;
  const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`;
  const label = (x, y, t, size = 20, anchor = 'middle', c = K) => `<text x="${x}" y="${y}" font-family="Caveat, 'Segoe Print', cursive" font-weight="700" font-size="${size}" text-anchor="${anchor}" fill="${c}">${t}</text>`;
  const ticks = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-12 -6 l-7 -8 M0 -10 v-11 M12 -6 l7 -8" stroke="${TK}" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`;
  const grid = (x0, y0, x1, y1, step) => { let d = ''; for (let x = x0; x <= x1; x += step) d += `M${x} ${y0}V${y1}`; for (let y = y0; y <= y1; y += step) d += `M${x0} ${y}H${x1}`; return `<path d="${d}" stroke="#DCEEEA" stroke-width="1"/>`; };
  const arrowHead = (x, y, a) => `<path transform="translate(${x} ${y}) rotate(${a})" d="M-9 -7 L0 0 L-9 7" fill="none" stroke="${K}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const svg = (alt, body) => `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${alt}">${body}</svg>`;

  function shuffleArt(inShuffle) {
    const card = (x, y, n) => `<g transform="translate(${x} ${y})">${shape(rr(-17, -23, 34, 46, 5), n <= 4 ? CO : PB, 2, 3, 3)}${label(0, 8, n, 20)}</g>`;
    const topX = [40, 84, 128, 172, 228, 272, 316, 360];
    const order = inShuffle ? [5, 1, 6, 2, 7, 3, 8, 4] : [1, 5, 2, 6, 3, 7, 4, 8];
    let g = '';
    for (let n = 1; n <= 8; n++) {
      const x0 = topX[n - 1], x1 = 40 + order.indexOf(n) * (320 / 7);
      g += `<path d="M${x0} 106L${x1.toFixed(1)} 188" stroke="${K}" stroke-width="1.4" stroke-dasharray="2 5" fill="none"/>`;
    }
    for (let n = 1; n <= 8; n++) g += card(topX[n - 1], 78, n);
    order.forEach((n, i) => { g += card(40 + i * (320 / 7), 214, n); });
    const name = inShuffle ? 'in-shuffle' : 'out-shuffle';
    const note = inShuffle ? 'card 1 tucks in' : 'card 1 stays on top';
    return svg(`An ${name} of eight cards: the deck splits into 1 to 4 and 5 to 8, then interleaves as ${order.join(' ')}`,
      label(200, 34, name, 26) + label(106, 132, 'top half', 16) + label(294, 132, 'bottom half', 16) + g + label(200, 288, note, 20) + ticks(352, 22, 10));
  }

  function spiroArt(ringTeeth, wheelTeeth) {
    const hcf = (a, b) => (b ? hcf(b, a % b) : a);
    const cx = 150, cy = 152, R = 104, r = R * wheelTeeth / ringTeeth, d = r * 0.72, turns = wheelTeeth / hcf(ringTeeth, wheelTeeth);
    let teeth = '';
    for (let i = 0; i < 48; i++) { const a = i * Math.PI / 24; teeth += `M${(cx + Math.cos(a) * R).toFixed(1)} ${(cy + Math.sin(a) * R).toFixed(1)}L${(cx + Math.cos(a) * (R - 6)).toFixed(1)} ${(cy + Math.sin(a) * (R - 6)).toFixed(1)}`; }
    let curve = '';
    const steps = 240 * turns;
    for (let i = 0; i <= steps; i++) { const t = i / steps * 2 * Math.PI * turns; const x = cx + (R - r) * Math.cos(t) + d * Math.cos((R - r) / r * t), y = cy + (R - r) * Math.sin(t) - d * Math.sin((R - r) / r * t); curve += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
    const gx = cx + R - r, gy = cy, petals = ringTeeth / hcf(ringTeeth, wheelTeeth);
    return svg(`A spirograph ring with ${ringTeeth} teeth and a wheel with ${wheelTeeth} teeth, drawing a flower with ${petals} petals`,
      `<path d="${circ(cx, cy, R + 12)} ${circ(cx, cy, R)}" fill="${PB}" fill-rule="evenodd" transform="translate(4 4)"/>` + out(circ(cx, cy, R + 12)) + out(circ(cx, cy, R)) + out(teeth, 1.4) +
      `<path d="${curve}" fill="none" stroke="${TK}" stroke-width="1.8" stroke-linejoin="round"/>` +
      shape(circ(gx, gy, r), BU, 2.2, 3, 3) + shape(circ(gx - d * 0.9, gy, 4), '#FFFFFF', 1.6, 0, 0) +
      label(332, 64, `${ringTeeth} teeth`, 22) + out('M298 70 C278 74 268 80 254 92') + label(336, 252, `${wheelTeeth} teeth`, 22) + out(`M300 244 C290 232 ${gx + r * 0.5} ${gy + r * 0.9} ${gx + r * 0.3} ${gy + r * 0.95}`) +
      label(344, 160, `${petals} petals`, 24));
  }

  // Points around a Reuleaux polygon (odd n) of width w, centred on the origin, first vertex at the top.
  // Each side is an arc centred on the opposite vertex, with radius equal to the width.
  function reuleauxPoints(n, w) {
    const R = w / (2 * Math.sin(Math.PI * (n - 1) / (2 * n)));
    const v = Array.from({ length: n }, (_, i) => [R * Math.sin(2 * Math.PI * i / n), -R * Math.cos(2 * Math.PI * i / n)]);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = v[i], b = v[(i + 1) % n], c = v[(i + (n + 1) / 2) % n];
      let t0 = Math.atan2(a[1] - c[1], a[0] - c[0]), t1 = Math.atan2(b[1] - c[1], b[0] - c[0]);
      if (t1 - t0 > Math.PI) t1 -= 2 * Math.PI;
      if (t0 - t1 > Math.PI) t1 += 2 * Math.PI;
      for (let k = 0; k < 24; k++) { const t = t0 + (t1 - t0) * k / 24; pts.push([c[0] + w * Math.cos(t), c[1] + w * Math.sin(t)]); }
    }
    return pts;
  }
  const placed = (pts, cx, cy, deg = 0) => {
    const a = deg * Math.PI / 180;
    return pts.map(([x, y]) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)]);
  };
  const pathOf = (pts) => 'M' + pts.map(([x, y]) => x.toFixed(1) + ' ' + y.toFixed(1)).join('L') + 'Z';
  // Two horizontal lines touching the top and bottom of a shape, with the gap marked: the width
  const widthMarks = (pts, x0, x1) => {
    const ys = pts.map(p => p[1]), top = Math.min(...ys), bot = Math.max(...ys);
    return `<path d="M${x0} ${top.toFixed(1)}H${x1}M${x0} ${bot.toFixed(1)}H${x1}" stroke="${K}" stroke-width="1.4" stroke-dasharray="4 5" fill="none"/>` +
      out(`M${x1 - 14} ${(top + 6).toFixed(1)}V${(bot - 6).toFixed(1)}`, 1.8) + arrowHead(x1 - 14, top + 4, -90) + arrowHead(x1 - 14, bot - 4, 90);
  };

  // A spirolateral: walk each number in the sequence, turning by the angle after every step, and repeat.
  // Stops when it gets home facing the starting way, or after a few rounds if it never does.
  function spirolateralArt(seq, angle, paper, alt, note, maxRounds = 12) {
    let x = 0, y = 0, turn = 0;
    const pts = [[0, 0]];
    for (let round = 0; round < maxRounds; round++) {
      seq.forEach((len) => {
        const h = turn * angle * Math.PI / 180;
        x += len * Math.cos(h); y += len * Math.sin(h); pts.push([x, y]); turn += 1;
      });
      if (Math.hypot(x, y) < 1e-6 && Math.abs(((turn * angle) % 360 + 360) % 360) < 1e-6) break;
    }
    const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const s = Math.min(330 / (maxX - minX || 1), 230 / (maxY - minY || 1));
    const ox = 200 - (minX + maxX) / 2 * s, oy = 145 + (minY + maxY) / 2 * s;
    const T = ([px, py]) => [ox + px * s, oy - py * s];
    let bg = '';
    if (paper === 'square') {
      let d = '';
      for (let gx = Math.floor(minX) - 1; gx <= Math.ceil(maxX) + 1; gx++) { const [sx] = T([gx, 0]); if (sx > 2 && sx < 398) d += `M${sx.toFixed(1)} 2V298`; }
      for (let gy = Math.floor(minY) - 1; gy <= Math.ceil(maxY) + 1; gy++) { const [, sy] = T([0, gy]); if (sy > 2 && sy < 298) d += `M2 ${sy.toFixed(1)}H398`; }
      bg = `<path d="${d}" stroke="#DCEEEA" stroke-width="1"/>`;
    } else if (paper === 'dots') {
      for (let a = -40; a <= 40; a++) for (let b = -40; b <= 40; b++) {
        const [sx, sy] = T([a + b * 0.5, b * Math.sqrt(3) / 2]);
        if (sx > 4 && sx < 396 && sy > 4 && sy < 296) bg += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="1.6" fill="#B5D9D2"/>`;
      }
    }
    const cols = [SF, CO, BU, PB];
    let walk = '';
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = T(pts[i]), [x2, y2] = T(pts[i + 1]);
      walk += `<path d="M${(x1 + 3).toFixed(1)} ${(y1 + 3).toFixed(1)}L${(x2 + 3).toFixed(1)} ${(y2 + 3).toFixed(1)}" stroke="${cols[(i % seq.length) % 4]}" stroke-width="7" stroke-linecap="round"/>`;
    }
    walk += out('M' + pts.map(p => T(p).map(v => v.toFixed(1)).join(' ')).join('L'), 2);
    const [hx, hy] = T([0, 0]);
    return svg(alt, bg + walk + shape(circ(hx, hy, 5), '#FFFFFF', 1.8, 1, 1) + label(392, 292, note, 18, 'end'));
  }

  const ART = {
    'crazy-cubes'() {
      const cube = (x, y, s, f, t, sd, n) => {
        const k = s * 0.34;
        return shape(`M${x} ${y}l${k} ${-k}h${s}l${-k} ${k}z`, t, 2.2, 3, 3) + shape(`M${x + s} ${y}l${k} ${-k}v${s}l${-k} ${k}z`, sd, 2.2, 3, 3) + shape(`M${x} ${y}h${s}v${s}h${-s}z`, f, 2.4) + label(x + s / 2, y + s / 2 + 8, n, 24);
      };
      // The graph: one dot per colour, and one edge per pair of opposite faces, numbered by the cube it comes from.
      // Each number sits on the middle of its own edge, on a small white patch, so it reads as an edge label.
      const P = { r: [96, 206, CO], s: [304, 206, SF], y: [96, 276, BU], b: [304, 276, PB] };
      const edges = [['r', 's', -26, 1], ['r', 's', 14, 3], ['r', 'y', 0, 2], ['s', 'b', 0, 4], ['y', 'b', 0, 1], ['r', 'b', 0, 2, 0.3], ['s', 'y', 0, 4, 0.3]];
      let lines = '', tags = '';
      edges.forEach(([a, b, bend, n, at = 0.5]) => {
        const [x0, y0] = P[a], [x1, y1] = P[b];
        const len = Math.hypot(x1 - x0, y1 - y0), nx = -(y1 - y0) / len, ny = (x1 - x0) / len;
        const cx = (x0 + x1) / 2 + nx * bend * 2, cy = (y0 + y1) / 2 + ny * bend * 2;
        lines += out(`M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}`, 2.2);
        const t = at, lx = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1, ly = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1;
        tags += `<circle cx="${lx}" cy="${ly}" r="9" fill="#FFFFFF"/>` + label(lx, ly + 6, n, 17);
      });
      // a loop: cube 3 has the same colour on two opposite faces
      lines += out('M86 282 C58 300 50 262 84 270', 2.2);
      tags += `<circle cx="62" cy="279" r="9" fill="#FFFFFF"/>` + label(62, 285, 3, 17);
      return svg('Four coloured cubes in a row above a hand-drawn network graph: one dot per colour, with numbered edges joining the colours on opposite faces of each cube',
        cube(28, 70, 62, CO, SF, BU, 1) + cube(118, 70, 62, SF, BU, PB, 2) + cube(208, 70, 62, BU, PB, CO, 3) + cube(298, 70, 62, PB, CO, SF, 4) +
        lines + Object.values(P).map(([x, y, c]) => shape(circ(x, y, 10), c, 2.2, 3, 3)).join('') + tags +
        label(358, 238, 'graph', 20) + label(358, 260, 'it!', 20) + ticks(358, 210));
    },

    'roller-coaster'() {
      const track = [[24, 236], [70, 182], [110, 118], [148, 92], [188, 116], [220, 190], [254, 222], [292, 172], [330, 136], [372, 150]];
      let sticks = '';
      for (let i = 0; i < track.length - 1; i++) {
        const [x1, y1] = track[i], [x2, y2] = track[i + 1];
        sticks += `<path d="M${x1 + 4} ${y1 + 4}L${x2 + 4} ${y2 + 4}" stroke="${BU}" stroke-width="9" stroke-linecap="round"/>` + out(`M${x1} ${y1}L${x2} ${y2}`, 2.4) + shape(circ(x2, y2, 5.5), CO, 1.8, 2, 2);
      }
      // the cart sits on the third stick, tilted to match it
      const cart = `<g transform="translate(129 105) rotate(-34)">${shape(rr(-20, -27, 40, 20, 6), CO, 2.2, 3, 3)}${shape(circ(-11, -5, 5), '#FFFFFF', 1.8, 2, 2)}${shape(circ(11, -5, 5), '#FFFFFF', 1.8, 2, 2)}</g>`;
      return svg('A roller coaster made of matchsticks on grid paper, with a cart climbing the first hill',
        grid(0, 0, 400, 300, 20) + sticks + cart + label(272, 116, 'too steep?', 21) + ticks(232, 152, -30) + label(72, 98, 'whee!', 22) + label(318, 262, 'safety rating: ?', 20));
    },

    'paper-clips'() {
      const clip = (x, y, c) => `<g transform="translate(${x} ${y})">${out('M0 0v52a9 9 0 0 0 18 0v-58a12 12 0 0 0 -24 0v66a15 15 0 0 0 30 0v-50', 2.6, c)}</g>`;
      const strip = shape('M44 132h312v40h-312z', CO, 2.4) + `<path d="M150 132v40 M250 132v40" stroke="${K}" stroke-width="1.6" stroke-dasharray="5 6" fill="none"/>`;
      // a stretchy loop hooked over the strip, hanging down
      const loop = 'M188 146 C170 170 168 226 196 238 C222 246 236 214 228 176 C224 158 218 150 212 146';
      const band = `<path d="${loop}" fill="none" stroke="${PB}" stroke-width="8" stroke-linecap="round" transform="translate(3 3)"/>` + out(loop, 2.4);
      return svg('A strip of paper with two paper clips and a rubber band looped over it, with arrows showing the ends being pulled apart',
        strip + band + clip(122, 112, K) + clip(270, 112, '#3D6FB6') + out('M40 152 H8') + arrowHead(8, 152, 180) + out('M360 152 H392') + arrowHead(392, 152, 0) +
        label(24, 128, 'pull', 20) + label(376, 128, 'pull', 20) + label(316, 252, 'linked?', 24) + ticks(316, 222));
    },

    'riffle-shuffle'() {
      const card = (x, y, a, c, n) => `<g transform="translate(${x} ${y}) rotate(${a})">${shape(rr(-26, -36, 52, 72, 6), c, 2.2, 4, 4)}${n ? label(0, 8, n, 22) : ''}</g>`;
      let riffle = '';
      for (let i = 0; i < 4; i++) riffle += card(98 + i * 3, 150 - i * 4, -14, i === 3 ? CO : '#FFFFFF') + card(302 - i * 3, 150 - i * 4, 14, i === 3 ? CO : '#FFFFFF');
      [[150, 92, -24, CO], [172, 76, 12, '#FFFFFF'], [196, 90, -8, CO], [220, 74, 18, '#FFFFFF'], [244, 92, -14, CO]].forEach(([x, y, a, c]) => { riffle += card(x, y, a, c); });
      const row = [1, 2, 3, 4, 5, 6].map((n, i) => `<g transform="translate(${88 + i * 45} 262)">${shape(rr(-16, -22, 32, 44, 4), i % 2 ? '#FFFFFF' : CO, 2, 3, 3)}${label(0, 7, n, 18)}</g>`).join('');
      return svg('Two halves of a deck being riffle shuffled together, above a row of cards numbered 1 to 6',
        riffle + out('M120 66 C150 30 250 30 280 66') + arrowHead(280, 66, 50) + row + label(332, 34, 'again?', 22) + label(352, 214, 'back in order?', 19));
    },

    'birthday-trick'() {
      // Four real binary cards for 1 to 15. A number goes on the card for a power of 2 when that power appears in its binary expansion,
      // so each card holds eight numbers, and the corner numbers of the "yes" cards add to the secret number.
      const onCard = (p) => Array.from({ length: 15 }, (_, i) => i + 1).filter((n) => n & p);
      const cols = { 1: SF, 2: CO, 4: BU, 8: PB };
      const answers = { 1: true, 2: false, 4: true, 8: true }; // 13 = 8 + 4 + 1
      let cards = '';
      [[1, 70, 104, -6], [2, 160, 98, -2], [4, 250, 98, 2], [8, 340, 104, 6]].forEach(([p, x, y, a]) => {
        const nums = onCard(p);
        let grid2 = '';
        for (let r = 0; r < 4; r++) for (let q = 0; q < 2; q++) grid2 += label(-11 + q * 26, -12 + r * 20, nums[r * 2 + q], 16);
        cards += `<g transform="translate(${x} ${y}) rotate(${a})">${shape(rr(-38, -58, 76, 116, 7), '#FFFFFF', 2.2, 4, 4)}${shape(circ(-22, -40, 11), cols[p], 1.8, 2, 2)}${label(-22, -34, p, 17)}${grid2}` +
          (answers[p] ? label(0, 86, 'yes', 20, 'middle', TK) : label(0, 86, 'no', 20, 'middle', '#8A8A8A')) + '</g>';
      });
      return svg('Four binary number cards with 1, 2, 4, and 8 in their corners, each listing the numbers from 1 to 15 that include that power of 2. Three are marked yes, giving 8 + 4 + 1 = 13',
        cards + label(200, 250, '8 + 4 + 1 = 13', 30) + label(200, 284, 'you were thinking of 13!', 20) + ticks(316, 238, 10));
    },

    'spiralling-square'() {
      // Each square's corners sit at the midpoints of the one outside it. Shading the same-numbered corner triangle at every level
      // makes each triangle sit against the previous one's long side, so together they form one spiral: 1/8 + 1/16 + 1/32 + ...
      let sq = [[100, 40], [300, 40], [300, 240], [100, 240]], squares = '', shade = '', labels = '';
      const fr = ['1/8', '1/16', '1/32', '1/64', '', '', ''];
      for (let k = 0; k < 7; k++) {
        const mid = sq.map((p, i) => { const q = sq[(i + 1) % 4]; return [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; });
        const tri = [sq[1], mid[1], mid[0]];
        shade += wash(`M${tri.map(p => p.join(' ')).join('L')}z`, PB, 3, 3);
        if (fr[k]) { const cx = (tri[0][0] * 2 + tri[1][0] + tri[2][0]) / 4, cy = (tri[0][1] * 2 + tri[1][1] + tri[2][1]) / 4; labels += label(cx, cy + 6, fr[k], [20, 17, 13, 11][k]); }
        if (k < 6) squares += out(`M${sq.map(p => p.join(' ')).join('L')}z`, Math.max(1.2, 2.4 - k * 0.25));
        sq = mid;
      }
      shade += labels;
      return svg('A square with smaller and smaller squares nested inside, and a spiral of shaded triangles labelled 1/8, 1/16, and 1/32',
        shade + squares + label(352, 112, '1/8 + 1/16', 20) + label(352, 140, '+ 1/32 + …', 20) + label(352, 176, '= ?', 30) + ticks(352, 84));
    },

    'catch-the-liar'() {
      let fan = '';
      [CO, SF, BU, PB, PK, GR, LI].forEach((c, i) => {
        fan += `<g transform="rotate(${-36 + i * 12} 200 330)"><g transform="translate(200 214)">${shape(rr(-28, -44, 56, 88, 6), c, 2.2, 4, 4)}${out('M-14 -22h28 M-14 -8h20 M-14 6h26', 1.6)}</g></g>`;
      });
      const bubble = shape('M44 34h128a14 14 0 0 1 14 14v30a14 14 0 0 1 -14 14h-82l-20 18 4 -18h-30a14 14 0 0 1 -14 -14v-30a14 14 0 0 1 14 -14z', '#FFFFFF', 2.2, 4, 4);
      return svg('Seven coloured cards fanned out, with a speech bubble saying I never lie and the words one lie, caught',
        fan + bubble + label(108, 70, 'I never lie…', 22) + label(318, 56, 'one lie,', 24) + label(326, 84, 'caught!', 24) + ticks(300, 36, -10));
    },

    'spirolaterals'() {
      const pts = [[0, 0], [0, 1], [2, 1], [2, -2], [1, -2], [1, 0], [4, 0], [4, -1], [2, -1], [2, 2], [3, 2], [3, 0], [0, 0]].map(([x, y]) => [112 + x * 40, 150 - y * 40]);
      let walk = '';
      for (let i = 0; i < pts.length - 1; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
        walk += `<path d="M${x1 + 4} ${y1 + 4}L${x2 + 4} ${y2 + 4}" stroke="${[SF, CO, BU][i % 3]}" stroke-width="10" stroke-linecap="round"/>`;
      }
      walk += out(`M${pts.map(p => p.join(' ')).join('L')}`, 2.6) + shape(circ(112, 150, 7), '#FFFFFF', 2.2, 2, 2);
      return svg('A spirolateral drawn on grid paper from the numbers 1, 2, and 3, turning right each time and returning to the start',
        grid(32, 30, 352, 270, 20) + walk + label(334, 48, '1, 2, 3, turn!', 22, 'end') + label(66, 186, 'start', 20) + label(318, 262, 'home again?', 21) + ticks(272, 240, 20));
    },

    'spirographs'() {
      const cx = 150, cy = 152, R = 104, r = R * 36 / 96, d = r * 0.72;
      let teeth = '';
      for (let i = 0; i < 48; i++) { const a = i * Math.PI / 24; teeth += `M${(cx + Math.cos(a) * R).toFixed(1)} ${(cy + Math.sin(a) * R).toFixed(1)}L${(cx + Math.cos(a) * (R - 6)).toFixed(1)} ${(cy + Math.sin(a) * (R - 6)).toFixed(1)}`; }
      let curve = '';
      for (let i = 0; i <= 720; i++) { const t = i / 720 * 6 * Math.PI; const x = cx + (R - r) * Math.cos(t) + d * Math.cos((R - r) / r * t), y = cy + (R - r) * Math.sin(t) - d * Math.sin((R - r) / r * t); curve += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1); }
      const gx = cx + R - r, gy = cy;
      return svg('A spirograph ring with 96 teeth and a gear with 36 teeth inside it, drawing a flower with petals',
        `<path d="${circ(cx, cy, R + 12)} ${circ(cx, cy, R)}" fill="${PB}" fill-rule="evenodd" transform="translate(4 4)"/>` + out(circ(cx, cy, R + 12)) + out(circ(cx, cy, R)) + out(teeth, 1.4) +
        `<path d="${curve}" fill="none" stroke="${TK}" stroke-width="1.8" stroke-linejoin="round"/>` +
        shape(circ(gx, gy, r), BU, 2.2, 3, 3) + shape(circ(gx - d * 0.9, gy, 4), '#FFFFFF', 1.6, 0, 0) +
        label(330, 64, '96 teeth', 22) + out('M296 70 C276 74 266 80 252 92') + label(336, 252, '36 teeth', 22) + out('M300 244 C286 230 270 206 262 186') + label(344, 156, 'petals?', 26) + ticks(344, 122));
    },

    // Perfect shuffles of an 8-card deck: the deck splits into 1-4 and 5-8, then the halves interleave.
    // Out-shuffle keeps card 1 on top (1 5 2 6 3 7 4 8); in-shuffle tucks it in (5 1 6 2 7 3 8 4).
    'out-shuffle'() { return shuffleArt(false); },
    'in-shuffle'() { return shuffleArt(true); },

    // Extra spirograph examples: petals = ring teeth ÷ HCF(ring, wheel)
    'spiro-96-32'() { return spiroArt(96, 32); },
    'spiro-96-40'() { return spiroArt(96, 40); },

    'paperclip-setups'() {
      // Side view of a strip folded into an S, held by clips, before and after pulling it tight
      const sFold = (y) => `M30 ${y}H140A10 10 0 0 1 140 ${y + 20}H50A10 10 0 0 0 50 ${y + 40}H160`;
      // A real (gem) paper clip: one wire bent into nested loops, 16 wide by 45 tall before scaling
      const GEM = 'M5 12V32A3 3 0 0 0 11 32V6A5 5 0 0 0 1 6V38A7 7 0 0 0 15 38V10';
      const clip = (x, y, c, s = 0.78, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${out(GEM, 2.4 / s, c)}</g>`;
      // A rubber band: a thick coloured band with dark edges, so it reads differently from the thin wire clips
      const band = (d) => `<path d="${d}" fill="none" stroke="${PB}" stroke-width="4" transform="translate(2 2)"/>` + out(d, 2);
      const row = (y, withBand) => {
        let g = out(sFold(y), 2.6) + clip(124, y - 8, K) + clip(44, y + 12, '#3D6FB6') +
          out(`M28 ${y}H8`) + arrowHead(8, y, 180) + out(`M162 ${y + 40}H182`) + arrowHead(182, y + 40, 0) +
          out(`M206 ${y + 20}H236`) + arrowHead(236, y + 20, 0);
        if (withBand) g = band(circ(98, y + 46, 24)) + g;
        return g;
      };
      // results: two linked clips, and a chain of clips hanging on a rubber band
      const linked = clip(260, 60, K, 1.05, -90) + clip(292, 72, '#3D6FB6', 1.05, -90);
      const chain = band(circ(330, 188, 24)) +
        clip(322, 210, K, 0.95) + clip(322, 246, '#3D6FB6', 0.95);
      return svg('Two set-ups for the paper clip experiment. Top: a strip folded into an S with two paper clips, pulled tight, gives two linked clips. Bottom: the same with a rubber band added gives a chain hanging from the band',
        row(40, false) + linked + label(300, 104, 'linked!', 22) + label(30, 28, 'two clips', 18, 'start') +
        row(170, true) + chain + label(268, 262, 'a chain!', 22) + label(30, 158, 'add a rubber band', 18, 'start') + ticks(372, 30, 10));
    },

    // One cube's net becoming its network graph: each pair of opposite faces (a, b, c) becomes an edge between their colours
    'cube-net-graph'() {
      const s = 36, x0 = 22, y0 = 64;
      const faces = [ // [col, row, colour, pair]
        [1, 0, CO, 'a'], [0, 1, CO, 'c'], [1, 1, PB, 'b'], [2, 1, PB, 'c'], [3, 1, BU, 'b'], [1, 2, SF, 'a']
      ];
      let net = '';
      faces.forEach(([c, r, col]) => { net += `<path d="M${x0 + c * s} ${y0 + r * s}h${s}v${s}h${-s}z" fill="${col}"/>`; });
      faces.forEach(([c, r]) => { net += out(`M${x0 + c * s} ${y0 + r * s}h${s}v${s}h${-s}z`, 2.2); });
      faces.forEach(([c, r, , p]) => { net += label(x0 + c * s + s / 2, y0 + r * s + s / 2 + 7, p, 20); });
      const P = { CO: [262, 78], PB: [356, 78], SF: [262, 172], BU: [356, 172] };
      const tag = (x, y, t) => `<circle cx="${x}" cy="${y}" r="10" fill="#FFFFFF"/>` + label(x, y + 7, t, 20);
      const graph = out('M262 78V172', 2.4) + out('M356 78V172', 2.4) + out('M262 78H356', 2.4) +
        tag(262, 125, 'a') + tag(356, 125, 'b') + tag(309, 78, 'c') +
        [[CO, P.CO], [PB, P.PB], [SF, P.SF], [BU, P.BU]].map(([c, [x, y]]) => shape(circ(x, y, 12), c, 2.2, 2, 2)).join('');
      return svg('A cube net with its three pairs of opposite faces marked a, b, and c, and an arrow to a network graph where each pair becomes an edge joining the two colours',
        net + out('M186 118H226', 2.4) + arrowHead(226, 118, 0) + graph +
        label(94, 220, 'one cube’s net', 20) + label(309, 220, 'its network graph', 20) + label(200, 272, 'opposite faces become an edge', 20) + ticks(372, 40, 10));
    },

    // The out-shuffle of 8 cards as cycles: 1 and 8 stay put, 2 → 3 → 5 → 2, and 4 → 7 → 6 → 4
    'shuffle-cycles'() {
      const card = (x, y, n, c) => `<g transform="translate(${x} ${y})">${shape(rr(-14, -18, 28, 36, 5), c, 2, 2, 2)}${label(0, 7, n, 19)}</g>`;
      const arrow = (a, b, centre) => {
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        const ox = mx - centre[0], oy = my - centre[1], ol = Math.hypot(ox, oy) || 1;
        const cx = mx + ox / ol * 22, cy = my + oy / ol * 22;
        const trim = (p, q, d) => { const l = Math.hypot(q[0] - p[0], q[1] - p[1]); return [p[0] + (q[0] - p[0]) * d / l, p[1] + (q[1] - p[1]) * d / l]; };
        const s = trim(a, [cx, cy], 24), e = trim(b, [cx, cy], 24);
        const ang = Math.atan2(e[1] - cy, e[0] - cx) * 180 / Math.PI;
        return out(`M${s[0].toFixed(1)} ${s[1].toFixed(1)}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${e[0].toFixed(1)} ${e[1].toFixed(1)}`, 2) + arrowHead(e[0], e[1], ang);
      };
      const ring = (cx, cy, r, nums, col) => {
        const pts = [-90, 30, 150].map(d => [cx + r * Math.cos(d * Math.PI / 180), cy + r * Math.sin(d * Math.PI / 180)]);
        let g = '';
        for (let i = 0; i < 3; i++) g += arrow(pts[i], pts[(i + 1) % 3], [cx, cy]);
        pts.forEach((p, i) => { g += card(p[0], p[1], nums[i], col); });
        return g;
      };
      const stay = (x, y, n) => card(x, y, n, '#FFFFFF') + out(`M${x - 8} ${y - 22}C${x - 18} ${y - 52} ${x + 18} ${y - 52} ${x + 8} ${y - 22}`, 2) + arrowHead(x + 8, y - 22, 75);
      return svg('The out-shuffle of eight cards drawn as cycles: cards 1 and 8 stay put, card 2 moves to 3, 3 to 5, and 5 back to 2, and card 4 moves to 7, 7 to 6, and 6 back to 4',
        label(200, 40, '(1)(2 3 5)(4 7 6)(8)', 26) + stay(42, 160, 1) + ring(140, 156, 56, [2, 3, 5], PB) + ring(262, 156, 56, [4, 7, 6], BU) + stay(358, 160, 8) +
        label(200, 268, 'every loop has 3 steps', 20) + label(200, 292, 'so after 3 shuffles, every card is home', 17));
    },

    // How to construct a Reuleaux triangle: an equilateral triangle, then a compass arc from each corner between the other two
    'reuleaux-construct'() {
      const s = 140, V = [[200, 66], [200 - s / 2, 66 + s * Math.sqrt(3) / 2], [200 + s / 2, 66 + s * Math.sqrt(3) / 2]];
      const arcPts = (c, a0, a1, r) => Array.from({ length: 41 }, (_, k) => { const t = a0 + (a1 - a0) * k / 40; return [c[0] + r * Math.cos(t), c[1] + r * Math.sin(t)]; });
      const ang = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);
      let sweeps = '';
      V.forEach((c, i) => {
        let a0 = ang(c, V[(i + 1) % 3]), a1 = ang(c, V[(i + 2) % 3]);
        if (Math.abs(a1 - a0) > Math.PI) a1 += a1 < a0 ? 2 * Math.PI : -2 * Math.PI;
        const lo = Math.min(a0, a1) - 0.32, hi = Math.max(a0, a1) + 0.32;
        sweeps += `<path d="${'M' + arcPts(c, lo, hi, s).map(p => p.map(v => v.toFixed(1)).join(' ')).join('L')}" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="4 6" opacity="0.6"/>`;
      });
      const reu = `M${V[0].join(' ')}A${s} ${s} 0 0 0 ${V[1].join(' ')}A${s} ${s} 0 0 0 ${V[2].join(' ')}A${s} ${s} 0 0 0 ${V[0].join(' ')}z`;
      const dots = V.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${TK}"/>`).join('');
      return svg('Constructing a Reuleaux triangle: an equilateral triangle with a compass arc drawn from each corner between the other two corners',
        sweeps + shape(reu, CO, 2.6) + out(`M${V.map(p => p.join(' ')).join('L')}z`, 1.6) + dots +
        label(330, 120, 'compass', 20) + label(330, 142, 'on each corner', 20) + out('M300 150 C286 170 280 186 276 200', 1.8) + arrowHead(275, 203, 100) +
        label(200, 284, 'an equilateral triangle, then three arcs', 18));
    },
    // A lopsided shape of constant width from a scalene triangle: extend the sides, then around each corner draw a big arc
    // on one side and a small arc on the other. Radii are chosen so the arcs meet: R_i = (w + d_ij + d_ik - d_jk) / 2, small = w - R_i.
    'reuleaux-lopsided'() {
      const P = [[129, 180], [256, 154], [164, 143]], w = 176;
      const d = (a, b) => Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]);
      const ang = (a, b) => Math.atan2(P[b][1] - P[a][1], P[b][0] - P[a][0]);
      const c0 = [(P[0][0] + P[1][0] + P[2][0]) / 3, (P[0][1] + P[1][1] + P[2][1]) / 3];
      let pts = [], lines = '';
      [0, 1, 2].forEach(i => {
        const j = (i + 1) % 3, k = (i + 2) % 3, R = (w + d(i, j) + d(i, k) - d(j, k)) / 2, s = w - R;
        let a0 = ang(i, j), a1 = ang(i, k);
        if (Math.abs(a1 - a0) > Math.PI) a1 += a1 < a0 ? 2 * Math.PI : -2 * Math.PI;
        for (let n = 0; n <= 40; n++) {
          const t = a0 + (a1 - a0) * n / 40;
          pts.push([P[i][0] + R * Math.cos(t), P[i][1] + R * Math.sin(t)], [P[i][0] + s * Math.cos(t + Math.PI), P[i][1] + s * Math.sin(t + Math.PI)]);
        }
        // the side from i to j, extended well past both corners
        const ux = Math.cos(ang(i, j)), uy = Math.sin(ang(i, j)), L = d(i, j);
        lines += `M${(P[i][0] - ux * 52).toFixed(1)} ${(P[i][1] - uy * 52).toFixed(1)}L${(P[i][0] + ux * (L + 52)).toFixed(1)} ${(P[i][1] + uy * (L + 52)).toFixed(1)}`;
      });
      pts.sort((p, q) => Math.atan2(p[1] - c0[1], p[0] - c0[0]) - Math.atan2(q[1] - c0[1], q[0] - c0[0]));
      const dots = P.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="${TK}"/>`).join('');
      return svg('A lopsided shape of constant width built from a scalene triangle: its sides are extended, and arcs centred on each corner join up. It still has the same width in every direction',
        shape(pathOf(pts), BU, 2.6) + `<path d="${lines}" fill="none" stroke="${K}" stroke-width="1.4" stroke-dasharray="4 6" opacity="0.6"/>` + dots +
        widthMarks(pts, 60, 330) + label(336, 156, 'same', 20, 'start') + label(336, 178, 'width', 20, 'start') + label(170, 292, 'from a scalene triangle', 20));
    },
    'reuleaux-rollers'() {
      // Two Reuleaux triangle rollers of width 80, turned to different angles, both touching the ground (y 250) and the plank (y 170)
      const roller = (cx, deg) => {
        const p = placed(reuleauxPoints(3, 80), 0, 0, deg), ys = p.map(q => q[1]);
        return placed(p, cx, 250 - Math.max(...ys));
      };
      const r1 = roller(130, 0), r2 = roller(280, 37);
      return svg('A plank resting on two Reuleaux triangle rollers turned at different angles. The plank stays perfectly level because the rollers have constant width',
        out('M20 252H380', 2.6) + shape(pathOf(r1), PB, 2.4) + shape(pathOf(r2), PB, 2.4) + shape(rr(50, 154, 300, 16, 4), BU, 2.4) +
        out('M300 110 C330 112 344 124 350 140', 1.8) + arrowHead(350, 142, 70) + label(286, 104, 'stays level!', 22) + ticks(64, 136, -10) + label(200, 286, 'rollers of constant width', 18)).replace('viewBox="0 0 400 300"', 'viewBox="0 84 400 216"');
    },

    'spirolateral-1-9'() { return spirolateralArt([1, 2, 3, 4, 5, 6, 7, 8, 9], 90, 'square', 'A spirolateral from the numbers 1 to 9, turning 90 degrees each time, on square grid paper. It returns home after four rounds', '1 to 9, turn 90°'); },
    'spirolateral-iso'() { return spirolateralArt([1, 2, 3, 4, 5], 120, 'dots', 'A spirolateral from the numbers 1 to 5, turning 120 degrees each time, on triangular dot paper', '1 to 5, turn 120°'); },
    'spirolateral-star'() { return spirolateralArt([2, 4, 6, 8, 10, 12, 14], 144, 'none', 'A star-like spirolateral from the even numbers 2 to 14, turning 144 degrees each time', '2, 4, 6 … 14, turn 144°'); },
    'spirolateral-open'() { return spirolateralArt([1, 2, 3, 4], 90, 'square', 'A spirolateral from 1, 2, 3, 4, turning 90 degrees, which never returns home and drifts away diagonally', '1, 2, 3, 4: never gets home!', 4); },

    'constant-width'() {
      // A Reuleaux triangle of width 140 inside a square frame of the same width: top vertex at (170, 80), base vertices at y = 80 + 140·√3/2
      const by = (80 + 140 * Math.sqrt(3) / 2).toFixed(1);
      const reuleaux = `M170 80 A140 140 0 0 0 100 ${by} A140 140 0 0 0 240 ${by} A140 140 0 0 0 170 80z`;
      // The same triangle turned 30°: because its width is constant, its bounding box is still 140 × 140,
      // so shifting it back into the frame makes it touch all four sides again.
      const spun = placed(reuleauxPoints(3, 140), 0, 0, 30);
      const sx = 100 - Math.min(...spun.map(p => p[0])), sy = 80 - Math.min(...spun.map(p => p[1]));
      const turned = `<path d="${pathOf(spun.map(([x, y]) => [x + sx, y + sy]))}" fill="none" stroke="${K}" stroke-width="1.6" stroke-dasharray="5 7" opacity="0.55"/>`;
      return svg('A curved Reuleaux triangle turning inside a square frame, touching all four sides, with a ruler showing the same width each way',
        out('M88 68h164v164h-164z') + out('M100 80v140h140v-140z') +
        turned + shape(reuleaux, PB, 2.6) +
        out('M100 262 H240') + out('M100 254 v16 M240 254 v16') + label(170, 288, 'same width', 20) +
        out('M266 150 C290 120 296 92 282 70') + arrowHead(282, 70, -100) + label(334, 112, 'still', 22) + label(334, 138, 'touching!', 22) + ticks(330, 82, 8) +
        label(52, 150, 'roll it', 21) + label(52, 172, 'round', 21));
    }
  };

  const defs = document.createElement('div');
  defs.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><filter id="illo-wob" filterUnits="userSpaceOnUse" x="-500" y="-500" width="1400" height="1300"><feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="bend"></feTurbulence><feDisplacementMap in="SourceGraphic" in2="bend" scale="1.4" xChannelSelector="R" yChannelSelector="G" result="bent"></feDisplacementMap><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="grain"></feTurbulence><feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -2 0 0 0 1.75" result="mask"></feColorMatrix><feComposite in="bent" in2="mask" operator="in"></feComposite></filter></defs></svg>';
  document.body.prepend(defs.firstChild);
  document.querySelectorAll('[data-illo]').forEach((el) => {
    const draw = ART[el.dataset.illo];
    if (draw) el.innerHTML = draw();
  });
})();
