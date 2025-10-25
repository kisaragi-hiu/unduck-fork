dev:
	npx vite

build: public/search.ico vendor/bang.json
	npx tsc && npx vite build

public/search.ico:
	cd public && inkscape --export-type=png search.svg
	magick public/search.png -resize 16x16 public/search.ico
	rm public/search.png

# The value is actually JSON despite the name
vendor/bang.json:
	mkdir -p vendor
	curl -L "https://duckduckgo.com/bang.js" > vendor/bang.json
