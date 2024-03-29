### 安装

in Linux or macOS：

```sh
curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm
```



```sh
$ pnpm
Version 6.24.4
Usage: pnpm [command] [flags]
       pnpm [ -h | --help | -v | --version ]

Manage your dependencies:
      add                  Installs a package and any packages that it depends on. By
                           default, any new package is installed as a prod dependency
      import               Generates a pnpm-lock.yaml from an npm package-lock.json
                           (or npm-shrinkwrap.json) file
   i, install              Install all dependencies for a project
  it, install-test         Runs a pnpm install followed immediately by a pnpm test
  ln, link                 Connect the local project to another one
      prune                Removes extraneous packages
  rb, rebuild              Rebuild a package
  rm, remove               Removes packages from node_modules and from the project's
                           package.json
      unlink               Unlinks a package. Like yarn unlink but pnpm re-installs
                           the dependency after removing the external link
  up, update               Updates packages to their latest version based on the
                           specified range

Review your dependencies:
      audit                Checks for known security issues with the installed
                           packages
  ls, list                 Print all the versions of packages that are installed, as
                           well as their dependencies, in a tree-structure
      outdated             Check for outdated packages

Run your scripts:
      exec                 Executes a shell command in scope of a project
      run                  Runs a defined package script
      start                Runs an arbitrary command specified in the package's
                           "start" property of its "scripts" object
   t, test                 Runs a package's "test" script, if one was provided

Other:
      pack
      publish              Publishes a package to the registry
      root

Manage your store:
      store add            Adds new packages to the pnpm store directly. Does not
                           modify any projects or files outside the store
      store prune          Removes unreferenced (extraneous, orphan) packages from the
                           store
      store status         Checks for modified packages in the store
```

