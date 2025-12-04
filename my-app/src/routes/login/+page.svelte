<script lang="ts">
	import { pb } from '$lib/pb';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let email = '';
	let password = '';
	let errorMessage = '';

	// Helper to safely extract error messages
	function getErrorMessage(err: unknown): string {
		if (err instanceof Error) return err.message;
		return 'An unknown error occurred';
	}

	async function loginUser() {
		errorMessage = '';

		try {
			// Login with PocketBase
			await pb.collection('users').authWithPassword(email, password);

			// Redirect after successful login
			goto('/dashboard'); // change this if you have a different page
		} catch (err: unknown) {
			errorMessage = getErrorMessage(err);
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">

		<h1 class="text-2xl font-bold mb-6 text-center">
			Login
		</h1>

		{#if errorMessage}
			<p class="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
				{errorMessage}
			</p>
		{/if}

		<form on:submit|preventDefault={loginUser} class="space-y-4">

			<div>
				<label class="block mb-1 text-sm font-medium">Email</label>
				<input
					type="email"
					bind:value={email}
					class="w-full px-3 py-2 border rounded focus:outline-none"
					required
				/>
			</div>

			<div>
				<label class="block mb-1 text-sm font-medium">Password</label>
				<input
					type="password"
					bind:value={password}
					class="w-full px-3 py-2 border rounded focus:outline-none"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
			>
				Log In
			</button>
		</form>
	</div>
</div>
