<script lang="ts">
	import "../app.css";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	let menuOpen = false;
	let darkMode = false;

	// Apply theme on mount
	onMount(() => {
		const storedTheme = localStorage.getItem("theme");

		if (storedTheme === "dark") {
			darkMode = true;
		} else if (storedTheme === "light") {
			darkMode = false;
		} else {
			// Default to system preference
			darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
		}

		applyTheme();
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem("theme", darkMode ? "dark" : "light");
		applyTheme();
	}

	function applyTheme() {
		if (darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}
</script>


<!-- Global wrapper -->
<div class="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">

	<!-- HEADER -->
	<header class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
		<nav class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
			<!-- Logo -->
			<a
				href="/"
				class="text-xl font-bold text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 transition-colors"
				on:click={() => (menuOpen = false)}
			>
				FitPress
			</a>

			<!-- Desktop Nav -->
			<ul class="hidden md:flex items-center gap-6 font-medium">
				<li>
					<a
						href="/"
						class="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
						class:text-blue-700={$page.url.pathname === '/'}
						class:font-semibold={$page.url.pathname === '/'}
					>
						Home
					</a>
				</li>
				<li>
					<a
						href="/newsletters"
						class="hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
						class:text-blue-700={$page.url.pathname.startsWith('/newsletters')}
						class:font-semibold={$page.url.pathname.startsWith('/newsletters')}
					>
						Newsletters
					</a>
				</li>
			</ul>

			<!-- Right side: Dark mode toggle -->
			<div class="flex items-center gap-2">
				<button
					on:click={toggleDarkMode}
					class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
					aria-label="Toggle dark mode"
				>
					{#if darkMode}
						<!-- Sun icon -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1.5m0 15V21m9-9h-1.5M4.5 12H3m15.364-6.364l-1.061 1.061M6.697 17.303l-1.061 1.061m0-12.728l1.061 1.061m12.728 12.728l-1.061-1.061M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
						</svg>
					{:else}
						<!-- Moon icon -->
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
							stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.338.263-2.614.748-3.752A9.753 9.753 0 003 12c0 5.385 4.365 9.75 9.75 9.75a9.753 9.753 0 009.002-6.748z" />
						</svg>
					{/if}
				</button>

				<!-- Mobile menu button -->
				<button
					class="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
					on:click={() => (menuOpen = !menuOpen)}
					aria-label="Toggle menu"
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
						stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						{#if menuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
						{/if}
					</svg>
				</button>
			</div>
		</nav>

		<!-- Mobile menu dropdown -->
		<div
			class="md:hidden overflow-hidden border-t dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-200"
			style={`max-height: ${menuOpen ? '200px' : '0'};`}
		>
			<ul class="flex flex-col p-4 space-y-2 font-medium">
				<li>
					<a href="/" on:click={() => (menuOpen = false)}
						class="block py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
						class:text-blue-700={$page.url.pathname === '/'}
						class:font-semibold={$page.url.pathname === '/'}
					>
						Home
					</a>
				</li>
				<li>
					<a href="/newsletters" on:click={() => (menuOpen = false)}
						class="block py-2 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
						class:text-blue-700={$page.url.pathname.startsWith('/newsletters')}
						class:font-semibold={$page.url.pathname.startsWith('/newsletters')}
					>
						Newsletters
					</a>
				</li>
			</ul>
		</div>
	</header>

	<!-- MAIN -->
	<main class="grow transition-colors duration-300">
		<slot />
	</main>

	<!-- FOOTER -->
	<footer class="bg-white dark:bg-gray-800 border-t dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 mt-12 transition-colors duration-300">
		<div class="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
			<p>
				© {new Date().getFullYear()} <span class="font-semibold text-blue-700 dark:text-blue-400">FitPress</span>
			</p>
			<p>
				Built with <a href="https://kit.svelte.dev" target="_blank" class="underline hover:text-blue-700 dark:hover:text-blue-400">SvelteKit</a>
			</p>
		</div>
	</footer>
</div>
