<script lang="ts">
  export let nl;
</script>

<a href={`/newsletters/${nl.slug}`} class="block border rounded-xl p-5 shadow-sm hover:shadow-md transition">
  <h2 class="font-semibold text-lg">{nl.name}</h2>
  <p class="text-gray-600 text-sm mb-2">{nl.description}</p>
  <p class="text-blue-600 text-sm italic">Latest: {nl.latestHeadline}</p>
</a>
