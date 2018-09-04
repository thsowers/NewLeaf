module.exports = function(ctx) {
  return {
    framework: {
      components: [
        'QLayout',
        'QPageContainer',
        'QPage',
        'QLayoutHeader',
        'QLayoutFooter',
        'QLayoutDrawer',
        'QPageSticky',
      ],
      directives: ['TouchSwipe' /* ... */],
      plugins: ['Notify' /* ... */],

      // Quasar config
      // You'll see this mentioned for components/directives/plugins which use it
      config: {
        /* ... */
      },

      iconSet: 'fontawesome', // requires icon library to be specified in "extras" section too,
      i18n: 'de', // Tell Quasar which language pack to use for its own components

      // v0.17+
      cssAddon: true, // Adds the flex responsive++ CSS classes (noticeable bump in footprint)
    },
  }
}
