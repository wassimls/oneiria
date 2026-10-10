Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = if ($args.Count -gt 0) { $args[0] } else { "C:\Users\wassi\AppData\Local\Temp\opencode\ref-mark.png" }
$thr = 150

$img = [System.Drawing.Bitmap]::new($src)
try {
  $W = $img.Width; $H = $img.Height

  # 1. build binary mask
  $mask = New-Object 'bool[,]' $W, $H
  $sumX = 0L; $sumY = 0L; $n = 0L
  $minX = $W; $maxX = 0; $minY = $H; $maxY = 0
  for ($y = 0; $y -lt $H; $y++) {
    for ($x = 0; $x -lt $W; $x++) {
      $c = $img.GetPixel($x, $y)
      $lum = 0.2126*$c.R + 0.7152*$c.G + 0.0722*$c.B
      if ($lum -lt $thr) {
        $mask[$x,$y] = $true
        $sumX += $x; $sumY += $y; $n++
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }
  }
  if ($n -eq 0) { throw "no mark pixels found" }

  $cx = $sumX / $n; $cy = $sumY / $n
  # radius = average of bbox half-extents (mark is roughly circular)
  $rMax = ((($maxX-$minX) + ($maxY-$minY)) / 4.0)
  $rMin = $rMax * 0.34   # approx hole radius for scaling the map

  "image      : {0}x{1}" -f $W,$H
  "centroid   : {0:N1},{1:N1}" -f $cx,$cy
  "bbox       : {0}..{1} x {2}..{3}" -f $minX,$maxX,$minY,$maxY
  "rOuter(est): {0:N1}   rInner(0.34): {1:N1}" -f $rMax, $rMin
  "pixels     : {0}" -f $n
  ""

  # 2. polar map: rows = radius (outer -> inner), cols = angle 0..360 in 5deg buckets
  $angleBuckets = 72
  $radSteps = 14
  ""
  "POLAR MAP (row 0 = rim, last row = near centre; col 0 = 0deg=right(+x), increasing clockwise on screen)"
  for ($si = 0; $si -lt $radSteps; $si++) {
    $t = $si / ($radSteps - 1.0)
    $r = $rMax - ($rMax - $rMin * 0.6) * $t
    $line = New-Object System.Text.StringBuilder
    [void]$line.Append(("{0,5:N0} |" -f $r))
    for ($bi = 0; $bi -lt $angleBuckets; $bi++) {
      $deg = ($bi + 0.5) * (360.0 / $angleBuckets)
      $a = $deg * [Math]::PI / 180.0
      $px = [int][Math]::Round($cx + $r * [Math]::Cos($a))
      $py = [int][Math]::Round($cy + $r * [Math]::Sin($a))
      $inside = $false
      if ($px -ge 0 -and $px -lt $W -and $py -ge 0 -and $py -lt $H) { $inside = $mask[$px,$py] }
      if ($inside) { [void]$line.Append('#') } else { [void]$line.Append('.') }
    }
    $line.ToString()
  }
}
finally { $img.Dispose() }
