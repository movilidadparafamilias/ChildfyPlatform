### Childfy trip sharing platform

Childfy is a platform that helps parents share trips to and from schools making it easy to chat and sign authorisations for the children transport.

#### Features:

- User accounts
- School profile
- Sharing trips with route calculation
- Authorisation signing form
- Chat between parents

#### Instalation

##### Mobile app
Mobile app is built on top of Ionic Framework to build the app make sure you have [Node.js](https://nodejs.org/en "Node.js") installed.

Install Ionic:

`npm i -g @ionic/cli`

Clone this repository

`gh repo clone movilidadparafamilias/ChildfyPlatform`

`cd ChildfyPlatform`

and run

`npm i`

The native versions of the app are using [Capacitor](https://capacitorjs.com/ "Capacitor") and to build them run:

`ionic capacitor sync`

You can now open the app in [Xcode](https://developer.apple.com/xcode/ "Xcode") for iOS and [Android Studio](https://developer.android.com/studio "Android Studio") for Android

##### Backend

The backend uses [Parse Server](https://parseplatform.org/ "Parse Server") Follow the instruction on their page to deploy a Parse server install and make sure to add [Parse Dashboard](https://github.com/parse-community/parse-dashboard "Parse Dashboard")

Link the app with your parse install by editing `ConnectionService`

      private parseAppId: string = "YOUR_APP_ID";
      private parseServerUrl: string = "YOUR_SERVER_URL";
      private parseMaster: string = "YOUR_MASTER_STRING";

#### Licence [![CC BY 4.0][cc-by-shield]][cc-by]

This work is licensed under a
[Creative Commons Attribution 4.0 International License][cc-by].

[![CC BY 4.0][cc-by-image]][cc-by]

[cc-by]: http://creativecommons.org/licenses/by/4.0/
[cc-by-image]: https://i.creativecommons.org/l/by/4.0/88x31.png
[cc-by-shield]: https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg

###### This project is co-financed by the European Regional Development Fund through the Urban Innovative Actions Initiative
![alt text](https://github.com/movilidadparafamilias/ChildfyPlatform/blob/main/1.png?raw=true) ![alt text](https://github.com/movilidadparafamilias/ChildfyPlatform/blob/main/2.png?raw=true)  ![alt text](https://github.com/movilidadparafamilias/ChildfyPlatform/blob/main/3.png?raw=true)  