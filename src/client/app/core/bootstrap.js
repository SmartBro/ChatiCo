import {bootstrap} from 'angular2/bootstrap';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/common_dom';
import {App} from '../components/app/app';

function main() {
    return bootstrap(App, [
        ROUTER_PROVIDERS,
        ELEMENT_PROBE_PROVIDERS,
        HTTP_PROVIDERS,
        provide(LocationStrategy, {useClass: HashLocationStrategy})
    ]).catch(err => console.error(err)); // eslint-disable-line
};

document.addEventListener('DOMContentLoaded', main);