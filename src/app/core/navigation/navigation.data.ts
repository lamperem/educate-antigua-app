/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigationData: FuseNavigationItem[] = [
    {
        id   : 'home',
        title: 'Inicio',
        type : 'basic',
        icon : 'home',
        link : '/home/dashboard',
        tooltip:'Inicio'
    },
    {
        id   : 'students',
        title: 'Estudiantes',
        type : 'basic',
        icon : 'festival',
        link : '/students',
        tooltip: 'Estudiantes'
    },

    {
        id   : 'informes',
        title: 'Estudiantes',
        type : 'basic',
        icon : 'analytics',
        tooltip:'Reportes',
        link : '/reports'
    },

    {
        id   : 'admin',
        title: 'Administrar',
        type : 'aside',
        icon : 'settings',
        link : '/settings',
        tooltip: 'Configuración',
        children: [

            {   id   : 'company',
                title: 'Parametros del sistema',
                type : 'basic',
                icon : 'apartment',
                link : '/global-configuration',
                tooltip: 'Parametros del sistema',
            },

            {   id   : 'customer.fields',
                title: 'Administracion de usuarios',
                type : 'basic',
                icon : 'fact_check',
                link : '/users',
                tooltip: 'Administracion de usuarios',
            }
        ]
    },
    {
        id   : 'logout',
        title: 'Cerrar sesión',
        type : 'basic',
        icon : 'logout',
        link : '/logout',
        tooltip: 'Cerrar sesión'
    },    
];
