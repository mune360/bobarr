# 🍿 Bobarr
> The all-in-one alternative for Sonarr, Radarr, Jackett... with a VPN and running in docker

Bobarr is a movies and tv shows collection manager for BitTorrent users. It uses [themoviedb.org](https://www.themoviedb.org/) to search movies and tv shows to add to your library. Then it searchs into your favorites torrent trackers the best match and downloads it for you through a VPN.

![Screenshot](./screenshot.png)

**This is a beta release!**

### Need help? Join the discord => https://discord.gg/PFwM4zk

## Why ?

One of the main idea for bobarr is to be simple to setup, simple to use and having everything at the same place.
You don't have to choose a torrent client, to setup a VPN, to setup radarr, sonarr, then jackett and connect them all together.

It's also built from scratch and it will try to solve long term problem like download multiple qualities and keep them or managing tvshows and movies at the same place.
You can follow the [roadmap](https://github.com/iam4x/bobarr/projects/1) to check what next features are implemented.

And to have something with a better ui, less configuration and faster 🚀

## Setup

### Requirement

* docker installed (https://get.docker.com/) with docker-compose
* an account on a torrent website that is supported by jackett

## Installation

* Clone the repo `$ git clone https://github.com/iam4x/bobarr.git && cd bobarr`
* Set `PUID` and `PGID` in `.env` (see .env for explanation)

## How to start

There are two way to start bobarr stack, first without VPN:

* `$ docker-compose up --build --force-recreate -d`
* Go to http://localhost:9117, add your torrent account and copy the API Key in top right corner
* Go to http://localhost:3000/settings and update the jackett API key

If you want to enforce all torrent traffic through a VPN:

#### OpenVPN

* Copy your open vpn config file (.ovpn) into the folder `packages/vpn` name it `vpn.conf`
* `$ docker-compose -f docker-compose.yml -f docker-compose.vpn.yml up --build --force-recreate -d`

If you have NPM you can just run `$ npm run start` or `$ npm run start:vpn`

#### WireGuard

* Copy your wireguard config file (wg0.conf) into the folder `packages/vpn`
* `$ docker-compose -f docker-compose.yml -f docker-compose.wireguard.yml up --build --force-recreate -d`

If you have NPM you can just run `$ npm run start` or `$ npm run start:wireguard`

#### How to test your VPN
* From your host, you can run following command:
* `$ docker container exec -it bobarr-vpn curl http://ifconfig.me`
It will return the public IP expose by the container. It should be a different IP (assuming only the container bobarr-vpn is connected to vpn)

## Configuration

### Torrent account

* Go to http://localhost:9117
* Add indexer and follow the steps

### Bobarr configuration

* Go to http://localhost:3000/settings
* Set your region and language according to your torrent tracker
* Create and order your preferred tags found in torrent file (ex: vost, multi, english...)
* Order your preferred qualities to download

* It is possible to reset bobarr config:
* Go to http://localhost:3000/settings
* Click on the button "Reset bobarr"
* By default, the reset action will remove everything from bobarr database and it will re-scan your library folder.
* Options available :
1) Delete files downloaded from disk with bobarr (permanent) ==> This option will erase all the downloaded files and cleanup the symlinks in the library folder
2) Reset settings ==> This action will set back to the defaults settings (jackett api key, quality preferences, ...)

## Usage

* After configuration, go to http://localhost:3000/search and just start searching!
* The files will be downloaded into `library/downloads`
* The files will be simlinked and organized into `library/tvshows` or `library/movies`

## Import your own library

If you were using radarr or sonarr already you may have a tvshow or movies folder. You can easily import your already existing library into bobarr.

* Change in docker-compose.yml the folder link `- ./library:/usr/library`
* Point to your own library folder `- /mnt/storage/your/own/library:/usr/library`

The only requirement is to have a folder `tvshows` and a folder `movies` then bobarr can catch up and download to your user defined library folder.

If your movies or tvshow folder have a different name, you can edit `.env` file with your folder names:

```
LIBRARY_MOVIES_FOLDER_NAME=movies
LIBRARY_TV_SHOWS_FOLDER_NAME=tvshows
```

You can now head to http://localhost:3000 and hit that "Scan library folder" button.

## How to update

Since bobarr is still in early development and hasn't reached a state where an updater is already built-in you have to update from sources.
You need to pull master to get latest changes, something can break, you are a beta tester 😎

* `$ cd bobarr`
* `$ git stash` (will keep your changes of docker-compose or transmission config)
* `$ git pull origin master`
* `$ git stash apply` (re-apply your custom changes)

You can then re-start bobarr stack:

* `$ docker-compose up --build --force-recreate -d`
* OR with VPN `$ docker-compose -f docker-compose.yml -f docker-compose.vpn.yml up --build --force-recreate -d`

## Services

* Bobarr http://localhost:3000
* Bobarr GraphQL API http://localhost:4000/graphql
* Bobarr background jobs http://localhost:4000/jobs
* Jackett http://localhost:9117
* Transmission http://localhost:9091

## Development

You can run bobarr API and Web UI in dev watch mode and display logs with:

* With npm
  * `$ yarn dev`
* Without npm
  * `$ docker-compose up -f docker-compose.yml -f docker-compose.dev.yml up --force-recreate -d`
  * `$ docker-compose logs --tail 20 -f api web`
