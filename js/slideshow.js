const INTERVAL = 3000;

function mod(a, m) { return ((a % m) + m) % m; }

function initSlideshow(card) {
  const images = JSON.parse(card.dataset.images || '[]');
  const track   = card.querySelector('.carousel-track');
  const dotsEl  = card.querySelector('.carousel-dots');
  const prevBtn = card.querySelector('.prev-btn');
  const nextBtn = card.querySelector('.next-btn');
  const pageNum = card.querySelector('.slide-page-num');

  if (images.length === 0) {
    track.innerHTML = '<div class="slideshow-loading">圖片製作中，敬請期待</div>';
    return;
  }

  const n = images.length;
  let current = 0;
  let timer   = null;

  // Build slides
  const slideEls = images.map((src, i) => {
    const div = document.createElement('div');
    div.className = 'pdf-slide';
    const img = document.createElement('img');
    img.src = src;
    img.alt = `投影片 ${i + 1}`;
    img.style.display = 'block';
    img.style.height  = '100%';
    img.style.width   = 'auto';
    div.appendChild(img);
    div.addEventListener('click', () => {
      let r = mod(i - current, n);
      if (r > n / 2) r -= n;
      if (r !== 0) { current = i; resetTimer(); render(); }
    });
    track.appendChild(div);
    return div;
  });

  // Build dots
  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => { current = i; resetTimer(); render(); });
    dotsEl.appendChild(dot);
  });

  function render() {
    slideEls.forEach((slide, i) => {
      let r = mod(i - current, n);
      if (r > n / 2) r -= n;

      if (r === 0) {
        slide.style.transform     = 'translateX(-50%) translateY(-50%) scale(1)';
        slide.style.opacity       = '1';
        slide.style.zIndex        = '2';
        slide.style.boxShadow     = '0 8px 32px rgba(0,0,0,0.18)';
        slide.style.pointerEvents = 'none';
      } else if (Math.abs(r) === 1) {
        slide.style.transform     = `translateX(calc(-50% + ${r * 530}px)) translateY(-50%) scale(0.6)`;
        slide.style.opacity       = '0.55';
        slide.style.zIndex        = '1';
        slide.style.boxShadow     = '0 4px 12px rgba(0,0,0,0.1)';
        slide.style.pointerEvents = 'auto';
      } else {
        const dir = r > 0 ? 1 : -1;
        slide.style.transform     = `translateX(calc(-50% + ${dir * 1400}px)) translateY(-50%) scale(0.6)`;
        slide.style.opacity       = '0';
        slide.style.zIndex        = '0';
        slide.style.pointerEvents = 'none';
      }
    });

    dotsEl.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === current)
    );
    if (pageNum) pageNum.textContent = `${current + 1} / ${n}`;
  }

  function goNext() { current = mod(current + 1, n); render(); }
  function goPrev() { current = mod(current - 1, n); render(); }
  function resetTimer() { clearInterval(timer); timer = setInterval(goNext, INTERVAL); }

  prevBtn.addEventListener('click', () => { goPrev(); resetTimer(); });
  nextBtn.addEventListener('click', () => { goNext(); resetTimer(); });
  card.addEventListener('mouseenter', () => clearInterval(timer));
  card.addEventListener('mouseleave', () => resetTimer());

  render();
  resetTimer();
}

document.querySelectorAll('.slideshow-card[data-images]').forEach(initSlideshow);
