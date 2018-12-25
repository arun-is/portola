# portola

Transforms folders and images into a fast, modern portfolio website. Focus on content and styling instead of worrying about how it all works.

## directory structure

Here is an example of how a portola project wold look.

- site/
  - index.md
  - Blog/
    - First Blog Post/
      - index.md
    - Second Blog Post/
      - index.md
      - x.jpg
      - y.jpg
      - z.jpg
  - Photos/
    - Landscapes/
      - Big Sur.jpg
      - Tiburon.jpg
    - Portraits/
      - Joey.jpg
      - Maya.jpg
    - Street/
      - Berlin.jpg
      - San Francisco.jpg
- theme/
  - collections/
    - image.js
    - text.js
  - pages/
    - home.js
    - image.js
    - text.js
  - static/
    - favicon.jpg
    - social.jpg
    - style.css
- inner_workings/
  - .cache/
  - src/
    - templates/
    - html.js
- finished_site/
- .gitignore
- package.json

## tasks

### to be prioritized

- put together sample site
- mvp of directory structure working with gatsby
- image resizing
- social images
- favicons
- support for scss, less, etc.
- npm package
- config build directory
- portola command to start server
- portola command to create site
- portola command to publish
- launch video
- documentation

### todo

### nice to haves / punted
