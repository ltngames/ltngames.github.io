---
title: Waypoints Plugin Documentation
layout: documentation.html
---

 This Waypoints plugin gives you the ability to create waypoints for your game, giving the player the ability to "fast travel" to locations in your game. Much in the style of Diablo 2. You will be able to lock and unlock waypoints as well as choose your own animations and common event when you teleport through a waypoint.

 ## Getting Started
Before using this plugin, you need to configure its parameters, including defining a common event and categories for your waypoints.

 ### Common Event
 The common event comes into play when you perform a waypoint transfer and can be used to set up animations and various effects before or during the transfer.

__Parameters For fine tuning waypoint transfer common event:__

 ![Parameters For Common Event Tuning](/assets/img/docs/waypoints/common_event_parameters.png)

 ### Waypoint Setup
When setting up waypoints in your game, you have a couple of options to choose from, depending on your preferences and the version of the plugin you're using. Waypoints provide players with the ability to "fast travel" to different locations within your game, similar to how it's done in games like Diablo 2. Here, we'll explore two methods for creating and managing your waypoints.

 ##### 1. Via Plugin Parameters (Recommended)
This is the latest and most user-friendly approach for creating waypoints, particularly in the newer version (v1.1) of the plugin. It streamlines the process and is ideal for getting started quickly. With the introduction of the "Waypoint Templates" parameter, you can easily set up and manage your waypoints without the need for lengthy plugin commands.

![Waypoint Template](/assets/img/docs/waypoints/template.png)

 After configuring your Waypoint template, the next step is to actually add Waypoints to your game based on this template.

 __Command:__ `Waypoint Add TemplateID`

__Example:__
 ```
 Waypoint Add wp-cabin
 Waypoint Add wp-forest
 ```

---

##### 2. Via Plugin Command
Another approach for introducing new waypoints into your game is by using plugin commands. While this method may be considered slightly more involved, it offers a degree of flexibility and is particularly beneficial for those who frequently work within the event editor.

  __Command:__ `Waypoint Add Name Category MapId X Y LockedState`

__Example:__
 ```
 Waypoint Add Start-Map Act-I 1 5 6 false
 Waypoint Add Second-Map Act-I 1 5 6 false
 ```

__Common Event Example:__

  ![Starting Waypoint Common Event](/assets/img/docs/waypoints/starting_waypoint_common_event.png)


 ### Setup Background Image
 To setup the background image to be used with the Waypoint scene you must first save the image you want to use in the `img/system` directory

 Once the image has been saved, be sure to select the file in the plugin's parameters under `Scene Background`

 ## Parameters

![All Parameters](/assets/img/docs/waypoints/parameters.png)

### General Options

