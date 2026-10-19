/* 개념 도해 (직접 그린 SVG, 손그림 느낌 필터 적용) */
(function () {
  const ST = window.ST; const D = (ST.diagrams = {}); const { PAL } = ST;
  const I = PAL.ink, B = PAL.blue, P = PAL.pink, M = PAL.mint, A = PAL.amber, Y = PAL.yellow;
  const svg = (w, h, body, label) => `<svg viewBox="0 0 ${w} ${h}" class="diagram" role="img" aria-label="${label}"><g filter="url(#rough)" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
  const t = (x, y, s, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" font-size="${o.z || 16}" font-weight="${o.w || 600}" fill="${o.c || I}" class="${o.k || 'hand'}">${s}</text>`;
  const icon = (n, x, y, sc = 1.4, c = I) => `<g transform="translate(${x},${y}) scale(${sc})" fill="none" stroke="${c}" stroke-width="1.7"><path d="${ST.iconPath(n)}"/></g>`;
  const box = (x, y, w, h, c = I, f = 'none', r = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${c}" stroke-width="2.4"/>`;
  const arrow = (x1, y1, x2, y2, c = I) => { const a = Math.atan2(y2 - y1, x2 - x1), l = 9; return `<path d="M${x1} ${y1}L${x2} ${y2}M${x2 - l * Math.cos(a - 0.5)} ${y2 - l * Math.sin(a - 0.5)}L${x2} ${y2}L${x2 - l * Math.cos(a + 0.5)} ${y2 - l * Math.sin(a + 0.5)}" stroke="${c}" stroke-width="2.4" fill="none"/>`; };

  D.venn = () => svg(560, 300, `
    <circle cx="210" cy="125" r="88" fill="${B}" fill-opacity=".16" stroke="${B}" stroke-width="2.6"/>
    <circle cx="350" cy="125" r="88" fill="${P}" fill-opacity=".16" stroke="${P}" stroke-width="2.6"/>
    <circle cx="280" cy="205" r="88" fill="${M}" fill-opacity=".18" stroke="${M}" stroke-width="2.6"/>
    ${t(170, 100, '글자', { z: 26 })}${t(170, 124, '손글씨·레터링', { z: 13, w: 500 })}
    ${t(392, 100, '그림', { z: 26 })}${t(392, 124, '아이콘·사람·은유', { z: 13, w: 500 })}
    ${t(280, 262, '구조', { z: 26 })}${t(280, 282, '위계·패턴·연결선', { z: 13, w: 500 })}
    <ellipse cx="280" cy="158" rx="46" ry="26" fill="${Y}" stroke="${I}" stroke-width="2.6"/>${t(280, 164, '스케치노트', { z: 17, w: 700 })}`, '글자, 그림, 구조가 겹치는 곳이 스케치노트');

  D.funnel = () => {
    const names = [['ear', '듣기', '말 전체를 받아들이기'], ['filter', '걸러내기', '큰 아이디어만 남기기'], ['link', '연결하기', '내가 아는 것과 잇기'], ['pencil', '기록하기', '내 언어·그림으로 쓰기']];
    let b = ''; names.forEach((n, i) => {
      const x = 14 + i * 138; const ic = n[0] === 'filter' ? 'M4 5h16l-6 8v6l-4-2v-4z' : n[0] === 'link' ? 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1' : null;
      b += box(x, 20, 124, 120, [B, P, M, A][i], '#fff') + (ic ? `<g transform="translate(${x + 46},34) scale(1.3)" fill="none" stroke="${[B, P, M, A][i]}" stroke-width="1.8"><path d="${ic}"/></g>` : icon(n[0], x + 46, 34, 1.3, [B, P, M, A][i])) + t(x + 62, 98, n[1], { z: 21, w: 700 }) + t(x + 62, 120, n[2], { z: 11.5, w: 500 });
      if (i < 3) b += arrow(x + 126, 80, x + 136, 80);
    });
    b += `<path d="M76 150C76 200 482 200 482 150" stroke="${I}" stroke-width="2" fill="none" stroke-dasharray="6 5"/>${arrow(478, 156, 482, 148)}${t(280, 196, '반복하며 점점 빨라져요', { z: 15 })}`;
    ['“가장 중요한 건…”', '“예를 들면”', '숫자·이름', '목소리가 달라질 때'].forEach((s, i) => { b += `<rect x="${24 + i * 134}" y="224" width="124" height="30" rx="15" fill="${Y}" fill-opacity=".7" stroke="${I}" stroke-width="1.6"/>` + t(86 + i * 134, 244, s, { z: 12.5, w: 600 }); });
    b += t(280, 276, '핵심 아이디어가 다가오는 신호', { z: 13, w: 500, c: '#5B6B82' });
    return svg(560, 290, b, '듣기, 걸러내기, 연결하기, 기록하기의 반복 고리');
  };

  D.fiveElements = () => {
    let b = `${t(60, 40, '원', { z: 22 })}<circle cx="60" cy="86" r="26" fill="none" stroke="${I}" stroke-width="3"/>
      ${t(170, 40, '사각형', { z: 22 })}<rect x="144" y="62" width="52" height="46" fill="none" stroke="${I}" stroke-width="3"/>
      ${t(280, 40, '삼각형', { z: 22 })}<path d="M254 108L280 60L306 108Z" fill="none" stroke="${I}" stroke-width="3"/>
      ${t(390, 40, '선', { z: 22 })}<path d="M366 106L414 66" stroke="${I}" stroke-width="3"/>
      ${t(500, 40, '점', { z: 22 })}<circle cx="500" cy="86" r="6" fill="${I}"/>`;
    b += `<path d="M20 140H540" stroke="#C9CDC2" stroke-width="2" stroke-dasharray="5 6"/>${t(280, 168, '이 다섯 가지를 조합하면 대부분의 사물이 그려집니다', { z: 16, w: 500 })}`;
    // 조합 예: 집, 컵, 사람, 전구, 시계
    b += `<g transform="translate(20,190)"><rect x="12" y="30" width="46" height="36" fill="none" stroke="${B}" stroke-width="3"/><path d="M6 32L35 8L64 32" fill="none" stroke="${B}" stroke-width="3"/><rect x="29" y="46" width="12" height="20" fill="none" stroke="${B}" stroke-width="2.4"/></g>${t(55, 276, '집', { z: 16 })}
      <g transform="translate(128,190)"><path d="M10 22h40v26a16 16 0 0 1-16 16h-8a16 16 0 0 1-16-16z" fill="none" stroke="${P}" stroke-width="3"/><path d="M50 30h6a9 9 0 0 1 0 18h-6" fill="none" stroke="${P}" stroke-width="3"/><path d="M20 6v8M30 6v8M40 6v8" stroke="${P}" stroke-width="2.6"/></g>${t(163, 276, '커피', { z: 16 })}
      <g transform="translate(236,190)"><circle cx="36" cy="14" r="10" fill="none" stroke="${M}" stroke-width="3"/><path d="M36 24V50M36 30L18 42M36 30L54 42M36 50L22 70M36 50L50 70" stroke="${M}" stroke-width="3" fill="none"/></g>${t(272, 276, '사람', { z: 16 })}
      <g transform="translate(346,190)"><circle cx="34" cy="26" r="20" fill="none" stroke="${A}" stroke-width="3"/><rect x="26" y="46" width="16" height="12" fill="none" stroke="${A}" stroke-width="2.6"/><path d="M34 2V-4M10 8L6 4M58 8L62 4M8 28H2M60 28H66" stroke="${A}" stroke-width="2.4"/></g>${t(380, 276, '아이디어', { z: 16 })}
      <g transform="translate(456,190)"><circle cx="34" cy="34" r="30" fill="none" stroke="${B}" stroke-width="3"/><path d="M34 34V14M34 34L48 42" stroke="${B}" stroke-width="3"/><circle cx="34" cy="34" r="3" fill="${B}"/></g>${t(490, 276, '시간', { z: 16 })}`;
    return svg(560, 290, b, '원, 사각형, 삼각형, 선, 점으로 만드는 그림 예시');
  };

  D.starMethod = () => {
    const panel = (i, title, body) => `<g transform="translate(${10 + i * 138},10)">${box(0, 0, 124, 190, '#C9CDC2', '#fff')}${body}${t(62, 218, title, { z: 15, w: 700 })}</g>`;
    const head = (c = I) => `<circle cx="62" cy="40" r="17" fill="none" stroke="${c}" stroke-width="3"/>`;
    const star = `<path d="M62 57V110M62 70L34 90M62 70L90 90M62 110L42 150M62 110L82 150" stroke="${B}" stroke-width="3" fill="none"/>`;
    const body = `<path d="M62 58c-14 0-26 8-30 20l-4 26 16 4 4 40h28l4-40 16-4-4-26c-4-12-16-20-30-20z" fill="${B}" fill-opacity=".14" stroke="${B}" stroke-width="3"/>`;
    const face = `<path d="M54 36h.1M70 36h.1M55 46q7 6 14 0" stroke="${I}" stroke-width="3" fill="none"/><path d="M46 30q16-18 32 0" stroke="${I}" stroke-width="3" fill="none"/>`;
    return svg(570, 232, panel(0, '① 머리', head()) + panel(1, '② 별 모양 몸', head() + star) + panel(2, '③ 몸 완성', head() + body) + panel(3, '④ 얼굴·옷·소품', head() + body + face + `<path d="M48 118h28" stroke="${P}" stroke-width="3"/>`), '별 모양으로 사람을 그리는 4단계');
  };

  D.phases = () => {
    const col = [B, P, M]; const names = ['준비', '캡처', '마무리']; const items = [['재료 챙기기·예비 펜', '일찍 도착해 자리 잡기', '제목·헤더 미리 만들기'], ['큰 아이디어에 집중', '위계로 중요도 표시', '실수는 그대로 두기'], ['사진 찍기(밝고 평평하게)', '필요하면 색·정리 더하기', '공유하고 피드백 받기']];
    let b = ''; names.forEach((n, i) => { const x = 14 + i * 184; b += `<path d="M${x} 14h150l22 40-22 40H${x}l22-40z" fill="${col[i]}" fill-opacity=".16" stroke="${col[i]}" stroke-width="2.6"/>` + t(x + 86, 62, n, { z: 26, w: 700 }); items[i].forEach((s, k) => { b += `<circle cx="${x + 10}" cy="${126 + k * 30}" r="4" fill="${col[i]}"/>` + t(x + 22, 131 + k * 30, s, { a: 'start', z: 14, w: 500 }); }); });
    return svg(570, 228, b, '준비, 캡처, 마무리 3단계');
  };
  D.anatomy = () => svg(420, 290, `${box(10, 10, 400, 270, I, '#fff', 6)}
    <rect x="24" y="24" width="190" height="52" rx="6" fill="${Y}" stroke="${I}" stroke-width="2.4"/>${t(119, 56, '제목', { z: 22, w: 700 })}
    <rect x="228" y="24" width="168" height="52" rx="26" fill="none" stroke="${B}" stroke-width="2.4"/>${t(312, 46, '발표자 · 소속', { z: 14 })}${t(312, 64, '날짜 · 장소', { z: 12, w: 500 })}
    <path d="M24 92H396" stroke="${I}" stroke-width="2" stroke-dasharray="3 5"/>
    ${box(24, 104, 120, 70, P, 'none', 6)}${t(84, 144, '큰 아이디어 1', { z: 14 })}${box(160, 104, 120, 70, M, 'none', 6)}${t(220, 144, '큰 아이디어 2', { z: 14 })}${box(296, 104, 100, 70, A, 'none', 6)}${t(346, 144, '큰 아이디어 3', { z: 13 })}
    ${arrow(146, 140, 158, 140)}${arrow(282, 140, 294, 140)}
    <path d="M24 190c40 14 70-14 110 0s70 14 110 0 70-10 150 0" fill="none" stroke="${B}" stroke-width="2.4"/>${t(210, 226, '그림 · 도표 · 인용 · 연결선', { z: 14, w: 500 })}
    <rect x="24" y="244" width="372" height="24" rx="4" fill="#EEF0E8"/>${t(210, 262, '출처 · 크레딧 · 서명', { z: 13, w: 500 })}`, '스케치노트 한 장의 구성: 제목, 발표자 정보, 본문, 하단 정보');

  D.artScale = () => svg(560, 300, `
    <rect x="50" y="20" width="490" height="230" fill="#fff" stroke="#C9CDC2" stroke-width="2"/>
    <path d="M50 250L540 20" stroke="${PAL.mint}" stroke-width="3" stroke-dasharray="7 6" opacity=".7"/>
    ${arrow(50, 250, 548, 250)}${arrow(50, 250, 50, 12)}${t(300, 284, '그림 완성도: 단순한 그림 → 화려한 일러스트', { z: 15 })}
    <text transform="translate(18,135) rotate(-90)" text-anchor="middle" font-size="15" font-weight="600" class="hand" fill="${I}">구조: 약함 → 강함</text>
    <rect x="68" y="34" width="190" height="66" rx="10" fill="${Y}" fill-opacity=".75" stroke="${I}" stroke-width="2.2"/>${t(163, 62, '단순한 그림 + 좋은 구조', { z: 15, w: 700 })}${t(163, 84, '평범한 사람의 훌륭한 노트', { z: 12.5, w: 500 })}
    <rect x="320" y="34" width="206" height="66" rx="10" fill="${Y}" fill-opacity=".75" stroke="${I}" stroke-width="2.2"/>${t(423, 62, '화려한 그림 + 좋은 구조', { z: 15, w: 700 })}${t(423, 84, '전문가 수준의 노트', { z: 12.5, w: 500 })}
    <rect x="68" y="172" width="190" height="60" rx="10" fill="none" stroke="${P}" stroke-width="2.2" stroke-dasharray="5 4"/>${t(163, 198, '단순한 그림 + 약한 구조', { z: 14.5 })}${t(163, 218, '구조부터 보강!', { z: 12.5, w: 500, c: P })}
    <rect x="320" y="172" width="206" height="60" rx="10" fill="none" stroke="${P}" stroke-dasharray="5 4" stroke-width="2.2"/>${t(423, 198, '화려한 그림 + 약한 구조', { z: 14.5 })}${t(423, 218, '읽히지 않는 예쁜 그림', { z: 12.5, w: 500, c: P })}`, '그림 완성도와 구조를 두 축으로 본 스케치노트의 위치');

  D.patterns = () => {
    const cell = (i, name, body) => { const x = 12 + (i % 4) * 138, y = 8 + Math.floor(i / 4) * 150; return `<g transform="translate(${x},${y})">${box(0, 0, 124, 116, '#C9CDC2', '#fff', 6)}${body}${t(62, 136, name, { z: 16, w: 700 })}</g>`; };
    const bx = (x, y, w, h, c = B) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c}" fill-opacity=".22" stroke="${c}" stroke-width="2"/>`;
    const L = (d, c = I) => `<path d="${d}" stroke="${c}" stroke-width="2.2" fill="none"/>`;
    return svg(570, 306,
      cell(0, '선형', bx(10, 12, 104, 18) + bx(10, 42, 104, 18, P) + bx(10, 72, 104, 18, M) + L('M12 100h100', '#C9CDC2')) +
      cell(1, '방사형', `<ellipse cx="62" cy="58" rx="18" ry="13" fill="${Y}" stroke="${I}" stroke-width="2"/>` + [[20, 20], [104, 20], [20, 96], [104, 96], [62, 12], [62, 104]].map(([x, y], i) => L(`M62 58L${x} ${y}`, ST.SERIES[i]) + `<circle cx="${x}" cy="${y}" r="8" fill="${ST.SERIES[i]}" fill-opacity=".3" stroke="${ST.SERIES[i]}" stroke-width="2"/>`).join('')) +
      cell(2, '수직형', bx(34, 8, 56, 22) + L('M62 30v8') + bx(34, 38, 56, 22, P) + L('M62 60v8') + bx(34, 68, 56, 22, M) + L('M62 90v6') + bx(34, 96, 56, 14, A)) +
      cell(3, '경로형', L('M14 96C40 96 30 60 62 60S96 24 110 22', B) + [[14, 96], [44, 78], [74, 54], [108, 22]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="8" fill="${ST.SERIES[i]}" fill-opacity=".35" stroke="${ST.SERIES[i]}" stroke-width="2"/>`).join('')) +
      cell(4, '모듈형', bx(10, 10, 48, 44) + bx(66, 10, 48, 20, P) + bx(66, 36, 48, 18, M) + bx(10, 60, 30, 46, A) + bx(46, 60, 68, 46, B)) +
      cell(5, '마천루형', bx(14, 8, 96, 14) + bx(14, 26, 96, 14, P) + bx(14, 44, 96, 14, M) + bx(14, 62, 96, 14, A) + bx(14, 80, 96, 14, B) + L('M62 98v12', '#C9CDC2')) +
      cell(6, '팝콘형', bx(8, 12, 40, 26) + bx(70, 8, 44, 22, P) + bx(30, 48, 46, 26, M) + bx(84, 52, 30, 30, A) + bx(10, 84, 36, 22, B) + bx(62, 88, 30, 20, P)) +
      `<g transform="translate(426,158)">${t(62, 40, '한 장 안에서', { z: 15, w: 600 })}${t(62, 62, '패턴을 섞어도', { z: 15, w: 600 })}${t(62, 84, '좋아요', { z: 15, w: 600 })}</g>`, '스케치노트의 일곱 가지 패턴: 선형, 방사형, 수직형, 경로형, 모듈형, 마천루형, 팝콘형');
  };

  D.hierarchy = () => svg(560, 270, `
    ${box(10, 10, 330, 250, I, '#fff', 8)}
    ${t(175, 62, '프로젝트 킥오프', { z: 38, w: 700 })}<path d="M60 74c40 6 150 6 230 0" stroke="${P}" stroke-width="4" fill="none"/>
    ${t(175, 104, '목표 · 역할 · 일정', { z: 22, w: 600, c: B })}
    <rect x="40" y="124" width="104" height="34" rx="6" fill="none" stroke="${I}" stroke-width="2.6"/>${t(92, 148, '핵심 질문', { z: 18, w: 700 })}
    <rect x="166" y="124" width="124" height="34" rx="6" fill="${Y}" fill-opacity=".8" stroke="${I}" stroke-width="2.6"/>${t(228, 148, '마감 11/30', { z: 18, w: 700 })}
    ${t(40, 196, '· 회의는 15분 이내', { a: 'start', z: 15, w: 500 })}${t(40, 220, '· 결정과 담당자를 먼저', { a: 'start', z: 15, w: 500 })}${t(40, 244, '· 나머지는 공유 문서에', { a: 'start', z: 15, w: 500 })}
    ${arrow(352, 62, 332, 62, P)}${t(366, 56, '크기 · 굵기', { a: 'start', z: 15, w: 700, c: P })}${t(366, 76, '가장 큰 것이 가장 먼저', { a: 'start', z: 12, w: 500 })}
    ${arrow(352, 104, 332, 104, B)}${t(366, 100, '색 · 밑줄', { a: 'start', z: 15, w: 700, c: B })}${t(366, 120, '그룹을 묶어 줌', { a: 'start', z: 12, w: 500 })}
    ${arrow(352, 141, 332, 141, I)}${t(366, 136, '박스 · 형광펜', { a: 'start', z: 15, w: 700 })}${t(366, 156, '꼭 기억할 것', { a: 'start', z: 12, w: 500 })}
    ${arrow(352, 208, 332, 208, M)}${t(366, 204, '작은 글씨', { a: 'start', z: 15, w: 700, c: M })}${t(366, 224, '보조 정보', { a: 'start', z: 12, w: 500 })}`, '크기, 굵기, 색, 박스로 위계를 만드는 예시');

  D.formats = () => {
    const cell = (x, n, d, body) => `<g transform="translate(${x},8)">${box(0, 0, 170, 150, '#C9CDC2', '#fff', 6)}${body}${t(85, 182, n, { z: 20, w: 700 })}${t(85, 204, d, { z: 12.5, w: 500 })}</g>`;
    let grid = ''; for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) grid += `<rect x="${12 + c * 49}" y="${12 + r * 42}" width="45" height="38" rx="4" fill="${ST.SERIES[(r * 3 + c) % 8]}" fill-opacity=".2" stroke="${ST.SERIES[(r * 3 + c) % 8]}" stroke-width="2"/>`;
    let rad = `<ellipse cx="85" cy="75" rx="28" ry="20" fill="${Y}" stroke="${I}" stroke-width="2.2"/>`; for (let i = 0; i < 7; i++) { const a = (i / 7) * 6.283; rad += `<path d="M85 75L${85 + Math.cos(a) * 62} ${75 + Math.sin(a) * 52}" stroke="${ST.SERIES[i]}" stroke-width="2"/><circle cx="${85 + Math.cos(a) * 62}" cy="${75 + Math.sin(a) * 52}" r="9" fill="${ST.SERIES[i]}" fill-opacity=".3" stroke="${ST.SERIES[i]}" stroke-width="2"/>`; }
    const free = [[26, 30, 40, 22], [96, 22, 50, 26], [50, 76, 30, 30], [110, 80, 40, 22], [24, 118, 36, 20], [84, 112, 46, 24]].map(([x, y, w, h], i) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${i % 2 ? 11 : 3}" fill="${ST.SERIES[i]}" fill-opacity=".22" stroke="${ST.SERIES[i]}" stroke-width="2" transform="rotate(${(i - 2) * 4} ${x + w / 2} ${y + h / 2})"/>`).join('') + `<path d="M66 40L96 38M70 78L52 90M122 50L124 78M80 100L96 118" stroke="${I}" stroke-width="1.8" fill="none" stroke-dasharray="3 3"/>`;
    return svg(570, 216, cell(8, '그리드', '칸을 채우며 정리', grid) + cell(196, '방사형', '중심에서 뻗어 나가기', rad) + cell(384, '자유형', '떠오르는 대로 흩뿌리기', free), '아이디어 발상의 세 가지 형식');
  };

  D.ladder = () => {
    const st = [['자료 모으기', '메모·사진·링크를 한곳에'], ['맵 표면 고르기', '넉넉한 종이나 보드'], ['중심 주제 쓰기', '한가운데에 크게'], ['아이디어 펼치기', '가지를 뻗어 적기'], ['검토·연결하기', '관련 있는 것끼리 선 긋기'], ['패턴 표식 달기', '★ ? ⚠ ⚡ ✔ 로 표시'], ['새 맵 만들기', '정리된 구조로 다시 그리기']];
    let b = ''; st.forEach((s, i) => { const x = 10 + i * 76, y = 196 - i * 26; b += `<rect x="${x}" y="${y}" width="72" height="${230 - y}" fill="${ST.SERIES[i % 8]}" fill-opacity=".16" stroke="${ST.SERIES[i % 8]}" stroke-width="2.4"/>` + t(x + 36, y + 24, String(i + 1), { z: 24, w: 700, c: ST.SERIES[i % 8] }); b += t(x + 36, 252 + (i % 2) * 20, s[0], { z: 12.5, w: 700 }); }); b += `<g>${[['자료 모으기'], ['표면 고르기']].length ? '' : ''}</g>`;
    return svg(560, 296, b, '아이디어 맵을 만드는 일곱 단계 계단');
  };

  D.statusLegend = () => {
    const items = [['wait', '대기', PAL.slate], ['play', '진행', B], ['check', '완료', M], ['blocked', '막힘', P], ['star', '최우선', A]]; let b = '';
    items.forEach((it, i) => { const x = 20 + i * 108; b += `<rect x="${x}" y="14" width="96" height="84" rx="12" fill="#fff" stroke="${it[2]}" stroke-width="2.4"/>` + icon(it[0], x + 30, 24, 1.6, it[2]) + t(x + 48, 86, it[1], { z: 17, w: 700, c: it[2] }); });
    b += `<path d="M20 128H540" stroke="#C9CDC2" stroke-dasharray="5 6" stroke-width="2"/>${t(280, 156, '5년 계획표: 가로축은 시간, 세로축은 삶의 영역', { z: 15, w: 500 })}`;
    for (let i = 0; i < 5; i++) { b += `<rect x="${20 + i * 104}" y="172" width="96" height="30" rx="6" fill="${B}" fill-opacity="${0.1 + i * 0.07}" stroke="${B}" stroke-width="2"/>` + t(68 + i * 104, 193, `${i + 1}년차`, { z: 15, w: 700 }); ['커리어', '건강', '관계'].forEach((r, k) => { b += `<rect x="${20 + i * 104}" y="${210 + k * 28}" width="96" height="24" rx="5" fill="none" stroke="#C9CDC2" stroke-width="1.8"/>`; if (i === 0) b += t(68, 227 + k * 28, r, { z: 12.5, w: 500, c: '#5B6B82' }); }); }
    return svg(560, 300, b, '상태 아이콘 범례와 5년 계획표 틀');
  };

  D.cycle = () => {
    const n = [['관찰', 'ear', B], ['캡처', 'pencil', P], ['두 번째 버전', 'doc', M], ['테스트', 'check', A]]; let b = `<circle cx="280" cy="130" r="86" fill="none" stroke="#C9CDC2" stroke-width="2.4" stroke-dasharray="6 6"/>`;
    n.forEach((x, i) => { const a = -Math.PI / 2 + i * (Math.PI / 2); const cx = 280 + Math.cos(a) * 86, cy = 130 + Math.sin(a) * 86; b += `<circle cx="${cx}" cy="${cy}" r="34" fill="#fff" stroke="${x[2]}" stroke-width="2.8"/>` + icon(x[1], cx - 14, cy - 24, 1.15, x[2]) + t(cx, cy + 22, x[0], { z: 13.5, w: 700 }); });
    b += t(280, 126, '프로세스', { z: 18, w: 700 }) + t(280, 148, '문서화', { z: 18, w: 700 }) + arrow(318, 52, 332, 60, I) + arrow(362, 160, 356, 172, I);
    return svg(560, 260, b, '관찰, 캡처, 두 번째 버전, 테스트의 순환');
  };

  D.expTemplate = () => {
    const ax = ['분위기', '새로움', '배움', '즐거움', '다시 하고 싶음']; let b = ''; const cx = 140, cy = 125, R = 88;
    [0.33, 0.66, 1].forEach((k) => (b += `<polygon points="${ax.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return `${cx + Math.cos(a) * R * k},${cy + Math.sin(a) * R * k}`; }).join(' ')}" fill="none" stroke="#C9CDC2" stroke-width="1.6"/>`));
    const v = [0.9, 0.6, 0.8, 0.95, 0.7]; b += `<polygon points="${ax.map((_, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return `${cx + Math.cos(a) * R * v[i]},${cy + Math.sin(a) * R * v[i]}`; }).join(' ')}" fill="${P}" fill-opacity=".22" stroke="${P}" stroke-width="2.6"/>`;
    ax.forEach((s, i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; b += t(cx + Math.cos(a) * (R + 26), cy + Math.sin(a) * (R + 22) + 4, s, { z: 13, w: 600 }); });
    b += icon('plane', 330, 30, 1.7, B) + t(400, 52, '여행', { z: 17, w: 700, a: 'start' }) + icon('fork', 330, 80, 1.7, P) + t(400, 102, '음식', { z: 17, w: 700, a: 'start' }) + icon('film', 330, 130, 1.7, M) + t(400, 152, '영화·영상', { z: 17, w: 700, a: 'start' }) + icon('book', 330, 180, 1.7, A) + t(400, 202, '책·강연', { z: 17, w: 700, a: 'start' });
    return svg(560, 250, b, '경험 기록 카드: 다섯 가지 축의 점수 레이더와 경험 종류');
  };

  D.lettering = () => {
    const rows = [['단선', `<text x="0" y="0" font-size="34" font-weight="400" fill="${I}" class="hand">SKETCH</text>`], ['이중선(속 빈 글자)', `<text x="0" y="0" font-size="34" font-weight="700" fill="none" stroke="${I}" stroke-width="1.6" class="hand">SKETCH</text>`], ['블록', `<text x="0" y="0" font-size="32" font-weight="900" fill="${I}" font-family="Arial Black,Impact,sans-serif">SKETCH</text>`], ['세리프', `<text x="0" y="0" font-size="32" font-weight="700" fill="${I}" font-family="Georgia,'Times New Roman',serif">Sketch</text>`], ['슬랩 세리프', `<text x="0" y="0" font-size="32" font-weight="800" fill="${I}" font-family="Rockwell,'Courier New',serif">Sketch</text>`], ['스크립트', `<text x="0" y="0" font-size="38" fill="${I}" font-family="'Brush Script MT','Segoe Script',cursive" font-style="italic">Sketch</text>`], ['콘덴스드', `<text x="0" y="0" font-size="34" font-weight="800" fill="${I}" font-family="Arial Narrow,Arial,sans-serif" transform="scale(.62,1.1)">SKETCHNOTE</text>`], ['3D', `<text x="3" y="3" font-size="34" font-weight="900" fill="${B}" font-family="Arial Black,Impact,sans-serif">SKETCH</text><text x="0" y="0" font-size="34" font-weight="900" fill="#fff" stroke="${I}" stroke-width="1.8" font-family="Arial Black,Impact,sans-serif">SKETCH</text>`]];
    let b = ''; rows.forEach((r, i) => { const x = 14 + (i % 2) * 280, y = 20 + Math.floor(i / 2) * 78; b += `<g transform="translate(${x},${y})">${box(0, 0, 262, 66, '#C9CDC2', '#fff', 8)}<g transform="translate(16,44)">${r[1]}</g>${t(246, 18, r[0], { a: 'end', z: 12.5, w: 600, c: '#5B6B82' })}</g>`; });
    return svg(570, 340, b, '레터링 스타일 예시: 단선, 이중선, 블록, 세리프, 슬랩, 스크립트, 콘덴스드, 3D');
  };

  D.markers = () => {
    const m = [['star', '핵심', A], ['question', '질문', B], ['warn', '주의', P], ['bolt', '아이디어', PAL.violet], ['check', '결정', M]]; let b = '';
    m.forEach((x, i) => { const cx = 66 + i * 106; b += `<circle cx="${cx}" cy="52" r="34" fill="${x[2]}" fill-opacity=".14" stroke="${x[2]}" stroke-width="2.6"/>` + icon(x[0], cx - 17, 35, 1.45, x[2]) + t(cx, 112, x[1], { z: 17, w: 700, c: x[2] }); });
    return svg(560, 130, b, '패턴 표식: 핵심, 질문, 주의, 아이디어, 결정');
  };

  D.dualCode = () => svg(560, 190, `
    ${box(20, 28, 150, 110, B, '#fff')}${t(95, 72, '말·글', { z: 24, w: 700, c: B })}${t(95, 100, '언어 기억', { z: 14, w: 500 })}
    ${box(390, 28, 150, 110, P, '#fff')}${t(465, 72, '그림·공간', { z: 24, w: 700, c: P })}${t(465, 100, '시각 기억', { z: 14, w: 500 })}
    ${arrow(172, 66, 262, 66, B)}${arrow(388, 66, 298, 66, P)}${arrow(172, 106, 262, 106, B)}${arrow(388, 106, 298, 106, P)}
    <circle cx="280" cy="86" r="34" fill="${Y}" stroke="${I}" stroke-width="2.6"/>${t(280, 82, '두 갈래', { z: 14, w: 700 })}${t(280, 100, '연결', { z: 14, w: 700 })}
    ${t(280, 168, '같은 내용을 두 방식으로 저장하면 떠올릴 길이 두 배가 됩니다', { z: 14.5, w: 500, c: '#5B6B82' })}`, '말과 그림이 만나 기억을 두 갈래로 저장하는 이중 부호화');
})();
