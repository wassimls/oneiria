Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$brand = "C:\Users\wassi\AppData\Local\Temp\opencode\brand"
$tiles = Join-Path $brand "tiles"
$out   = "C:\Users\wassi\Desktop\oneiria\public\images"
if (-not (Test-Path $out)) { New-Item -ItemType Directory -Force -Path $out | Out-Null }

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

function Resize-Jpg([string]$src, [string]$dst, [int]$width, [int]$quality) {
  $img = [System.Drawing.Image]::FromFile($src)
  try {
    $ratio = $img.Width / [double]$img.Height
    $h = [int][Math]::Round($width / $ratio)
    $bmp = New-Object System.Drawing.Bitmap($width, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$width,$h)), (New-Object System.Drawing.Rectangle(0,0,$img.Width,$img.Height)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$quality)
    $bmp.Save($dst, $codec, $ep)
    $bmp.Dispose()
    "{0,-28} {1}x{2}  {3} KB" -f (Split-Path -Leaf $dst), $width, $h, [int]((Get-Item $dst).Length / 1024)
  }
  finally { $img.Dispose() }
}

# --- cinematic photographs (downscaled, high quality) ---
Resize-Jpg (Join-Path $brand "14-Professional-camera-on-film-set-2K-20261002154606.jpg") (Join-Path $out "hero-filmset.jpg") 1920 82
Resize-Jpg (Join-Path $brand "16-Team-collaborating-in-creative-s-2K-20261002154630.jpg") (Join-Path $out "studio-team.jpg") 1400 84

# --- concept / capability tiles (native resolution, re-encoded) ---
$map = @{
  'tile01' = 'work-production'
  'tile04' = 'work-studio'
  'tile05' = 'work-identity'
  'tile06' = 'work-broadcast'
  'tile07' = 'work-campaign'
  'tile08' = 'work-social'
  'tile03' = 'work-motion'
}
foreach ($k in $map.Keys | Sort-Object) {
  Resize-Jpg (Join-Path $tiles "$k.jpg") (Join-Path $out ("{0}.jpg" -f $map[$k])) 660 86
}
