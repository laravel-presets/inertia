declare module "*.vue" {
    import { defineComponent } from "vue";
    const _default: ReturnType<typeof defineComponent>;
    export default _default;
}

type CustomPageProps<T> = T & { errors: { [key: string]: string } };

declare module '@inertiajs/inertia-vue3' {
	import { ComputedRef } from 'vue';
	import { Page } from '@inertiajs/inertia';
	export const app: any;
	export const plugin: {
		install(vue: any): void;
	};
	export function usePage<T>(): Page<ComputedRef<CustomPageProps<T>>>;
}

type Routes = keyof typeof import('@scripts/generated/ziggy').Ziggy['routes'];
declare const route: ((name: Routes, params?: any) => string) &
	(() => { current: (name: Routes) => boolean } & { current: () => Routes });
