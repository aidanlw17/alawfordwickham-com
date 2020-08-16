---
title: Linux Kernel Programming Notes
author: Aidan Lawford-Wickham
date: '2019-11-20T20:17:34.026Z'
slug: kernel_notes
tags:
 - Linux Kernel
 - C
 - Make
 - Device Drivers
---

This is a collection of notes covering basic Linux kernel and device driver programming. I made it to help myself remember
important concepts, and I share it here because it might prove useful to other people as they enter the world of kernel programming.

### Module Basics

#### Building a module

We'll start with some of the basic building blocks for a kernel module.

`<linux/init.h>` and `<linux/module.h>` are included at the top of a module.

Always define the following functions to initialize and exit the module:

```clike
static int <module_name>_init(void) {
    ...
}
```

and

```clike
static void <module_name>_exit(void) {
    ...
}
```

Then call the functions `module_init(<module_name>_init)` and `module_exit(<module_name>_exit)`

In the Makefile, you can can use `obj-m := <module_name>.o` to define what needs to be built.
Add more modules to build using `obj-m += <module_name_2>.o`

You can build multiple files that form a single module (for which there is no single file) by adding the following to your Makefile:

```makefile
obj-m := <module_name>.o
<module_name>-objs := <file_name_1>.o <file_name_2>.o
```

Run `make`, then you're ready to insert the module into the kernel:

`insmod <module_name>.ko`

You can remove the module using `rmmod <module_name>`, and list modules with `lsmod`

Open a new shell window, and view kernel logs with `tail -f /var/log/kern.log` or `tail -f /var/log/syslog`


#### Importing/Exporting from modules

- Export function or variable using `EXPORT_SYMBOL(function_name);` after definition

- Write prototype when importing like so: `extern void function_name(int);` or `extern int GLOBAL_VARIABLE;`

- Must insert the one exporting first, then the one importing. Must build both using make. Must remove the one importing first, then the one exporting.

- Can use `modprobe importing_module` to insert in correct order.

- Can import string related operations in linux kernel, which are already exported. Seee the list using `cat /proc/kallsyms | grep "T str"`.
- use `#include <string.h>` then use the function name inside program.


#### Module parameters
- Exploit global variable as module parameter (can specify it when the module is inserted) using macro `module_param`

- Default value is what is initialized in source code (must be provided)
```clike
#include <linux/moduleparam.h>

int count = 1;
module_param(count, int, 0) // Pass name, type, and permission
```

Specify the parameter when inserting:

```bash
sudo insmod ./module.ko count=5
```

Permission arguments:

6 - read and write
4 - only read access

e.g. "0644"
- creator 6

- other members of group 4

- members not in group 4

View module parameters with permissions:

`ls -l /sys/module/module_name/parameters/count`

View value of module parameter:

`cat /sys/module/module_name/parameters/count`

View value of module parameter count to 5 after setting it:

`echo 5 | sudo tee /sys/module/module_name/parameters/count`



### Device Drivers

Device drivers are devices on which you can modify the system.

To view all devices in system: `cat /proc/devices`

#### Overall Process

1. Make device file so user can access physical device in kernel space (allows them to open, write, read, and close device). This means using `mknod` to make a device entry.

2. Device file does file operations on driver, which communicates with device.

#### Block device drivers

- Any device that allows you to go forwards or backwards between files, e.g. skipping a song or playing a song again

- Aynchonous, user does not need to wait for reading/writing of device to be completed

#### Character device driver

- Continuous stream of data, no ability to go back and forth, e.g. keyboard or mouse.

- Synchonous, user must wait for reading/writing of device to be completed

- Find device drivers with `ls -l /dev | head`
  - Major number and minor number included, major number is unique id for a driver associated with the device, minor number is number of instances

- Find hard disks `ls /dev | grep sda` (these all use same block device)

- Essentially, we write the device driver using a specific major number, then we can register devices to use that driver (write device files specifying this driver).

- `/dev` is a filesystem that only exists in RAM
- To make a device entry (create device file): `mknod -m 666 /dev/simple_char_device c 240 0`
  - `-m 666` everybody gets read and write access

  - `c` for character device, then list major and minor numbers
