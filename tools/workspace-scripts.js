module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: 'npx cowsay "Nothing wrong with vanilla 🍦"',
        description: ' 🔻 Vanilla',
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo:android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: 'npx cowsay "Test all the Angles!"',
        description: ' 🔻 Angular',
      },
      'demo-angular': {
        clean: {
          script: 'nx run demo-angular:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo-angular:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo-angular:android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...React...': {
        script: 'npx cowsay "You like your TS with an X..."',
        description: ' 🔻 React',
      },
      'demo-react': {
        clean: {
          script: 'nx run demo-react:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo-react:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo-react:android',
          description: '⚆  Run Android  🤖',
        },
      },
    },

    '⚙️': {
      script: `npx cowsay "@vallemar/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @vallemar/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@nativescript-use': {
      // @nativescript-use/vue
      vue: {
        build: {
          script: 'nx run vue:build.all',
          description: '@nativescript-use/vue: Build',
        },
      },
      // @vallemar/nativescript-orientation
      'nativescript-orientation': {
        build: {
          script: 'nx run nativescript-orientation:build.all',
          description: '@nativescript-use/nativescript-orientation: Build',
        },
      },
      // @vallemar/nativescript-keyboard
      'nativescript-keyboard': {
        build: {
          script: 'nx run nativescript-keyboard:build.all',
          description: '@nativescript-use/nativescript-keyboard: Build',
        },
      },
      // @vallemar/nativescript-clipboard
      'nativescript-clipboard': {
        build: {
          script: 'nx run nativescript-clipboard:build.all',
          description: '@nativescript-use/nativescript-clipboard: Build',
        },
      },
      // @nativescript-use/nativescript-media-query
      'nativescript-media-query': {
        build: {
          script: 'nx run nativescript-media-query:build.all',
          description: '@nativescript-use/nativescript-media-query: Build',
        },
      },
      // @nativescript-use/nativescript-intersection-observer
      'nativescript-intersection-observer': {
        build: {
          script: 'nx run nativescript-intersection-observer:build.all',
          description: '@nativescript-use/nativescript-intersection-observer: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      vue: {
        script: 'nx run vue:focus',
        description: 'Focus on @nativescript-use/vue',
      },
      'nativescript-orientation': {
        script: 'nx run nativescript-orientation:focus',
        description: 'Focus on @vallemar/nativescript-orientation',
      },
      'nativescript-keyboard': {
        script: 'nx run nativescript-keyboard:focus',
        description: 'Focus on @vallemar/nativescript-keyboard',
      },
      'nativescript-clipboard': {
        script: 'nx run nativescript-clipboard:focus',
        description: 'Focus on @vallemar/nativescript-clipboard',
      },
      'nativescript-media-query': {
        script: 'nx run nativescript-media-query:focus',
        description: 'Focus on @nativescript-use/nativescript-media-query',
      },
      'nativescript-intersection-observer': {
        script: 'nx run nativescript-intersection-observer:focus',
        description: 'Focus on undefined/nativescript-intersection-observer',
      },
      reset: {
        script: 'nx g @vallemar/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
