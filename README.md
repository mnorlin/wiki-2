# Wiki 2.0

Everything ever written, everything that will be written, exists in this wiki. With its 9×10<sup>11 589</sup> pages, the wiki is complete, all you need to do is find the right page...

This project can be found on [https://wiki-2.com](https://wiki-2.com), the website includes small modifications of this project to make it compatible with more browsers.

## How does it work?

The universe contains approximately 10<sup>80</sup> atoms, so how can this wiki contain 10<sup>11 589</sup> pages? Some may say it is _[Homeopathic data storage](misc/homeopathic-storage.jpg)_, others will say it is a quirky application of a Linear congruential generator. If you believe in the former, good for you, I've heard that stupid people are happy people. If you believe in the latter, the steps how it is used can be found below:

1. The page number is used as a seed in an [LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator), _[(lcg.js)](website/js/magic/lcg.js#L2)_
2. The new random number, is converted from base 10, to base 7000, _[(base-conversion.js)](website/js/magic/base-conversion.js#L2)_
3. Each digit in base 7000, is assigned an UTF-8 symbol, _[(text-mapping.js)](website/js/magic/text-mapping.js#L2)_
4. The text is outputted on the page.

## Requirements

The project only works in some of the most recent browsers, as it requires new web technologies, some requirements are:

| Browser | [BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) | [Custom HTML elements](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) | [Module imports in workers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) |
| ------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Chrome  | OK                                                                                                | OK                                                                                                    | OK                                                                                                               |
| Firefox | OK                                                                                                | OK                                                                                                    | NOK                                                                                                              |
| Safari  | OK                                                                                                | NOK                                                                                                   | NOK                                                                                                              |

This table was last updated in December 2020.

## Run locally

To test the project locally, you can run it as a docker container

`docker-compose build`

`docker-compose up -d`

the website can be reached at `http://localhost`

**Note: This setup is not suitable for production environments.**

## Acknowledgement

A huge inspiration to this project is the [Library of Babel](https://libraryofbabel.info/).
