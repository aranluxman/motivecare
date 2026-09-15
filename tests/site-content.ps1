$ErrorActionPreference = "Stop"

# The site is a Vite + React app, so the content checks read the components
# rather than index.html (which is now just the app shell).
$root = Split-Path -Parent $PSScriptRoot
$reviews  = Get-Content -Raw -Path (Join-Path $root "src/components/Reviews.jsx")
$services = Get-Content -Raw -Path (Join-Path $root "src/components/Services.jsx")
$gallery  = Get-Content -Raw -Path (Join-Path $root "src/components/Gallery.jsx")
$hero     = Get-Content -Raw -Path (Join-Path $root "src/components/Hero.jsx")
$trust    = Get-Content -Raw -Path (Join-Path $root "src/components/TrustBar.jsx")
$css      = Get-Content -Raw -Path (Join-Path $root "src/index.css")
$html     = Get-Content -Raw -Path (Join-Path $root "index.html")

function Assert-Contains {
  param([string] $Haystack, [string] $Needle, [string] $Message)
  if (-not $Haystack.Contains($Needle)) { throw $Message }
}

# --- Reviews: real quotes, continuous rotation, click-to-expand -------------
Assert-Contains $reviews 'id="reviews"' "The reviews section should keep the #reviews target."
Assert-Contains $reviews 'Simra Niz' "The reviews should include Simra Niz."
Assert-Contains $reviews 'Suryakant Patel' "The reviews should include Suryakant Patel."
Assert-Contains $reviews 'Syed Uzair Ahmed' "The reviews should include Syed Uzair Ahmed."
Assert-Contains $reviews 'Pinder is excellent.' "The reviews should include the supplied Pinder review."
Assert-Contains $reviews 'animate-marquee' "Reviews should rotate continuously on a marquee rail."
Assert-Contains $reviews 'animate-marquee-reverse' "The second review rail should travel the other way."
Assert-Contains $reviews 'role="dialog"' "Clicking a review should open an expanded dialog."
Assert-Contains $reviews 'aria-modal="true"' "The expanded review should be a modal dialog."
Assert-Contains $reviews 'Read the full review from' "Each review card should be an accessible expand control."

$reviewCount = ([regex]::Matches($reviews, "author: '")).Count
if ($reviewCount -lt 11) {
  throw "Expected at least 11 reviews, found $reviewCount."
}

# --- Continuous motion plumbing -------------------------------------------
Assert-Contains $css '@keyframes marquee' "The marquee keyframes should exist."
Assert-Contains $css 'animation-play-state: paused' "Rails should pause on hover/focus so reviews stay readable."
Assert-Contains $css 'prefers-reduced-motion' "Motion must be disabled for reduced-motion users."
Assert-Contains $css '.marquee-duplicate' "The seamless-loop duplicate needs a hook to hide it."
Assert-Contains $trust 'animate-marquee' "The trust/highlights bar should rotate continuously."
Assert-Contains $trust 'aria-hidden="true"' "The duplicated highlights must be hidden from assistive tech."

# --- Services: named 'Services' and covering the full shop menu ------------
Assert-Contains $services 'id="services"' "The services section should keep the #services target."
if ($services -notmatch '(?s)id="services-title".*?>\s*Services\s*<') {
  throw "The services heading should read simply 'Services'."
}
foreach ($needle in @(
    'Computer Diagnostics', 'Brake Service & Repair', 'Tires & Balancing', 'Wheel Alignment',
    'Oil & Fluid Changes', 'Batteries & Charging', 'Starters & Alternators', 'Suspension & Steering',
    'Exhaust & Mufflers', 'A/C & Heating', 'Belts & Hoses', 'Engine Repair',
    'Transmission Service', 'Pre-Purchase Inspection', 'Seasonal Tire Changeover', 'Motor Parts Sourcing')) {
  Assert-Contains $services $needle "Services should list: $needle."
}

$serviceCount = ([regex]::Matches($services, "  \{ icon: '")).Count
if ($serviceCount -lt 16) {
  throw "Expected at least 16 services, found $serviceCount."
}

# --- Imagery: mechanics at work, not parked cars ---------------------------
$banned = @(
  'photo-1500530855697-b586d89ba3ee',  # generic landscape
  'photo-1503376780353-7e6692767b70',  # parked sports car
  'photo-1552519507-da3b142c6e3d',     # parked car beauty shot
  'photo-1605559424843-9e4c228bf1c2'   # empty car on a lift
)
foreach ($id in $banned) {
  if ($gallery.Contains($id) -or $hero.Contains($id) -or $html.Contains($id)) {
    throw "Image $id shows a car rather than a mechanic working and should not be used."
  }
}

foreach ($id in @(
    'photo-1599474151975-1f978922fa02', 'photo-1568644305664-5c7c2f88fa65',
    'photo-1643700973089-baa86a1ab9ee', 'photo-1632733711679-529326f6db12',
    'photo-1628577478162-d4d00467c627')) {
  Assert-Contains $gallery $id "The gallery should use mechanic-at-work photo $id."
}
Assert-Contains $hero 'photo-1615906655593-ad0386982a0f' "The hero should show a mechanic repairing a car."

$altCount = ([regex]::Matches($gallery, "alt: '")).Count
$galleryImages = ([regex]::Matches($gallery, "id: 'photo-")).Count
if ($altCount -ne $galleryImages) {
  throw "Every gallery image needs alt text ($altCount alts for $galleryImages images)."
}

# --- Branding --------------------------------------------------------------
Assert-Contains $html 'rel="icon"' "index.html should link the favicon."
Assert-Contains $html 'rel="manifest"' "index.html should link the web manifest."

# --- Cloudflare Pages deploy assets must live in public/ so they reach dist/
foreach ($file in @('favicon.svg', 'robots.txt', 'sitemap.xml', 'site.webmanifest', '_headers', '_redirects')) {
  $path = Join-Path $root "public/$file"
  if (-not (Test-Path $path)) {
    throw "public/$file is missing; it would not be published to the deploy output."
  }
}

Write-Host "Static site content checks passed."
