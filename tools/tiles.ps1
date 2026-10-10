Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\07-Instagram-grid-art-direction-2K-20261002155533.jpg"
$outDir = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\tiles"
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force -Path $outDir | Out-Null }

# measured from pixel profile
$cols = @(@(362,1022), @(1052,1704), @(1740,2442))
$rows = @(@(152,572), @(578,1004), @(1034,1420))

$img = [System.Drawing.Bitmap]::new($src)
$tiles = @()
try {
  $i = 0
  foreach ($r in 0..2) {
    foreach ($c in 0..2) {
      $i++
      $x = $cols[$c][0]; $w = $cols[$c][1] - $cols[$c][0]
      $y = $rows[$r][0]; $h = $rows[$r][1] - $rows[$r][0]
      $bmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
      $g = [System.Drawing.Graphics]::FromImage($bmp)
      $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$w,$h)), (New-Object System.Drawing.Rectangle($x,$y,$w,$h)), [System.Drawing.GraphicsUnit]::Pixel)
      $g.Dispose()
      $p = Join-Path $outDir ("tile{0:d2}.jpg" -f $i)
      $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
      $ep = New-Object System.Drawing.Imaging.EncoderParameters(1)
      $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]90)
      $bmp.Save($p, $codec, $ep)
      $tiles += $bmp
    }
  }

  # contact sheet 3x3 with numeric labels
  $tw = 520; $th = [int]($tw * ($rows[0][1]-$rows[0][0]) / ($cols[0][1]-$cols[0][0]))
  $pad = 8
  $sheet = New-Object System.Drawing.Bitmap(($tw*3 + $pad*4), ($th*3 + $pad*4), [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
  $g = [System.Drawing.Graphics]::FromImage($sheet)
  $g.Clear([System.Drawing.Color]::FromArgb(255,20,20,20))
  $font = New-Object System.Drawing.Font("Consolas", 30, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Point)
  $brush = [System.Drawing.Brushes]::Yellow
  for ($k = 0; $k -lt 9; $k++) {
    $cx = $pad + ($k % 3) * ($tw + $pad)
    $cy = $pad + [int]($k / 3) * ($th + $pad)
    $g.DrawImage($tiles[$k], (New-Object System.Drawing.Rectangle($cx,$cy,$tw,$th)), (New-Object System.Drawing.Rectangle(0,0,$tiles[$k].Width,$tiles[$k].Height)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.DrawString("T$($k+1)", $font, $brush, ($cx + 6), ($cy + 4))
  }
  $g.Dispose()
  $dest = "C:\Users\wassi\AppData\Local\Temp\opencode\brand\contact-ig.jpg"
  $codec2 = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
  $ep2 = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $ep2.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)
  $sheet.Save($dest, $codec2, $ep2)
  $sheet.Dispose()
  foreach ($t in $tiles) { $t.Dispose() }
  "WROTE $dest"
}
finally { $img.Dispose() }
