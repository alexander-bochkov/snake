import development from './webpack.development';
import production from './webpack.production';

export default (env: { production?: boolean }) => (env.production ? production : development);
