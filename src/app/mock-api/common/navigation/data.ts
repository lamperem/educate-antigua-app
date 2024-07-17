/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'home',
        link : '/home',
    },
    {
        id   : 'events',
        title: 'Eventos',
        type : 'basic',
        icon : 'local_activity',
        link : '/events'
    },
    {
        id   : 'orders',
        title: 'Ordenes',
        type : 'basic',
        icon : 'shopping_cart',
        link : '/orders'
    },
    {
        id   : 'store',
        title: 'Tiendas',
        type : 'basic',
        icon : 'store',
        link : '/stores'
    },
    {
        id   : 'utilities',
        title: 'Utilidades',
        type : 'basic',
        icon : 'business_center',
        link : '/utilities'
    },
    {
        id   : 'admin',
        title: 'Administrar',
        type : 'basic',
        icon : 'settings',
        link : '/settings'
    },
    {
        id   : 'audit',
        title: 'Auditoria',
        type : 'basic',
        icon : 'policy',
        link : '/audit'
    },
    {
        id   : 'logout',
        title: 'Salir',
        type : 'basic',
        icon : 'logout',
        link : '/logout'
    },
    
];
