Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\10-Oneiria-Aperture-Brand-Identity-Board.png"
$dest = "C:\Users\wassi\AppData\Local\Temp\opencode\ref-mark.png"

$img = [System.Drawing.Bitmap]::new($src)
try {
  # tight crop around the large primary symbol
  $sx = 438
  $sy = 203
  $sw = 224
  $sh = 224

  $out = New-Object System.Drawing.Bitmap(480, 480, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.Clear([System.Drawing.Color]::FromArgb(255,246,245,242))
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,480,480)), (New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)), [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $out.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
  "WROTE $dest  ($sw x $sh source)"
}
finally { $img.Dispose() }
