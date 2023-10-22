---
title: Skip Video Plugin Documentation
layout: base.html
---

 This plugin gives the player the ability to skip a video played by RPG Maker.
 Without this plugin, playing a video in RPG Maker requires the player to watch
 the entire video, with no option of pausing or skipping the video. With this
 plugin you will have the choice to skip the video or pause it on demand.

 There are no plugin commands for this plugin. However there is a global
 variable which can be used to determine if the video has been skipped.

```
 LTN_SkipVideo.isVideoSkipped
```

 This global variable will return true if a video has been skipped or
 false if it has not been skipped. If a video has been skipped ensure to set
 the variable back to false using a script call.

 ```
 LTN_SkipVideo.isVideoSkipped = false
 ```

 ## PARAMETER INFO

 Keycodes are easy to find out [https://keycode.info](https://keycode.info/)

 Here are some to get you started

### Numbers (Not Numpad)

```
  48: '0'
  49: '1'
  50: '2'
  51: '3'
  52: '4'
  53: '5'
  54: '6'
  55: '7'
  56: '8'
  57: '9'
```

### Letters

```
  65: 'a'
  66: 'b'
  67: 'c'
  68: 'd'
  69: 'e'
  70: 'f'
  71: 'g'
  72: 'h'
  73: 'i'
  74: 'j'
  75: 'k'
  76: 'l'
  77: 'm'
  78: 'n'
  79: 'o'
  80: 'p'
  81: 'q'
  82: 'r'
  83: 's'
  84: 't'
  85: 'u'
  86: 'v'
  87: 'w'
  88: 'x'
  89: 'y'
  90: 'z'
```

### Misc Keys

```
  3: 'break'
  8: 'backspace / delete'
  9: 'tab'
  12: 'clear'
  13: 'enter'
  16: 'shift'
  17: 'ctrl'
  18: 'alt'
  19: 'pause/break'
  20: 'caps lock'
  21: 'hangul'
  25: 'hanja'
  27: 'escape'
  28: 'conversion'
  29: 'non-conversion'
  32: 'spacebar'
  33: 'page up'
  34: 'page down'
  35: 'end'
  36: 'home'
  37: 'left arrow'
  38: 'up arrow'
  39: 'right arrow'
  40: 'down arrow'
  41: 'select'
  42: 'print'
  43: 'execute'
  44: 'Print Screen'
  45: 'insert'
  46: 'delete'
  47: 'help'
```