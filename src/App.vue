<template>
  <router-view />
</template>

<style lang="scss">
:root {
  --c-transparent: rgba(255, 255, 255, 0.13);
  --c-l-white: rgba(255, 255, 255, 0.47);
  --c-white: #fff;

  --spacing-l: 20px;
  --spacing-m: 10px;
  --spacing-s: 5px;

  --fs: 14px;

  --folder-icon-h: 15px;
  --folder-icon-w: 15px;

  --file-icon-h: 15px;
  --file-icon-w: 15px;
}

* {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}

body {
  background: url("./assets/main-bg.jpg");
  font-size: var(--fs);
  color: var(--c-l-white);
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

i {
  display: flex;
  svg {
    path {
      fill: var(--c-white);
    }
  }
}
</style>
