<script lang="ts">
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email: string = '';
	let password: string = '';
	let errorMessage: string = '';

	// Type-safe error helper
	function getErrorMessage(err: unknown): string {
		if (err instanceof Error) return err.message;
		return 'An unknown error occurred';
	}

	async function handleLogin(event: Event) {
		event.preventDefault();
		errorMessage = '';

		try {
			// Login with PocketBase
			await pb.collection('users').authWithPassword(email, password);
			console.log('Login successful');

			// Redirect after login
			goto('/dashboard');
		} catch (err: unknown) {
			console.error('Login failed:', err);
			errorMessage = getErrorMessage(err);
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
		<h1 class="text-2xl font-bold mb-6 text-center">Login</h1>

		{#if errorMessage}
			<p class="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
				{errorMessage}
			</p>
		{/if}

		<form on:submit={handleLogin} class="space-y-4">
			<div>
				<label class="block mb-1 text-sm font-medium">Email</label>
				<input
					type="email"
					bind:value={email}
					class="w-full px-3 py-2 border rounded focus:outline-none"
					placeholder="Email"
					required
				/>
			</div>

			<div>
				<label class="block mb-1 text-sm font-medium">Password</label>
				<input
					type="password"
					bind:value={password}
					class="w-full px-3 py-2 border rounded focus:outline-none"
					placeholder="Password"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
			>
				Login
			</button>
		</form>
	</div>
</div>
