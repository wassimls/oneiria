Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'

$src = if ($args.Count -gt 0) { $args[0] } else { "C:\Users\wassi\AppData\Local\Temp\opencode\ref-mark.png" }
$N  = if ($args.Count -gt 1) { [int]$args[1] } else { 66 }
$thr = if ($args.Count -gt 2) { [double]$args[2] } else { 150 }
$cx0 = if ($args.Count -gt 3) { [int]$args[3] } else { -1 }
$cy0 = if ($args.Count -gt 4) { [int]$args[4] } else { -1 }
$cw  = if ($args.Count -gt 5) { [int]$args[5] } else { -1 }
$ch  = if ($args.Count -gt 6) { [int]$args[6] } else { -1 }

$img = [System.Drawing.Bitmap]::new($src)
try {
  if ($cw -gt 0) {
    $crop = New-Object System.Drawing.Bitmap($cw, $ch, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($crop)
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0,0,$cw,$ch)), (New-Object System.Drawing.Rectangle($cx0,$cy0,$cw,$ch)), [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $img.Dispose()
    $img = $crop
  }
  $W = $img.Width; $H = $img.Height
  $mask = New-Object 'bool[,]' $W, $H
  $minX=$W;$maxX=0;$minY=$H;$maxY=0
  for ($y=0;$y -lt $H;$y++) {
    for ($x=0;$x -lt $W;$x++) {
      $c=$img.GetPixel($x,$y)
      if ((0.2126*$c.R + 0.7152*$c.G + 0.0722*$c.B) -lt $thr) {
        $mask[$x,$y]=$true
        if($x -lt $minX){$minX=$x}; if($x -gt $maxX){$maxX=$x}
        if($y -lt $minY){$minY=$y}; if($y -gt $maxY){$maxY=$y}
      }
    }
  }
  $x0=$minX; $y0=$minY; $bw=$maxX-$minX+1; $bh=$maxY-$minY+1
  "bbox {0}..{1} x {2}..{3}   ({4}x{5})" -f $minX,$maxX,$minY,$maxY,$bw,$bh
  ""
  "ASCII RASTER (one char = {0}x{1} px, '#' = mark)" -f [Math]::Ceiling($bw/$N), [Math]::Ceiling($bh/$N)
  $sx = [Math]::Ceiling($bw/$N); $sy = [Math]::Ceiling($bh/$N)
  for ($gy=0; $gy -lt $N; $gy++) {
    $line = New-Object System.Text.StringBuilder
    for ($gx=0; $gx -lt $N; $gx++) {
      $hit=0; $cnt=0
      $pxs=[Math]::Min($W-1,$x0+$gx*$sx); $pxe=[Math]::Min($W,$pxs+$sx)
      $pys=[Math]::Min($H-1,$y0+$gy*$sy); $pye=[Math]::Min($H,$pys+$sy)
      for($py=$pys;$py -lt $pye;$py++){for($px=$pxs;$px -lt $pxe;$px++){$cnt++; if($mask[$px,$py]){$hit++}}}
      if($cnt -gt 0 -and ($hit/$cnt) -ge 0.45){[void]$line.Append('#')}else{[void]$line.Append('.')}
    }
    $line.ToString()
  }
}
finally { $img.Dispose() }
