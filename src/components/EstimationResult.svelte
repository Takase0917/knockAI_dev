<!-- EstimationResult.svelte -->
<script lang="ts">
  // import { createEventーer } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  // import { fade, fly } from 'svelte/transition';
  
  export let estimationData: any = {};
  const dispatch = createEventDispatcher();
  
  // let isGenerating = false;
  let estimationDetails = {
    totalPrice: estimationData.totalPrice || 0,
    materials: estimationData.materials || [],
    laborCost: estimationData.laborCost || 0,
    deliveryDate: estimationData.deliveryDate || '',
    notes: estimationData.notes || ''
  };

  console.log('total prince', estimationDetails.totalPrice);
  
  // async function generatePDF() {
  //   isGenerating = true;
  //   await new Promise(resolve => setTimeout(resolve, 1500));
  //   isGenerating = false;
  // }
  
  // async function saveEstimation() {
  //   isGenerating = true;
  //   await new Promise(resolve => setTimeout(resolve, 1000));
  //   isGenerating = false;
  // }
</script>

<div class="max-w-4xl mx-auto">
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">見積り結果</h2>
    <p>製品名: {estimationData.productName}</p>
    <p>数量: {estimationData.quantity}</p>
    <p>合計金額: ¥{estimationData.totalPrice.toLocaleString()}</p>

    <h3 class="text-lg font-semibold mb-4">詳細:</h3>
    <p>寸法: 幅 {estimationData.details.dimensions.width}mm, 高さ {estimationData.details.dimensions.height}mm, 奥行き {estimationData.details.dimensions.depth || '未指定'}mm</p>
    <p>材料: {estimationData.details.material}</p>

    <h4 class="font-medium mb-2">材料費内訳:</h4>
    <ul>
      {#each estimationData.details.materialCosts as material}
        <li>{material.name}: ¥{material.price.toLocaleString()}</li>
      {/each}
    </ul>

    <!-- Add any additional sections you need to display from the estimationData -->

    <!-- Back button or any other controls -->
    <div class="flex justify-between pt-6">
      <button
        on:click={() => dispatch('back')}
        class="btn-hover text-gray-600 hover:text-gray-800"
      >
        戻る
      </button>
      <!-- ... other buttons if needed ... -->
    </div>
  </div>
</div>

<style>
  .btn-hover {
    transition: all 0.3s;
  }

  .btn-hover:hover {
    transform: translateY(-2px);
  }
</style>