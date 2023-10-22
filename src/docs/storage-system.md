---
title: Storage System Plugin Documentation
layout: base.html
---

 This plugin provides a way to have an unlimited amount of storage containers
 in your game, giving the player the ability to save items into containers
 around your game's world.

 ## GETTING STARTED

  1. Create a storage container using the command: `Create Storage Container`

  2. Use the command: `Open Scene` to open the storage scene

  Alternatively you can use the plugin command :`OpenScene` to create a
  container and open the scene all in one go. The Open Scene command will
  create a container if the ID does not already exist, otherwise it will
  open the existing container.

 You can also create container presets in the plugin's parameters. These
 presets will be auto created on new game or you can disable auto creation
 in the plugin parameters and use the plugin command `Setup Presets` to do it
 manually.


 ## PLUGIN PARAMETERS

 `Container Presets` - Preset containers that can you can use for containers
 in your world. These preset containers will have items, weapons and armors
 that you decide they should have.

 `Item Presets` - A set of items which can be used with the Open Scene command
  to fill a container with.

  `Auto Create Presets` - If this is set to true, the plugin will automatically
  create all container presets you have created in the plugin parameters.

  `Quantity Window Amount` - The amount of an item required before the quantity
  window will be displayed. If an item has less than the default amount, the
  item will be added to the container without the quantity window.

 `Withdraw Term` - The term used for the help window when using the withdraw
 command

 `Deposit Term` - The term used for the help window when using the deposit
 command

 `Quantity Window Term` - The term used for the quantity window when choosing
 an amount


 ## PLUGIN COMMANDS

 `OpenScene` - This command will open the transfer scene for a specific storage
 container. If you use an ID and the container does not exist, then an empty
 container with the ID will be created to prevent the game from crashing.

 `SetupPresets` - This command will setup the container presets you created in
  the plugin parameters.

  `CreateStorageContainer` - This command will create a storage container with
  the items and id you set in it's arguments.

  `GainItem` - This command will add items to a storage container.


 ## SCRIPT CALLS

### Create a Container
```
 $storage.createContainer(id, maxItems)
```

`id` - The id of the container, used when calling the storage scene or other
script calls. Can be a string or a number
Default - # depending on how many containers exist.

`maxItems` - The max amount of items allowed in this container. Must be a number.
Default - 100

### Remove a Container
```
$storage.removeContainer(id)
```

`id `- The id of the container you want to remove, clearing all items contained
within.

### Check if Container Exists
```
 $storage.containerExists(id)
```
` id` - The id of the container you want to check for existence.

### Fetch a Container
```
 $storage.getContainer(id)
```
`id` - The id of the container you want to retrieve. See


## Container Script Calls

These are the script calls you can use after retrieving a container.

### Check the amount of items
This script call will check the amount of items in the container.

```
$storage.getContainer(id).amountOfItems()
```

### Check if you can add an item
Returns true if you can add a specific amount of any item

```
$storage.getContainer(id).canAddItem(amount)
```


### Change max amount
Changes the max amount of items allowed stored in this container.

```
$storage.getContainer(id).changeMaxAmount(amount)
```


### Check amount of a specific item
```
$storage.getContainer(id).numItems($dataItems[1])
```

### Add an item
Adds an item to a container
```
$storage.getContainer(id).gainItem($dataItems[1], 5)
```

### Remove an item
Removes an item from the container
```
$storage.getContainer(id).loseItem($dataItems[1], 5)
```

