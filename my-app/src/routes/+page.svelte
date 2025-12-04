<script>
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';

	let isLoggedIn = !!pb.authStore.model;

	// Optional: watch auth changes
	pb.authStore.onChange(() => {
		isLoggedIn = !!pb.authStore.model;
	});

	function logout() {
		pb.authStore.clear();
		goto('/');
	}
</script>

<!-- HEADER -->
<header class="fixed top-0 left-0 w-full bg-white/80 backdrop-blur shadow-md z-50">
	<div class="max-w-6xl mx-auto flex justify-between items-center p-4">
		<h1 class="text-xl font-bold cursor-pointer" on:click={() => goto('/')}>
			MyApp
		</h1>
		<nav class="space-x-4">
			<a href="/" class="hover:text-blue-600">Home</a>
			{#if !isLoggedIn}
				<a href="/login" class="hover:text-blue-600">Login</a>
				<a href="/signup" class="hover:text-blue-600">Signup</a>
			{:else}
				<a href="/dashboard" class="hover:text-blue-600">Dashboard</a>
				<button on:click={logout} class="hover:text-blue-600">Logout</button>
			{/if}
		</nav>
	</div>
</header>

<!-- HERO SECTION -->
<section class="pt-24 min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 text-white text-center">
	<h2 class="text-4xl md:text-5xl font-bold mb-4">
		Welcome to MyApp
	</h2>
	<p class="text-lg md:text-xl max-w-xl mb-8">
		This is a demo landing page built with SvelteKit and PocketBase. Login or signup to get started!
	</p>
	<div class="space-x-4">
		<a href="/signup" class="px-6 py-3 bg-white text-blue-600 rounded shadow hover:bg-gray-100 transition">
			Signup
		</a>
		<a href="/login" class="px-6 py-3 border border-white rounded hover:bg-white hover:text-blue-600 transition">
			Login
		</a>
	</div>
</section>

<!-- OPTIONAL FEATURE SECTION -->
<section class="py-20 bg-gray-100 text-gray-800 text-center">
	<h3 class="text-3xl font-bold mb-6">Features</h3>
	<div class="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
		<div class="p-4 bg-white rounded shadow">
			<h4 class="font-semibold mb-2">Fast Setup</h4>
			<p>Quickly integrate PocketBase with SvelteKit and start building.</p>
		</div>
		<div class="p-4 bg-white rounded shadow">
			<h4 class="font-semibold mb-2">Authentication</h4>
			<p>Email/password login, secure storage, and user sessions ready to go.</p>
		</div>
		<div class="p-4 bg-white rounded shadow">
			<h4 class="font-semibold mb-2">Realtime Data</h4>
			<p>Push and fetch data instantly with PocketBase collections.</p>
		</div>
	</div>
</section>
