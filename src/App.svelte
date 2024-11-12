<script lang="ts">
  import { onMount } from 'svelte';
  import Header from './components/Header.svelte';
  import EstimationForm from './components/EstimationForm.svelte';
  import ImageUpload from './components/ImageUpload.svelte';
  import EstimationResult from './components/EstimationResult.svelte';
  
  let isLoading = false;
  let currentStep = 'form';
  let estimationData = {};
  
  function handleLogin() {
    currentStep = 'home';
  }
  
  onMount(() => {
    // Initialize the application
    document.documentElement.classList.add('bg-background');
  });
</script>

<main class="min-h-screen bg-background">
  <Header on:login={handleLogin} />
  
  <div class="container mx-auto px-4 py-8">
    {#if isLoading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    {:else}
      {#if currentStep === 'home'}
        <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-2xl font-bold mb-6">ホーム</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all">
              <h3 class="text-xl font-semibold mb-3">新規見積作成</h3>
              <p class="text-gray-600 mb-4">新しい見積もりを作成します</p>
              <button 
                on:click={() => currentStep = 'form'}
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                開始する
              </button>
            </div>
            <div class="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-all">
              <h3 class="text-xl font-semibold mb-3">見積履歴</h3>
              <p class="text-gray-600 mb-4">過去の見積もり履歴を確認します</p>
              <button 
                class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                履歴を見る
              </button>
            </div>
          </div>
        </div>
      {:else if currentStep === 'form'}
        <EstimationForm 
          on:next={() => currentStep = 'image'} 
          bind:estimationData
        />
      {:else if currentStep === 'image'}
        <ImageUpload 
          on:next={() => currentStep = 'result'}
          on:back={() => currentStep = 'form'}
          bind:estimationData
        />
      {:else if currentStep === 'result'}
        <EstimationResult 
          {estimationData}
          on:back={() => currentStep = 'image'}
        />
      {/if}
    {/if}
  </div>
</main>