---
title: Storage System Plugin Documentation
layout: /layouts/documentation.html
metaDescription: Documentation for our Storage System RPG Maker plugin
---

 This plugin provides a way to have an unlimited amount of storage containers
 in your game, giving the player the ability to save items into containers
 around your game's world.

This plugin provides a way to have an unlimited amount of storage containers in your game, giving the player the ability to save items into containers around your game's world.

## Getting Started

1. Create a storage container using the command: `Create Storage Container`
2. Use the command: `Open Scene` to open the storage scene

Alternatively, you can use the plugin command: `OpenScene` to create a container and open the scene all in one go. The `Open Scene` command will create a container if the ID does not already exist, otherwise, it will open the existing container.

You can also create container presets in the plugin's parameters. These presets will be auto-created on a new game, or you can disable auto-creation in the plugin parameters and use the plugin command: `Setup Presets` to do it manually.

## Plugin Parameters

- `Container Presets`: Preset containers that you can use for containers in your world. These preset containers will have items, weapons, and armors that you decide they should have.
- `Item Presets`: A set of items which can be used with the `Open Scene` command to fill a container with.
- `Auto Create Presets`: If this is set to true, the plugin will automatically create all container presets you have created in the plugin parameters.
- `Quantity Window Amount`: The amount of an item required before the quantity window will be displayed. If an item has less than the default amount, the item will be added to the container without the quantity window.
- `Withdraw Term`: The term used for the help window when using the withdraw command.
- `Deposit Term`: The term used for the help window when using the deposit command.
- `Quantity Window Term`: The term used for the quantity window when choosing an amount.

## Plugin Commands

- `OpenScene`: This command will open the transfer scene for a specific storage container. If you use an ID and the container does not exist, then an empty container with the ID will be created to prevent the game from crashing.
- `SetupPresets`: This command will set up the container presets you created in the plugin parameters.
- `CreateStorageContainer`: This command will create a storage container with the items and ID you set in its arguments.
- `GainItem`: This command will add items to a storage container.



## Script Calls

### Create a Container
```
$storage.createContainer(id, maxItems)
```

`id`: The id of the container, used when calling the storage scene or other script calls. Can be a string or a number.
Default: Varies depending on the number of existing containers.

`maxItems`: The max amount of items allowed in this container. Must be a number.
Default: 100

### Remove a Container

```
$storage.removeContainer(id)
```
`id`: The id of the container you want to remove, clearing all items contained within.

### Check if Container Exists
```
$storage.containerExists(id)
```
`id`: The id of the container you want to check for existence.

### Fetch a Container
```
$storage.getContainer(id)
```
`id`: The id of the container you want to retrieve.


### Container Script Calls
These are the script calls you can use after retrieving a container.

#### Check the amount of items
```
$storage.getContainer(id).amountOfItems()
```

#### Check if you can add an item
```
$storage.getContainer(id).canAddItem(amount)
```

#### Change max amount
```
$storage.getContainer(id).changeMaxAmount(amount)
```

#### Check amount of a specific item
```
$storage.getContainer(id).numItems($dataItems[1])
```

#### Add an item
```
$storage.getContainer(id).gainItem($dataItems[1], 5)
```

#### Remove an item
```
$storage.getContainer(id).loseItem($dataItems[1], 5)
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
