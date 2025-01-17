import * as moment from 'moment';

const _DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export const  CONSTANTS = {
    DEFAULT_DATE_TIME_FORMAT: _DEFAULT_DATE_TIME_FORMAT,
    SESSION_ACCESS_TOKEN_KEY: '__proticket_access_token',
    SESSION_ACTIVE_ORGANIZATION_KEY: '__proticket_active_org',
    MIN_RECORD: 0,
    MAX_RECORD: 99,
    DEFAULT_START_DATE: moment().startOf('year').format(_DEFAULT_DATE_TIME_FORMAT).toString(),
    DEFAULT_END_DATE: moment().add(10, 'year').format(_DEFAULT_DATE_TIME_FORMAT).toString(),

    DEFAULT_ORDER_STATUS_TYPOLOGY: 160753,
    ORDER_STATUS_BORRADOR: 160754,
    ORDER_STATUS_PENDING: 160756,
    ORDER_STATUS_CANCELLED: 160757,
    ORDER_STATUS_COMPLETE:  160758,
    MAX_ITEMS_PER_PAGE : 10,    

}

