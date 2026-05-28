$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$htmlPath = Join-Path $root "index.html"
$html = Get-Content -Raw -Path $htmlPath

function Assert-Contains {
  param(
    [string] $Haystack,
    [string] $Needle,
    [string] $Message
  )

  if (-not $Haystack.Contains($Needle)) {
    throw $Message
  }
}

Assert-Contains $html 'href="#reviews"' "The hero review count should link to the reviews section."
Assert-Contains $html 'data-review-count-link' "The top review count should have a stable review-count hook."
Assert-Contains $html 'id="reviews"' "The reviews section should keep the #reviews target."
Assert-Contains $html 'Simra Niz' "The expanded reviews should include Simra Niz."
Assert-Contains $html 'Suryakant Patel' "The expanded reviews should include Suryakant Patel."
Assert-Contains $html 'Syed Uzair Ahmed' "The expanded reviews should include Syed Uzair Ahmed."
Assert-Contains $html 'Pinder is excellent.' "The expanded reviews should include the supplied Pinder review."

$reviewCardCount = ([regex]::Matches($html, 'class="review-card')).Count
if ($reviewCardCount -lt 12) {
  throw "Expected at least 12 visible review cards, found $reviewCardCount."
}

$imageUrls = [regex]::Matches($html, 'https://images\.unsplash\.com/[^"]+') | ForEach-Object { $_.Value }
if ($imageUrls -contains 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee') {
  throw "The generic landscape hero image should not be used on the mechanic site."
}

Write-Host "Static site content checks passed."
