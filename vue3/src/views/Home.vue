<template>
	<img alt="Vue logo" src="../assets/logo.png" />
	<HelloWorld msg="Vue.js Demo" @close="close"> </HelloWorld>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	name: 'App',
	components: {
		HelloWorld,
	},
	created() {
		console.log('vue2.0写法 created');
	},
	mounted() {
		console.log(this.$route);
	},
	methods: {
		close() {
			console.log('close');
		},
	},
};
</script>

<style></style>
