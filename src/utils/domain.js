if (process.env.NODE_ENV === 'development') {
  module.exports = `http://localhost:8088`
} else if (process.env.NODE_ENV === 'test') {
  module.exports = `http://192.168.1.102:8000`
} else {
  module.exports = `http://www.baidu.com`
}
