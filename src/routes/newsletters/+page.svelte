<script lang="ts">
  import { newsletters } from '$lib/data/newsletters';
  let selected: string[] = [];
  let email = '';
  let status = '';

  async function subscribe() {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email, topics: selected }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    status = data.message;
  }
</script>

<section class="max-w-2xl mx-auto px-4 py-12">
  <h1 class="text-2xl font-bold mb-4">Select Your Fitness Newsletters</h1>
  <form on:submit|preventDefault={subscribe} class="space-y-4">
    {#each newsletters as nl}
      <label class="flex items-center gap-2">
        <input type="checkbox" value={nl.slug} bind:group={selected} />
        <span>{nl.name}</span>
      </label>
    {/each}

    <input type="email" bind:value={email} placeholder="Your email" required class="border p-2 w-full rounded" />
    <button class="bg-blue-600 text-white px-4 py-2 rounded w-full">Subscribe</button>
  </form>

  {#if status}<p class="text-sm mt-3">{status}</p>{/if}
</section>
