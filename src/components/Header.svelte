<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  
  const dispatch = createEventDispatcher();
  let isLoggedIn = false;
  let username = '';
  
  function handleLogin() {
    dispatch('login');
  }
  
  onMount(() => {
    // Check login status
  });
</script>

<header class="bg-white shadow-md">
  <div class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-800">木製建具見積もりAI</h1>
      
      <div class="flex items-center space-x-4">
        {#if isLoggedIn}
          <span class="text-gray-600">ようこそ、{username}様</span>
          <button class="text-sm text-gray-600 hover:text-gray-800">
            ログアウト
          </button>
        {:else}
          <button 
            on:click={handleLogin}
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ログイン
          </button>
        {/if}
      </div>
    </div>
  </div>
</header>