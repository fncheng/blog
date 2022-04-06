## locate

比 find 好用的文件查找工具





### macOS locate

macos的locate需要先设置搜索路径，否则会报`locate: illegal option -- -`

```sh
$ locate --help
locate: illegal option -- -
usage: locate [-0Scims] [-l limit] [-d database] pattern ...

default database: `/var/db/locate.database' or $LOCATE_PATH
```

macos上的mdfind并不支持模糊搜索，因此可以用以下方法代替

```sh
mdfind 'pattern' | grep 'pattern'
```



### locate配置文件locate.rc

[Using Locate Databases on MacOS Unix](https://www.codeproject.com/Tips/5282703/Using-Locate-Databases-on-MacOS-Unix)

```properties
#
# /etc/locate.rc -  command script for updatedb(8)
#
# $FreeBSD: src/usr.bin/locate/locate/locate.rc,v 1.9 2005/08/22 08:22:48 cperciva Exp $

#
# All commented values are the defaults
#
# temp directory
#TMPDIR="/tmp"

# the actual database
#FCODES="/var/db/locate.database"

# directories to be put in the database
#SEARCHPATHS="/"

# exclude目录
# directories unwanted in output
#PRUNEPATHS="/tmp /var/tmp"

# filesystems allowed. Beware: a non-listed filesystem will be pruned
# and if the SEARCHPATHS starts in such a filesystem locate will build
# an empty database.
#
# be careful if you add 'nfs'
#FILESYSTEMS="hfs ufs apfs"
```



