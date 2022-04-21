---
title: linux时间问题
---

## date

Linux date命令可以用来显示或设定系统的日期与时间

### 修改系统时区

https://www.cnblogs.com/kerrycode/p/4217995.html

CST：中国标准时间（China Standard Time），这个解释可能是针对RedHat Linux。

UTC：协调世界时，又称世界标准时间，简称UTC

#### tzselect设置时区

```sh
$ tzselect
Please identify a location so that time zone rules can be set correctly.
Please select a continent, ocean, "coord", or "TZ".
 1) Africa
 2) Americas
 3) Antarctica
 4) Asia
 5) Atlantic Ocean
 6) Australia
 7) Europe
 8) Indian Ocean
 9) Pacific Ocean
10) coord - I want to use geographical coordinates.
11) TZ - I want to specify the timezone using the Posix TZ format.
#? 4
Please select a country whose clocks agree with yours.
 1) Afghanistan		  18) Iraq		    35) Pakistan
 2) Antarctica		  19) Israel		    36) Palestine
 3) Armenia		  20) Japan		    37) Philippines
 4) Azerbaijan		  21) Jordan		    38) Qatar
 5) Bahrain		  22) Kazakhstan	    39) Russia
 6) Bangladesh		  23) Korea (North)	    40) Saudi Arabia
 7) Bhutan		  24) Korea (South)	    41) Singapore
 8) Brunei		  25) Kuwait		    42) Sri Lanka
 9) Cambodia		  26) Kyrgyzstan	    43) Syria
10) China		  27) Laos		    44) Taiwan
11) Cyprus		  28) Lebanon		    45) Tajikistan
12) East Timor		  29) Macau		    46) Thailand
13) Georgia		  30) Malaysia		    47) Turkmenistan
14) Hong Kong		  31) Mongolia		    48) United Arab Emirates
15) India		  32) Myanmar (Burma)	    49) Uzbekistan
16) Indonesia		  33) Nepal		    50) Vietnam
17) Iran		  34) Oman		    51) Yemen
#? 10
Please select one of the following timezones.
1) Beijing Time
2) Xinjiang Time
#? 1

The following information has been given:

	China
	Beijing Time

Therefore TZ='Asia/Shanghai' will be used.
Selected time is now:	Fri Dec 31 10:43:15 CST 2021.
Universal Time is now:	Fri Dec 31 02:43:15 UTC 2021.
Is the above information OK?
1) Yes
2) No
#? yes
Please enter a number in range.
#? 1

You can make this change permanent for yourself by appending the line
	TZ='Asia/Shanghai'; export TZ
to the file '.profile' in your home directory; then log out and log in again.

Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
Asia/Shanghai
```



### change timezome in Ubuntu20.04

[参考文档](https://linuxize.com/post/how-to-set-or-change-timezone-on-ubuntu-20-04/)

> 系统时区是通过符号链接`/etc/localtime`到`/usr/share/zoneinfo`目录中的二进制时区标识符来配置的。

```sh
$ ll /etc/localtime
# lrwxrwxrwx 1 root root 27 Dec 22 14:51 /etc/localtime -> /usr/share/zoneinfo/Etc/UTC
```



#### timedatectl

```sh
$ timedatectl
list-timezones  -- Show known timezones
set-local-rtc   -- Control whether RTC is in local time
set-ntp         -- Control whether NTP is enabled
set-time        -- Set system time
set-timezone    -- Set system timezone
status          -- Show current time settings
```

查看当前时间设置

```sh
$ timedatectl
#               Local time: Fri 2021-12-31 02:57:10 UTC
#           Universal time: Fri 2021-12-31 02:57:10 UTC
#                 RTC time: Fri 2021-12-31 02:57:10
#                Time zone: Etc/UTC (UTC, +0000)
#System clock synchronized: yes
#              NTP service: active
#          RTC in local TZ: no
```

```sh
$ timedatectl set-timezone Asia/Shanghai
# ==== AUTHENTICATING FOR org.freedesktop.timedate1.set-timezone ===
# Authentication is required to set the system timezone.
# Authenticating as: cheng
# Password:
# ==== AUTHENTICATION COMPLETE ===
```

