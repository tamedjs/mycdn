import { loadMicroApp } from 'qiankun';

// load micro app
loadMicroApp({
  name: 'reactApp',
  entry: '//localhost:7100',
  container: '#container',
  props: {
    slogan: 'Hello Qiankun'
  },
});
