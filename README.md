Demo: [zeroupload.balint.cloud](https://zeroupload.balint.cloud/)

Features:

* Text sharing
  * lz-utf8 compression
* Image sharing
  * browser based webp compression
* File sharing
  * lz-utf8 compression (TODO: change to something else)
* Share limit modes
  * modern browsers: ~20KB
  * old browsers: ~2KB
* Security:
  * AES-GCM for modern browsers
  * AES-CTR for old browsers (no padding, only raw data)

Upcoming features:

* Helps, hints, tips for inputs
* File/image name is kept in the URL
* Marketing panels on the right side of the page
* Improved image compression speed: upscaling from poor image quality instead of downscaling from best image quality
* Lighthouse related fixes
