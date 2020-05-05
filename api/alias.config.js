import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@root': '.',
  '@middlewares': path.join(__dirname, '/src/middlewares'),
  '@configs': path.join(__dirname, 'src/configs'),
  '@controllers': path.join(__dirname, 'src/controllers'),
  '@routes': path.join(__dirname, 'src/routes'),
  '@helpers': path.join(__dirname, 'src/helpers'),
  '@models': path.join(__dirname, 'src/models'),
  '@services': path.join(__dirname, 'src/services')
})

export default moduleAlias
