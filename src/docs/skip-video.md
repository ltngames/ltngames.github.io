---
title: Skip Video Plugin Documentation
layout: documentation.html
metaDescription: Documentation for our Skip Video RPG Maker plugin
---

This plugin grants the player the ability to skip a video played within RPG Maker.
Without this plugin, when a video is played in RPG Maker, the player is compelled to
watch the entire video with no option to pause or skip it. With this plugin, you have
the freedom to either skip the video or pause it at your discretion.

## Getting Started

There are no specific plugin commands for this plugin. However, a global variable is
available for use to determine if the video has been skipped.

```
 LTN_SkipVideo.isVideoSkipped
```

This global variable will return "true" if a video has been skipped or `false` if it
has not been skipped. If a video has been skipped, be sure to reset the variable bac
 to `false` using a script call.

 ```
 LTN_SkipVideo.isVideoSkipped = false
 ```

 ## Parameters

 Keycodes are easy to find out [https://keycode.info](https://keycode.info/)

 Here are some to get you started

### Keycodes

#### Numbers
**(Does not include Numpad numbers)**

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

#### Letters

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

#### Misc Keys

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

## Terms Of Use

For detailed information regarding the terms of use, please refer to our [Terms Of Use](https://ltngames.xyz/terms-of-use.html).

**You are permitted to:**
- Utilize them in both hobby and commercial game development projects without limitations.
- Modify, adapt, and create derivative works for use in your own hobby or commercial game development projects.

**You are not permitted to:**
- Trade or sell any code contained within the plugin files.
- Duplicate the plugin(s) for distribution, sale, or trade to unauthorized consumers.
- Adapt or copy code for use in your own distributed plugin(s).

## Support

If you require support, please do not hesitate to reach out to us via email at [support@ltngames.xyz](mailto:support@ltngames.xyz).

##### Alternative Methods for Support (Not Always Available)

We provide various methods for seeking support and assistance. However, please note that not all methods may be available at all times:

- **Discord Server**: Join our [Discord Server](https://discord.gg/3hxjESk).
- **Twitter**: You can also reach out to us on Twitter via [@ltngames](https://twitter.com/ltngames).
- **RPG Maker Web Forums**: Visit our dedicated [RPG Maker Web Forums](https://forums.rpgmakerweb.com/members/ltngames.86027/) for community discussions and support.

## Bug Reports

Efficiently report any bugs or issues you encounter through our online bug reporting form. We kindly request that, if your problem pertains to a bug, you use this method for reporting rather than contacting us via email.

[Report A Bug](https://ltngames.xyz/report-a-bug.html)
