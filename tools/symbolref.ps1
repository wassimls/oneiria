Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$brand = "C:\Users\wassi\AppData\Local\Temp\opencode\brand"
$tiles = Join-Path $brand "tiles"
$dest  = Join-Path $brand "symbol-ref.jpg"

function Load-Jpg($p) { [System.Drawing.Bitmap]::new($p) }

$t5 = Load-Jpg (Join-Path $tiles "tile05.jpg")   # sketchbook + glowing aperture
$t3 = Load-Jpg (Join-Path $tiles "tile03.jpg")   # pattern of marks
$t8 = Load-Jpg (Join-Path $tiles "tile08.jpg")   # phone app icon

try {
  $canvas = New-Object System.Drawing.Bitmap(1400, 520, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.Clear([System.Drawing.Color]::FromArgb(255,245,244,240))

  # (a) glowing aperture: right half of tile05
  $w = $t5.Width; $h = $t5.Height
  $src = New-Object System.Drawing.Rectangle([int]($w*0.46), 0, [int]($w*0.54), $h)
  $g.DrawImage($t5, (New-Object System.Drawing.Rectangle(10,10,500,480)), $src, [System.Drawing.GraphicsUnit]::Pixel)

  # (b) one mark from the pattern: top-left mark of tile03
  $w = $t3.Width; $h = $t3.Height
  $src = New-Object System.Drawing.Rectangle(0, 0, [int]($w*0.27), [int]($h*0.36))
  $g.DrawImage($t3, (New-Object System.Drawing.Rectangle(520,10,480,480)), $src, [System.Drawing.GraphicsUnit]::Pixel)

  # (c) phone app icon from tile08 (centre)
  $w = $t8.Width; $h = $t8.Height
  $src = New-Object System.Drawing.Rectangle([int]($w*0.30), [int]($h*0.10), [int]($w*0.45), [int]($h*0.72))
  $g.DrawImage($t8, (New-Object System.Drawing.Rectangle(1010,10,380,480)), $src, [System.Drawing.GraphicsUnit]::Pixel)

  $font = New-Object System.Drawing.Font("Consolas", 16, [System.Drawing.FontStyle]::Bold)
  $g.DrawString("A: glow (tile05)", $font, [System.Drawing.Brushes]::Black, 14, 494)
  $g.DrawString("B: flat mark (tile03)", $font, [System.Drawing.Brushes]::Black, 524, 494)
  $g.DrawString("C: app icon (tile08)", $font, [System.Drawing.Brushes]::Black, 1014, 494)
  $g.Dispose()

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]88)
  $canvas.Save($dest, $codec, $ep)
  $canvas.Dispose()
  "WROTE $dest"
}
finally { $t5.Dispose(); $t3.Dispose(); $t8.Dispose() }
