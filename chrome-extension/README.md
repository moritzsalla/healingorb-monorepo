# Chrome Extension

A chrome extension that communicates with the Healing Orb's ambient interface. It is the head of the Healing Orb, performing processing and animation of data.

![Image](banner.png)

## Development

Run `yarn build` to bundle files into a chrome build  
Run `yarn clean` to format using prettify and remove cache + dist folders  
Run `yarn post-build` to compress the build into a zip

## Certificate Issues on Chrome

Chrome doesn't accept self-signed certificate issues. Read more [here](https://stackoverflow.com/a/58957322/10653440). To allowlist your Raspberry Pi's IP address, type `thisisunsafe` when Chrome throws an error screen. This is likely to be the reason if the Raspberry Pi is not responding. Please check your developer console regularly, Chrome's behavior is sporadic.

## Data Flow

The extension's processing tasks include HTML scraping, string filtration, storage, mapping and easing. The extension also includes a popup which exposes readings and settings to the user.

![Illustration](illu.png)

### Folder Structure

```
.
├── background.js
├── content.ts
├── images
│   ├── favicon.png
│   ├── favicon@2x.png
│   ├── favicon@3x.png
│   ├── favicon@4x.png
│   ├── store_icon.png
│   └── store_promo.jpg
├── manifest.json
└── popup
    ├── Popup.tsx
    ├── bootstrap.min.css
    ├── index.html
    └── index.tsx
```