`Waypoint Templates` - This is where you can setup and create all of your game's waypoints.
See [Waypoint Templates](#waypoint-templates)

`Waypoint Categories` - All the categories for your waypoints. You can use chapters acts, or categorize your waypoints by area, its up to you.

### Transfer Options

`Transfer Common Event` - The common event to activate upon a waypoint transfer.

`Transfer Delay` - The time delay to wait before transferring. Make this delay larger if your common event is big.

`Transfer Fade` - The type of fade the screen will use upon transferring.

### Scene Options

`Hide Categories` - Enable to hide a category if it contains no waypoints.

`Hide Waypoints` - Enable to grey out a waypoint if its locked

`Lockstate Icons` - The icons for the current lockstate of the waypoints.

`Enable Placeholder` - This is a solid color rectangle which is drawn behind a waypoint picture thumbnail. When no thumbnail picture is available for the waypoint then the placeholder will be drawn. The placeholder also acts as a border around the thumbnail picture when there is one available.

`Picture Placeholder Color` - The color of the placeholder rectangle. Hex Color Code eg: #fffff

![Placeholder](/assets/img/docs/waypoints/placeholder.png)

`Scene Background` - The background image for the waypoints scene. Leave name empty if you don't want to use a background.


#### Window Options

`Window Category Options` - Change these settings to adjust the scene to how
you'd like it to appear.

_The category window is the top window showing each category/command. Moving and changing the width of this window will also change the width and position of the waypoint window below it._

`Waypoint List Options` - Change these settings to adjust the waypoints list window to how you'd like it to appear.

### Waypoint Templates
A waypoint template has a number of properties that allow you to setup your waypoint inside the plugin's parameters.

`Template ID` - This is what you will use to control your waypoint via plugin command. It can be a string or a number, its up to you.

`Picture` - Add a thumbnail picture to your waypoint which will be shown in the waypoint menu.

`Name` - The name of the waypoint.

`Category` - The category to put this waypoint in.

`Description` - Add a description of the location the waypoint transfers you to

`MapId` - The id of the map this waypoint will transfer the player to.

`X` & `Y` - The x and y position on the map for the player to transfer to.

`LockState` - The lock state of the waypoint, true for it to be locked and
false for it to be unlocked.


## Plugin Commands

Main Keyword: `Waypoint`

**NOTE:** _When you need to use names with more than one word, you can use a - (dash) as a space._

__Example:__
```
Waypoint Add Fishing-Village-Inn Act-II 4 5 8 false
```
In the above example Fishing-Village-Inn will appear in the menu as Fishing Village Inn without the dash

-----------------------------------------------------
### Add A Waypoint

 __Command:__
```
Waypoint Add Name Category MapId X Y LockedState
Waypoint Add TemplateID
```

__Command Information:__

`Add` - Keyword to let the plugin know you want to add a waypoint.

`TemplateID` - The ID of the waypoint you would like to add. Adding via template ID allows you to ignore the rest of the options in this plugin command.

`Name` - The name of the waypoint.

`Category` - The category to put this waypoint in.  Take note that when referencing the category it will always be lower case and with no spaces.

`MapId` - The id of the map this waypoint will transfer the player to.

`X` & `Y` - The x and y position on the map for the player to transfer to.

`LockState` - The lock state of the waypoint, true for it to be locked and false for it to be unlocked.

-----------------------------------------------------
### Lock A Waypoint

__Command:__
```
Waypoint Lock Name Category
Waypoint Lock TemplateID
```

__Command Information:__

`Lock` - The keyword to let the plugin know you want to lock a waypoint

`TemplateID` - The ID of the waypoint you would like to lock. Locking via template ID allows you to ignore the rest of the options in this plugin command.

`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

-----------------------------------------------------
### Unlock A Waypoint

__Command:__
```
Waypoint Unlock Name Category
Waypoint Unlock TemplateID
```

__Command Information:__
`Unlock` - The keyword to let the plugin know you want to unlock a waypoint

`TemplateID` - The ID of the waypoint you would like to unlock. Unlocking via template ID allows you to ignore the rest of the options in this plugin command.

`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

-------------------------------------------------------
### Open Waypoint Scene

__Command:__
```
Waypoint OpenScene
```

__Command Information:__
`OpenScene` - Keyword to let plugin know to open the waypoints scene.

_The waypoint scene is where the player will select a category and waypoint to travel to. As soon as a waypoint is selected it will run the common event and transfer the player_.


## Script Calls

The script calls are identical to the plugin commands except for the extra syntax you are required to use. Some script calls are useful for more advanced eventing.

---------------------------------------------------
 ### Get Waypoint Information

 _Return the waypoint Javascript object_

__Script:__
```
LTN_Waypoints.getInfo(type, name, category)
```

__Script Information:__
_Retrieve specific type of information from a waypoint. It will give you the value of the type you choose. Can return a string or a number._

`Type`- Name, Category, MapId, X, Y, LockState.

`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

-----------------------------------------------------
### Lock A Waypoint

__Script:__
```
LTN_Waypoints.lock(name, category)
```

__Script Information:__
`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

----------------------------------------------------
### Unlock A Waypoint

__Script:__
```
LTN_Waypoints.unlock(name, category)
```

__Script Information:__
`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

----------------------------------------------------
### Check If Waypoint Is Locked

_Return true if waypoint is locked_

__Script:__
```
LTN_Waypoints.isLocked(name, category)
```

__Script Information:__
`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.

----------------------------------------------------
### Check If Waypoint Exists

_Return true if waypoint exists_

__Script:__
```
LTN_Waypoints.exists(name, category)
```

__Script Information:__
`Name` - The name of the waypoint (must already be added)

`Category` - The category this waypoint is associated with.


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
