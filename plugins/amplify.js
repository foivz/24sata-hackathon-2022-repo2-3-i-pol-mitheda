// plugins/amplify.js
import Amplify from 'aws-amplify'
import '@aws-amplify/ui-vue';
import config from '../src/aws-exports'
import Vue from 'vue'
Amplify.configure(config)
import {
    applyPolyfills,
    defineCustomElements,
} from '@aws-amplify/ui-components/loader';

applyPolyfills().then(() => {
defineCustomElements(window);
});

Vue.config.ignoredElements = [/amplify-\w*/];
