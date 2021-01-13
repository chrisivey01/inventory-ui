const path = require('path')

module.exports = {
  // Source files
  src: path.resolve(__dirname, '../src'),

  // Production build files
  build: path.resolve("C:/FXServer/server-data/resources/pma-inventory/dist"),

  // Static files that get copied to build folder
  public: path.resolve(__dirname, '../public'),
}