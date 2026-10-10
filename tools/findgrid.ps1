Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = $args[0]
$bx  = if ($args.Count -gt 1) { [int]$args[1] } else { 0 }   # region to analyse
$by  = if ($args.Count -gt 2) { [int]$args[2] } else { 0 }
$bw  = if ($args.Count -gt 3) { [int]$args[3] } else { 0 }
$bh  = if ($args.Count -gt 4) { [int]$args[4] } else { 0 }

$img = [System.Drawing.Bitmap]::new($src)
try {
  if ($bw -le 0) { $bx = 0; $by = 0; $bw = $img.Width; $bh = $img.Height }

  $step = 4
  $isLight = {
    param($r, $g, $b)
    ($r -gt 232 -and $g -gt 232 -and $b -gt 226) -and (([Math]::Max($r, [Math]::Max($g, $b)) - [Math]::Min($r, [Math]::Min($g, $b))) -lt 22)
  }

  # Column light-profile
  $colFrac = @()
  for ($x = $bx; $x -lt $bx + $bw; $x += $step) {
    $hit = 0; $n = 0
    for ($y = $by; $y -lt $by + $bh; $y += $step) {
      $c = $img.GetPixel($x, $y); $n++
      if (& $isLight $c.R $c.G $c.B) { $hit++ }
    }
    $colFrac += [Math]::Round($hit / [Math]::Max(1, $n), 3)
  }

  # Row light-profile
  $rowFrac = @()
  for ($y = $by; $y -lt $by + $bh; $y += $step) {
    $hit = 0; $n = 0
    for ($x = $bx; $x -lt $bx + $bw; $x += $step) {
      $c = $img.GetPixel($x, $y); $n++
      if (& $isLight $c.R $c.G $c.B) { $hit++ }
    }
    $rowFrac += [Math]::Round($hit / [Math]::Max(1, $n), 3)
  }

  function Find-Bands([double[]]$f, [double]$thr, [int]$start, [int]$step) {
    $bands = @(); $cur = $null
    for ($i = 0; $i -lt $f.Count; $i++) {
      $pos = $start + ($i * $step)
      if ($f[$i] -ge $thr) { if ($null -eq $cur) { $cur = @{ s = $pos; e = $pos } } else { $cur.e = $pos } }
      else { if ($null -ne $cur) { $bands += $cur; $cur = $null } }
    }
    if ($null -ne $cur) { $bands += $cur }
    return $bands
  }

  "IMAGE: {0}x{1}" -f $img.Width, $img.Height
  ""
  "== VERTICAL gap bands (x) : light>0.90 = empty column = between tiles =="
  Find-Bands $colFrac 0.90 $bx $step | Where-Object { ($_.e - $_.s) -ge 8 } | ForEach-Object { "  x {0} .. {1}   (w={2})" -f $_.s, $_.e, ($_.e - $_.s) }
  ""
  "== HORIZONTAL gap bands (y) =="
  Find-Bands $rowFrac 0.90 $by $step | Where-Object { ($_.e - $_.s) -ge 8 } | ForEach-Object { "  y {0} .. {1}   (h={2})" -f $_.s, $_.e, ($_.e - $_.s) }
}
finally { $img.Dispose() }
