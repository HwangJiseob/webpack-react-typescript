# webpack-react-typescript
webpack-react-typescript example

##    settings
Github Desktop에서 New repository로 저장소를 만듭니다. (새로운 디렉토리 생성)
`ctrl+shift+a`로 VS Code를 킨 다음 명령어를 입력합니다. (해당 저장소 디렉토리에 package.json 설치)
```sh
npm init -y
```

그 다음 `package.json`의 `devDependencies`에 다음 목록을 붙여 넣고 `npm i`를 해줍니다.
(latest로 했는데 에러가 난다면 해당 모듈만 따로 stable 버전으로 설치해줍니다.)
```json
{
  "webpack": "latest",
  "webpack-cli": "latest",
  "webpack-dev-server": "latest",
  "style-loader": "latest",
  "css-loader": "latest",
  "file-loader": "latest",
  "source-amp-loader": "latest",
  "html-webpack-plugin": "latest",
  "clean-webpack-plugin": "latest",
  "babel-loader": "latest",
  "@babel/core": "latest",
  "@babel/preset-env": "latest",
  "@babel/preset-react": "latest",
  "terser-webpack-plugin": "latest",
  "webpack-bundle-analyzer":"latest",

  "react":"latest",
  "react-dom": "latest",
  "react-router-dom": "latest",

  "@emotion/react": "latest",
  "@emotion/styled": "latest",

  "typescript": "latest",
  "ts-loader": "latest",
  "@types/react": "latest",
  "@types/react-dom": "latest"

  // express를 hmr 서버로 사용하는 것에 대해서는 ssr 예제 참고
}
```

* webpack mode가 production인 경우 자동으로 `html-loader`의 minimize option이 적용되므로 굳이 설치할 필요가 없습니다.

설치가 끝나면 디렉토리의 `webpack.config.js`를 작성한 다음, `package.json`의 `script` 다음을 붙여 넣습니다.
`
`

##      webpack
webpack 설정은 매우 방대하므로, 다 다룰 수가 없으므로 중요한 feature만 정리하였습니다.

###     code split

###     compressor

###     Stats

###     Hot Module Replacement
webpack에서 HMR을 실행시킬 수 있는 방법에는 크게 3가지가 있다.
1.  webpack-dev-server 모듈
2.  webpack-dev-middleware 모듈

클라이언트 코드만 컴파일할 경우에는 `webpack-dev-server`만 있어도 되지만, 백엔드 서버 코드까지 모두 컴파일하려면 `webpack-dev-middleware`가 필요합니다. 적어도 디버깅하려면 백엔드 서버에서 HMR을 구동시켜야 하니까요. 하지만 여기서는 front-end 서버만 다룰 것이므로 1번 방법을 사용합니다.


##      babel
babel은 원래 es6 이상의 문법을 es5로 변환(syntax transform)해주는 transcompiler지만, jsx를 vanila js 파일로 변환해주기도 합니다. 따라서 jsx 문법을 사용할 때는 babel을 사용해야만 합니다.

babel config file을 다루는 데에는 다음과 같은 방법이 있습니다.
1.  .babelrc 파일 사용
2.  .babel.config.json 파일 사용
3.   package.json 

예제에서는 1번 방법을 사용할 겁니다.

##    typescript
webpack에서 typescript 설정하는 방법에는 2가지가 있다.
1.  babel 설정
2.  webpack loader 설정

어느 방식이든 큰 차이는 없다.