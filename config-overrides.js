const {injectBabelPlugin} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    // antd style
    config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config);

    // override antd styles
    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        // modifyVars: {"@primary-color": "#003c52"},
    })(config, env);
    return config;
};