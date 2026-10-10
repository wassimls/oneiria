param(
  [string]$Source,
  [string]$Out,
  [double]$X0 = 0,
  [double]$Y0 = 0,
  [double]$X1 = 1,
  [double]$Y1 = 1,
  [int]$Width = 1600,
  [int]$Quality = 84
)

Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = 'Stop'

$img = [System.Drawing.Image]::FromFile($Source)
try {
  $rx0 = [int][Math]::Round($X0 * $img.Width)
  $ry0 = [int][Math]::Round($Y0 * $img.Height)
  $rw  = [int][Math]::Round(($X1 - $X0) * $img.Width)
  $rh  = [int][Math]::Round(($Y1 - $Y0) * $img.Height)

  if ($rw -le 0 -or $rh -le 0) { throw "Invalid crop rect" }

  $ratio = $rw / $rh
  $th = [int][Math]::Round($Width / $ratio)

  # High-quality resample into an intermediate bitmap, cropped in one step.
  $bmp = New-Object System.Drawing.Bitmap($Width, $th, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $Width, $th)),
                     (New-Object System.Drawing.Rectangle($rx0, $ry0, $rw, $rh)),
                     [System.Drawing.GraphicsUnit]::Pixel)
  $g.Dispose()

  $dir = Split-Path -Parent $Out
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
  $bmp.Save($Out, $codec, $ep)
  $bmp.Dispose()

  Write-Output ("OK  {0}  ({1}x{2})  <- {3} [{4}x{5}]" -f (Split-Path -Leaf $Out), $Width, $th, (Split-Path -Leaf $Source), $img.Width, $img.Height)
}
finally {
  $img.Dispose()
}
