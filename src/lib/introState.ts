export function hasPlayedIntro(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('revgng_intro') === 'true'
}

export function setIntroPlayed(): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('revgng_intro', 'true')
}

export function hasPlayedNavbar(): boolean {
  if (typeof window === 'undefined') return false
  return sessionStorage.getItem('revgng_navbar') === 'true'
}

export function setNavbarPlayed(): void {
  if (typeof window === 'undefined') return
  sessionStorage.setItem('revgng_navbar', 'true')
}
