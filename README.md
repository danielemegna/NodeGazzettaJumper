Build and start the docker container using:

```
$ docker build -t ngj .
$ docker run -dp 80:80 -v $(pwd):/app --name ngj ngj
```

or for tty interactive mode:
```
$ docker run -itp 80:80 -v $(pwd):/app --name ngj ngj bash
```

Prepare dev environment using (inside the interactive container):
```
$ npm install 
$ ./mocha --recursive tests
```

Manual execution notes:

```
apt-get install curl
curl -sL https://deb.nodesource.com/setup_5.x | bash -
apt-get install --yes nodejs
npm install supervisor -g
supervisor app.js
```

Nice guides:

- http://book.mixu.net/node/ch6.html
- https://www.codementor.io/nodejs/tutorial/unit-testing-nodejs-tdd-mocha-sinon
- http://theholmesoffice.com/how-to-build-a-simple-webpage-in-node-js/
- http://theholmesoffice.com/getting-ready-for-scalability-creating-an-mvc-framework-for-our-node-js-page/
- https://github.com/nodejs/node-v0.x-archive/wiki/Installing-Node.js-via-package-manager
