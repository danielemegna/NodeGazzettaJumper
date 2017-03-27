git pull \
&& docker build -t ngj . \
&& (docker stop ngj || true) \
&& (docker rm ngj || true) \
&& docker run -dp 8080:80 --name ngj ngj
