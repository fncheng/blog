## ls和du

ls -l 显示的是实际文件(目录)大小，而du显示的是文件(目录)占用磁盘空间的大小。

```sh
$ ls -                    
-1                              -- single column output                                                                                                         
--all                       -a  -- list entries starting with .                                                                                                 
--almost-all                -A  -- list all except . and ..                                                                                                     
--author                        -- print the author of each file                                                                                                
--block-size                    -- specify block size                                                                                                           
-c                              -- status change time                                                                                                           
-C                              -- list entries in columns sorted vertically                                                                                    
--classify                  -F  -- append file type indicators                                                                                                  
--context                   -Z  -- print any security context of each file                                                                                      
--dereference               -L  -- list referenced file for sym link                                                                                            
--dereference-command-line  -H  -- follow symlink on the command line                                                                                           
--directory                 -d  -- list directory entries instead of contents                                                                                   
--dired                     -D  -- generate output designed for Emacs' dired mode                                                                               
--escape                    -b  -- print octal escapes for control characters                                                                                   
-f                              -- unsorted, all, short list                                                                                                    
--file-type                     -- append file type indicators except *                                                                                         
--format                        -- specify output format                                                                                                        
--full-time                     -- list both full date and full time                                                                                            
-g                              -- long listing but without owner information                                                                                   
--help                          -- display help information                                                                                                     
--hide                          -- like -I, but overridden by -a or -A                                                                                          
--hide-control-chars        -q  -- hide control chars                                                                                                           
--human-readable            -h  -- print sizes in human readable form                                                                                           
--hyperlink                     -- output terminal codes to link files using file::// URI                                                                       
--ignore                    -I  -- don't list entries matching pattern                                                                                          
--ignore-backups            -B  -- don't list entries ending with ~                                                                                             
--indicator-style               -- specify indicator style                                                                                                      
--inode                     -i  -- print file inode numbers                                                                                                     
--kilobytes                 -k  -- use block size of 1k                                                                                                         
-l                              -- long listing                                                                                                                 
--literal                   -N  -- print entry names without quoting                                                                                            
-m                              -- comma separated                                                                                                              
--no-group                  -G  -- inhibit display of group information                                                                                         
--numeric-uid-gid           -n  -- numeric uid, gid                                                                                                             
-o                              -- no group, long                                                                                                               
-p                              -- append / to directories                                                                                                      
--quote-name                -Q  -- quote names                                                                                                                  
--quoting-style                 -- specify quoting style                                                                                                        
--recursive                 -R  -- list subdirectories recursively                                                                                              
--reverse                   -r  -- reverse sort order                                                                                                           
-S                              -- sort by size                                                                                                                 
--si                            -- sizes in human readable form; powers of 1000                                                                                 
--size                      -s  -- display size of each file in blocks                                                                                          
--sort                          -- specify sort key                                                                                                             
-t                              -- sort by modification time                                                                                                    
--tabsize                   -T  -- specify tab size                                                                                                             
--time                          -- specify time to show                                                                                                         
--time-style                    -- show times using specified style                                                                                             
-u                              -- access time                                                                                                                  
-U                              -- unsorted                                                                                                                     
-v                              -- sort by version (filename treated numerically)                                                                               
--version                       -- display version information                                                                                                  
--width                     -w  -- specify screen width                                                                                                         
-x                              -- sort horizontally                                                                                                            
-X                              -- sort by extension                                                                                                            
--dereference-command-line-symlink-to-dir            --group-directories-first                            --show-control-chars
```

```sh
$ ls
-h或--human-readable：以可读性较高的方式来显示信息；
```



ll是ls -lh的别名

```sh
$ alias ll
ll='ls -lh'
```



## du

> disk usage，用来显示目录或文件的大小，查找**文件****和****目录**的磁盘使用情况的命令。

```sh
$ du -h --max-depth=1
# 查看当前目录下一级目录占用大小 max-depth=1表示层级1
```



### 快速查看一个文件夹的大小

```sh
$ du -sh
# -s, --summarize         仅显示总计，只列出最后加总的值。
# -h, --human-readable    以K，M，G为单位，提高信息的可读性。
```



### ncdu
