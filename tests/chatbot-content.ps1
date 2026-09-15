$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$widgetPath = Join-Path $root "public/chatbot.js"
$widget = Get-Content -Raw -Path $widgetPath
$indexPath = Join-Path $root "index.html"
$html = Get-Content -Raw -Path $indexPath

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

# The widget is wired into the site with a single script tag.
Assert-Contains $html 'src="/chatbot.js"' "index.html should load the chatbot widget."

# Identity and opening message.
Assert-Contains $widget 'Hi! I' "The widget should include the assistant's opening message."
Assert-Contains $widget "I’m the Motive Care Assistant" "The opening message should introduce the Motive Care Assistant."
Assert-Contains $widget 'Motive Care Assistant' "The chat header should read Motive Care Assistant."

# The assistant is never named Riley.
if ($widget -match 'Riley' -or $html -match 'Riley') {
  throw "The assistant must be called Motive Care Assistant, never Riley."
}

# Contact details.
Assert-Contains $widget '+19052010087' "The widget should use a tap-to-call phone link."
Assert-Contains $widget '(905) 201-0087' "The widget should show the display phone number."
Assert-Contains $widget '20 Heritage Rd, Markham, ON L3P 3P3' "The widget should include the shop address."

# Pricing guardrail: every price answer must attach the estimate + call-to-confirm line.
Assert-Contains $widget "that's just an estimate" "Price replies must always say the price is an estimate."
Assert-Contains $widget 'to confirm for your car' "Price replies must tell customers to call to confirm."

# Hours guardrail: fixed call-ahead reply, no invented times.
Assert-Contains $widget 'Hours can vary' "Hours must use the fixed call-ahead reply."
Assert-Contains $widget 'call ahead' "Hours reply must tell customers to call ahead."

# Booking always points to the phone.
Assert-Contains $widget 'appointments are recommended' "Booking should mention appointments are recommended."

# No-upsell brand.
Assert-Contains $widget 'no unnecessary work' "The widget should reflect the no-upsell, honest brand."

# The 4 suggested questions.
Assert-Contains $widget 'What services do you offer?' "Suggested question: services."
Assert-Contains $widget 'How much is an oil change?' "Suggested question: oil change price."
Assert-Contains $widget 'Where are you located?' "Suggested question: location."
Assert-Contains $widget 'How do I book?' "Suggested question: booking."

# Required footer.
Assert-Contains $widget 'Powered by Intelligent Automations' "The widget must include the powered-by footer."

# It must never promise firm/guaranteed prices or same-day service.
if ($widget -match 'guarantee.*price' -or $widget -match 'same-day service') {
  throw "The widget must never guarantee a price or promise same-day service."
}

Write-Host "Chatbot widget content checks passed."
