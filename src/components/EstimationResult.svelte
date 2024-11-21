<!-- EstimationResult.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  // import { formatCurrency } from '../utils/format'; // Utility function to format currency

  export let estimationData: any = {};
  const dispatch = createEventDispatcher();

  // Ensure all necessary details are safely accessed
  let estimationDetails = estimationData.details || {};
  let dimensions = estimationDetails.dimensions || {};
  let materialCosts = estimationDetails.materialCosts || [];
  let additionalHardware = estimationDetails.additionalHardware || [];
  let customDesign = estimationDetails.customDesign || '特になし';

  onMount(() => {
    console.log('Estimation details:', estimationData);
  });
</script>

<style>
  /* Tailwind CSS classes are used for styling */
  .btn {
    @apply bg-blue-600 text-white px-5 py-2 rounded-md;
    @apply transition-colors duration-200;
  }

  .btn:hover {
    @apply bg-blue-700;
  }

  .btn-secondary {
    @apply bg-gray-200 text-gray-700;
  }

  .btn-secondary:hover {
    @apply bg-gray-300;
  }

  .section-title {
    @apply text-xl font-semibold mb-4;
  }

  .item-label {
    @apply font-medium text-gray-800;
  }

  .item-value {
    @apply text-gray-700;
  }

  .summary-item {
    @apply flex justify-between py-2 border-b border-gray-200;
  }

  .total-price {
    @apply text-2xl font-bold text-green-600;
  }

  .notes {
    @apply bg-yellow-50 p-4 rounded-md;
  }

  .notes p {
    @apply text-yellow-800;
  }
</style>

<div class="max-w-3xl mx-auto mt-10">
  <div class="bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-6 text-center">見積り結果</h2>

    <!-- Summary Section -->
    <div class="mb-8">
      <div class="summary-item">
        <span class="item-label">製品名</span>
        <span class="item-value">{estimationData.productName || '-'}</span>
      </div>
      <div class="summary-item">
        <span class="item-label">数量</span>
        <span class="item-value">{estimationData.quantity || '-'}</span>
      </div>
      <div class="summary-item">
        <span class="item-label">合計金額</span>
        <span class="total-price">¥{(estimationData.totalPrice || 0).toLocaleString()}</span>
      </div>
    </div>

    <!-- Details Section -->
    <div class="mb-8">
      <h3 class="section-title">詳細情報</h3>
      <div class="summary-item">
        <span class="item-label">寸法</span>
        <span class="item-value">
          幅 {dimensions.width || '-'}mm × 高さ {dimensions.height || '-'}mm × 奥行き {dimensions.depth || '-'}mm
        </span>
      </div>
      <div class="summary-item">
        <span class="item-label">材料</span>
        <span class="item-value">{estimationDetails.material || '-'}</span>
      </div>
      <div class="summary-item">
        <span class="item-label">表面仕上げ</span>
        <span class="item-value">{estimationDetails.surfaceFinish || '-'}</span>
      </div>
      <div class="summary-item">
        <span class="item-label">ハンドルオプション</span>
        <span class="item-value">{estimationDetails.handleOption || 'なし'}</span>
      </div>
      <div class="summary-item">
        <span class="item-label">蝶番オプション</span>
        <span class="item-value">{estimationDetails.hingeOption || 'なし'}</span>
      </div>
      {#if additionalHardware.length > 0}
        <div class="summary-item">
          <span class="item-label">追加金物</span>
          <span class="item-value">{additionalHardware.join(', ')}</span>
        </div>
      {/if}
      <div class="summary-item">
        <span class="item-label">カスタム要件</span>
        <span class="item-value">{customDesign}</span>
      </div>
    </div>

    <!-- Material Costs Section -->
    {#if materialCosts.length > 0}
      <div class="mb-8">
        <h3 class="section-title">材料費内訳</h3>
        <ul class="list-disc pl-5 space-y-1">
          {#each materialCosts as material}
            <li>
              <span class="item-label">{material.name}:</span>
              <span class="item-value">¥{material.price.toLocaleString()}</span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- Notes Section -->
    {#if estimationDetails.notes}
      <div class="mb-8 notes">
        <h3 class="section-title">備考</h3>
        <p>{estimationDetails.notes}</p>
      </div>
    {/if}

    <!-- Action Buttons -->
    <div class="flex justify-end space-x-4 pt-6">
      <button
        on:click={() => dispatch('back')}
        class="btn btn-secondary"
      >
        修正する
      </button>
      <button
        on:click={() => dispatch('confirm')}
        class="btn"
      >
        注文を確定
      </button>
    </div>
  </div>
</div>