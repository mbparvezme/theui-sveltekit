export function SlideComponent({ containerSelector, interval = 3000 }) {
  const container = document.querySelector(containerSelector);
  const slider = container.querySelector('.list');
  const items = container.querySelectorAll('.list .item');
  const next = container.querySelector('#next');
  const prev = container.querySelector('#prev');
  const dots = container.querySelectorAll('.dots li');

  const lengthItems = items.length - 1;
  let active = 0;
  let refreshInterval;

  const reloadSlider = () => {
    slider.style.left = -items[active].offsetLeft + 'px';

    const lastActiveDot = container.querySelector('.dots li.active');
    if (lastActiveDot) {
      lastActiveDot.classList.remove('active');
    }
    dots[active].classList.add('active');

    resetInterval();
  };

  const nextSlide = () => {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
  };

  const prevSlide = () => {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
  };

  const resetInterval = () => {
    clearInterval(refreshInterval);
    refreshInterval = setInterval(nextSlide, interval);
  };

  const setupEventListeners = () => {
    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        active = index;
        reloadSlider();
      });
    });

    window.addEventListener('resize', reloadSlider);
  };

  const init = () => {
    setupEventListeners();
    reloadSlider();
    refreshInterval = setInterval(nextSlide, interval);
  };

  const destroy = () => {
    clearInterval(refreshInterval);
    next.removeEventListener('click', nextSlide);
    prev.removeEventListener('click', prevSlide);
    dots.forEach((dot) => dot.removeEventListener('click', reloadSlider));
    window.removeEventListener('resize', reloadSlider);
  };

  return {
    init,
    destroy,
  };
}
