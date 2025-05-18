public/search.ico:
	cd public && inkscape --export-type=png search.svg
	magick public/search.png -resize 16x16 public/search.ico
	rm public/search.png
