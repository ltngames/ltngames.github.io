---
title: Stat And Skills Plugin Documentation
layout: documentation.html
metaDescription: Documentation for our Stat and Skills RPG Maker plugin
---

![banner](/static/img/docs/stat-and-skills/skill_and_stat_levels-banner.png)


## Getting Started

To get started, first set up the plugin's parameters by setting up custom stats and custom skills for use in your game.


##### Custom Stats

Custom stats are additional parameters like Atk, Def, M Def, etc which can be
leveled up via stat points and in their own custom level-up scene.

![custom-stat-image](/static/img/docs/stat-and-skills/custom_stat_parameter.png)


##### Custom Skills

Custom skills are just like regular skills, they use the skills database but they behave differently due to the way you level them up via the level up scene. A custom skill is not initialized until the party member has learned the skill, once learned the skill will initialize its base level based on the party member's current stats.

For example, if you create a skill named speech, and its initial level formula is based on the **charisma** and it is at level 10 when you learn the speech skill then its initial level will be based on that stat level.

- Skill speech initial level formula of `2 + Math.floor((2 * a.chr))`
- With a charisma level of 10 when initialy learned
- Initial level will be 2 + 20 = 22

![custom-skill-image](/static/img/docs/stat-and-skills/custom_skill_parameter.png)


## Formulas

**Custom Stat Formulas**

Custom stats can be used in formulas anywhere there is a formula box that allows the use of an actor's parameters. For example a damage formula for a skill.

Custom stats are accessed via the `a` variable within a formula followed by the short name/abbreviated name of the custom stat.

For example the Attack skill damage formula can be changed from the default `a.atk * 4 - b.def * 2` to `a.atk * (a.str / 2) - b.def * 2` which means the default attack will be based on the actor's custom strength stat.

**Custom Skill Formulas**

Custom skills are accessed by using the `a.cs` variable within a formula and then followed by the skill name in all lowercase and no spaces.

For example to use speech in a formula you would use "a.cs.speech" which will return the current level of the speech skill. For small guns, you would use `a.cs.smallguns` to get the level of the small guns skill.

There are a few extra variables when strictly entering formulas in the plugin's parameters. You can access skills and stats using the `skill` and `stat` variables and this is mainly for readability purposes only.

For example `skill.speech` or `stat.chr` can be used over `a.cs.speech` or `a.chr`, in the end, it's up to you and both ways are perfectly viable.


## Menu Navigation

Menu navigation is similar to all other menus with one small difference.

When adding or removing a skill point use the left and right arrows but when you need to switch to the skills window and back to the stats window hold shift and use the left and right arrows on the keyboard.

- `Right or Left Arrow` - Will level up the selected skill or stat
- `Shift + Right or Left Arrow` - Moves cursor to skill or stat window

![custom-stat-image](/static/img/docs/stat-and-skills/howto_window_move_keyboard.png)

##### Add Menu Command via VisuStella

To add a menu command to the main menu using VisuStella's Main Menu Core plugin you will have to add our command in the plugin's `Command Window List` parameter.

**Symbol**: `statlevels`

**Icon**: `N/A`

**STR:Text** `Stat Levels`

**JS:Text** `N/A`

**JS:Show** `return true;`

**JS:Enable:** `N/A` _(Feel free to use a game variable or default)_

**JS:Ext** `return null;`

**JS:RunCode** `N/A`

**JS: Personal Code** `SceneManager.push(StatLevels.Scene);`


## Notetags

Notetags can be used on all equipment types to gain or penalize a stat.

The stat formula is rather basic

```
<stat: operation amount>
```

Where `stat` is the shortname of the stat you want to change, the `operation`
is either `add` or `remove` and then `amount` is the amount of stat levels to
affect.

*Examples*

To add 5 to agility stat, the notetag would look something like this

```
<agi: add 5>
```

To remove from the agility stat, the notetag would look like this

```
<agi: remove 5>
```

## Script Calls

Script calls are useful for conditional statements in your events or when you're
developing a plugin of your own or simply need access to the JavaScript side of
things.

A few things to keep note of...

`actorId` = The id(number) of the actor you want to access.
`statName` = The short name of the stat you want to access
`skillName` = The name of the skill as seen in the Skill database
`amount` = the amount(number) of a specific level or skill point you want to be added
`entireParty` = Whether or not to perform the action on the entire party. (*If this is set to true the actorId will be ignored. Can only be `true` or `false`*)
`asSkillPoint` = Setting to false will add the amount of points directly to the total rather than it behaving as if you were in the leveling scene adding points to the skill directly.


