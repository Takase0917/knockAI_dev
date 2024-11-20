<!-- EstimationForm.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  // import { onMount } from 'svelte';
  import { Mistral } from '@mistralai/mistralai';
  // import env from 'env';

  const dispatch = createEventDispatcher();

  // Form data
  let productName = '';
  let quantity = 1;
  let width = '';
  let height = '';
  let depth = '';
  let material = '';
  let surfaceFinish = '';
  let handleOption = '';
  let hingeOption = '';
  let customDesign = '';
  let additionalHardware = [] as any;
  let materialCosts = [] as any;
  let estimationDetails: {
  productName: string;
  quantity: number;
  totalPrice: number;
  materials: any[];
  laborCost: number;
  deliveryDate: string;
  notes: string;
  details?: any;
  } = {
    productName: '',
    quantity: 0,
    totalPrice: 0,
    materials: [],
    laborCost: 0,
    deliveryDate: '',
    notes: ''
  };


  // Progress tracking
  let progress = 0;
  const totalSteps = 4;

  // Submission state
  let isSubmitting = false;

  // Initialize the Mistral client
  const client = new Mistral({
    apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
  });


  // Update progress
  function updateProgress() {
    let completedSteps = 0;

    if (productName && quantity) completedSteps++;
    if (width && height && (depth || depth === '0')) completedSteps++;
    if (material && surfaceFinish) completedSteps++;
    if (handleOption && hingeOption) completedSteps++;

    progress = (completedSteps / totalSteps) * 100;
  }

  // Watch for changes to update progress
  $: updateProgress();

  async function handleSubmit() {
    if (!productName || !quantity) {
    alert('必須項目を入力してください');
    return;
  }

  isSubmitting = true;

  try {
    const userMessage = `
    以下の情報に基づき、見積りの詳細と合計金額（税抜）を算出してください。
    **出力は有効なJSON形式で、コメントや追加の説明は含めず、値はすべて埋めてください。**
    出力フォーマットは以下のJSON形式で返してください：
    {
      "productName": "製品名",
      "quantity": 数量,
      "totalPrice": 合計金額（数値のみ）,
      "details": {
        "dimensions": {
          "width": 幅,
          "height": 高さ,
          "depth": 奥行き
        },
        "material": 材料,
        "materialCosts": [
          { "name": "材料名", "price": 材料価格 }
        ],
        "surfaceFinish": 表面仕上げ,
        "handleOption": ハンドルオプション,
        "hingeOption": 蝶番オプション,
        "additionalHardware": [ "追加金物" ],
        "customDesign": カスタム要件
      }
    }
    **注意：出力は有効なJSON形式で、コメントや追加の説明は含めないでください。**

    以下の情報を基に計算してください：
    製品名: ${productName}
    数量: ${quantity}
    寸法: 幅 ${width}mm, 高さ ${height}mm, 奥行き ${depth ? `${depth}mm` : "未指定"}
    材料: ${material}
    材料費内訳: ${materialCosts ? materialCosts.map(c => `${c.name}: ¥${c.price}`).join(', ') : "未指定"}
    表面仕上げ: ${surfaceFinish}
    ハンドルオプション: ${handleOption ? handleOption : "なし"}
    蝶番オプション: ${hingeOption ? hingeOption : "なし"}
    追加金物: ${additionalHardware.length > 0 ? additionalHardware.join(', ') : "なし"}
    カスタム要件: ${customDesign ? customDesign : "特になし"}
    `;


    // Call the Mistral AI model
    const chatResponse = await client.chat.complete({
      model: 'ft:open-mistral-7b:3ace85a6:20241111:90780761',
      messages: [{ role: 'user', content: userMessage }],
    });

    const aiOutput = JSON.parse(chatResponse.choices[0].message.content);

    estimationDetails = {
      productName: aiOutput.productName,
      quantity: aiOutput.quantity,
      totalPrice: aiOutput.totalPrice,
      materials: aiOutput.details.materials || [],
      laborCost: aiOutput.details.laborCost || 0,
      deliveryDate: aiOutput.details.deliveryDate || '',
      notes: aiOutput.details.notes || '',
      details: aiOutput.details,
      totalPrice : aiOutput.totalPrice
  };
  
  console.log('Estimation details:', estimationDetails);
  console.log('totalPrice:', estimationDetails.totalPrice);

    // // Mock response instead of calling the Mistral AI model
    // const mockResponse = {
    //     totalPrice: '10000', // Example estimated cost
    //     materials: ['Wood', 'Metal'],
    //     laborCost: 2000,
    //     deliveryDate: '2023-12-01',
    //     notes: 'This is a mock estimation.'
    //   };

    // // Update estimationDetails with the mock data
    // estimationDetails = mockResponse;
    // console.log('Estimation details:', estimationDetails);

    // Dispatch the totalPrice to the parent component
    dispatch('next', {
      estimationDetails
    });

    isSubmitting = false;

    // Show success message
    // alert(`見積りが完了しました！合計金額は ${totalPrice} です。`);
  } catch (error) {
    console.error('Error fetching total price:', error);

    // Error message
    alert('合計金額の算出中にエラーが発生しました。内容を確認して再度お試しください。');
    isSubmitting = false;
  }
}
</script>

