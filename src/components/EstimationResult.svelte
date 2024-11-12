<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  export let estimationData: any = {};
  const dispatch = createEventDispatcher();
  
  let isGenerating = false;
  let estimationDetails = {
    totalPrice: 0,
    materials: [],
    laborCost: 0,
    deliveryDate: '',
    notes: ''
  };
  
  async function generatePDF() {
    isGenerating = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    isGenerating = false;
  }
  
  async function saveEstimation() {
    isGenerating = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    isGenerating = false;
  }
</script>

<div 
  class="max-w-4xl mx-auto"
  in:fly={{ y: 20, duration: 400, delay: 200 }} 
  out:fade
>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">見積り結果</h2>
    
    {#if isGenerating}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    {:else}
      <div class="space-y-6">
        <div 
          class="bg-gray-50 p-4 rounded-md"
          in:fly={{ y: 10, duration: 300, delay: 300 }}
        >
          <h3 class="text-lg font-semibold mb-4">案件概要</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600">案件名</p>
              <p class="font-medium">{estimationData.projectName || '未設定'}</p>
            </div>
            <div>
              <p class="text-gray-600">顧客名</p>
              <p class="font-medium">{estimationData.clientName || '未設定'}</p>
            </div>
          </div>
        </div>
        
        <div 
          class="border-t pt-6"
          in:fly={{ y: 10, duration: 300, delay: 400 }}
        >
          <h3 class="text-lg font-semibold mb-4">見積り詳細</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">合計金額（税抜）</span>
              <span class="text-2xl font-bold">¥{estimationDetails.totalPrice.toLocaleString()}</span>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-md">
              <h4 class="font-medium mb-2">材料費内訳</h4>
              <ul class="space-y-2">
                {#each estimationDetails.materials as material, i}
                  <li 
                    class="flex justify-between"
                    in:fly={{ y: 5, duration: 200, delay: 500 + (i * 100) }}
                  >
                    <span>{material.name}</span>
                    <span>¥{material.price.toLocaleString()}</span>
                  </li>
                {/each}
              </ul>
            </div>
            
            <div class="bg-gray-50 p-4 rounded-md">
              <h4 class="font-medium mb-2">工賃</h4>
              <p class="text-right">¥{estimationDetails.laborCost.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div 
          class="border-t pt-6"
          in:fly={{ y: 10, duration: 300, delay: 500 }}
        >
          <h3 class="text-lg font-semibold mb-4">納期・備考</h3>
          <div class="space-y-2">
            <p><span class="text-gray-600">予定納期：</span>{estimationDetails.deliveryDate}</p>
            <p><span class="text-gray-600">備考：</span>{estimationDetails.notes}</p>
          </div>
        </div>
        
        <div class="flex justify-between pt-6">
          <button
            on:click={() => dispatch('back')}
            class="btn-hover text-gray-600 hover:text-gray-800"
          >
            戻る
          </button>
          
          <div class="space-x-4">
            <button
              on:click={generatePDF}
              class="btn-hover bg-green-500 text-white px-6 py-2 rounded-md"
            >
              PDFで出力
            </button>
            <button
              on:click={saveEstimation}
              class="btn-hover bg-blue-500 text-white px-6 py-2 rounded-md"
            >
              見積りを保存
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>