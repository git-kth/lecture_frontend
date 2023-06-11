const date = new Date();
class Constant {
    BASE_URL = 'http://127.0.0.1:8080/api';
    NOW = `${date.getFullYear()}-${
        (date.getMonth() < 10 ? '0' : '') + date.getMonth()
    }-${date.getDate()}`;
}
export default new Constant();
