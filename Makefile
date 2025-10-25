dev:
	npx vite

build: public/search.ico vendor/bang.ts
	npx tsc && npx vite build

public/search.ico:
	cd public && inkscape --export-type=png search.svg
	magick public/search.png -resize 16x16 public/search.ico
	rm public/search.png

# - The value is actually JSON despite the name
# - We throw it into a JS file because this way the value gets inlined as JS in
#   the output, without quotes for the keys and thus smaller.
#   When we import JSON, in the output Vite would decide to ship the string and
#   use JSON.parse at runtime on it instead. This might be better for
#   performance (JSON parsing is faster than JS parsing), but I want to optimize
#   for size here.
# - The file extension is TS because this makes TypeScript infer the type.
vendor/bang.ts:
	mkdir -p vendor
	echo "export const original =" > vendor/bang.ts
	curl -L "https://duckduckgo.com/bang.js" >> vendor/bang.ts
