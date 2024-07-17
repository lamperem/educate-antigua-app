import * as moment from 'moment';

export const environment = {
    production: false,
    development: false,
    local: true,

    API_SERVER_URL: 'http://localhost:3000',  // url del api principal del módulo administrativo
    SHOP_APP_DOMAIN_URL: 'https://dev.proticket.store',   // URL  del componenete de tiendas, donde los usuarios realizarán el proceso de compra.
    ORDERS_API_URL:  `https://api-dev.proticket.store`,

    NOW: moment(new Date()).format('YYYY-MM-DD HH:MM:ss'),
    DEFAULT_STATUS_ACTIVE: 160445,
    DEFAULT_EMPTY_TYPOLOGY:  160000,
    DEFAULT_COUNTRY_GUATEMALA: 160531,
    DEFAULT_EVENT_CATEGORY_TYPOLOGY: 160716,
    TICKET_TYPE_CATEGORY: 160712,
    DEFAULT_TICKET_PAGO: 160713,
    DEFAULT_STATUS_INACTIVE: 160446


}
