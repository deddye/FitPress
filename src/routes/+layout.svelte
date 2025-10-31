<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	let isDark = false;

	function toggleDarkMode() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
	}
</script>

<header class="flex items-center justify-between bg-white p-4 shadow-md dark:bg-gray-900">
	<!-- Centered nav section -->
	<div class="flex flex-1 items-center justify-center space-x-6">
		<!-- App logo acts as Home -->
		<a href="/" class="flex items-center space-x-2 transition hover:opacity-80">
			<img src="/fp-logo.png" alt="FitPress logo" class="h-8 w-8" />
			<span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400"> FitPress </span>
		</a>

		<a
			href="/newsletters"
			class="font-medium text-gray-700 transition hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400"
			class:font-bold={$page.url.pathname === '/newsletters'}
		>
			Newsletters
		</a>
	</div>

	<!-- Dark mode toggle on right -->
	<div class="flex flex-1 justify-end">
		<button
			on:click={toggleDarkMode}
			class="rounded-full border border-gray-300 p-2 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
			aria-label="Toggle dark mode"
		>
			{#if isDark}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-yellow-400"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4.22 2.47a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM17 9a1 1 0 010 2h-1a1 1 0 110-2h1zm-2.78 6.53a1 1 0 01-1.42 0l-.7-.7a1 1 0 111.42-1.42l.7.7a1 1 0 010 1.42zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-6.22-2.47a1 1 0 010-1.42l.7-.7a1 1 0 111.42 1.42l-.7.7a1 1 0 01-1.42 0zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm2.78-6.53a1 1 0 00-1.42 0l-.7.7a1 1 0 101.42 1.42l.7-.7a1 1 0 000-1.42z"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5 text-gray-700 dark:text-gray-300"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
				</svg>
			{/if}
		</button>
	</div>
</header>

<main
	class="min-h-screen bg-white text-gray-900 transition-colors dark:bg-gray-950 dark:text-gray-100"
>
	<slot />
</main>

<footer
	class="border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-600 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400"
>
	© {new Date().getFullYear()}
	<span class="font-semibold text-indigo-600 dark:text-indigo-400">FitPress</span> — Built with 💪 passion
	for fitness
</footer>
