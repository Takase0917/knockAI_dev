<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  const dispatch = createEventDispatcher();
  
  let projectName = '';
  let clientName = '';
  let deadline = '';
  let requirements = '';
  let isSubmitting = false;
  
  async function handleSubmit() {
    if (!projectName || !clientName) {
      alert('必須項目を入力してください');
      return;
    }
    
    isSubmitting = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    dispatch('next', {
      projectName,
      clientName,
      deadline,
      requirements
    });
    
    isSubmitting = false;
  }
</script>

<div class="max-w-2xl mx-auto" in:fly={{ y: 20, duration: 400, delay: 200 }} out:fade>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">見積り基本情報</h2>
    
    <form on:submit|preventDefault={handleSubmit} class="space-y-4">
      <div>
        <label class="block text-gray-700 mb-2" for="projectName">
          案件名 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="projectName"
          bind:value={projectName}
          class="w-full px-3 py-2 border rounded-md input-focus"
          placeholder="例：○○邸 木製建具工事"
          required
        />
      </div>
      
      <div>
        <label class="block text-gray-700 mb-2" for="clientName">
          顧客名 <span class="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="clientName"
          bind:value={clientName}
          class="w-full px-3 py-2 border rounded-md input-focus"
          placeholder="例：株式会社○○"
          required
        />
      </div>
      
      <div>
        <label class="block text-gray-700 mb-2" for="deadline">
          希望納期
        </label>
        <input
          type="date"
          id="deadline"
          bind:value={deadline}
          class="w-full px-3 py-2 border rounded-md input-focus"
        />
      </div>
      
      <div>
        <label class="block text-gray-700 mb-2" for="requirements">
          要件・備考
        </label>
        <textarea
          id="requirements"
          bind:value={requirements}
          class="w-full px-3 py-2 border rounded-md input-focus"
          rows="4"
          placeholder="特記事項があればご記入ください"
        ></textarea>
      </div>
      
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="btn-hover bg-blue-500 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="loading-pulse">処理中...</span>
          {:else}
            次へ進む
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>