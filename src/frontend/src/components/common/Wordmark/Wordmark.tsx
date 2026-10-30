import wordmarkInverse from '@ds/assets/Logo/butterflynomics-wordmark-inverse.svg?url'

/** Wordmark đảo màu, dùng nguyên file SVG của Design System (không vẽ lại). */
export function Wordmark() {
  return <img src={wordmarkInverse} alt="Butterflynomics" className="block h-[26px] w-auto" />
}
