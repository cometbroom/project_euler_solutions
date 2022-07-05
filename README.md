# Project Euler Solutions
This web app is to showcase and run fastest algorithms that I can think of. 
### [Try the app](https://cometbroom.github.io/project_euler_solutions/)

## How to use
Just press next and previous to navigate the algorithms and see how fast they are and how they are implemented. You can also enter your own inputs to get different results and see the variability in speed.

Here is a screenshot of the web app, read more below about the development:

![Screenshot of the web app](./assets/home%20screenshot.PNG)

## Folder structure

```
.
├── assets/
│   └── ...Github assets
├── public/
│   └── ...Application assets and styling
└── src/
    ├── components/
    │   └── ...Modules that modify elements programatically
    ├── data/
    │   ├── ...Program data, currently on memory
    │   └── ...Solvers and workers
    ├── helpers/
    │   └── ...Module handling workers and relating them to state
    ├── lib/
    │   └── ...Main functionality tooling such as logger, router etc...
    ├── pages/
    │   ├── ...Pages controller and functionality module
    │   └── ...Routes array responsible for pages entry
    ├── tools/
    │   └── ...Side functionality tooling such as type checkers
    └── views/
        └── ...Pages rendering and event listening module
```

## Development
I made this app with HTML/CSS and vanilla javascript.

Furthermore, I used the starter project by [Jim Cramer](https://github.com/remarcmij) which is [here](https://github.com/remarcmij/vanilla-starter).

The libraries that I used are:
- `highlight.js` to highlight the showcased code.
- `gsap` for animations.
- `snowpack` for development server and as a build tool.

This was my first time doing multi-threaded web development with workers to calculate the results.

