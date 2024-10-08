
# Gridsvcs

[Documentation](./doc/README.md) for this project is located in the docs folder and using [docsify] we created the [gridsvcs][docsite] docsite, deployed at [codemarc.net/doc/gridsvcs][docsite].

[docsite]: https://codemarc.net/doc/gridsvcs
[docsify]: "https://docsify.js.org/#/"


The project is sourced in two repositories:
* [gridlinks](https://github.com/codemarc/gridlinks) - The gridlinks repository contains a reference chrome extension written using React and Vite. It illustrates how to authenticate thru supabase and consume a set of genai enabled services all from a chrome extension.

* [gridsvcs](https://github.com/codemarc/gridlinks) - This repository contains all of the parts required to support gridlinks and the services it consumes. It is a monorepo that contains the following sub-projects:

  * motd - The motd service is a simple service that provides a message of the day. see [motd](./motd/README.md) for more details.
  

