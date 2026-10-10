Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\10-Oneiria-Aperture-Brand-Identity-Board.png"
$dest = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\mark-ref.jpg"

$img = [System.Drawing.Bitmap]::new($src)
try {
  $canvas = New-Object System.Drawing.Bitmap(1800, 640, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.Clear([System.Drawing.Color]::FromArgb(255,255,255,255))

  function Draw-Region($g, $img, $x0, $y0, $x1, $y1, $dx, $dy, $dw, $dh) {
    $src = New-Object System.Drawing.Rectangle(
      [int]($x0 * $img.Width), [int]($y0 * $img.Height),
      [int](($x1 - $x0) * $img.Width), [int](($y1 - $y0) * $img.Height))
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle($dx, $dy, $dw, $dh)), $src, [System.Drawing.GraphicsUnit]::Pixel)
  }

  # A: large primary symbol (coloured)
  Draw-Region $g $img 0.265 0.210 0.412 0.460  20  20 600 600
  # B: monochrome flat mark
  Draw-Region $g $img 0.432 0.690 0.500 0.812  660 20 460 600
  # C: black & white flat mark
  Draw-Region $g $img 0.630 0.690 0.698 0.812 1160 20 460 600

  $font = New-Object System.Drawing.Font("Consolas", 18, [System.Drawing.FontStyle]::Bold)
  $g.DrawString("A primary (colour)", $font, [System.Drawing.Brushes]::Black, 24, 626)
  $g.DrawString("B monochrome", $font, [System.Drawing.Brushes]::Black, 664, 626)
  $g.DrawString("C black&white", $font, [System.Drawing.Brushes]::Black, 1164, 626)
  $g.Dispose()

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]92)
  $canvas.Save($dest, $codec, $ep)
  $canvas.Dispose()
  "WROTE $dest"
}
finally { $img.Dispose() }