### Add Skill or Stat Points to an Actor

```js
// Stat Point
$sl.addStatPoints(actorId, amount, entireParty);

// Skill Point
$sl.addSkillPoints(actorId, amount, entireParty);
```

### Remove Skill or Stat Points of an Actor

```js
// Stat Point
$sl.removeStatPoints(actorId, amount, entireParty);

// Skill Point
$sl.removeSkillPoints(actorId, amount, entireParty);
```

### Add Skill Level

You can use the following method to ensure the formulas are used. This method will be no different than if you were in the leveling scene and pressed level up for that skill. This will ignore available skill points.

```js
$sl.addSkillLevel((actorId, skillName, amount, entireParty);
```

### Remove Skill Level

You can use the following method to ensure the formulas are used. This method will be no different than if you were in the leveling scene and pressed level down for that skill.

```
$sl.removeSkillLevel((actorId, skillName, amount, entireParty);
```

### Add level to a custom stat

This will add a level to a custom stat while ignoring available stat points.

```js
$sl.addStatLevel(actorId, statName, amount, entireParty, asIs);
```

### Remove level of a custom stat

This will remove a level of a custom stat while ignoring available stat points

```js
$sl.removeStatLevel(actorId, statName, amount, entireParty, asIs);
```

### Re-evaluate skill and stat bonuses and penalties

When adding or removing a level on a stat be sure to re-evaluate the stat bonus for a skills initial level.
Essentially this will ensure your skills will properly adjust their levels according to stat points new level.

```js
$sl.evaluateSkillStatBonus(actorId, entireParty);
```

### Reset Skills

This will reset all skills to their initial level using the initial level formula.

```js
$sl.resetSkills(actorId, entireParty);
```

### Reset Stats

This will reset all stats to their initial level keeping equipment bonuses and
penalties intact.

```js
$sl.resetStats(actorId, entireParty);
```

### Access Stat and Skill Data

This will likely not be required for general game development, it would more likely be used for plugin development.

```js
$gameActors.actor(actorId).customStats["str"];
```

The above returns an object with the following information available to adjust

```js
name: "Strength";
shortName: "str";
description: "The strength description";
currentLevel: 1;
initialLevel: 1;
maxLevel: 10;
```

**For a skill you would for example do**

```js
$gameActors.actor(actorId).getCustomSkill("Small Guns");
```

The above returns an object with the following information

```js
name: "Small guns"
formulaName: "smallguns"
description: "The small guns description"
currentLevel: 1
initialLevel: 1
initialLevelFormula: 25 + (2 \* cs.chr)
maxLevel: 100
```

## Plugin Commands

For further details of each command's arguments, please view the plugin
commands in RPG Maker MZ.

### Open the level up scene

`OpenScene`

- Open the stat and skill levelling scene

### Add a stat point

`AddStatPoint`

- Adds a number of stat points to the stat point pool

### Add a skill point

`AddSkillPoint`

- Adds a number of skill points to the skill point pool

### Change the level of a skill

`SkillLevel`

- Add or removes levels to a skill for a specific actor

### Change the level of a stat

`StatLevel`

- Adds points to a stat for a specific actor

### Reset stats or skills to initial levels

`Reset`

- Reset stats or skills to their initial levels

## Terms Of Use

[https://ltngames.xyz/terms-of-use.html](https://ltngames.xyz/terms-of-use.html)

- Free to use in any of your projects, commercial or otherwise
- Credits/Attribution must go to **LTN Games**
- You **may** edit this plugin and you may ask others to edit this plugin for free
  or for payment so long as the original header and terms of use remain intact.
- You **may NOT** re-distribute this plugin alone for monetary gains
  without LTN Games direct written permission.
- You **may NOT** change any information, including the original parameters or
  terms of use.

## Support

For support please contact us at [support@ltngames.xyz](mailto:support@ltngames.xyz)

##### Alternatives methods for support (not always available)

- **Discord Server**: [LTN Games Server](https://discord.gg/3hxjESk)
- **Twitter** - [@ltngames](https://twitter.com/ltngames)
- **RPG Maker Web Forums** - [LTN Games](https://forums.rpgmakerweb.com/index.php?members/ltn-games.65048/)

## Bug Reports

You can report a bug directly to us in an efficient manner through our online form,
if your problem is a bug, please report it rather than contact us by email.

- [Report a Bug Form](https://ltngames.xyz/report-a-bug.html)
