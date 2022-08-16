import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	build: {
        target: [ 'es2020' ]
    },
	optimizeDeps: {
		esbuildOptions: {
			target: 'es2020'
		}
	},
};

export default config;
