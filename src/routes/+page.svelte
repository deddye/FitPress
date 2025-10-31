<script lang="ts">
  import NewsletterCard from '$lib/components/NewsletterCard.svelte';
  import { newsletters } from '$lib/data/newsletters';
  import { onDestroy } from 'svelte';
  let email = '';
  let loading = false;
  let message: string | null = null;
  let error: string | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function clearMessageTimer() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  async function handleSubscribe(e: Event) {
    e.preventDefault();
    clearMessageTimer();
    message = null;
    error = null;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      error = 'Please enter a valid email.';
      // auto-clear
      timeoutId = setTimeout(() => {
        error = null;
        timeoutId = null;
      }, 2000);
      return;
    }

    loading = true;
    try {
      // submit to the page server action instead of the old API route
      const formData = new FormData();
      formData.append('email', email);
      // include the action name if your page.server.ts action is named `subscribe`
      // remove this line if your action is the default action
      formData.append('subscribe', 'subscribe');

      const res = await fetch(window.location.pathname, {
        method: 'POST',
        body: formData
      });

      const json = await res.json();
      if (!res.ok) {
        error = json?.message ?? 'Subscription failed.';
      } else {
        message = json?.message ?? 'Subscribed!';
        email = '';
      }

      // auto-clear message/error after 2s
      timeoutId = setTimeout(() => {
        message = null;
        error = null;
        timeoutId = null;
      }, 2000);
    } catch (err) {
      error = 'Network error. Please try again.';
      timeoutId = setTimeout(() => {
        error = null;
        timeoutId = null;
      }, 2000);
    } finally {
      loading = false;
    }
  }

  onDestroy(() => {
    clearMessageTimer();
  });
</script>

<section class="max-w-4xl mx-auto px-4 py-12 text-center">
  <h1 class="text-4xl font-bold mb-4">Your Weekly Fitness Updates</h1>
  <p class="text-gray-600 mb-6">
    Stay updated with the latest in bodybuilding, powerlifting, nutrition, and more.
  </p>

  <div class="max-w-md mx-auto mb-12">
    <form class="flex flex-col sm:flex-row items-center gap-3" on:submit|preventDefault={handleSubscribe} aria-label="Subscribe form">
      <label class="sr-only" for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        bind:value={email}
        placeholder="you@domain.com"
        class="w-full sm:flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
        aria-required="true"
      />

      <button
        type="submit"
        class="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded px-4 py-2 disabled:opacity-50"
        disabled={loading}
        aria-disabled={loading}
      >
        {#if loading}Subscribing...{:else}Subscribe{/if}
      </button>
    </form>

    {#if message}
      <p class="mt-3 text-sm text-green-600">{message}</p>
    {/if}
    {#if error}
      <p class="mt-3 text-sm text-red-600">{error}</p>
    {/if}
  </div>

  <div class="grid md:grid-cols-2 gap-6">
    {#each newsletters as nl}
      <NewsletterCard {nl} />
    {/each}
  </div>
</section>