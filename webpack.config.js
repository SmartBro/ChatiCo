export function WebpackConfig () {
    const env = process.env.NODE_ENV || 'dev';
    const configsFolder = `${__dirname}/webpack-configs`;
    
    const configs = {
        global: require(`${configsFolder}/global.config`),
        env: require(`${configsFolder}/environments/${env}`)
    };
    
    if(!configs.global || !configs.env){
        throw new Error(`Can't find config file. Please check your directory`);
    }
    
    return Object.assign(configs.global(__dirname), configs.env(__dirname, env));
}
