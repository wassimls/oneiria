Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$src = $args[0]
$step = 4
$img = [System.Drawing.Bitmap]::new($src)
try {
  $isLight = { param($r,$g,$b) ($r -gt 226 -and $g -gt 226 -and $b -gt 218) -and (([Math]::Max($r,[Math]::Max($g,$b)) - [Math]::Min($r,[Math]::Min($g,$b))) -lt 26) }

  "-- COLUMN light profile (x: 0..$($img.Width)) --"
  $row = New-Object System.Text.StringBuilder
  for ($x = 0; $x -lt $img.Width; $x += 16) {
    $hit=0;$n=0
    for ($y = 60; $y -lt $img.Height-40; $y += $step) {
      $c=$img.GetPixel($x,$y); $n++
      if (& $isLight $c.R $c.G $c.B) { $hit++ }
    }
    $f = $hit/[Math]::Max(1,$n)
    [void]$row.Append(("{0}:{1:F2} " -f $x,$f))
    if ((($x+16)/16) % 12 -eq 0) { $row.ToString(); [void]$row.Clear() }
  }
  if ($row.Length -gt 0) { $row.ToString() }

  ""
  "-- ROW light profile (y: 0..$($img.Height)) --"
  $row.Clear() | Out-Null
  $row = New-Object System.Text.StringBuilder
  for ($y = 0; $y -lt $img.Height; $y += 16) {
    $hit=0;$n=0
    for ($x = 380; $x -lt 2440; $x += $step) {
      $c=$img.GetPixel($x,$y); $n++
      if (& $isLight $c.R $c.G $c.B) { $hit++ }
    }
    $f = $hit/[Math]::Max(1,$n)
    [void]$row.Append(("{0}:{1:F2} " -f $y,$f))
    if ((($y+16)/16) % 12 -eq 0) { $row.ToString(); [void]$row.Clear() }
  }
  if ($row.Length -gt 0) { $row.ToString() }
}
finally { $img.Dispose() }
