const host = 'http://localhost:4200';

const util = {
    API: {
        USER: {
            FIND_USER: `${host}/user/findUser`,
            REGISTER: `${host}/user/register`
        },
        TEAM: {
            LIST: `${host}/team/list`
        },
        GAME: {
            DELETE: `${host}/game/delete`,
            CREATE: `${host}/game/create`,
            UPDATE: `${host}/game/update`,
            FIND_BY_ID: `${host}/game/findById`
        },
        STADIUM: {
            LIST: `${host}/stadium/list`
        }
    }
}

export default util;