# GUIM
React Components for Intelimetrica

## TODO
* Docs on how to run examples
* Docs on how to contribute
  Tests
  File structure
  Build
  Pull Request
  etc

## Themes

Themes styles are defined inside src/styles/themes.scss as :root rules

```css
@import './colors.scss';

:root {
  --blue-theme: {
    color: var(--dark-blue);
    background-color: var(--light-blue);
  };

  --gray-theme: {
    color: var(--dark-gray);
    background-color: var(--light-gray);
  }

  --green-theme: {
    color: var(--dark-green);
    background-color: var(--light-green);
  }
}
```
Then this can be applied using @apply, for example Button/styles.scss is defined as

```css
@import '../styles/themes.scss';

.GUIMButtonBlue {
  @apply --blue-theme;
}

.GUIMButtonGray {
  @apply --gray-theme;
}

.GUIMButtonGreen {
  @apply --green-theme;
}

```
