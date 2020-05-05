import moduleAlias from 'module-alias';
import path from 'path';

moduleAlias.addAliases({
  '@root': '.',
  '@middleware': path.join(__dirname, '/src/middlewares'),
  '@config': path.join(__dirname, 'src/configs')
})

export default moduleAlias
