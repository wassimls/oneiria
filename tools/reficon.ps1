Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$src = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\10-Oneiria-Aperture-Brand-Identity-Board.png"
$dest = "C:\Users\wassi\AppData\Local\Temp\opencode\ref-icon.png"
$img = [System.Drawing.Bitmap]::new($src)
try {
  $sx=486; $sy=664; $sw=72; $sh=74
  $out = New-Object System.Drawing.Bitmap(480,480,[System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g=[System.Drawing.Graphics]::FromImage($out)
  $g.InterpolationMode=[System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode=[System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.Clear([System.Drawing.Color]::FromArgb(255,255,255,255))
  $g.DrawImage($img,(New-Object System.Drawing.Rectangle(0,0,480,480)),(New-Object System.Drawing.Rectangle($sx,$sy,$sw,$sh)),[System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()
  $out.Save($dest,[System.Drawing.Imaging.ImageFormat]::Png)
  $out.Dispose()
  "WROTE $dest"
} finally { $img.Dispose() }