<style>
  /* Add your custom styles here */
</style>

<div
  class="max-w-2xl mx-auto"
  in:fly={{ y: 20, duration: 400, delay: 200 }}
  out:fade
>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-xl font-bold mb-6">製品見積りフォーム</h2>

    <!-- Progress Bar -->
    <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        class="bg-blue-500 h-2.5 rounded-full"
        style="width: {progress}%"
      ></div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- 1. 基本情報 -->
      <div>
        <h3 class="text-lg font-semibold mb-4">1. 基本情報</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-2" for="productName">
              製品名 <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="productName"
              bind:value={productName}
              class="w-full px-3 py-2 border rounded-md input-focus"
              placeholder="例：ドア"
              required
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2" for="quantity">
              数量 <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="quantity"
              bind:value={quantity}
              class="w-full px-3 py-2 border rounded-md input-focus"
              min="1"
              required
            />
          </div>
        </div>
      </div>

      <!-- 2. 寸法 -->
      <div>
        <h3 class="text-lg font-semibold mb-4">2. 寸法</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-gray-700 mb-2" for="width">
              幅 (mm)
            </label>
            <input
              type="number"
              id="width"
              bind:value={width}
              class="w-full px-3 py-2 border rounded-md input-focus"
              min="0"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2" for="height">
              高さ (mm)
            </label>
            <input
              type="number"
              id="height"
              bind:value={height}
              class="w-full px-3 py-2 border rounded-md input-focus"
              min="0"
            />
          </div>
          <div>
            <label class="block text-gray-700 mb-2" for="depth">
              奥行き (mm)
            </label>
            <input
              type="number"
              id="depth"
              bind:value={depth}
              class="w-full px-3 py-2 border rounded-md input-focus"
              min="0"
            />
          </div>
        </div>
      </div>

      <!-- 3. 素材と仕上げ -->
      <div>
        <h3 class="text-lg font-semibold mb-4">3. 素材と仕上げ</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-2" for="material">
              素材
            </label>
            <select
              id="material"
              bind:value={material}
              class="w-full px-3 py-2 border rounded-md input-focus"
            >
              <option value="">選択してください</option>
              <option value="無垢材">無垢材</option>
              <option value="合板">合板</option>
              <option value="MDF">MDF</option>
              <option value="メタル">メタル</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-2" for="surfaceFinish">
              表面仕上げ
            </label>
            <select
              id="surfaceFinish"
              bind:value={surfaceFinish}
              class="w-full px-3 py-2 border rounded-md input-focus"
            >
              <option value="">選択してください</option>
              <option value="木材（クリア塗装）">木材（クリア塗装）</option>
              <option value="木材（ラミネート）">木材（ラミネート）</option>
              <option value="メラミン">メラミン</option>
              <option value="マット">マット</option>
              <option value="光沢">光沢</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 4. 金物オプション -->
      <div>
        <h3 class="text-lg font-semibold mb-4">4. 金物オプション</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-700 mb-2" for="handleOption">
              ハンドル・取っ手
            </label>
            <select
              id="handleOption"
              bind:value={handleOption}
              class="w-full px-3 py-2 border rounded-md input-focus"
            >
              <option value="">選択してください</option>
              <option value="標準">標準</option>
              <option value="デザイン">デザイン</option>
              <option value="なし">なし</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-700 mb-2" for="hingeOption">
              蝶番・スライドレール
            </label>
            <select
              id="hingeOption"
              bind:value={hingeOption}
              class="w-full px-3 py-2 border rounded-md input-focus"
            >
              <option value="">選択してください</option>
              <option value="標準">標準</option>
              <option value="高品質">高品質</option>
              <option value="なし">なし</option>
            </select>
          </div>
        </div>
        <div class="mt-4">
          <label class="block text-gray-700 mb-2">追加金物</label>
          <div class="flex items-center">
            <input
              type="checkbox"
              id="doorCloser"
              value="ドアクローザー"
              bind:group={additionalHardware}
              class="mr-2"
            />
            <label for="doorCloser" class="mr-4">ドアクローザー</label>
            <input
              type="checkbox"
              id="lockFunction"
              value="ロック機能"
              bind:group={additionalHardware}
              class="mr-2"
            />
            <label for="lockFunction">ロック機能</label>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-4">
        <button
          type="submit"
          class="bg-orange-400 text-white px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {#if isSubmitting}
            <span class="loading-pulse">処理中...</span>
          {:else}
            見積りを完了する
          {/if}
        </button>
      </div>
    </form>
  </div>
</div>
