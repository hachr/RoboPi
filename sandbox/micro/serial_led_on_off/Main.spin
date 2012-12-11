CON
  _clkmode = xtal1 + pll16x
  _xinfreq = 5_000_000
  CLK_FREQ = ((_clkmode-xtal1)>>6)*_xinfreq
  MS_001 = CLK_FREQ / 1_000

OBJ
  pst : "Parallax Serial Terminal"

PUB Main | chr
  DIRA[23..16]~~ 'set the LED pins to be output P23 - P16
  pst.Start(115_200)

  REPEAT
    chr := pst.CharIn
    'pst.Char(chr)
    IF chr == $30
      OUTA[23..16] := %00000000
    ELSEIF chr == $31
      OUTA[23..16] := %00000001

