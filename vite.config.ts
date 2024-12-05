import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
	plugins: [
		enhancedImages(),
		sveltekit()
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
