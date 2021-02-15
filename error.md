#     errors

##    Error: Cannot find module 'webpack-cli/bin/config-yargs'
###   log
```sh
> javascript-webpack-example@1.0.0 dev C:\Users\Administrator\Desktop\2021\webpack\javascript-webpack-example
> webpack-dev-server --mode=development --hot

internal/modules/cjs/loader.js:883
  throw err;
  ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
Require stack:
- C:\Users\Administrator\Desktop\2021\webpack\javascript-webpack-example\node_modules\webpack-dev-server\bin\webpack-dev-server.js
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
    at Function.Module._load (internal/modules/cjs/loader.js:725:27)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (C:\Users\Administrator\Desktop\2021\webpack\javascript-webpack-example\node_modules\webpack-dev-server\bin\webpack-dev-server.js:65:1)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'C:\\Users\\Administrator\\Desktop\\2021\\webpack\\javascript-webpack-example\\node_modules\\webpack-dev-server\\bin\\webpack-dev-server.js'
  ]
}
```

###    관련 설정
####   package.json
```json
...
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server --mode=development --hot"
  },
...
```

###   해결방법
1.  package.json의 `scripts`에서 dev의 `webpack-dev-server`를 `webpack serve`로 바꿔준다.
2.  webpack과 webpack cli의 버전을 downgrade한다. [출처](https://leejjang.medium.com/error-cannot-find-module-webpack-cli-bin-config-yargs-d1252b294c7b)
```json
  "devDependencies": {
    "webpack": "5.5.0",
    "webpack-cli": "3.3.11",
    "webpack-dev-server": "3.7.1"
  }
```

##    Error: Can't resolve 'zlib' in ... (Webpack 5 issue)
###   log
```sh
ERROR in ./node_modules/body-parser/lib/read.js 20:11-26
Module not found: Error: Can't resolve 'zlib' in 'C:\Users\Administrator\Desktop\2021\webpack\javascript-webpack-example\node_modules\body-parser\lib'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "zlib": require.resolve("browserify-zlib") }'
        - install 'browserify-zlib'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "zlib": false }
 @ ./node_modules/body-parser/lib/types/raw.js 15:11-29
 @ ./node_modules/body-parser/index.js 138:15-41
 @ ./node_modules/express/lib/express.js 13:17-39
 @ ./node_modules/express/index.js 10:0-41
 @ ./src/server.js 1:0-30 2:10-17
```

###   해결방법
webpack 5는 이전 버전과 달리 CommonJS에 대한 polyfill을 지원하지 않는다. 따라서 pollyfill을 지원하려면 error message에 나오는 대로 하면 된다.

1.  webpack.config.js에 resolve 옵션 추가
```javascript
{
  ...
  resolve: {
    fallback: { "zlib": require.resolve("browserify-zlib") }
    },
  ...
}
```

2.  devDependencies에 browserify-zlib 설치
```sh
npm i -D browserify-zlib assert 
```

##    react-router-dom doesn't work in build files
###   원인
./dist/index.html live server로 열면 안 된다. url을 `'/'`이 아니라 `'/dist/index.html'`로 설정하기 때문이다.
로컬에서 실행하려면 `serve -s dist`

###   해결방법
문제는 github page에 deploy할 때다.

이에 대한 해답은 BrowserRouter의 basename prop을 `process.env.PUBLIC_URL`로 설정해주는 것이다.
HasRouter를 사용하는 방법도 있으나 주소에 #가 붙어서 결코 정상적인 해결책은 아니다.

[출처](https://velog.io/@ausg/gh-pages-react-router)

BrowserRouter의 basename prop에 `"/[repository name]"`을 붙이면 github page에서 작동한다.

다른 hosting service에서는 어떻게 해야하는지 잘 모르겠다.