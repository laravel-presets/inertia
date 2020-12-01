import route from 'ziggy';
import { Ziggy } from '@scripts/generated/ziggy';

window.route = (name, params, absolute, config = Ziggy) => route(name, params, absolute, config);
