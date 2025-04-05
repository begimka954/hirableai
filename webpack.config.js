module.exports = (env_var) => {
    return require(`./webpack.config.${env_var}.js`)
}