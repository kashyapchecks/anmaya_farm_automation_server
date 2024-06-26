# Anmaya Sristi Farm Automation

A nice project with a nice description

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.11.1

    $ npm --version
    10.2.4
    
---

## Install

    $ git clone https://github.com/kashyapchecks/anmaya_farm_automation_server.git farm_automation_server
    $ cd farm_automation_server
    $ npm install

## Configure the .env file

Open `.env` then edit it with your settings. You will need:

- Update the DB_URL variable

## Running the project

    $ npm start
